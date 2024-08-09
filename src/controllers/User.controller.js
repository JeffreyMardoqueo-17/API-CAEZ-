import jwt from 'jsonwebtoken';
import { executeQuery } from '../helpers/dbHelper';
import sql from '../DataBase/contection/Conexion';
import { encryptPassword } from '../helpers/crypto';  // Asegúrate de tener verifyPassword en helpers/crypto
import { verifyPassword } from '../helpers/verifyPassword';

import { generateAndStoreToken } from '../helpers/GenerarToken';

const UserController = {
    /**
     * Obtiene todos los usuarios.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async getUsers(req, res) {
        try {
            const result = await executeQuery('EXEC SPUserGet');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los usuarios' });
        }
    },

    /**
     * Obtiene un usuario por su ID.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const result = await executeQuery('EXEC SPUserGetById @Id', [{ name: 'Id', type: sql.INT, value: id }]);
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

    /**
     * Crea un nuevo usuario.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async createUser(req, res) {
        const { Name, LastName, Login, Password, IdRole } = req.body;

        // Validaciones
        if (!Name || !LastName || !Login || !Password || !IdRole) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Encriptar la contraseña
        const hashedPassword = await encryptPassword(Password);
        const Status = 1; // Estado activo por defecto
        const RegistrationDate = new Date(); // Fecha actual

        try {
            const result = await executeQuery('EXEC SPUserCreate @Name, @LastName, @Login, @Password, @Status, @RegistrationDate, @IdRole', [
                { name: 'Name', type: sql.NVarChar(30), value: Name },
                { name: 'LastName', type: sql.NVarChar(30), value: LastName },
                { name: 'Login', type: sql.NVarChar(100), value: Login },
                { name: 'Password', type: sql.NVarChar(100), value: hashedPassword },
                { name: 'Status', type: sql.TinyInt, value: Status },
                { name: 'RegistrationDate', type: sql.DateTime, value: RegistrationDate },
                { name: 'IdRole', type: sql.Int, value: IdRole }
            ]);

            res.status(201).json({ msg: 'Usuario creado exitosamente', userId: result.recordset[0].Id });
        } catch (error) {
            console.error(`Error al crear el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
        }
    },

    /**
     * Actualiza un usuario existente.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async updateUser(req, res) {
        const { id } = req.params;
        const { Name, LastName, Login, Password, Status, IdRole } = req.body;

        // Validaciones
        if (!Name || !LastName || !Login || !Status || !IdRole) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Encriptar la contraseña si se proporciona
        const hashedPassword = Password ? await encryptPassword(Password) : null;

        try {
            const query = `
                EXEC SPUserUpdate @Id, @Name, @LastName, @Login, 
                                  ${hashedPassword ? '@Password,' : ''} @Status, @IdRole
            `;
            const params = [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Name', type: sql.NVarChar(30), value: Name },
                { name: 'LastName', type: sql.NVarChar(30), value: LastName },
                { name: 'Login', type: sql.NVarChar(100), value: Login },
                { name: 'Status', type: sql.TinyInt, value: Status },
                { name: 'IdRole', type: sql.Int, value: IdRole },
            ];

            if (hashedPassword) {
                params.push({ name: 'Password', type: sql.NVarChar(100), value: hashedPassword });
            }

            await executeQuery(query, params);

            res.status(200).json({ msg: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el usuario' });
        }
    },

    /**
     * Elimina un usuario.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await executeQuery('EXEC SPUserDelete @Id', [{ name: 'Id', type: sql.Int, value: id }]);
            res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el usuario: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el usuario' });
        }
    },

    /**
     * Inicia sesión de un usuario.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    async loginUser(req, res) {
        const { Login, Password } = req.body;

        // Validaciones
        if (!Login || !Password) {
            return res.status(400).json({ msg: 'Login y Password son requeridos' });
        }

        try {
            // Ejecutar el procedimiento almacenado para verificar el usuario
            const user = await executeQuery('EXEC SPUserGetByLogin @Login', [
                { name: 'Login', type: sql.NVarChar(100), value: Login }
            ]);

            if (user.recordset.length === 0) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            const userData = user.recordset[0];

            // Verificar si la contraseña es correcta
            const isPasswordCorrect = await verifyPassword(Password, userData.Password);
            if (!isPasswordCorrect) {
                console.log(isPasswordCorrect)
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }

            // Generar y devolver el token
            const token = generateAndStoreToken(userData.Id);

            // Enviar el token en la respuesta
            res.status(200).json({ msg: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
            res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
        }
    }
};

export default UserController;

// {
//     "Name": "Jeffrey",
//         "LastName": "Mardoqueo",
//             "Login": "jeffreymardoqueo260@gmil.com",
//                 "Password": "1234567890",
//                     "IdRole": 1
// }
// {
//     "Login": "jeffreymardoqueo260@gmil.com",
//         "Password": "1234567890"
// }
