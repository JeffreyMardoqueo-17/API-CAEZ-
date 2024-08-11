import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

/**
 * Controlador para gestionar operaciones relacionadas con la tabla `Padrino`.
 */
const PadrinoController = {
    /**
     * Obtiene todos los padrinos con información detallada de llaves foráneas.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     */
    async getPadrinos(req, res) {
        try {
            // Ejecuta el procedimiento almacenado para obtener todos los padrinos.
            const result = await executeQuery('EXEC SPGetAllPadrinos');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los padrinos: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los padrinos' });
        }
    },

    /**
     * Obtiene un padrino específico por su ID con información detallada de llaves foráneas.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del padrino a obtener.
     */
    async getPadrinoById(req, res) {
        const { id } = req.params;
        try {
            // Ejecuta el procedimiento almacenado para obtener un padrino por su ID.
            const result = await executeQuery('EXEC SPGetPadrinoById @Id', [
                { name: 'Id', type: sql.Int, value: id }
            ]);
            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset[0]);
            } else {
                res.status(404).json({ msg: 'Padrino no encontrado' });
            }
        } catch (error) {
            console.error(`Error al obtener el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al obtener el padrino' });
        }
    },

    /**
     * Crea un nuevo padrino en la base de datos.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {string} req.body.Nombre - El nombre del padrino.
     * @param {string} req.body.Apellido - El apellido del padrino.
     * @param {number} req.body.IdSexo - El ID del sexo del padrino.
     * @param {number} req.body.IdRole - El ID del rol del padrino.
     * @param {string} req.body.Telefono - El teléfono del padrino.
     * @param {string} req.body.Correo - El correo electrónico del padrino.
     * @param {number} req.body.IdDireccion - El ID de la dirección del padrino.
     * @param {number} req.body.IdAdministrador - El ID del administrador que crea el padrino.
     */
    async createPadrino(req, res) {
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador } = req.body;
        try {
            // Ejecuta el procedimiento almacenado para crear un nuevo padrino.
            await executeQuery('EXEC SPCreatePadrino @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro', [
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
                { name: 'FechaRegistro', type: sql.DateTime, value: new Date() },
            ]);
            res.status(201).json({ msg: 'Padrino creado exitosamente' });
        } catch (error) {
            console.error(`Error al crear el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al crear el padrino' });
        }
    },

    /**
     * Actualiza la información de un padrino existente.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del padrino a actualizar.
     * @param {string} req.body.Nombre - El nuevo nombre del padrino.
     * @param {string} req.body.Apellido - El nuevo apellido del padrino.
     * @param {number} req.body.IdSexo - El nuevo ID del sexo del padrino.
     * @param {number} req.body.IdRole - El nuevo ID del rol del padrino.
     * @param {string} req.body.Telefono - El nuevo teléfono del padrino.
     * @param {string} req.body.Correo - El nuevo correo electrónico del padrino.
     * @param {number} req.body.IdDireccion - El nuevo ID de la dirección del padrino.
     * @param {number} req.body.IdAdministrador - El nuevo ID del administrador del padrino.
     */
    async updatePadrino(req, res) {
        const { id } = req.params;
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador } = req.body;
        try {
            // Ejecuta el procedimiento almacenado para actualizar un padrino existente.
            await executeQuery('EXEC SPUpdatePadrino @Id, @No mbre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
                { name: 'FechaRegistro', type: sql.DateTime, value: new Date() },
            ]);
            res.status(200).json({ msg: 'Padrino actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el padrino' });
        }
    },

    /**
     * Elimina un padrino por su ID.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {number} req.params.id - El ID del padrino a eliminar.
     */
    async deletePadrino(req, res) {
        const { id } = req.params;
        try {
            // Ejecuta el procedimiento almacenado para eliminar un padrino.
            await executeQuery('EXEC SPDeletePadrino @Id', [
                { name: 'Id', type: sql.Int, value: id }
            ]);
            res.status(200).json({ msg: 'Padrino eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el padrino' });
        }
    },

    /**
     * Busca padrinos por nombre.
     * 
     * @param {object} req - La solicitud HTTP.
     * @param {object} res - La respuesta HTTP.
     * @param {string} req.body.TextoBusqueda - El texto para buscar padrinos por nombre.
     */
    async searchPadrinos(req, res) {
        const { TextoBusqueda } = req.body;
        try {
            // Ejecuta el procedimiento almacenado para buscar padrinos por nombre.
            const result = await executeQuery('EXEC SPBuscarPadrinosPorNombre @NombreBusqueda', [
                { name: 'NombreBusqueda', type: sql.VarChar(50), value: TextoBusqueda }
            ]);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar padrinos: ${error}`);
            res.status(500).json({ msg: 'Error al buscar padrinos' });
        }
    },
};

export default PadrinoController;
