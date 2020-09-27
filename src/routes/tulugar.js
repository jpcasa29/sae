// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator')
const fs = require('fs');
const path = require('path');
//path.join(__dirname, '../data/usuarios.json'

// ************ Controller Require ************
const tulugarController = require('../controllers/tulugarController');


// ************ Middleware Require ************
const authMiddleware = require(path.join(__dirname, '../middlewares/authMiddleware'))
const loginValidation = require(path.join(__dirname, '../validation/loginValidation'))

router.get('/', authMiddleware, tulugarController.index); /* GET - home page */
router.get('/detalle/:id', authMiddleware, tulugarController.detalle); /* GET - home page */
router.post('/detalle/reservar', authMiddleware, tulugarController.reserva); /* GET - home page */


module.exports = router;
