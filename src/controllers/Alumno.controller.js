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
        // Definir los parámetros de entrada del procedimiento almacenado
        await executeQuery('SPCrearAlumno @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @EsBecado', [
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

        // Verificar el resultado
        if (result && result.recordset.length > 0) {
            res.status(201).json({ msg: 'Alumno creado exitosamente', IdAlumno: result.recordset[0].IdAlumno });
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

// Obtener un alumno por ID
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
        // Definir el parámetro de entrada
        const inputParams = [
            { name: 'Id', type: sql.Int, value: id }
        ];
        // Ejecutar el procedimiento almacenado con el parámetro
        const result = await executeQuery('SPObtenerAlumnoPorID', inputParams);
        // Verificar si hay resultados
        if (result.recordset && result.recordset.length > 0) {
            return res.status(200).json(result.recordset[0]);
        } else {
            return res.status(404).json({ msg: 'Alumno no encontrado.' });
        }
    } catch (error) {
        console.error(`Error al obtener el alumno por ID: ${error}`);
        if (!res.headersSent) {
            return res.status(500).json({ msg: 'Error al obtener el alumno.' });
        }
    }
}
