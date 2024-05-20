// En un archivo separado, por ejemplo, tokenManager.js

import jwt from 'jsonwebtoken';

// Array para almacenar los tokens
let tokens = [];

export function generateAndStoreToken(userId) {
    // Generar un token de autenticación
    const token = jwt.sign({ id: userId }, 'your-secret-key');
    // No necesitas almacenar el token en el servidor. En su lugar, devuélvelo para que el cliente pueda almacenarlo.
    console.log(token);
    return token;

}