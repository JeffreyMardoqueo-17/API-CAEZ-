import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

export const GetTiposDocumento = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerTiposDocumento');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los tipos de documento: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los tipos de documento' });
    }
};

export const GetTipoDocumentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerTipoDocumentoPorId @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el tipo de documento' });
    }
};

export const PostTipoDocumento = async (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        await executeQuery('EXEC SPInsertarTipoDocumento @Nombre', [{ name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(201).json({ msg: 'Tipo de documento creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el tipo de documento' });
    }
};

export const PutTipoDocumento = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarTipoDocumento @Id, @Nombre', [{ name: 'Id', type: sql.TINYINT, value: id }, { name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(200).json({ msg: 'Tipo de documento actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el tipo de documento' });
    }
};

export const DeleteTipoDocumento = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarTipoDocumento @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        res.status(200).json({ msg: 'Tipo de documento eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el tipo de documento' });
    }
};

export const BuscarTipoDocumentoPorTexto = async (req, res) => {
    const { textoBusqueda } = req.body;
    try {
        const result = await executeQuery('EXEC SPBuscarTipoDocumentosPorTexto @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(80), value: textoBusqueda }]);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar el Tipo de Documentos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el tipo de documento', error: error });
    }
};