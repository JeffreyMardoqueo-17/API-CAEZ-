import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Método para obtener todos los pagos
export const GetPagos = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerPagos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los pagos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los pagos' });
    }
};

// Método para obtener un pago por su Id
export const GetPagoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.Int, id).query('EXEC SPObtenerPagoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el pago: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el pago' });
    }
};

// Método para insertar un nuevo pago
export const PostPago = async (req, res) => {
    const { idAlumno, idEncargado, montoPagar, multa, totalPagado, fechaRegistro, idAdministrador } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('IdAlumno', sql.Int, idAlumno)
            .input('IdEncargado', sql.BigInt, idEncargado)
            .input('MontoPagar', sql.Decimal(10, 2), montoPagar)
            .input('Multa', sql.Decimal(10, 2), multa)
            .input('TotalPagado', sql.Decimal(10, 2), totalPagado)
            .input('FechaRegistro', sql.Date, fechaRegistro)
            .input('IdAdministrador', sql.Int, idAdministrador)
            .query('EXEC SPInsertarPago @IdAlumno, @IdEncargado, @MontoPagar, @Multa, @TotalPagado, @FechaRegistro, @IdAdministrador');
        res.status(201).json({ msg: 'Pago creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el pago: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el pago' });
    }
};

// Método para actualizar un pago existente
export const PutPago = async (req, res) => {
    const { id } = req.params;
    const { idAlumno, idEncargado, montoPagar, multa, totalPagado, fechaRegistro, idAdministrador } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('Id', sql.Int, id)
            .input('IdAlumno', sql.Int, idAlumno)
            .input('IdEncargado', sql.Int, idEncargado)
            .input('MontoPagar', sql.Decimal(10, 2), montoPagar)
            .input('Multa', sql.Decimal(10, 2), multa)
            .input('TotalPagado', sql.Decimal(10, 2), totalPagado)
            .input('FechaRegistro', sql.Date, fechaRegistro)
            .input('IdAdministrador', sql.Int, idAdministrador)
            .query('EXEC SPActualizarPago @Id, @IdAlumno, @IdEncargado, @MontoPagar, @Multa, @TotalPagado, @FechaRegistro, @IdAdministrador');
        res.status(200).json({ msg: 'Pago actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el pago: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el pago' });
    }
};

// Método para eliminar un pago por su Id
export const DeletePago = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.Int, id).query('EXEC SPEliminarPago @Id');
        res.status(200).json({ msg: 'Pago eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el pago: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el pago' });
    }
};
