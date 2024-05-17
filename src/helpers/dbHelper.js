// dbHelper.js
import { GetConnection } from '../DataBase/contection/Conexion';
import sql from 'mssql';

export const executeQuery = async (query, parameters = []) => {
    try {
        const pool = await GetConnection();
        let request = pool.request();
        parameters.forEach(param => request.input(param.name, param.type, param.value));
        return await request.query(query);
    } catch (error) {
        console.log('Ese es el error: ' + error)
    }

};