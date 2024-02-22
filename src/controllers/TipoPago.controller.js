import {GetConnection} from '../DataBase/contection/Conexion';
import sql from 'mssql'

// Método para obtener todos los tipos de pago
export const GetTiposPago = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerTiposPago');
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
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPObtenerTipoPagoPorId @Id');
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
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(80), Nombre).query('EXEC SPInsertarTipoPago @Nombre');
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
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).input('Nombre', sql.VarChar(80), Nombre).query('EXEC SPActualizarTipoPago @Id, @Nombre');
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
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPEliminarTipoPago @Id');
        res.status(200).json({ msg: 'Tipo de pago eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el tipo de pago: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el tipo de pago' });
    }
};
