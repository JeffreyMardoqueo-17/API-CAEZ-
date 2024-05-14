const sql = require('mssql');
import { poolPromise } from '../DataBase/contection/Conexion';
// Método para crear un nuevo pago
async function crearPago(req, res) {
    const { IdAlumno, Multa, IdTipoPago, Descuento, TotalPagado, FechaRegistro, IdAdministrador, Descripcion, MesesPagados } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('IdAlumno', sql.Int, IdAlumno)
            .input('Multa', sql.Decimal(10, 2), Multa)
            .input('IdTipoPago', sql.Int, IdTipoPago)
            .input('Descuento', sql.Decimal(5, 2), Descuento)
            .input('TotalPagado', sql.Decimal(10, 2), TotalPagado)
            .input('FechaRegistro', sql.DateTime, FechaRegistro)
            .input('IdAdministrador', sql.Int, IdAdministrador)
            .input('Descripcion', sql.VarChar(sql.MAX), Descripcion)
            .input('MesesPagados', sql.VarChar(sql.MAX), MesesPagados)
            .query('EXEC SPCrearPago @IdAlumno, @Multa, @IdTipoPago, @Descuento, @TotalPagado, @FechaRegistro, @IdAdministrador, @Descripcion, @MesesPagados');

        res.status(201).json({ msg: 'Pago creado correctamente' });
    } catch (error) {
        console.error(`Error al crear el pago: ${error}`);
        res.status(500).json({ msg: 'Error al crear el pago' });
    }
}

// Método para obtener todos los pagos
async function obtenerTodosLosPagos(req, res) {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('EXEC SPTraerTodosLosPagos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los pagos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los pagos' });
    }
}

// Método para obtener un pago por ID
async function obtenerPagoPorID(req, res) {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .query('EXEC SPTraerPagoPorID @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el pago: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el pago' });
    }
}

// Método para actualizar un pago
async function actualizarPago(req, res) {
    const { id } = req.params;
    const { IdAlumno, Multa, IdTipoPago, Descuento, TotalPagado, FechaRegistro, IdAdministrador, Descripcion, MesesPagados } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Id', sql.Int, id)
            .input('IdAlumno', sql.Int, IdAlumno)
            .input('Multa', sql.Decimal(10, 2), Multa)
            .input('IdTipoPago', sql.Int, IdTipoPago)
            .input('Descuento', sql.Decimal(5, 2), Descuento)
            .input('TotalPagado', sql.Decimal(10, 2), TotalPagado)
            .input('FechaRegistro', sql.DateTime, FechaRegistro)
            .input('IdAdministrador', sql.Int, IdAdministrador)
            .input('Descripcion', sql.VarChar(sql.MAX), Descripcion)
            .input('MesesPagados', sql.VarChar(sql.MAX), MesesPagados)
            .query('EXEC SPActualizarPago @Id, @IdAlumno, @Multa, @IdTipoPago, @Descuento, @TotalPagado, @FechaRegistro, @IdAdministrador, @Descripcion, @MesesPagados');

        res.status(200).json({ msg: 'Pago actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el pago: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el pago' });
    }
}

// Método para eliminar un pago
async function eliminarPago(req, res) {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Id', sql.Int, id)
            .query('EXEC SPEliminarPago @Id');

        res.status(200).json({ msg: 'Pago eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el pago: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el pago' });
    }
}

module.exports = {
    crearPago,
    obtenerTodosLosPagos,
    obtenerPagoPorID,
    actualizarPago,
    eliminarPago
};
