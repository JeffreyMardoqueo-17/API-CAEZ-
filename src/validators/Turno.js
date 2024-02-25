import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostTurno = [
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

const ValidatePutTurno = [
    check('Nombre')
        .optional() // El campo es opcional para el método PUT
        .isString()
        .withMessage('El nombre debe ser un tipo texto'),

    (req, res, next) => { //verificar, retornar o que siga todo el flujo
        validateResult(req, res, next);
    }
];

export { ValidatePostTurno, ValidatePutTurno};
