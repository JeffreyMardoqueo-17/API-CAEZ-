import bcrypt from 'bcrypt';

/**
 * Verifica si la contraseña ingresada coincide con la contraseña almacenada.
 * @param {string} password - La contraseña ingresada por el usuario.
 * @param {string} hashedPassword - La contraseña almacenada (encriptada).
 * @returns {Promise<boolean>} - Devuelve true si la contraseña es correcta, false en caso contrario.
 */
export const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
