const {check} = require('express-validator');

module.exports = [
    check('title').notEmpty().withMessage("El nombre es obligatorio"),
    check('rating').isInt({ min: 1, max : 10}).withMessage('Ingresar un valor entre el 1 y el 10'),
    check('awards').isInt({ min: 0}).withMessage('Ingresar un numero igual o mayor a 0'),
    check('release_date').notEmpty().withMessage('Ingresar una fecha'),
    check('length').isInt({ min: 0}).withMessage('Ingresar un numero igual o mayor a 0')
]