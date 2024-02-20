const { check } = require('express-validator');
import { validateResult } from '../../helpers/ValidateHeper';


const ValidatePutParentezco = [
    check('nombre')
         .optional() // El campo es opcional en PUT
        .isString()
        .withMessage('El nombre debe ser un string')
        .isLength({ min: 1, max: 50 })
        .withMessage('El nombre debe tener entre 1 y 50 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next);
    }

]
//exporto el modulo

exports = { ValidatePutParentezco }