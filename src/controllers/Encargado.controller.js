import sql from 'mssql';
import { executeQuery, executeRawQuery } from '../helpers/dbHelper';

// Crear un nuevo encargado
export async function createEncargado(req, res) {
    const {
        Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia,
        Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador
    } = req.body;
    try {
        const query = `EXEC SPInsertarEncargado 
            @Nombre='${Nombre}', @Apellido='${Apellido}', @IdSexo=${IdSexo}, @IdRole=${IdRole}, 
            @Telefono='${Telefono}', @TelEmergencia='${TelEmergencia}', @Correo='${Correo}', 
            @IdDireccion=${IdDireccion}, @IdTipoDocumento=${IdTipoDocumento}, 
            @NumDocumento='${NumDocumento}', @IdAdministrador=${IdAdministrador}`;
        const result = await executeRawQuery(query);
        if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
            res.status(201).json({ msg: 'Encargado creado exitosamente' });
        } else {
            throw new Error('No se pudo crear el encargado');
        }
    } catch (error) {
        console.error(`Error al crear el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al crear el encargado' });
    }
}

// Actualizar un encargado existente
export async function updateEncargado(req, res) {
    const { id: Id } = req.params; // Tomar Id del encargado desde req.params
    const {
        Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia,
        Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador
    } = req.body;

    try {
        const query = `EXEC SPActualizarEncargado 
            @Id=${Id}, @Nombre='${Nombre}', @Apellido='${Apellido}', @IdSexo=${IdSexo}, @IdRole=${IdRole}, 
            @Telefono='${Telefono}', @TelEmergencia='${TelEmergencia}', @Correo='${Correo}', 
            @IdDireccion=${IdDireccion}, @IdTipoDocumento=${IdTipoDocumento}, 
            @NumDocumento='${NumDocumento}', @IdAdministrador=${IdAdministrador}`;
        const result = await executeRawQuery(query);

        if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
            res.status(200).json({ msg: 'Encargado actualizado exitosamente' });
        } else {
            throw new Error('No se pudo actualizar el encargado');
        }
    } catch (error) {
        console.error(`Error al actualizar el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el encargado' });
    }
}

// Eliminar un encargado
export const deleteEncargado = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `EXEC SPEliminarEncargado @Id=${id}`;
        const result = await executeRawQuery(query);
        if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
            res.status(200).json({ msg: 'Encargado eliminado exitosamente' });
        } else {
            throw new Error('No se pudo eliminar el encargado');
        }
    } catch (error) {
        console.error(`Error al eliminar el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el encargado' });
    }
}

// Obtener todos los encargados
export const getEncargados = async (req, res) => {
    try {
        const query = 'EXEC SPObtenrEncargados';
        const result = await executeQuery(query);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los encargados: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los encargados' });
    }
}

// Obtener un encargado por ID
export const getEncargadoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `EXEC SPObtenerEncargadoPorId @Id=${id}`;
        const result = await executeQuery(query);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Encargado no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el encargado' });
    }
}

// Buscar encargados por nombre
export const buscarEncargadosPorNombre = async (req, res) => {
    const { TextoBusqueda } = req.body;

    if (!TextoBusqueda) {
        return res.status(400).json({ msg: 'TextoBusqueda es requerido' });
    }

    try {
        const query = `EXEC SPBuscarEncargadosPorNombre @TextoBusqueda='${TextoBusqueda}'`;
        const result = await executeQuery(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron encargados' });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar encargados por nombre: ${error}`);
        res.status(500).json({ msg: 'Error al buscar encargados por nombre' });
    }
}
