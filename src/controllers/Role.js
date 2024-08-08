import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

// Método para obtener todos los roles
export const GetRoles = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerRoles');
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
        const result = await executeQuery('EXEC SPObtenerRolPorId @Id', [{ name: 'Id', type: sql.INT, value: id }]);
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
    const { Nombre } = req.body;
    if (!Nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        await executeQuery('EXEC SPInsertarRol @Name', [{ name: 'Name', type: sql.VarChar(30), value: Nombre }]);
        res.status(201).json({ msg: 'Rol creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el rol: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el rol' });
    }
};

// Método para actualizar un rol existente
export const PutRol = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarRol @Id, @Name', [{ name: 'Id', type: sql.INT, value: id }, { name: 'Name', type: sql.VarChar(30), value: Nombre }]);
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
        await executeQuery('EXEC SPEliminarRol @Id', [{ name: 'Id', type: sql.INT, value: id }]);
        res.status(200).json({ msg: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el rol: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el rol' });
    }
};