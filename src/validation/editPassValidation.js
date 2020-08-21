const fs = require('fs');
const path = require('path');
const {check, validationResult, body} = require('express-validator');

let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);

module.exports = [
    check('email')
        .isEmail().withMessage('Debes ingresar un Email válido'),
    check('pass1')
        .isLength({min: 4, max: 20}).withMessage('La contraseña debe tener un mínimo de 4 caracteres'),
    body('pass2')
        .custom((value, { req }) => {
            if (value !== req.body.pass1) {
              throw new Error('Password confirmation does not match password');
            }
            
            // Indicates the success of this synchronous custom validator
            return true;
          })
]