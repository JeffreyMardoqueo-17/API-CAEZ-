import mssql from 'mssql';
import { executeQuery, executeRawQuery } from '../helpers/dbHelper';
import sql from 'mssql';

export async function createAlumno(req, res) {
    const { Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, EsBecado } = req.body;
    try {
        const FechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `EXEC SPCrearAlumno @Nombre='${Nombre}', @Apellido='${Apellido}', @FechaNacimiento='${FechaNacimiento}', @IdSexo=${IdSexo}, @IdRole=${IdRole}, @IdEncargado=${IdEncargado}, @IdEnfermedad=${IdEnfermedad}, @IdTipoDocumento=${IdTipoDocumento}, @NumDocumento='${NumDocumento}', @IdGrado=${IdGrado}, @IdTurno=${IdTurno}, @IdAdministrador=${IdAdministrador}, @IdPadrino=${IdPadrino}, @FechaRegistro='${FechaRegistro}', @EsBecado=${EsBecado}`;
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

// traer alumno por grados
export async function getAlumnosPorGrados(req, res) {
    const { Grado } = req.body;
    try {
        const query = `EXEC SPGetAlumnosPorGrado @Grado=${Grado}`;
        const result = await executeRawQuery(query);
        if (result.recordset && result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ msg: 'No se encontraron alumnos para el grado especificado' });
        }
    } catch (error) {
        console.error(`Error al obtener los alumnos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los alumnos' });
    }
}

//traer a todos los alumnos
export const getAlumnos = async (req, res) => {
    try {
        const result = await executeQuery(`EXEC SPTraerTodosLosAlumnos`);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los encargados ${error}`);
        res.status(500).json({ msg: `Error al obtener los encargados` });
    }
}

//traer alumnos por ID
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
//DELETE
export const deleteAlumno = async (req, res) => {
    const{id} = req.params;
    try {
        await executeQuery('EXEC SPEliminarAlumno @Id', [{name: 'Id', type: sql.Int, value: id}]);
        res.status(200).json({msg: 'Alumno eliminado'});
    } catch (error) {
        console.error('Error al intentar eliminar a el alumnno: ' + error);
        res.status(500).json({msg: 'Error al eliminar el encargado'})
    }
}

export const BuscarAlumnoPorNombre = async (req, res) => {
    const { TextoBusqueda } = req.body;

    if (!TextoBusqueda) {
        return res.status(400).json({ msg: 'TextoBusqueda es requerido' });
    }

    try {
        const result = await executeQuery('EXEC SPBuscarAlumnosPorNombre @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(50), value: TextoBusqueda }]);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron resultados' });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar al alumno por nombre: ${error}`);
        res.status(500).json({ msg: 'Error al buscar el alumno por nombre' });
    }
};
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
// }