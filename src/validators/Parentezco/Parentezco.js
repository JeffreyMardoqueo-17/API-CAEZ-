const { check } = require('express-validator');
import { validateResult } from '../../helpers/ValidateHeper';


const ValidatePostParentezco = [
    check('nombre')
        .exists()
        .not()
        .isEmpty()
        .withMessage('El nombre es un campo requerido')
        .isString()
        .withMessage('El nombre debe ser un string')
        .isLength({ min: 1, max: 50 })
        .withMessage('El nombre debe tener entre 1 y 50 caracteres'),
         (req, res, next) => { //verificar, retornar o que siga todo el flujo
    validateResult(req, res, next)}

]
//exporto el modulo

exports = { ValidatePostParentezco }