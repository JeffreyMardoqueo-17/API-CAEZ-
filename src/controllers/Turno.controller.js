import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

// Método para obtener todos los turnos
export const GetTurnos = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerTurnos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los turnos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los turnos' });
    }
};

// Método para obtener un turno por su Id
export const GetTurnoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerTurnoPorId @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Turno no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el turno: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el turno' });
    }
};

// Método para insertar un nuevo turno
export const PostTurno = async (req, res) => {
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPInsertarTurno @Nombre', [{ name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(201).json({ msg: 'Turno creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el turno: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el turno' });
    }
};

// Método para actualizar un turno existente
export const PutTurno = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarTurno @Id, @Nombre', [{ name: 'Id', type: sql.TINYINT, value: id }, { name: 'Nombre', type: sql.VarChar(80), value: Nombre }]);
        res.status(200).json({ msg: 'Turno actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el turno: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el turno' });
    }
};

// Método para eliminar un turno por su Id
export const DeleteTurno = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarTurno @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        res.status(200).json({ msg: 'Turno eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el turno: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el turno' });
    }
};