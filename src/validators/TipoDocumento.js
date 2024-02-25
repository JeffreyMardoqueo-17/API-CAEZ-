import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostTipoDoc = [
    check('Nombre')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .withMessage('El nombre debe ser un tipo texto no vacío'),
        (req, res, next) => { //verificar, retornar o que siga todo el flujo
    validateResult(req, res, next)
}
];

const ValidatePutTipoDoc = [
    check('Nombre')
        .optional()
        .not()
        .isEmpty()
        .isString()
        .withMessage('El nombre debe ser un tipo texto no vacío'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export { ValidatePostTipoDoc, ValidatePutTipoDoc};
