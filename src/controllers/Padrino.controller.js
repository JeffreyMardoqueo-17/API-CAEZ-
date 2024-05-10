import sql from 'mssql';
import { poolPromise } from '../database';

const PadrinoController = {
    async getPadrinos(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('EXEC SPObtenerPadrinos');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los padrinos: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los padrinos' });
        }
    },

    async getPadrinoById(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPObtenerPadrinoPorId @Id');
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
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador, FechaRegistro } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('IdSexo', sql.INT, IdSexo)
                .input('IdRole', sql.INT, IdRole)
                .input('Telefono', sql.NVarChar(50), Telefono)
                .input('Correo', sql.NVarChar(30), Correo)
                .input('IdDireccion', sql.INT, IdDireccion)
                .input('IdAdministrador', sql.INT, IdAdministrador)
                .input('FechaRegistro', sql.DateTime, FechaRegistro)
                .query('EXEC SPInsertarPadrino @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro');
            res.status(201).json({ msg: 'Padrino creado correctamente' });
        } catch (error) {
            console.error(`Error al crear el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al crear el padrino' });
        }
    },

    async updatePadrino(req, res) {
        const { id } = req.params;
        const { Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador, FechaRegistro } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.INT, id)
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('IdSexo', sql.INT, IdSexo)
                .input('IdRole', sql.INT, IdRole)
                .input('Telefono', sql.NVarChar(50), Telefono)
                .input('Correo', sql.NVarChar(30), Correo)
                .input('IdDireccion', sql.INT, IdDireccion)
                .input('IdAdministrador', sql.INT, IdAdministrador)
                .input('FechaRegistro', sql.DateTime, FechaRegistro)
                .query('EXEC SPActualizarPadrino @Id, @Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro');
            res.status(200).json({ msg: 'Padrino actualizado correctamente' });
        } catch (error) {
            console.error(`Error al actualizar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al actualizar el padrino' });
        }
    },

    async deletePadrino(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            await pool.request().input('Id', sql.INT, id).query('EXEC SPEliminarPadrino @Id');
            res.status(200).json({ msg: 'Padrino eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar el padrino: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el padrino' });
        }
    },
    // para bucar por nombres

    async searchPadrinos(req, res) {
        const { nombre } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('NombreBusqueda', sql.VarChar(50), nombre)
                .query('EXEC SPBuscarPadrinosPorNombre @NombreBusqueda');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar padrinos por nombre: ${error}`);
            res.status(500).json({ msg: 'Error al buscar padrinos por nombre' });
        }
    }
};



export default PadrinoController;