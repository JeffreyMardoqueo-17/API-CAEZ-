import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

/**
 * Controlador para gestionar operaciones relacionadas con la tabla `Encargado`.
 */
const EncargadoController = {
    /**
     * Obtiene todos los encargados.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     */
    async getEncargados(req, res) {
        try {
            // Ejecuta el procedimiento almacenado para obtener todos los encargados.
            const result = await executeQuery('EXEC SPGetAllEncargados');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los encargados: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los encargados' });
        }
    },

    /**
     * Obtiene un encargado específico por su ID.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del encargado a obtener.
     */
    async getEncargadoById(req, res) {
        const { id } = req.params;
        try {
            // Ejecuta el procedimiento almacenado para obtener un encargado por su ID.
            const result = await executeQuery('EXEC SPGetEncargadoById @Id', [
                { name: 'Id', type: sql.Int, value: id }
            ]);
            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset[0]);
            } else {
                res.status(404).json({ msg: 'Encargado no encontrado' });
            }
        } catch (error) {
            console.error(`Error al obtener el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al obtener el encargado' });
        }
    },

    /**
     * Crea un nuevo encargado en la base de datos.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {string} req.body.Nombre - El nombre del encargado.
     * @param {string} req.body.Apellido - El apellido del encargado.
     * @param {number} req.body.IdSexo - El ID del sexo del encargado.
     * @param {number} req.body.IdRole - El ID del rol del encargado.
     * @param {string} req.body.Telefono - El teléfono del encargado.
     * @param {string} req.body.Correo - El correo electrónico del encargado.
     * @param {number} req.body.IdDireccion - El ID de la dirección del encargado.
     * @param {number} req.body.IdAdministrador - El ID del administrador que crea el encargado.
     */
    async createEncargado(req, res) {
        const {
            Nombre,
            Apellido,
            IdSexo,
            IdRole,
            Telefono,
            TelEmergencia,
            Correo,
            IdDireccion,
            IdTipoDocumento,
            NumDocumento,
            IdAdministrador
        } = req.body;

        try {
            // Ejecuta el procedimiento almacenado para crear un nuevo encargado.
            await executeQuery('EXEC SPCreateEncargado @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador, @FechaRegistro', [
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'TelEmergencia', type: sql.VarChar(10), value: TelEmergencia }, // Nuevo parámetro
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento }, // Nuevo parámetro
                { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento }, // Nuevo parámetro
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
                { name: 'FechaRegistro', type: sql.DateTime, value: new Date() },
            ]);

            res.status(201).json({ msg: 'Encargado creado exitosamente' });
        } catch (error) {
            console.error(`Error al crear el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al crear el encargado' });
        }
    },

    /**
     * Actualiza la información de un encargado existente.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del encargado a actualizar.
     * @param {string} req.body.Nombre - El nuevo nombre del encargado.
     * @param {string} req.body.Apellido - El nuevo apellido del encargado.
     * @param {number} req.body.IdSexo - El nuevo ID del sexo del encargado.
     * @param {number} req.body.IdRole - El nuevo ID del rol del encargado.
     * @param {string} req.body.Telefono - El nuevo teléfono del encargado.
     * @param {string} req.body.Correo - El nuevo correo electrónico del encargado.
     * @param {number} req.body.IdDireccion - El nuevo ID de la dirección del encargado.
     * @param {number} req.body.IdAdministrador - El nuevo ID del administrador del encargado.
     */
    async updateEncargado(req, res) {
        const { id } = req.params;
        const {
            Nombre,
            Apellido,
            IdSexo,
            IdRole,
            Telefono,
            TelEmergencia,  // Asegúrate de que este campo está presente en el `req.body`
            Correo,
            IdDireccion,
            IdTipoDocumento,  // Asegúrate de que este campo está presente en el `req.body`
            NumDocumento,  // Asegúrate de que este campo está presente en el `req.body`
            IdAdministrador
        } = req.body;

        try {
            // Ejecuta el procedimiento almacenado para actualizar un encargado existente.
            await executeQuery('EXEC SPUpdateEncargado @Id, @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador, @FechaRegistro', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'TelEmergencia', type: sql.VarChar(10), value: TelEmergencia }, // Nuevo parámetro
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento }, // Nuevo parámetro
                { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento }, // Nuevo parámetro
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
                { name: 'FechaRegistro', type: sql.DateTime, value: new Date() },
            ]);

            res.status(200).json({ msg: 'Encargado actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el encargado' });
        }
    },


    /**
     * Elimina un encargado por su ID.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del encargado a eliminar.
     */
    async deleteEncargado(req, res) {
        const { id } = req.params;
        try {
            // Ejecuta el procedimiento almacenado para eliminar un encargado.
            await executeQuery('EXEC SPDeleteEncargado @Id', [
                { name: 'Id', type: sql.Int, value: id }
            ]);
            res.status(200).json({ msg: 'Encargado eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el encargado' });
        }
    },

    /**
     * Busca encargados por nombre.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {string} req.body.TextoBusqueda - El texto para buscar encargados por nombre.
     */
    async searchEncargados(req, res) {
        const { TextoBusqueda } = req.body;
        try {
            // Ejecuta el procedimiento almacenado para buscar encargados por nombre.
            const result = await executeQuery('EXEC SPSearchEncargado @TextoBusqueda', [
                { name: 'TextoBusqueda', type: sql.VarChar(50), value: TextoBusqueda }
            ]);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar los encargados: ${error}`);
            res.status(500).json({ msg: 'Error al buscar los encargados' });
        }
    }
};

export default EncargadoController;
