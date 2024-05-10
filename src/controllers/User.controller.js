import sql from 'mssql';
import { poolPromise } from '../database';

const UserController = {
    async getUsers(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('EXEC SPObtenerUsuarios');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los usuarios' });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPObtenerUsuarioPorId @Id');
            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset[0]);
            } else {
                res.status(404).json({ msg: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(`Error al obtener el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al obtener el usuario' });
        }
    },

    // Implementa aquí los métodos restantes

    async login(req, res) {
        const { Login, Password } = req.body;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Login', sql.NVarChar(100), Login)
                .input('Password', sql.NVarChar(100), Password)
                .query('EXEC SPIniciarSesion @Login, @Password');
            if (result.recordset.length > 0) {
                res.status(200).json({ msg: 'Inicio de sesión exitoso', user: result.recordset[0] });
            } else {
                res.status(401).json({ msg: 'Credenciales inválidas' });
            }
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
            res.status(500).json({ msg: 'Error al iniciar sesión' });
        }
    },

    async changePassword(req, res) {
        const { id } = req.params;
        const { NewPassword } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.INT, id)
                .input('NewPassword', sql.NVarChar(100), NewPassword)
                .query('EXEC SPCambiarContraseña @Id, @NewPassword');
            res.status(200).json({ msg: 'Contraseña cambiada correctamente' });
        } catch (error) {
            console.error(`Error al cambiar la contraseña: ${error}`);
            res.status(500).json({ msg: 'Error al cambiar la contraseña' });
        }
    },
    async createUser(req, res) {
        const { Name, LastName, Login, Password, Status } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Name', sql.NVarChar(30), Name)
                .input('LastName', sql.NVarChar(30), LastName)
                .input('Login', sql.NVarChar(100), Login)
                .input('Password', sql.NVarChar(100), Password)
                .input('Status', sql.TINYINT, Status)
                .query('EXEC SPInsertarUsuario @Name, @LastName, @Login, @Password, @Status');
            res.status(201).json({ msg: 'Usuario creado correctamente' });
        } catch (error) {
            console.error(`Error al crear el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al crear el usuario' });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { Name, LastName, Login, Password, Status } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.INT, id)
                .input('Name', sql.NVarChar(30), Name)
                .input('LastName', sql.NVarChar(30), LastName)
                .input('Login', sql.NVarChar(100), Login)
                .input('Password', sql.NVarChar(100), Password)
                .input('Status', sql.TINYINT, Status)
                .query('EXEC SPActualizarUsuario @Id, @Name, @LastName, @Login, @Password, @Status');
            res.status(200).json({ msg: 'Usuario actualizado correctamente' });
        } catch (error) {
            console.error(`Error al actualizar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el usuario' });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.INT, id)
                .query('EXEC SPEliminarUsuario @Id');
            res.status(200).json({ msg: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el usuario' });
        }
    }

};

export default UserController;