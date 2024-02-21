import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Método para obtener todos los alumnos
export const GetAlumnos = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerAlumnos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los alumnos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los alumnos' });
    }
};

// Método para obtener un alumno por su Id
export const GetAlumnoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', sql.Int, id).query('EXEC SPObtenerAlumnoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Alumno no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el alumno' });
    }
};

// Método para insertar un nuevo alumno
export const PostAlumno = async (req, res) => {
    const { nombre, apellido, idGrado, idTipoDoc, numeroDocumento, idEncargado, idTurno, idAdministrador } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdGrado', sql.TinyInt, idGrado)
            .input('IdTipoDoc', sql.TinyInt, idTipoDoc)
            .input('NumeroDocumento', sql.VarChar(50), numeroDocumento)
            .input('IdEncargado', sql.Int, idEncargado)
            .input('IdTurno', sql.TinyInt, idTurno)
            .input('IdAdministrador', sql.Int, idAdministrador)
            .query('EXEC SPInsertarAlumno @Nombre, @Apellido, @IdGrado, @IdTipoDoc, @NumeroDocumento, @IdEncargado, @IdTurno, @IdAdministrador');
        res.status(201).json({ msg: 'Alumno creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el alumno' });
    }
};

// Método para actualizar un alumno existente
export const PutAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, idGrado, idTipoDoc, numeroDocumento, idEncargado, idTurno, idAdministrador } = req.body;
    try {
        const pool = await GetConnection();
        await pool.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.VarChar(50), nombre)
            .input('Apellido', sql.VarChar(50), apellido)
            .input('IdGrado', sql.TinyInt, idGrado)
            .input('IdTipoDoc', sql.TinyInt, idTipoDoc)
            .input('NumeroDocumento', sql.VarChar(50), numeroDocumento)
            .input('IdEncargado', sql.Int, idEncargado)
            .input('IdTurno', sql.TinyInt, idTurno)
            .input('IdAdministrador', sql.Int, idAdministrador)
            .query('EXEC SPActualizarAlumno @Id, @Nombre, @Apellido, @IdGrado, @IdTipoDoc, @NumeroDocumento, @IdEncargado, @IdTurno, @IdAdministrador');
        res.status(200).json({ msg: 'Alumno actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el alumno' });
    }
};

// Método para eliminar un alumno por su Id
export const DeleteAlumno = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', sql.Int, id).query('EXEC SPEliminarAlumno @Id');
        res.status(200).json({ msg: 'Alumno eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el alumno' });
    }
};
