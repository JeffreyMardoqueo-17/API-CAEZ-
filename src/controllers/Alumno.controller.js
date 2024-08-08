import mssql from 'mssql';
import { executeQuery, executeRawQuery } from '../helpers/dbHelper';
import sql from 'mssql';

// Crear un nuevo alumno
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
        const FechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `EXEC SPCrearAlumno @Nombre='${Nombre}', @Apellido='${Apellido}', @FechaNacimiento='${FechaNacimiento}', 
            @IdSexo=${IdSexo}, @IdRole=${IdRole}, @IdEncargado=${IdEncargado}, @IdEnfermedad=${IdEnfermedad}, 
            @IdTipoDocumento=${IdTipoDocumento}, @NumDocumento='${NumDocumento}', @IdGrado=${IdGrado}, 
            @IdTurno=${IdTurno}, @IdAdministrador=${IdAdministrador}, @IdPadrino=${IdPadrino}, 
            @FechaRegistro='${FechaRegistro}', @EsBecado=${EsBecado}`;
        const result = await executeRawQuery(query);
        if (result.recordset && result.recordset.length > 0) {
            res.status(201).json({ msg: 'Alumno creado exitosamente', IdAlumno: result.recordset[0].IdAlumno });
        } else {
            throw new Error('No se pudo crear el alumno');
        }
    } catch (error) {
        console.error(`Error al crear el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al crear el alumno' });
    }
}

/**
 * Actualiza un alumno existente.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la actualización del alumno.
 * @throws {Error} - Si no se puede actualizar el alumno.
 */
export async function updateAlumno(req, res) {
    const { id: IdAlumno } = req.params; // Tomar IdAlumno desde req.params
    const {
        Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad,
        IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, EsBecado
    } = req.body;

    try {
        // Construir la consulta SQL dinámicamente basado en los campos presentes en req.body
        const queryParts = [`@IdAlumno=${IdAlumno}`];

        if (Nombre !== undefined) queryParts.push(`@Nombre='${Nombre}'`);
        if (Apellido !== undefined) queryParts.push(`@Apellido='${Apellido}'`);
        if (FechaNacimiento !== undefined) queryParts.push(`@FechaNacimiento='${FechaNacimiento}'`);
        if (IdSexo !== undefined) queryParts.push(`@IdSexo=${IdSexo}`);
        if (IdRole !== undefined) queryParts.push(`@IdRole=${IdRole}`);
        if (IdEncargado !== undefined) queryParts.push(`@IdEncargado=${IdEncargado}`);
        if (IdEnfermedad !== undefined) queryParts.push(`@IdEnfermedad=${IdEnfermedad}`);
        if (IdTipoDocumento !== undefined) queryParts.push(`@IdTipoDocumento=${IdTipoDocumento}`);
        if (NumDocumento !== undefined) queryParts.push(`@NumDocumento='${NumDocumento}'`);
        if (IdGrado !== undefined) queryParts.push(`@IdGrado=${IdGrado}`);
        if (IdTurno !== undefined) queryParts.push(`@IdTurno=${IdTurno}`);
        if (IdAdministrador !== undefined) queryParts.push(`@IdAdministrador=${IdAdministrador}`);
        if (IdPadrino !== undefined) queryParts.push(`@IdPadrino=${IdPadrino}`);
        if (EsBecado !== undefined) queryParts.push(`@EsBecado=${EsBecado ? 1 : 0}`);

        const query = `EXEC SPActualizarAlumno ${queryParts.join(', ')}`;

        const result = await executeRawQuery(query);

        if (result.recordset && result.recordset.length > 0) {
            res.status(200).json({ msg: 'Alumno actualizado exitosamente', IdAlumno: result.recordset[0].IdAlumno });
        } else {
            throw new Error('No se pudo actualizar el alumno');
        }
    } catch (error) {
        console.error(`Error al actualizar el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el alumno' });
    }
}



// Obtener alumnos por grados
/**
 * Obtiene los alumnos por grupos.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la operación.
 */
