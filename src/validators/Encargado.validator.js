import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostEncargado = [
    check('Nombre')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El nombre debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('Apellido')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El apellido debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('IdSexo')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdSexo debe ser un número entero'),

    check('IdRole')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdRole debe ser un número entero'),

    check('Telefono')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .withMessage('El teléfono debe ser un tipo texto no vacío'),

    check('TelEmergencia')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 10 })
        .withMessage('El TelEmergencia debe ser un tipo texto no vacío y no más de 10 caracteres'),

    check('Correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('El correo debe ser un correo electrónico válido'),

    check('IdDireccion')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdDireccion debe ser un número entero'),

    check('IdTipoDocumento')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdTipoDocumento debe ser un número entero'),

    check('NumDocumento')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 50 })
        .withMessage('El NumDocumento debe ser un tipo texto no vacío y no más de 50 caracteres'),

    check('IdAdministrador')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];
const ValidatePutEncargado = [
    check('id')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El id debe ser un número entero'),

    check('Nombre')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El nombre debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('Apellido')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El apellido debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),

    check('IdSexo')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdSexo debe ser un número entero'),

    check('IdRole')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdRole debe ser un número entero'),

    check('Telefono')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .withMessage('El teléfono debe ser un tipo texto no vacío'),

    check('TelEmergencia')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 10 })
        .withMessage('El TelEmergencia debe ser un tipo texto no vacío y no más de 10 caracteres'),

    check('Correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('El correo debe ser un correo electrónico válido'),

    check('IdDireccion')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdDireccion debe ser un número entero'),

    check('IdTipoDocumento')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdTipoDocumento debe ser un número entero'),

    check('NumDocumento')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 50 })
        .withMessage('El NumDocumento debe ser un tipo texto no vacío y no más de 50 caracteres'),

    check('IdAdministrador')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];
const ValidateSearchEncargados = [
    check('TextoBusqueda')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 50 })
        .withMessage('El TextoBusqueda debe ser un tipo texto no vacío y no más de 50 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


export { ValidatePostEncargado, ValidatePutEncargado, ValidateSearchEncargados};