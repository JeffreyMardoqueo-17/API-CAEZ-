import { GetConnection } from '../DataBase/contection/Conexion'
import sql from 'mssql';


// Método para obtener todos los tipos de documento

export const GetTiposDocumento = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerTiposDocumento');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los tipos de documento: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los tipos de documento' });
    }
};

// Método para obtener un tipo de documento por su Id
export const GetTipoDocumentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPObtenerTipoDocumentoPorId @Id');
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

// Método para insertar un nuevo tipo de documento
export const PostTipoDocumento = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(80), nombre).query('EXEC SPInsertarTipoDocumento @Nombre');
        res.status(201).json({ msg: 'Tipo de documento creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el tipo de documento' });
    }
};

// Método para actualizar un tipo de documento existente
export const PutTipoDocumento = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).input('Nombre', sql.VarChar(80), nombre).query('EXEC SPActualizarTipoDocumento @Id, @Nombre');
        res.status(200).json({ msg: 'Tipo de documento actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el tipo de documento' });
    }
};

// Método para eliminar un tipo de documento por su Id
export const DeleteTipoDocumento = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPEliminarTipoDocumento @Id');
        res.status(200).json({ msg: 'Tipo de documento eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el tipo de documento: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el tipo de documento' });
    }
};
