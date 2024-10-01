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
        Nombre, Apellido, FechaNacimiento, Sexo, Role, Encargado, Enfermedad,
        TipoDocumento, NumDocumento, Grado, Turno, Administrador, Padrino, EsBecado
    } = req.body;

    try {
        // Determinar si se debe asignar un padrino o dejarlo como null
        const idPadrino = EsBecado ? Padrino : null;

        // Ejecutar el procedimiento almacenado
        const result = await executeQuery('EXEC SPCrearAlumno @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @EsBecado', [
            { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
            { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
            { name: 'FechaNacimiento', type: sql.Date, value: FechaNacimiento },
            { name: 'IdSexo', type: sql.Int, value: Sexo },
            { name: 'IdRole', type: sql.Int, value: Role },
            { name: 'IdEncargado', type: sql.Int, value: Encargado },
            { name: 'IdEnfermedad', type: sql.Int, value: Enfermedad || null },
            { name: 'IdTipoDocumento', type: sql.Int, value: TipoDocumento },
            { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
            { name: 'IdGrado', type: sql.Int, value: Grado },
            { name: 'IdTurno', type: sql.Int, value: Turno },
            { name: 'IdAdministrador', type: sql.Int, value: Administrador },
            // Aquí se evalúa si EsBecado es true, se envía el padrino, de lo contrario null
            { name: 'IdPadrino', type: sql.Int, value: idPadrino },
            { name: 'EsBecado', type: sql.Bit, value: EsBecado ? 1 : 0 }
        ]);

        // Verificar si se creó el alumno
        if (result.rowsAffected[0] > 0) {
            res.status(201).json({ msg: 'Alumno creado exitosamente' });
        } else {
            throw new Error('No se pudo crear el alumno');
        }
    } catch (error) {
        console.error(`Error al crear el alumno: ${error.message}`);
        console.log(result)
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
        const result = await executeQuery('EXEC SPObtenerTodosAlumnos');

        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset);
        } else {
            return res.status(204).json({ msg: 'No se encontraron alumnos.' });
        }
    } catch (error) {
        console.error(`Error al obtener todos los alumnos: ${error}`);
        return res.status(500).json({ msg: 'Error al obtener los alumnos.' });
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
        const result = await executeQuery('EXEC SPObtenerAlumnoPorID @Id', [
            { name: 'Id', type: sql.Int, value: id }
        ]);

        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset[0]);
        } else {
            return res.status(404).json({ msg: 'Alumno no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el alumno por ID: ${error}`);
        return res.status(500).json({ msg: 'Error al obtener el alumno' });
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
    const { id } = req.params;
    const {
        Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad,
        IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, EsBecado
    } = req.body;

    try {
        await executeQuery('EXEC SPModificarAlumno @Id, @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @EsBecado', [
            { name: 'Id', type: sql.Int, value: id },
            { name: 'Nombre', type: sql.VarChar(50), value: Nombre },
            { name: 'Apellido', type: sql.VarChar(50), value: Apellido },
            { name: 'FechaNacimiento', type: sql.Date, value: FechaNacimiento },
            { name: 'IdSexo', type: sql.Int, value: IdSexo },
            { name: 'IdRole', type: sql.Int, value: IdRole },
            { name: 'IdEncargado', type: sql.Int, value: IdEncargado },
            { name: 'IdEnfermedad', type: sql.Int, value: IdEnfermedad || null },
            { name: 'IdTipoDocumento', type: sql.Int, value: IdTipoDocumento },
            { name: 'NumDocumento', type: sql.VarChar(50), value: NumDocumento },
            { name: 'IdGrado', type: sql.Int, value: IdGrado },
            { name: 'IdTurno', type: sql.Int, value: IdTurno },
            { name: 'IdAdministrador', type: sql.Int, value: IdAdministrador },
            { name: 'IdPadrino', type: sql.Int, value: IdPadrino || null },
            { name: 'EsBecado', type: sql.Bit, value: EsBecado || 0 }
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
        await executeQuery('EXEC SPEliminarAlumno @Id', [
            { name: 'Id', type: sql.Int, value: id }
        ]);

        res.status(200).json({ msg: 'Alumno eliminado exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar el alumno: ${error.message}`);
        res.status(500).json({ msg: 'Error al eliminar el alumno' });
    }
}
