import { GetConnection } from '../DataBase/conection/Conexion';
import sql from 'mssql';

// Método para obtener todos los roles
export const GetRoles = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerRoles');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los roles: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los roles' });
    }
};

// Método para obtener un rol por su Id
export const GetRolPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPObtenerRolPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Rol no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el rol: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el rol' });
    }
};

// Método para insertar un nuevo rol
export const PostRol = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        const pool = await GetConnection();
        await pool.request().input('Name', sql.VarChar(30), name).query('EXEC SPInsertarRol @Name');
        res.status(201).json({ msg: 'Rol creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el rol: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el rol' });
    }
};

// Método para actualizar un rol existente
export const PutRol = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).input('Name', sql.VarChar(30), name).query('EXEC SPActualizarRol @Id, @Name');
        res.status(200).json({ msg: 'Rol actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el rol: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el rol' });
    }
};

// Método para eliminar un rol por su Id
export const DeleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.INT, id).query('EXEC SPEliminarRol @Id');
        res.status(200).json({ msg: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el rol: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el rol' });
    }
};
