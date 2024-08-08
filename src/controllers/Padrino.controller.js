import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

const PadrinoController = {
    async getPadrinos(req, res) {
        try {
            const result = await executeQuery('EXEC SPObtenerPadrinos');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los padrinos: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los padrinos' });
        }
    },

    async getPadrinoById(req, res) {
        const { id } = req.params;
        try {
            const result = await executeQuery('EXEC SPObtenerPadrinoPorId @Id', [{ name: 'Id', type: sql.Int, value: id }]);
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

    async createPadrino(req, res) {
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador } = req.body;
        try {
            await executeQuery('EXEC SPInsertarPadrino @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro', [
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
    async updatePadrino(req, res) {
        const { id } = req.params;
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador } = req.body;
        try {
            await executeQuery('EXEC SPActualizarPadrino @Id, @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaActualizacion', [
                { name: 'Id', type: sql.Int, value: id },
                { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
                { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
                { name: 'IdSexo', type: sql.Int, value: IdSexo },
                { name: 'IdRole', type: sql.Int, value: IdRole },
                { name: 'Telefono', type: sql.VarChar(50), value: Telefono },
                { name: 'Correo', type: sql.VarChar(30), value: Correo },
                { name: 'IdDireccion', type: sql.Int, value: IdDireccion },
                { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
                { name: 'FechaActualizacion', type: sql.DateTime, value: new Date() },
            ]);
            res.status(200).json({ msg: 'Padrino actualizado exitosamente' });
        } catch (error) {
            console.error(`Error al actualizar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el padrino' });
        }
    },

    async deletePadrino(req, res) {
        const { id } = req.params;
        try {
            await executeQuery('EXEC SPEliminarPadrino @Id', [{ name: 'Id', type: sql.Int, value: id }]);
            res.status(200).json({ msg: 'Padrino eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el padrino' });
        }
    },

    async searchPadrinos(req, res) {
        const { TextoBusqueda } = req.body;
        try {
            const result = await executeQuery('EXEC SPBuscarPadrinosPorNombre @NombreBusqueda', [{ name: 'NombreBusqueda', type: sql.VarChar(50), value: TextoBusqueda }]);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar padrinos: ${error}`);
            res.status(500).json({ msg: 'Error al buscar padrinos' });
        }
    },
};

export default PadrinoController;