const {check} = require ('express-validator');

const validateCreate = [
    check('Nombre') //validar la Propiedad Name
    .exists()//que exista
    .not()//que no
    .isEmpty(),//sea vacio
    
];

//exporto el modulo

module.exports = {validateCreate}