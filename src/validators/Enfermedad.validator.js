import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidateCreateEnfermedad = [
    check('nombre')
        .exists()
        .withMessage('El nombre es requerido')
        .not()
        .isEmpty()
        .withMessage('El nombre no puede estar vacío')
        .isString()
        .withMessage('El nombre debe ser un texto')
        .isLength({ max: 50 })
        .withMessage('El nombre no puede exceder los 50 caracteres'),
    check('descripcion')
        .exists()
        .withMessage('La descripción es requerida')
        .not()
        .isEmpty()
        .withMessage('La descripción no puede estar vacía')
        .isString()
        .withMessage('La descripción debe ser un texto')
        .isLength({ max: 200 })
        .withMessage('La descripción no puede exceder los 50 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const ValidateUpdateEnfermedad = [
    check('nombre')
        .optional()
        .not()
        .isEmpty()
        .withMessage('El nombre no puede estar vacío')
        .isString()
        .withMessage('El nombre debe ser un texto')
        .isLength({ max: 50 })
        .withMessage('El nombre no puede exceder los 50 caracteres'),
    check('descripcion')
        .optional()
        .not()
        .isEmpty()
        .withMessage('La descripción no puede estar vacía')
        .isString()
        .withMessage('La descripción debe ser un texto')
        .isLength({ max: 200 })
        .withMessage('La descripción no puede exceder los 50 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export { ValidateCreateEnfermedad, ValidateUpdateEnfermedad };
