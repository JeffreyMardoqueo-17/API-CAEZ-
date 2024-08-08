import { check } from 'express-validator';
import { validateResult } from '../helpers/ValidateHeper';

const ValidatePostAlumno = [
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

    check('FechaNacimiento')
        .exists()
        .not()
        .isEmpty()
        .isDate()
        .withMessage('La FechaNacimiento debe ser una fecha válida'),

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

    check('IdEncargado')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdEncargado debe ser un número entero'),

    check('IdEnfermedad')
        .optional()
        .isInt()
        .withMessage('El IdEnfermedad debe ser un número entero'),

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

    check('IdGrado')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdGrado debe ser un número entero'),

    check('IdGrupo')
        .optional()
        .isInt()
        .withMessage('El IdGrupo debe ser un número entero'),

    check('IdTurno')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdTurno debe ser un número entero'),

    check('IdAdministrador')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    check('IdPadrino')
        .optional()
        .isInt()
        .withMessage('El IdPadrino debe ser un número entero'),

    check('EsBecado')
        .exists()
        .not()
        .isEmpty()
        .isBoolean()
        .withMessage('El EsBecado debe ser un valor booleano'),

    (req, res, next) => {
        validateResult(req, res, next)
    }

];

const ValidatePutAlumno = [
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

    check('FechaNacimiento')
        .exists()
        .not()
        .isEmpty()
        .isDate()
        .withMessage('La FechaNacimiento debe ser una fecha válida'),

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

    check('IdEncargado')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdEncargado debe ser un número entero'),

    check('IdEnfermedad')
        .optional()
        .isInt()
        .withMessage('El IdEnfermedad debe ser un número entero'),

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

    check('IdGrado')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdGrado debe ser un número entero'),

    check('IdGrupo')
        .optional()
        .isInt()
        .withMessage('El IdGrupo debe ser un número entero'),

    check('IdTurno')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdTurno debe ser un número entero'),

    check('IdAdministrador')
        .exists()
        .not()
        .isEmpty()
        .isInt()
        .withMessage('El IdAdministrador debe ser un número entero'),

    check('IdPadrino')
        .optional()
        .isInt()
        .withMessage('El IdPadrino debe ser un número entero'),

    check('EsBecado')
        .exists()
        .not()
        .isEmpty()
        .isBoolean()
        .withMessage('El EsBecado debe ser un valor booleano'),

    (req, res, next) => {
        validateResult(req, res, next)
    }

];

export { ValidatePostAlumno, ValidatePutAlumno };