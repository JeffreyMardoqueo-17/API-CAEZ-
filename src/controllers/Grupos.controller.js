import sql from "../DataBase/contection/Conexion";
import { poolPromise } from '../DataBase/contection/Conexion';
// Controlador para los grupos de alumnos
const GrupoController = {
    async getGrupos(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('EXEC SPTraerTodosLosGrupos');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los grupos: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los grupos' });
        }
    },

    async getGrupoById(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request().input('Id', sql.INT, id).query('EXEC SPTraerGrupoPorID @Id');
            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset[0]);
            } else {
                res.status(404).json({ msg: 'Grupo no encontrado' });
            }
        } catch (error) {
            console.error(`Error al obtener el grupo: ${error}`);
            res.status(500).json({ msg: 'Error al obtener el grupo' });
        }
    }
};

export default GrupoController;
