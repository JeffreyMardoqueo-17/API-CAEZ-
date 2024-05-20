import jwt from 'jsonwebtoken';
import { executeQuery } from '../helpers/dbHelper';
import sql from '../DataBase/contection/Conexion';
import { encryptPassword } from '../helpers/crypto';
import { generateAndStoreToken } from '../helpers/GenerarToken';

const UserController = {
    async getUsers(req, res) {
        try {
            const result = await executeQuery('EXEC SPObtenerUsuarios');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los usuarios' });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const result = await executeQuery('EXEC SPObtenerUsuarioPorId @Id', [{ name: 'Id', type: sql.INT, value: id }]);
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

    async createUser(req, res) {
        const { Name, LastName, Login, Password, IdRole } = req.body;

        // Validaciones
        if (!Name || !LastName || !Login || !Password || !IdRole) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        const hashedPassword = await encryptPassword(Password);
        const Status = 1; // Estado activo por defecto
        const RegistrationDate = new Date(); // Fecha actual

        try {
            await executeQuery('EXEC SPInsertarUsuario @Name, @LastName, @Login, @Password, @Status, @RegistrationDate, @IdRole', [
                { name: 'Name', type: sql.NVarChar(30), value: Name },
                { name: 'LastName', type: sql.NVarChar(30), value: LastName },
                { name: 'Login', type: sql.NVarChar(100), value: Login },
                { name: 'Password', type: sql.NVarChar(100), value: hashedPassword },
                { name: 'Status', type: sql.TinyInt, value: Status },
                { name: 'RegistrationDate', type: sql.DateTime, value: RegistrationDate },
                { name: 'IdRole', type: sql.Int, value: IdRole }
            ]);
            res.status(201).json({ msg: 'Usuario creado exitosamente' });
        } catch (error) {
            console.error(`Error al crear el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { Name, LastName, Login, Status } = req.body;
        try {
            await executeQuery('EXEC SPActualizarUsuario @Id, @Name, @LastName, @Login, @Status', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Name', type: sql.NVarChar(30), value: Name },
                { name: 'LastName', type: sql.NVarChar(30), value: LastName },
                { name: 'Login', type: sql.NVarChar(100), value: Login },
                { name: 'Status', type: sql.TinyInt, value: Status }
            ]);
            res.status(200).json({ msg: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el usuario' });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await executeQuery('EXEC SPEliminarUsuario @Id', [{ name: 'Id', type: sql.Int, value: id }]);
            res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el usuario' });
        }
    },

    async loginUser(req, res) {
        const { Login, Password } = req.body;

        // Validaciones
        if (!Login || !Password) {
            return res.status(400).json({ msg: 'Login y Password son requeridos' });
        }

        try {
            const user = await executeQuery('EXEC SPIniciarSesion @Login, @Password', [
                { name: 'Login', type: sql.NVarChar(100), value: Login },
                { name: 'Password', type: sql.NVarChar(100), value: Password }
            ]);

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            // Generar y almacenar el token
            const token = generateAndStoreToken(user.id);

            // Enviar el token en la respuesta
            res.status(200).json({ msg: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
            res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
        }
    },

    async changePassword(req, res) {
        const { id } = req.params;
        const { NewPassword } = req.body;
        const hashedPassword = await encryptPassword(NewPassword);
        try {
            await executeQuery('EXEC SPCambiarContraseña @Id, @NewPassword', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'NewPassword', type: sql.NVarChar(100), value: hashedPassword }
            ]);
            res.status(200).json({ msg: 'Contraseña actualizada exitosamente' });
        } catch (error) {
            console.error(`Error al cambiar la contraseña: ${error}`);
            res.status(500).json({ msg: 'Error al cambiar la contraseña' });
        }
    }
};

export default UserController;

// {
//     "Name": "Mauricio",
//     "LastName": "Vasquez",
//     "Login": "mauricio@gmail.com",
//     "Password": "mauricio",
//     "IdRole": 1
// }
// {
//     "Login": "mauricio@gmail.com",
//     "Password": "mauricio"
// }