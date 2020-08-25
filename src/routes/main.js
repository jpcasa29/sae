// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator')
const fs = require('fs');
const path = require('path');
//path.join(__dirname, '../data/usuarios.json'

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const configController = require('../controllers/configController');
const incidentesController = require('../controllers/incidentesController');
//const payrollController = require('../controllers/payrollController');
//const conceptosController = require('../controllers/conceptosController');

// ************ Middleware Require ************
const authMiddleware = require(path.join(__dirname, '../middlewares/authMiddleware'))
const loginValidation = require(path.join(__dirname, '../validation/loginValidation'))
const editPassValidation = require(path.join(__dirname, '../validation/editPassValidation'))

router.get('/', userController.ingreso); /* GET - home page */
router.post('/', loginValidation, userController.login); /* GET -  */
router.get('/registro', loginValidation, userController.register)
router.post('/registro', loginValidation, userController.registerSave)
router.put('/cambiopass/edit/:user', userController.editPass); /* GET - home page */
router.get('/exit', mainController.exit); /* GET - home */

router.get('/config', authMiddleware, configController.index); /* GET -  */
router.get('/config/users', authMiddleware, configController.users); /* GET -  */
router.get('/config/users/:id', authMiddleware, configController.detail); /* GET -  */
router.post('/config/users/:id', authMiddleware, configController.detailSave); /* GET -  */
router.get('/config/users/add', authMiddleware, configController.add); /* GET -  */
router.post('/config/users/add', authMiddleware, configController.addSave); /* GET -  */

router.get('/home', authMiddleware, mainController.home); /* GET - home */
router.get('/incidentes', authMiddleware, incidentesController.mostrar); /* GET - */
router.get('/incidentes/:id', authMiddleware, incidentesController.mostrarIncidente); /* GET - */


module.exports = router;
