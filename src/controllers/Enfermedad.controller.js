import { GetConnection } from '../DataBase/conection/Conexion';
import sql from 'mssql';

// Método para obtener todas las enfermedades
export const GetEnfermedades = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerEnfermedades');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener las enfermedades: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las enfermedades' });
    }
};

// Método para obtener una enfermedad por su Id
export const GetEnfermedadPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPObtenerEnfermedadPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Enfermedad no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la enfermedad' });
    }
};

// Método para insertar una nueva enfermedad
export const PostEnfermedad = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ msg: 'Los campos nombre y descripción son requeridos' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(50), nombre).input('Descripcion', sql.VarChar(sql.MAX), descripcion).query('EXEC SPInsertarEnfermedad @Nombre, @Descripcion');
        res.status(201).json({ msg: 'Enfermedad creada correctamente' });
    } catch (error) {
        console.error(`Error al insertar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la enfermedad' });
    }
};

// Método para actualizar una enfermedad existente
export const PutEnfermedad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).input('Nombre', sql.VarChar(50), nombre).input('Descripcion', sql.VarChar(sql.MAX), descripcion).query('EXEC SPActualizarEnfermedad @Id, @Nombre, @Descripcion');
        res.status(200).json({ msg: 'Enfermedad actualizada correctamente' });
    } catch (error) {
        console.error(`Error al actualizar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la enfermedad' });
    }
};

// Método para eliminar una enfermedad por su Id
export const DeleteEnfermedad = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).query('EXEC SPEliminarEnfermedad @Id');
        res.status(200).json({ msg: 'Enfermedad eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la enfermedad' });
    }
};

// Método para buscar enfermedades por texto en el nombre o descripción
export const BuscarEnfermedadesPorTexto = async (req, res) => {
    const { textoBusqueda } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('TextoBusqueda', sql.VarChar(sql.MAX), textoBusqueda).query('EXEC SPBuscarEnfermedadesPorTexto @TextoBusqueda');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar enfermedades por texto: ${error}`);
        res.status(500).json({ msg: 'Error al buscar enfermedades por texto' });
    }
};
