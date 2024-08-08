import { executeQuery } from '../helpers/dbHelper'
import sql from 'mssql';

// Método para obtener todos los parentezcos === http://localhost:5000/Parentezcos
export const GetParentezcos = async (req, res) => {
    try {
        const result = await executeQuery('EXEC SPObtenerParentezcos');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los parentezcos: ${error}`);
        res.status(500).json({ msg: 'Error al obtener los parentezcos' });
    }
};

// Método para obtener un parentezco por su Id   == http://localhost:5000/Parentezcos/6
export const GetParentezcoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery('EXEC SPObtenerParentezcoPorId @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'Parentezco no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al obtener el parentezco' });
    }
};

// Método para insertar un nuevo parentezco
export const PostParentezco = async (req, res) => {
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPInsertarParentezco @Nombre', [{ name: 'Nombre', type: sql.VarChar(50), value: Nombre }]);
        res.status(201).json({ msg: 'Parentezco creado correctamente' });
    } catch (error) {
        console.error(`Error al insertar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al insertar el parentezco' });
    }
};

// Método para actualizar un parentezco existente http://localhost:5000/Parentezcos/5  
export const PutParentezco = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await executeQuery('EXEC SPActualizarParentezco @Id, @Nombre', [{ name: 'Id', type: sql.TINYINT, value: id }, { name: 'Nombre', type: sql.VarChar(50), value: Nombre }]);
        res.status(200).json({ msg: 'Parentezco actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al actualizar el parentezco' });
    }
};

// Método para eliminar un parentezco por su Id
export const DeleteParentezco = async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('EXEC SPEliminarParentezco @Id', [{ name: 'Id', type: sql.TINYINT, value: id }]);
        res.status(200).json({ msg: 'Parentezco eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al eliminar el parentezco' });
    }
};

// Método para buscar parentezcos por un texto de búsqueda
export const BuscarParentezcoPorTexto = async (req, res) => {
    const { textoBusqueda } = req.body;
    try {
        const result = await executeQuery('EXEC SPBuscarParentezcoPorTexto @TextoBusqueda', [{ name: 'TextoBusqueda', type: sql.VarChar(200), value: textoBusqueda }]);
        // Si result.recordset es un array vacío, envía una respuesta indicando que no se encontraron resultados
        if (result.recordset.length === 0) {
            res.status(404).json({ msg: 'No se encontraron parentezcos con el texto de búsqueda proporcionado' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        console.error(`Error al buscar parentezco: ${error}`);
        res.status(500).json({ msg: 'Error al buscar parentezco' });
    }
};