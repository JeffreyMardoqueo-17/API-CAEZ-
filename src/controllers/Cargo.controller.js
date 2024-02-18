import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

export const GetCargos = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerCargos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los cargos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los cargos' });
    }
};

export const GetCargoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPObtenerCargoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Cargo no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el cargo: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el cargo' });
    }
};

export const PostCargo = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(80), nombre).query('EXEC SPInsertarCargo @Nombre');
        res.status(201).json({ msg: 'Cargo creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el cargo: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el cargo' });
    }
};

export const PutCargo = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).input('Nombre', sql.VarChar(80), nombre).query('EXEC SPActualizarCargo @Id, @Nombre');
        res.status(200).json({ msg: 'Cargo actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el cargo: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el cargo' });
    }
};

export const DeleteCargo = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPEliminarCargo @Id');
        res.status(200).json({ msg: 'Cargo eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el cargo: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el cargo' });
    }
};
