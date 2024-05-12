import sql from 'mssql';
import poolPromise from '../DataBase/contection/Conexion';

const EncargadoController = {
    async createEncargado(req, res) {
        try {
            const { Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador } = req.body;
            const pool = await poolPromise;
            await pool.request()
                .input('Nombre', sql.VarChar(50), Nombre)
                .input('Apellido', sql.VarChar(50), Apellido)
                .input('IdSexo', sql.Int, IdSexo)
                .input('IdRole', sql.Int, IdRole)
                .input('Telefono', sql.VarChar(50), Telefono)
                .input('TelEmergencia', sql.VarChar(10), TelEmergencia)
                .input('Correo', sql.VarChar(30), Correo)
                .input('IdDireccion', sql.Int, IdDireccion)
                .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
                .input('NumDocumento', sql.VarChar(50), NumDocumento)
                .input('IdAdministrador', sql.Int, IdAdministrador)
                .query('EXEC SPInsertarEncargado @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador');
            res.status(201).json({ msg: 'Encargado creado correctamente' });
        } catch (error) {
            console.error(`Error al crear el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al crear el encargado' });
        }
    },

    async getEncargadoById(req, res) {
        try {
            const { id } = req.params;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query('EXEC SPObtenerEncargadoPorId @Id');
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

    async updateEncargado(req, res) {
        try {
            const { id } = req.params;
            const { Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador } = req.body;
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.Int, id)
                .input('Nombre', sql.VarChar(50), Nombre)
                .input('Apellido', sql.VarChar(50), Apellido)
                .input('IdSexo', sql.Int, IdSexo)
                .input('IdRole', sql.Int, IdRole)
                .input('Telefono', sql.VarChar(50), Telefono)
                .input('TelEmergencia', sql.VarChar(10), TelEmergencia)
                .input('Correo', sql.VarChar(30), Correo)
                .input('IdDireccion', sql.Int, IdDireccion)
                .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
                .input('NumDocumento', sql.VarChar(50), NumDocumento)
                .input('IdAdministrador', sql.Int, IdAdministrador)
                .query('EXEC SPActualizarEncargado @Id, @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador');
            res.status(200).json({ msg: 'Encargado actualizado correctamente' });
        } catch (error) {
            console.error(`Error al actualizar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el encargado' });
        }
    },

    async deleteEncargado(req, res) {
        try {
            const { id } = req.params;
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.Int, id)
                .query('EXEC SPEliminarEncargado @Id');
            res.status(200).json({ msg: 'Encargado eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el encargado' });
        }
    },

    async getAllEncargados(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('EXEC SPTraerTodosEncargados');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener todos los encargados: ${error}`);
            res.status(500).json({ msg: 'Error al obtener todos los encargados' });
        }
    },

    async searchEncargadoByName(req, res) {
        try {
            const { textoBusqueda } = req.params;
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TextoBusqueda', sql.VarChar(50), textoBusqueda)
                .query('EXEC SPBuscarEncargadoPorNombre @TextoBusqueda');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar encargados por nombre: ${error}`);
            res.status(500).json({ msg: 'Error al buscar encargados por nombre' });
        }
    }
};

export default EncargadoController;
