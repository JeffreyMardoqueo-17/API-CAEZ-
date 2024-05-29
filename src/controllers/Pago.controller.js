import { executeQuery,executeRawQuery} from '../helpers/dbHelper';
import sql from 'mssql';

export async function createPago(req, res) {
    const { IdAlumno, Multa, IdTipoPago, Descuento, TotalPagado, IdAdministrador, Descripcion, MesesPagados } = req.body;
    try {
        const FechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `EXEC SPCrearPago @IdAlumno=${IdAlumno}, @Multa=${Multa}, @IdTipoPago=${IdTipoPago}, @Descuento=${Descuento}, @TotalPagado=${TotalPagado}, @FechaRegistro='${FechaRegistro}', @IdAdministrador=${IdAdministrador}, @Descripcion='${Descripcion}', @MesesPagados='${MesesPagados}'`;
        const result = await executeRawQuery(query);
        if (result.recordset && result.recordset.length > 0) {
            res.status(201).json({ msg: 'Pago creado exitosamente', IdPago: result.recordset[0].IdPago });
        } else {
            throw new Error('No se pudo crear el pago');
        }
    } catch (error) {
        console.error(`Error al crear el pago: ${error}`);
        res.status(500).json({ msg: 'Error al crear el pago' });
    }
}