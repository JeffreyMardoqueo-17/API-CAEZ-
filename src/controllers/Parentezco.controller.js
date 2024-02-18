import { GetConnection } from '../DataBase/contection/Conexion'
import sql from 'mssql';

// Método para obtener todos los parentezcos
export const GetParentezcos = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerParentezcos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los parentezcos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los parentezcos' });
    }
};

// Método para obtener un parentezco por su Id
export const GetParentezcoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPObtenerParentezcoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Parentezco no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el parentezco' });
    }
};

// Método para insertar un nuevo parentezco
export const PostParentezco = async (req, res) => {
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Nombre', sql.VarChar(50), nombre).query('EXEC SPInsertarParentezco @Nombre');
        res.status(201).json({ msg: 'Parentezco creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el parentezco' });
    }
};

// Método para actualizar un parentezco existente
export const PutParentezco = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).input('Nombre', sql.VarChar(50), nombre).query('EXEC SPActualizarParentezco @Id, @Nombre');
        res.status(200).json({ msg: 'Parentezco actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el parentezco' });
    }
};

// Método para eliminar un parentezco por su Id
export const DeleteParentezco = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.TINYINT, id).query('EXEC SPEliminarParentezco @Id');
        res.status(200).json({ msg: 'Parentezco eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el parentezco' });
    }
};
