// Importa la función para generar tokens JWT
const { generateToken } = require('../helpers/JWT');
import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';
// Controlador para manejar la obtención de todos los administradores
export const GetAdministradores = async (req, res) => {
    try {
        const pool = await GetConnection(); // Establece la conexión a la base de datos
        const result = await pool.request().query('EXEC SPObtenerAdministradores'); // Ejecuta el SP para obtener todos los administradores
        res.status(200).json(result.recordset); // Devuelve los administradores en formato JSON
    } catch (error) {
        console.error(`Error al obtener los administradores: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los administradores' });
    }
};

// Controlador para obtener un administrador por su Id
export const GetAdministradorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection(); // Establece la conexión a la base de datos
        const result = await pool.request().input('Id', sql.Int, id).query('EXEC SPObtenerAdministradorPorId @Id'); // Ejecuta el SP para obtener un administrador por su Id
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]); // Devuelve el administrador encontrado en formato JSON
        } else {
            res.status(404).json({ msg: 'Administrador no encontrado' }); // Si no se encontró el administrador, devuelve un mensaje de error
        }
    } catch (error) {
        console.error(`Error al obtener el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el administrador' });
    }
};

// Controlador para insertar un nuevo administrador
export const PostAdministrador = async (req, res) => {
    const { nombre, apellido, idCargo, telefono, pass } = req.body;
    try {
        const pool = await GetConnection(); // Establece la conexión a la base de datos
        await pool.request()
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdCargo', sql.TinyInt, idCargo)
            .input('Telefono', sql.VarChar(50), telefono)
            .input('Pass', sql.VarChar(200), pass)
            .query('EXEC SPInsertarAdministrador @Nombre, @Apellido, @IdCargo, @Telefono, @Pass'); // Ejecuta el SP para insertar un nuevo administrador
        res.status(201).json({ msg: 'Administrador creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el administrador' });
    }
};

// Controlador para actualizar un administrador
export const PutAdministrador = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, idCargo, telefono, pass } = req.body;
    try {
        const pool = await GetConnection(); // Establece la conexión a la base de datos
        await pool.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdCargo', sql.TinyInt, idCargo)
            .input('Telefono', sql.VarChar(50), telefono)
            .input('Pass', sql.VarChar(200), pass)
            .query('EXEC SPActualizarAdministrador @Id, @Nombre, @Apellido, @IdCargo, @Telefono, @Pass'); // Ejecuta el SP para actualizar un administrador
        res.status(200).json({ msg: 'Administrador actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el administrador' });
    }
};

// Controlador para eliminar un administrador por su Id
export const DeleteAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection(); // Establece la conexión a la base de datos
        await pool.request().input('Id', sql.int, id).query('EXEC SPEliminarAdministrador @Id'); // Ejecuta el SP para eliminar un administrador por su Id
        res.status(200).json({ msg: 'Administrador eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el administrador: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el administrador' });
    }
};

// Controlador para autenticación de administrador
export const LoginAdministrador = async (req, res) => {
    const { nombre, pass } = req.body;

    try {
        const pool = await GetConnection(); 
        const result = await pool.request()
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Pass', sql.VarChar(200), pass)
            .execute('SPLoginAdministrador'); // SP 

        const adminId = result.recordset[0].Id; // Obtiene el Id del administrador del resultado

        if (adminId) {
            const token = generateToken({ adminId }); // Genera un token JWT con el Id del administrador
            res.status(200).json({ token }); // Devuelve el token como respuesta obvioooo
        } else {
            res.status(401).json({ msg: 'Credenciales incorrectas' }); // Si las credenciale son incorrectas se chinga todo
        }
    } catch (error) {
        console.error(`Error al iniciar sesión: ${error}`);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
};
