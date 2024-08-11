import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostEncargado = [
    check('Nombre')
        .exists()
        .notEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El nombre debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('Apellido')
        .exists()
        .notEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El apellido debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('IdSexo')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdSexo debe ser un número entero'),

    check('IdRole')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdRole debe ser un número entero'),

    check('Telefono')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 15 })
        .withMessage('El teléfono debe ser un tipo texto no vacío y no más de 15 caracteres'),

    check('TelEmergencia')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 15 })
        .withMessage('El TelEmergencia debe ser un tipo texto no vacío y no más de 15 caracteres'),

    check('Correo')
        .exists()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('El correo debe ser un correo electrónico válido'),

    check('IdDireccion')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdDireccion debe ser un número entero'),

    check('IdTipoDocumento')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdTipoDocumento debe ser un número entero'),

    check('NumDocumento')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 50 })
        .withMessage('El NumDocumento debe ser un tipo texto no vacío y no más de 50 caracteres'),

    check('IdAdministrador')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const ValidatePutEncargado = [
    check('id')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El id debe ser un número entero'),

    check('Nombre')
        .exists()
        .notEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El nombre debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('Apellido')
        .exists()
        .notEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El apellido debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('IdSexo')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdSexo debe ser un número entero'),

    check('IdRole')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdRole debe ser un número entero'),

    check('Telefono')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 15 })
        .withMessage('El teléfono debe ser un tipo texto no vacío y no más de 15 caracteres'),

    check('TelEmergencia')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 15 })
        .withMessage('El TelEmergencia debe ser un tipo texto no vacío y no más de 15 caracteres'),

    check('Correo')
        .exists()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('El correo debe ser un correo electrónico válido'),

    check('IdDireccion')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdDireccion debe ser un número entero'),

    check('IdTipoDocumento')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdTipoDocumento debe ser un número entero'),

    check('NumDocumento')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ max: 50 })
        .withMessage('El NumDocumento debe ser un tipo texto no vacío y no más de 50 caracteres'),

    check('IdAdministrador')
        .exists()
        .notEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export { ValidatePostEncargado, ValidatePutEncargado };
