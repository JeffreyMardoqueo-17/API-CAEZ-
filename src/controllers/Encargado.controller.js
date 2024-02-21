import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

// Desestructuración de campos
const { BigInt, TinyInt, VarChar } = sql;

// Validación de campos
const validarCampos = (datos) => {
    const { nombre, apellido, IdTipoDoc, NumeroDocumento, Telefono, Direccion, IdParentezco, IdAdministrador } = datos;
    if (!nombre || !apellido || !IdTipoDoc || !NumeroDocumento || !Telefono || !Direccion || !IdParentezco || !IdAdministrador) {
        throw new Error('Todos los campos son requeridos');
    }
};

// Método para obtener todos los encargados
export const GetEncargados = async (req, res) => {
    try {
        const pool = await GetConnection();
        const result = await pool.request().query('EXEC SPObtenerEncargados');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los encargados: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los encargados' });
    }
};

// Método para obtener un encargado por su Id
export const GetEncargadoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        const result = await pool.request().input('Id', BigInt, id).query('EXEC SPObtenerEncargadoPorId @Id');
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Encargado no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el encargado' });
    }
};

// Método para insertar un nuevo encargado
export const PostEncargado = async (req, res) => {
    try {
        validarCampos(req.body);

        const { nombre, apellido, IdTipoDoc, NumeroDocumento, Telefono, Direccion, IdParentezco, IdAdministrador } = req.body;

        const pool = await GetConnection();
        await pool.request()
            .input('Nombre', VarChar(50), nombre)
            .input('Apellido', VarChar(50), apellido)
            .input('IdTipoDoc', TinyInt, parseInt(IdTipoDoc))
            .input('NumeroDocumento', VarChar(50), NumeroDocumento)
            .input('Telefono', VarChar(50), Telefono)
            .input('Direccion', TinyInt, parseInt(Direccion))
            .input('IdParentezco', TinyInt, parseInt(IdParentezco))
            .input('IdAdministrador', BigInt, parseInt(IdAdministrador))
            .query('EXEC SPInsertarEncargado @Nombre, @Apellido, @IdTipoDoc, @NumeroDocumento, @Telefono, @Direccion, @IdParentezco, @IdAdministrador');

        res.status(201).json({ msg: 'Encargado creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el encargado: ${error.message}`);
        res.status(500).json({ msg: 'Error al insertar el encargado' });
    }
};

// Método para actualizar un encargado existente
export const PutEncargado = async (req, res) => {
    const { id } = req.params;
    try {
        validarCampos(req.body);

        const { nombre, apellido, IdTipoDoc, NumeroDocumento, Telefono, Direccion, IdParentezco, IdAdministrador } = req.body;

        const pool = await GetConnection();
        await pool.request()
            .input('Id', BigInt, id)
            .input('Nombre', VarChar(50), nombre)
            .input('Apellido', VarChar(50), apellido)
            .input('IdTipoDoc', TinyInt, parseInt(IdTipoDoc))
            .input('NumeroDocumento', VarChar(50), NumeroDocumento)
            .input('Telefono', VarChar(50), Telefono)
            .input('Direccion', TinyInt, parseInt(Direccion))
            .input('IdParentezco', TinyInt, parseInt(IdParentezco))
            .input('IdAdministrador', BigInt, parseInt(IdAdministrador))
            .query('EXEC SPActualizarEncargado @Id, @Nombre, @Apellido, @IdTipoDoc, @NumeroDocumento, @Telefono, @Direccion, @IdParentezco, @IdAdministrador');

        res.status(200).json({ msg: 'Encargado actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el encargado: ${error.message}`);
        res.status(500).json({ msg: 'Error al actualizar el encargado' });
    }
};

// Método para eliminar un encargado por su Id
export const DeleteEncargado = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await GetConnection();
        await pool.request().input('Id', BigInt, id).query('EXEC SPEliminarEncargado @Id');
        res.status(200).json({ msg: 'Encargado eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el encargado: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el encargado' });
    }
};
