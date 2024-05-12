import sql from 'mssql';
import { poolPromise } from '../database';

const AlumnoController = {
    // Método para crear un nuevo alumno
    async crearAlumno(req, res) {
        const { Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, FechaRegistro, EsBecado } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Nombre', sql.VarChar(50), Nombre)
                .input('Apellido', sql.VarChar(50), Apellido)
                .input('FechaNacimiento', sql.Date, FechaNacimiento)
                .input('IdSexo', sql.Int, IdSexo)
                .input('IdRole', sql.Int, IdRole)
                .input('IdEncargado', sql.Int, IdEncargado)
                .input('IdEnfermedad', sql.Int, IdEnfermedad)
                .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
                .input('NumDocumento', sql.VarChar(50), NumDocumento)
                .input('IdGrado', sql.Int, IdGrado)
                .input('IdTurno', sql.Int, IdTurno)
                .input('IdAdministrador', sql.Int, IdAdministrador)
                .input('IdPadrino', sql.Int, IdPadrino)
                .input('FechaRegistro', sql.DateTime, FechaRegistro)
                .input('EsBecado', sql.Bit, EsBecado)
                .query('EXEC SPCrearAlumno @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @FechaRegistro, @EsBecado');
            res.status(201).json({ msg: 'Alumno creado correctamente' });
        } catch (error) {
            console.error(`Error al crear el alumno: ${error}`);
            res.status(500).json({ msg: 'Error al crear el alumno' });
        }
    },

    // Método para modificar los datos de un alumno
    async modificarAlumno(req, res) {
        const { Id, Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, FechaRegistro, EsBecado } = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.Int, Id)
                .input('Nombre', sql.VarChar(50), Nombre)
                .input('Apellido', sql.VarChar(50), Apellido)
                .input('FechaNacimiento', sql.Date, FechaNacimiento)
                .input('IdSexo', sql.Int, IdSexo)
                .input('IdRole', sql.Int, IdRole)
                .input('IdEncargado', sql.Int, IdEncargado)
                .input('IdEnfermedad', sql.Int, IdEnfermedad)
                .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
                .input('NumDocumento', sql.VarChar(50), NumDocumento)
                .input('IdGrado', sql.Int, IdGrado)
                .input('IdTurno', sql.Int, IdTurno)
                .input('IdAdministrador', sql.Int, IdAdministrador)
                .input('IdPadrino', sql.Int, IdPadrino)
                .input('FechaRegistro', sql.DateTime, FechaRegistro)
                .input('EsBecado', sql.Bit, EsBecado)
                .query('EXEC SPModificarAlumno @Id, @Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @FechaRegistro, @EsBecado');
            res.status(200).json({ msg: 'Alumno modificado correctamente' });
        } catch (error) {
            console.error(`Error al modificar el alumno: ${error}`);
            res.status(500).json({ msg: 'Error al modificar el alumno' });
        }
    },

    // Método para obtener un alumno por su Id
    async obtenerAlumnoPorId(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query('EXEC SPTraerAlumnoPorId @Id');
            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset[0]);
            } else {
                res.status(404).json({ msg: 'Alumno no encontrado' });
            }
        } catch (error) {
            console.error(`Error al obtener el alumno: ${error}`);
            res.status(500).json({ msg: 'Error al obtener el alumno' });
        }
    },

    // Método para obtener todos los alumnos
    async obtenerTodosLosAlumnos(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('EXEC SPTraerTodosLosAlumnos');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al obtener los alumnos: ${error}`);
            res.status(500).json({ msg: 'Error al obtener los alumnos' });
        }
    },

    // Método para eliminar un alumno por su Id
    async eliminarAlumno(req, res) {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Id', sql.Int, id)
                .query('EXEC SPEliminarAlumno @Id');
            res.status(200).json({ msg: 'Alumno eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar el alumno: ${error}`);
            res.status(500).json({ msg: 'Error al eliminar el alumno' });
        }
    },

    // Método para buscar alumnos por nombre
    async buscarAlumnosPorNombre(req, res) {
        const { nombre } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Nombre', sql.VarChar(50), nombre)
                .query('EXEC SPBuscarAlumnosPorNombre @Nombre');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar alumnos por nombre: ${error}`);
            res.status(500).json({ msg: 'Error al buscar alumnos por nombre' });
        }
    },

    // Método para buscar alumnos por grado
    async buscarAlumnosPorGrado(req, res) {
        const { idGrado } = req.params;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('IdGrado', sql.Int, idGrado)
                .query('EXEC SPBuscarAlumnosPorGrado @IdGrado');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(`Error al buscar alumnos por grado: ${error}`);
            res.status(500).json({ msg: 'Error al buscar alumnos por grado' });
        }
    },
};

export default AlumnoController;