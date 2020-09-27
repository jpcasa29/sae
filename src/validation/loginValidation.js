const fs = require('fs');
const path = require('path');
const {check, validationResult, body} = require('express-validator');
let db = require("../database/models");
//let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
//usuarios = JSON.parse(usuarios);

module.exports = [
    check('email')
        .isEmail().withMessage('Debes ingresar un Email válido'),
    body('email')
        .custom(function(value) {
            return db.User.findOne(
                {
                    where: {email: value}
                })
                .then(function(result) {
                    if(result) {
                        return Promise.reject('El usuario está registrado')
                    }
                })
                
            
        }),
    check('pass')
        .isLength({min: 4, max: 20}).withMessage('La contraseña debe tener un mínimo de 4 caracteres')
]