import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

// Validación para crear una nueva dirección
const ValidateCreateDireccion = [
    check('Nombre')
        .exists()
        .withMessage('El nombre es requerido')
        .not()
        .isEmpty()
        .withMessage('El nombre no puede estar vacío')
        .isString()
        .withMessage('El nombre debe ser un tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

// Validación para modificar una dirección existente
const ValidateUpdateDireccion = [
    check('Nombre')
        .optional() // En una operación de actualización, el campo puede no estar presente
        .not()
        .isEmpty()
        .withMessage('El nombre no puede estar vacío')
        .isString()
        .withMessage('El nombre debe ser un tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export { ValidateCreateDireccion, ValidateUpdateDireccion };