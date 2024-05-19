import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

// Método para obtener todas las enfermedades
export const GetEnfermedades = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerEnfermedades');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener las enfermedades: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las enfermedades' });
    }
};

// Método para obtener una enfermedad por su Id
export const GetEnfermedadPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerEnfermedadPorId @Id', [{ name: 'Id', type: sql.INT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Enfermedad no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la enfermedad' });
    }
};

// Método para insertar una nueva enfermedad
export const PostEnfermedad = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ msg: 'Los campos nombre y descripción son requeridos' });
    }
    try {
        await executeQuery('EXEC SPInsertarEnfermedad @Nombre, @Descripcion', [{ name: 'Nombre', type: sql.VarChar(50), value: nombre }, { name: 'Descripcion', type: sql.VarChar(sql.MAX), value: descripcion }]);
        res.status(201).json({ msg: 'Enfermedad creada correctamente' });
    } catch (error) {
        console.error(`Error al insertar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la enfermedad' });
    }
};

// Método para actualizar una enfermedad existente
export const PutEnfermedad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        await executeQuery('EXEC SPActualizarEnfermedad @Id, @Nombre, @Descripcion', [{ name: 'Id', type: sql.INT, value: id }, { name: 'Nombre', type: sql.VarChar(50), value: nombre }, { name: 'Descripcion', type: sql.VarChar(sql.MAX), value: descripcion }]);
        res.status(200).json({ msg: 'Enfermedad actualizada correctamente' });
    } catch (error) {
        console.error(`Error al actualizar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la enfermedad' });
    }
};

// Método para eliminar una enfermedad por su Id
export const DeleteEnfermedad = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarEnfermedad @Id', [{ name: 'Id', type: sql.INT, value: id }]);
        res.status(200).json({ msg: 'Enfermedad eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la enfermedad: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la enfermedad' });
    }
};

// Método para buscar enfermedades por texto en el nombre o descripción
export const BuscarEnfermedadesPorTexto = async (req, res) => {
    const { textoBusqueda } = req.body; // Cambiado de req.params a req.body
    try {
        const result = await executeQuery('EXEC SPBuscarEnfermedadesPorTexto @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(sql.MAX), value: textoBusqueda }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ msg: 'No se encontraron enfermedades con el texto de búsqueda proporcionado' });
        }
    } catch (error) {
        console.error(`Error al buscar enfermedades por texto: ${error}`);
        res.status(500).json({ msg: 'Error al buscar enfermedades por texto' });
    }
};