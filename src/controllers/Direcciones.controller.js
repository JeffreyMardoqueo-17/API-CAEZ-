import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Método para obtener todas las direcciones
export const GetDirecciones = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerDirecciones');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener las direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las direcciones' });
    }
};

// Método para obtener una dirección por su Id
export const GetDireccionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPObtenerDireccionPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Dirección no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la dirección' });
    }
};

// Método para insertar una nueva dirección
export const PostDireccion = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(200), nombre).query('EXEC SPInsertarDireccion @Nombre');
        res.status(201).json({ msg: 'Dirección creada correctamente' });
    } catch (error) {
        console.error(`Error al insertar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la dirección' });
    }
};

// Método para actualizar una dirección existente
export const PutDireccion = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).input('Nombre', sql.VarChar(200), nombre).query('EXEC SPActualizarDireccion @Id, @Nombre');
        res.status(200).json({ msg: 'Dirección actualizada correctamente' });
    } catch (error) {
        console.error(`Error al actualizar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la dirección' });
    }
};

// Método para eliminar una dirección por su Id
export const DeleteDireccion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).query('EXEC SPEliminarDireccion @Id');
        res.status(200).json({ msg: 'Dirección eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la dirección' });
    }
};

// Método para buscar direcciones por un texto de búsqueda
export const BuscarDireccionesPorTexto = async (req, res) => {
    const { textoBusqueda } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('TextoBusqueda', sql.VarChar(200), textoBusqueda).query('EXEC SPBuscarDireccionesPorTexto @TextoBusqueda');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al buscar direcciones' });
    }
};