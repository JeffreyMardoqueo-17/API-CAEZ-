import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql'

// Método para obtener todos los tipos de pago
export const GetTiposPago = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerTiposPago');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los tipos de pago: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los tipos de pago' });
    }
};

// Método para obtener un tipo de pago por su Id
export const GetTipoPagoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerTipoPagoPorId @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Tipo de pago no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el tipo de pago: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el tipo de pago' });
    }
};

// Método para insertar un nuevo tipo de pago
export const PostTipoPago = async (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        await executeQuery('EXEC SPInsertarTipoPago @Nombre', [{ name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(201).json({ msg: 'Tipo de pago creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el tipo de pago: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el tipo de pago' });
    }
};

// Método para actualizar un tipo de pago existente
export const PutTipoPago = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarTipoPago @Id, @Nombre', [{ name: 'Id', type: sql.TINYINT, value: id }, { name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(200).json({ msg: 'Tipo de pago actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el tipo de pago: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el tipo de pago' });
    }
};

// Método para eliminar un tipo de pago por su Id
export const DeleteTipoPago = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarTipoPago @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        res.status(200).json({ msg: 'Tipo de pago eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el tipo de pago: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el tipo de pago' });
    }
};

// Método para buscar tipo de pagos por un texto de búsqueda
export const BuscarTipoPagoPorTexto = async (req, res) => {
    const { textoBusqueda } = req.body; // Cambia req.params a req.body
    try {
        const result = await executeQuery('EXEC SPBuscarTipoPagoPorTexto @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(80), value: textoBusqueda }]);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar tipo de pagos: ${error}`);
        res.status(500).json({ msg: 'Error al buscar tipo de pagos' });
    }
};