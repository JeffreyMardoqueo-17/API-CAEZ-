const jwt = require('jsonwebtoken');

/* La función generateToken genera un token JWT utilizando la clave secreta secretKey y estableciendo una expiración de 1 hora. La función verifyToken verifica la validez del token utilizando la misma clave secreta. Si el token es válido, devuelve el contenido del token (payload); de lo contrario, lanza un error. */
const secretKey = 'jeffrey'; // Cambia esto por una clave secreta segura
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = { generateToken, verifyToken };
