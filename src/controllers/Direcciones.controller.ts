import { Request, Response } from 'express';
import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';
import { Direccion } from '../models/TablasIndependientes' //interfaz

// Método para obtener todas las direcciones
export const GetDirecciones = async (req: Request, res: Response) => {
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        const result = await pool.request().query('EXEC SPObtenerDirecciones');
        const direcciones: Direccion[] = result.recordset; // Usando la interfaz Direccion
        res.status(200).json(direcciones);
    } catch (error) {
        console.error(`Error al obtener las direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las direcciones' });
    }
};

// Método para obtener una dirección por su Id
export const GetDireccionPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        const result = await pool.request().input('Id', sql.Int, id).query('EXEC SPObtenerDireccionPorId @Id');
        if (result.recordset.length > 0) {
            const direccion: Direccion = result.recordset[0]; // Usando la interfaz Direccion
            res.status(200).json(direccion);
        } else {
            res.status(404).json({ msg: 'Dirección no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la dirección' });
    }
};

// Método para insertar una nueva dirección
export const PostDireccion = async (req: Request, res: Response) => {
    const direccion: Direccion = req.body; // Usando la interfaz Direccion
    if (!direccion.nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        await pool.request().input('Nombre', sql.VarChar(200), direccion.nombre).query('EXEC SPInsertarDireccion @Nombre');
        res.status(201).json({ msg: 'Dirección creada correctamente' });
    } catch (error) {
        console.error(`Error al insertar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la dirección' });
    }
};

// Método para actualizar una dirección existente
export const PutDireccion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const direccion: Direccion = req.body; // Usando la interfaz Direccion
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        await pool.request().input('Id', sql.Int, id).input('Nombre', sql.VarChar(200), direccion.nombre).query('EXEC SPActualizarDireccion @Id, @Nombre');
        res.status(200).json({ msg: 'Dirección actualizada correctamente' });
    } catch (error) {
        console.error(`Error al actualizar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la dirección' });
    }
};

// Método para eliminar una dirección por su Id
export const DeleteDireccion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        await pool.request().input('Id', sql.Int, id).query('EXEC SPEliminarDireccion @Id');
        res.status(200).json({ msg: 'Dirección eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la dirección' });
    }
};
// Método para buscar direcciones por texto
export const BuscarDireccionesPorTexto = async (req: Request, res: Response) => {
    const { textoBusqueda } = req.params;
    try {
        const pool = await GetConnection();
        if (!pool) {
            throw new Error('No se pudo obtener la conexión a la base de datos');
        }
        const result = await pool.request()
            .input('TextoBusqueda', sql.VarChar(200), textoBusqueda)
            .query('EXEC SPBuscarDireccionesPorTexto @TextoBusqueda');
        const direcciones: Direccion[] = result.recordset; // Usando la interfaz Direccion
        res.status(200).json(direcciones);
    } catch (error) {
        console.error(`Error al buscar las direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al buscar las direcciones' });
    }
};