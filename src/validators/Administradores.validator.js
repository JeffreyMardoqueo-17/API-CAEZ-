import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';


const ValidatePostAdministrador = [
    check('nombre')
        .exists()
        .not()
        .isEmpty()
        .isString()
    .withMessage('El nombre debe ser un tipo texto no vacío'),

    check('apellido')
        .exists()
        .not()
        .isEmpty()
        .isString()
    .withMessage('El apellido debe ser un tipo texto no vacío'),

    check('idCargo')
        .exists()
        .not()
        .isEmpty(),
    check('telefono')
        .exists()
        .not()
        .isEmpty()
        .matches(/^\d{8}$/)
    .custom(value => {
            if (value.length !== 8) {
                throw new Error('El número de teléfono debe tener exactamente 8 dígitos');
            }
            return true;
        })
        .withMessage('El número de teléfono debe tener exactamente 8 dígitos'), //por si falla la validacion anterior
    check('pass')
        .exists()
        .not()
        .isEmpty()
    .custom(value => {
            if (value.length < 5) {
                throw new Error('La contraseña debe tener al menos 5 digitos');
            }
            return true;
        }),
        (req, res, next) => { //verificar, retornar o que siga todo el flujo
    validateResult(req, res, next)
}
];

export { ValidatePostAdministrador }; // asi como debe de ser
