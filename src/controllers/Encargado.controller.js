import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

const EncargadoController = {
    async getEncargados(req, res) {
        try {
            const result = await executeQuery('EXEC SPTraerTodosEncargados');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los encargados: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los encargados' });
        }
    },

    async getEncargadoById(req, res) {
        const { id } = req.params;
        try {
            const result = await executeQuery('EXEC SPObtenerEncargadoPorId @Id', [{ name: 'Id', type: sql.Int, value: id }]);
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

    async createEncargado(req, res) {
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador } = req.body;
        try {
            await executeQuery('EXEC SPInsertarEncargado @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador', [
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'TelEmergencia', type: sql.VarChar(10), value: TelEmergencia },
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento },
                { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            ]);
            res.status(201).json({ msg: 'Encargado creado exitosamente' });
        } catch (error) {
            console.error(`Error al crear el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al crear el encargado' });
        }
    },

    async updateEncargado(req, res) {
        const { id } = req.params;
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador } = req.body;
        try {
            await executeQuery('EXEC SPActualizarEncargado @Id, @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'TelEmergencia', type: sql.VarChar(10), value: TelEmergencia },
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento },
                { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            ]);
            res.status(200).json({ msg: 'Encargado actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el encargado' });
        }
    },

    async deleteEncargado(req, res) {
        const { id } = req.params;
        try {
            await executeQuery('EXEC SPEliminarEncargado @Id', [{ name: 'Id', type: sql.Int, value: id }]);
            res.status(200).json({ msg: 'Encargado eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el encargado: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el encargado' });
        }
    },

    async searchEncargados(req, res) {
        const { TextoBusqueda } = req.body;
        try {
            const result = await executeQuery('EXEC SPBuscarEncargadoPorNombre @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(50), value: TextoBusqueda }]);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar encargados: ${error}`);
            res.status(500).json({ msg: 'Error al buscar encargados' });
        }
    },
};

export default EncargadoController;