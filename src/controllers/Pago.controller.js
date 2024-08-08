import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

export async function createPago(req, res) {
    const { IdAlumno, Multa, IdTipoPago, Descuento, Precio, IdAdministrador, Descripcion, MesesPagados } = req.body;

    try {
        const FechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const parameters = [
            { name: 'IdAlumno', type: sql.Int, value: IdAlumno },
            { name: 'Multa', type: sql.Decimal(10, 2), value: Multa },
            { name: 'IdTipoPago', type: sql.Int, value: IdTipoPago },
            { name: 'Descuento', type: sql.Decimal(5, 2), value: Descuento },
            { name: 'Precio', type: sql.Decimal(10, 2), value: Precio },
            { name: 'FechaRegistro', type: sql.DateTime, value: new Date(FechaRegistro) },
            { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            { name: 'Descripcion', type: sql.NVarChar(sql.MAX), value: Descripcion },
            { name: 'MesesPagados', type: sql.NVarChar(sql.MAX), value: MesesPagados }
        ];

        const query = `EXEC SPCrearPago @IdAlumno=@IdAlumno, @Multa=@Multa, @IdTipoPago=@IdTipoPago, @Descuento=@Descuento, @Precio=@Precio, @FechaRegistro=@FechaRegistro, @IdAdministrador=@IdAdministrador, @Descripcion=@Descripcion, @MesesPagados=@MesesPagados`;

        const result = await executeQuery(query, parameters);

        if (result.recordset && result.recordset.length > 0)
            res.status(201).json({ msg: 'Pago creado exitosamente', IdPago: result.recordset[0].IdPago, TotalPagado: result.recordset[0].TotalPagado });
        else
            throw new Error('No se pudo crear el pago');

    } catch (error) {
        console.error(`Error al crear el pago: ${error}`);
        res.status(500).json({ msg: 'Error al crear el pago' });
    }
}