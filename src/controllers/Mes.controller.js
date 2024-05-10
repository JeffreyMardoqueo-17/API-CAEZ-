import { GetConnection } from '../DataBase/contection/Conexion'
import sql from 'mssql';


// Método para obtener un mes por su nombre
export const GetMesPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Nombre', sql.VarChar(50), nombre).query('EXEC SPObtenerMesPorNombre @Nombre');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Mes no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el mes: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el mes' });
    }
};

//para obtener todos los meses
export const GetMeses = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerMeses');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los meses: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los meses' });
    }
};