import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Método para obtener todos los grados === http://localhost:5000/Grados
export const GetGrados = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerGrados');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los grados: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los grados' });
    }
};

// Método para obtener un grado por su Id   == http://localhost:5000/Grados/6
export const GetGradoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPObtenerGradoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Grado no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el grado: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el grado' });
    }
};

// Método para insertar un nuevo grado
export const PostGrado = async (req, res) => {
    const { Nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(50), Nombre).query('EXEC SPInsertarGrado @Nombre');
        res.status(201).json({ msg: 'Grado creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el grado' });
    }
};


// Método para actualizar un grado existente http://localhost:5000/Grados/5  
/*
{
    "nombre": "Tercero"
}
 */
export const PutGrado = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).input('Nombre', sql.VarChar(50), nombre).query('EXEC SPActualizarGrado @Id, @Nombre');
        res.status(200).json({ msg: 'Grado actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el grado' });
    }
};

// Método para eliminar un grado por su Id
export const DeleteGrado = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPEliminarGrado @Id');
        res.status(200).json({ msg: 'Grado eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el grado' });
    }
};
