import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

/**
 * Crea un nuevo alumno.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la creación del alumno.
 * @throws {Error} - Si no se puede crear el alumno.
 */
export async function createAlumno(req, res) {
    const {
        Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad,
        IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, EsBecado
    } = req.body;

    try {
        // Definir la consulta para ejecutar el procedimiento almacenado
        const result = await executeQuery('SPCrearAlumno', [
            { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
            { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
            { name: 'FechaNacimiento', type: sql.Date, value: FechaNacimiento },
            { name: 'IdSexo', type: sql.Int, value: IdSexo },
            { name: 'IdRole', type: sql.Int, value: IdRole },
            { name: 'IdEncargado', type: sql.Int, value: IdEncargado },
            { name: 'IdEnfermedad', type: sql.Int, value: IdEnfermedad },
            { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento },
            { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
            { name: 'IdGrado', type: sql.Int, value: IdGrado },
            { name: 'IdTurno', type: sql.Int, value: IdTurno },
            { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            { name: 'IdPadrino', type: sql.Int, value: IdPadrino },
            { name: 'EsBecado', type: sql.Bit, value: EsBecado },
            { name: 'IdAlumno', type: sql.Int, value: null, output: true } // Parámetro de salida
        ]);

        // Verificar el resultado
        if (result && result.output && result.output.IdAlumno) {
            res.status(201).json({ msg: 'Alumno creado exitosamente', IdAlumno: result.output.IdAlumno });
        } else {
            throw new Error('No se pudo crear el alumno');
        }
    } catch (error) {
        console.error(`Error al crear el alumno: ${error.message}`);
        res.status(500).json({ msg: 'Error al crear el alumno' });
    }
}
/**
 * Obtiene una lista de todos los alumnos.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve con la lista de alumnos.
 */
export async function obtenerTodosLosAlumnos(req, res) {
    try {
        // Ejecutar el procedimiento almacenado sin parámetros
        const result = await executeQuery('SPObtenerTodosAlumnos');

        // Verificar si hay resultados
        if (result.recordset && result.recordset.length > 0) {
            return res.status(200).json(result.recordset);
        } else {
            // No se encontraron alumnos
            return res.status(204).send({ msg: 'No hay alumnos mi rey' }); // Enviar 204 sin contenido
        }
    } catch (error) {
        console.error(`Error al obtener todos los alumnos: ${error}`);
        if (!res.headersSent) {
            return res.status(500).json({ msg: 'Error al obtener los alumnos.' });
        }
    }
}

/**
 * Obtiene un alumno por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve con los detalles del alumno.
 */
export async function obtenerAlumnoPorID(req, res) {
    const { id } = req.params;

    try {
        // Ejecuta el procedimiento almacenado directamente con la consulta SQL
        const result = await executeQuery(`EXEC SPObtenerAlumnoPorID @Id`, [
            { name: 'Id', type: sql.Int, value: id }
        ]);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Alumno no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el alumno por ID: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el alumno' });
    }
}


/**
 * Modifica un alumno existente.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la modificación del alumno.
 * 
 * {
  "Nombre": "Alumno Actualizado",
  "Apellido": "González",
  "FechaNacimiento": "2005-08-15T00:00:00.000Z",
  "IdSexo": 2,
  "IdRole": 2,
  "IdEncargado": 2,
  "IdEnfermedad": 1,
  "IdTipoDocumento": 1,
  "NumDocumento": "123456789",
  "IdGrado": 1,
  "IdTurno": 1,
  "IdAdministrador": 1,
  "IdPadrino": 3,
  "EsBecado": true
}

 */
export async function updateAlumno(req, res) {
    const { id } = req.params; // Obtener el id de los parámetros
    const {
        Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad,
        IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, EsBecado
    } = req.body;

    try {
        // Ejecuta el procedimiento almacenado para actualizar un alumno existente
        await executeQuery('EXEC SPModificarAlumno @Id, @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @EsBecado', [
            { name: 'Id', type: sql.Int, value: id },
            { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
            { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
            { name: 'FechaNacimiento', type: sql.Date, value: FechaNacimiento },
            { name: 'IdSexo', type: sql.Int, value: IdSexo },
            { name: 'IdRole', type: sql.Int, value: IdRole },
            { name: 'IdEncargado', type: sql.Int, value: IdEncargado },
            { name: 'IdEnfermedad', type: sql.Int, value: IdEnfermedad },
            { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento },
            { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
            { name: 'IdGrado', type: sql.Int, value: IdGrado },
            { name: 'IdTurno', type: sql.Int, value: IdTurno },
            { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            { name: 'IdPadrino', type: sql.Int, value: IdPadrino },
            { name: 'EsBecado', type: sql.Bit, value: EsBecado }
        ]);

        res.status(200).json({ msg: 'Alumno modificado exitosamente' });
    } catch (error) {
        console.error(`Error al modificar el alumno: ${error.message}`);
        res.status(500).json({ msg: 'Error al modificar el alumno' });
    }
}


/**
 * Elimina un alumno por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la eliminación del alumno.
 */
export async function deleteAlumno(req, res) {
    const { id } = req.params;
    try {
        // Definir el parámetro de entrada
        const inputParams = [
            { name: 'Id', type: sql.Int, value: id }
        ]; s
        // Ejecutar el procedimiento almacenado
        await executeQuery('SPEliminarAlumno', inputParams);

        res.status(200).json({ msg: 'Alumno eliminado exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar el alumno: ${error.message}`);
        res.status(500).json({ msg: 'Error al eliminar el alumno' });
    }
}
