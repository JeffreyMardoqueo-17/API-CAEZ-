import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

// Método para obtener todos los grados
export const GetGrados = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerGrados');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los grados: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los grados' });
    }
};

// Método para obtener un grado por su Id
export const GetGradoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerGradoPorId @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Grado no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el grado: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el grado' });
    }
};

// Método para insertar un nuevo grado
export const PostGrado = async (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        await executeQuery('EXEC SPInsertarGrado @Nombre', [{ name: 'Nombre', type: sql.VarChar(50), value: Nombre }]);
        res.status(201).json({ msg: 'Grado creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el grado' });
    }
};

// Método para actualizar un grado existente
export const PutGrado = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarGrado @Id, @Nombre', [{ name: 'Id', type: sql.TINYINT, value: id }, { name: 'Nombre', type: sql.VarChar(50), value: Nombre }]);
        res.status(200).json({ msg: 'Grado actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el grado' });
    }
};

// Método para eliminar un grado por su Id
export const DeleteGrado = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarGrado @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        res.status(200).json({ msg: 'Grado eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el grado: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el grado' });
    }
};