export async function getAlumnosPorGrupos(req, res) {
    const { Grupo } = req.body;
    try {
        const query = `EXEC SPGetAlumnosPorGrupo @Grupo='${Grupo}'`;
        const result = await executeRawQuery(query);
        if (result.recordset && result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ msg: 'No se encontraron alumnos para el grupo especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los alumnos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los alumnos' });
    }
}

// Obtener todos los alumnos
/**
 * Obtiene todos los alumnos.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la operación.
 */
export const getAlumnos = async (req, res) => {
    try {
        const result = await executeQuery(`EXEC SPTraerTodosLosAlumnos`);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los alumnos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los alumnos' });
    }
}

// Obtener alumno por ID
/**
 * Obtiene un alumno por su ID.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la operación.
 */
export const getAlumnosbyID = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPTraerAlumnoPorId @Id', [{ name: 'Id', type: sql.Int, value: id }]);
        if (result.recordset.length > 0)
            res.status(200).json(result.recordset[0]);
        else
            res.status(404).json({ msg: 'Alumno no encontrado' });

    } catch (error) {
        console.error(`Error al obtener el alumno: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el alumno' });
    }
}

// Eliminar un alumno
/**
 * Elimina un alumno.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la eliminación del alumno.
 * @throws {Error} - Si ocurre un error al intentar eliminar al alumno.
 */
export const deleteAlumno = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarAlumno @Id', [{ name: 'Id', type: sql.Int, value: id }]);
        res.status(200).json({ msg: 'Alumno eliminado' });
    } catch (error) {
        console.error('Error al intentar eliminar al alumno: ' + error);
        res.status(500).json({ msg: 'Error al eliminar el alumno' });
    }
}

// Buscar alumno por nombre
/**
 * Busca un alumno por su nombre.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Object} - El objeto de respuesta JSON con los resultados de la búsqueda.
 * @throws {Error} - Si ocurre un error durante la búsqueda.
 */
export const BuscarAlumnoPorNombre = async (req, res) => {
    const { TextoBusqueda } = req.body;

    if (!TextoBusqueda) {
        return res.status(400).json({ msg: 'TextoBusqueda es requerido' });
    }

    try {
        const query = `EXEC SPBuscarAlumnosPorNombre @TextoBusqueda`;
        const params = [{ name: 'TextoBusqueda', type: sql.NVarChar(50), value: TextoBusqueda }];
        const result = await executeQuery(query, params);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron resultados' });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar al alumno por nombre: ${error}`);
        res.status(500).json({ msg: 'Error al buscar el alumno por nombre' });
    }
}


// Obtener alumnos por beca
/**
 * Obtiene los alumnos por estado de beca.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Object} - El objeto de respuesta JSON con los alumnos encontrados o un mensaje de error.
 */
export const getAlumnosPorBecaStatus = async (req, res) => {
    const { EsBecado } = req.body;

    if (EsBecado === undefined) {
        return res.status(400).json({ msg: 'EsBecado es requerido' });
    }

    try {
        const query = 'EXEC SPGetAlumnosPorBecaStatus @EsBecado';
        const parameters = [{ name: 'EsBecado', type: sql.Bit, value: EsBecado }];
        const result = await executeQuery(query, parameters);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron alumnos con el estado de beca especificado' });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar los alumnos por beca: ${error}`);
        res.status(500).json({ msg: 'Error al buscar los alumnos por beca' });
    }
}

//  *s

// {
//     "Nombre": "Lenin",
//     "Apellido": "Geiii",
//     "FechaNacimiento": "2005-09-15",
//     "IdSexo": 1,
//     "IdRole": 4,
//     "IdEncargado": 4,
//     "IdEnfermedad": 14,
//     "IdTipoDocumento": 1,
//     "NumDocumento": "12345678",
//     "IdGrado": 11,
//     "IdTurno": 1,
//     "IdAdministrador": 3,
//     "IdPadrino": 4,
//     "EsBecado": true
// }
// {
//     "Grado": 11
// }s