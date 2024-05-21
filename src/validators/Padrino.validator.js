import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostPadrino = [
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

const ValidatePutPadrino = [
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
        .optional()
        .isInt()
        .withMessage('El IdSexo debe ser un número entero'),

    check('IdRole')
        .optional()
        .isInt()
        .withMessage('El IdRole debe ser un número entero'),

    check('Telefono')
        .optional()
        .isString()
        .withMessage('El teléfono debe ser un tipo texto'),

    check('Correo')
        .optional()
        .isEmail()
        .withMessage('El correo debe ser un correo electrónico válido'),

    check('IdDireccion')
        .optional()
        .isInt()
        .withMessage('El IdDireccion debe ser un número entero'),

    check('IdAdministrador')
        .optional()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const ValidateSearchPadrino = [
    check('TextoBusqueda')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/)
        .isLength({ max: 50 })
        .withMessage('El texto de búsqueda debe ser un tipo texto no vacío, no más de 50 caracteres y solo puede contener letras, espacios y tildes'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export { ValidatePostPadrino, ValidatePutPadrino, ValidateSearchPadrino };