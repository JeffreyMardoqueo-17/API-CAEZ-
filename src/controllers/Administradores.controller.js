import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Controlador de administración para los stored procedures del administrador

// Método para obtener todos los administradores
export const GetAdministradores = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerAdministradores');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los administradores: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los administradores' });
    }
};
// Método para obtener un administrador por su Id
export const GetAdministradorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.BigInt, id).query('EXEC SPObtenerAdministradorPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Administrador no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el administrador' });
    }
}; 
// Método para insertar un nuevo administrador
export const PostAdministrador = async (req, res) => {
    const { nombre, apellido, idCargo, telefono, pass } = req.body;
    // if (!nombre || !apellido || !idCargo || !telefono || !pass) {
    //     return res.status(400).json({ msg: 'Todos los campos son requeridos' });
    // }
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdCargo', sql.TinyInt, idCargo)
            .input('Telefono', sql.VarChar(50), telefono)
            .input('Pass', sql.VarChar(200), pass)
            .query('EXEC SPInsertarAdministrador @Nombre, @Apellido, @IdCargo, @Telefono, @Pass');
        res.status(201).json({ msg: 'Administrador creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el administrador' });
    }
};

// Método para actualizar un administrador existente
export const PutAdministrador = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, idCargo, telefono, pass } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('Id', sql.BigInt, id)
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdCargo', sql.TinyInt, idCargo)
            .input('Telefono', sql.VarChar(50), telefono)
            .input('Pass', sql.VarChar(200), pass)
            .query('EXEC SPActualizarAdministrador @Id, @Nombre, @Apellido, @IdCargo, @Telefono, @Pass');
        res.status(200).json({ msg: 'Administrador actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el administrador' });
    }
};

// Método para eliminar un administrador por su Id
export const DeleteAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.BigInt, id).query('EXEC SPEliminarAdministrador @Id');
        res.status(200).json({ msg: 'Administrador eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el administrador' });
    }
};

// Método para autenticación de administrador
export const LoginAdministrador = async (req, res) => {
    const { nombre, pass } = req.body;
    try {
        const pool = await GetConnection();
        const result = await pool.request()
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Pass', sql.VarChar(200), pass)
            .query('EXEC SPLoginAdministrador @Nombre, @Pass');
        if (result.recordset.length > 0 && result.recordset[0].Id) {
            res.status(200).json({ msg: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ msg: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(`Error al autenticar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al autenticar el administrador' });
    }
};
