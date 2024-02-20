// // Importar el módulo de conexión y mssql
// import { GetConnection } from '../DataBase/conection/Conexion';
// import sql from 'mssql';

// // Método para actualizar el monto total en la tabla Fondo
// export const ActualizarMontoFondo = async (req, res) => {
//     try {
//         // Obtener conexión a la base de datos
//         const pool = await GetConnection();
//         // Ejecutar el procedimiento almacenado SP_ActualizarMontoFondo
//         await pool.request().query('EXEC SP_ActualizarMontoFondo');
//         res.status(200).json({ msg: 'Monto en tabla Fondo actualizado correctamente' });
//     } catch (error) {
//         console.error(`Error al actualizar el monto en tabla Fondo: ${error}`);
//         res.status(500).json({ msg: 'Error al actualizar el monto en tabla Fondo' });
//     }
// };
