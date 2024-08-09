import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

/**
 * Método para obtener todas las enfermedades o una enfermedad por su Id.
 * Si el Id no se proporciona, se devuelven todas las enfermedades.
 */
export const GetEnfermedades = async (req, res) => {
    const { id } = req.params;
    try {
        const query = id ? 'EXEC SPEnfermedadGet @Id' : 'EXEC SPEnfermedadGet';
        const params = id ? [{ name: 'Id', type: sql.INT, value: id }] : [];
        const result = await executeQuery(query, params);

        if (id && result.recordset.length === 0) {
            res.status(404).json({ msg: 'Enfermedad no encontrada' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        console.error(`Error al obtener las enfermedades: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las enfermedades' });
    }
};
/**
 * Método para obtener una enfermedad por su Id.
 */
export const GetEnfermedadPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPGetEnfermedadPorId @Id', [
            { name: 'Id', type: sql.INT, value: id }
        ]);

        if (result.recordset.length === 0) {
            res.status(404).json({ msg: 'Enfermedad no encontrada' });
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        console.error(`Error al obtener la enfermedad por Id: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la enfermedad' });
    }
};

/**
 * Método para insertar una nueva enfermedad.
 */
export const PostEnfermedad = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ msg: 'Los campos nombre y descripción son requeridos' });
    }
    try {
        const result = await executeQuery('EXEC SPEnfermedadCreate @Nombre, @Descripcion', [
            { name: 'Nombre', type: sql.VarChar(50), value: nombre },
            { name: 'Descripcion', type: sql.VarChar(sql.MAX), value: descripcion },
        ]);

        res.status(201).json({ msg: 'Enfermedad creada correctamente', id: result.recordset[0].Id });
    } catch (error) {
        console.error(`Error al insertar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la enfermedad' });
    }
};

/**
 * Método para actualizar una enfermedad existente.
 */
export const PutEnfermedad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ msg: 'Los campos nombre y descripción son requeridos' });
    }
    try {
        const result = await executeQuery('EXEC SPEnfermedadUpdate @Id, @Nombre, @Descripcion', [
            { name: 'Id', type: sql.INT, value: id },
            { name: 'Nombre', type: sql.VarChar(50), value: nombre },
            { name: 'Descripcion', type: sql.VarChar(sql.MAX), value: descripcion },
        ]);

        if (result.recordset.length === 0) {
            res.status(404).json({ msg: 'Enfermedad no encontrada para actualizar' });
        } else {
            res.status(200).json({ msg: 'Enfermedad actualizada correctamente', enfermedad: result.recordset[0] });
        }
    } catch (error) {
        console.error(`Error al actualizar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la enfermedad' });
    }
};

/**
 * Método para eliminar una enfermedad por su Id.
 */
export const DeleteEnfermedad = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPEnfermedadDelete @Id', [{ name: 'Id', type: sql.INT, value: id }]);

        if (result.rowsAffected[0] === 0) {
            res.status(404).json({ msg: 'Enfermedad no encontrada para eliminar' });
        } else {
            res.status(200).json({ msg: 'Enfermedad eliminada correctamente' });
        }
    } catch (error) {
        console.error(`Error al eliminar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la enfermedad' });
    }
};
