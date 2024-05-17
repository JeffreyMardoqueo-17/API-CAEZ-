// Direcciones.controller.js
import { executeQuery } from '../helpers/dbHelper';
import sql from 'mssql';

export const GetDirecciones = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerDirecciones');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener las direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al obtener las direcciones' });
    }
};

export const GetDireccionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerDireccionPorId @Id', [{ name: 'Id', type: sql.INT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Dirección no encontrada' });
        }
    } catch (error) {
        console.error(`Error al obtener la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al obtener la dirección' });
    }
};

export const PostDireccion = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El campo nombre es requerido' });
    }
    try {
        await executeQuery('EXEC SPInsertarDireccion @Nombre', [{ name: 'Nombre', type: sql.VarChar(200), value: nombre }]);
        res.status(201).json({ msg: 'Dirección creada correctamente' });
    } catch (error) {
        console.error(`Error al insertar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al insertar la dirección' });
    }
};

export const PutDireccion = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarDireccion @Id, @Nombre', [{ name: 'Id', type: sql.INT, value: id }, { name: 'Nombre', type: sql.VarChar(200), value: nombre }]);
        res.status(200).json({ msg: 'Dirección actualizada correctamente' });
    } catch (error) {
        console.error(`Error al actualizar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar la dirección' });
    }
};

export const DeleteDireccion = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarDireccion @Id', [{ name: 'Id', type: sql.INT, value: id }]);
        res.status(200).json({ msg: 'Dirección eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la dirección: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar la dirección' });
    }
};

export const BuscarDireccionesPorTexto = async (req, res) => {
    const { textoBusqueda } = req.body;
    try {
        const result = await executeQuery('EXEC SPBuscarDireccionesPorTexto @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(200), value: textoBusqueda }]);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al buscar direcciones: ${error}`);
        res.status(500).json({ msg: 'Error al buscar direcciones' });
    }
};