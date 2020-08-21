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
const empleadosController = require('../controllers/empleadosController');
const payrollController = require('../controllers/payrollController');
const conceptosController = require('../controllers/conceptosController');

// ************ Middleware Require ************
const authMiddleware = require(path.join(__dirname, '../middlewares/authMiddleware'))
const loginValidation = require(path.join(__dirname, '../validation/loginValidation'))
const editPassValidation = require(path.join(__dirname, '../validation/editPassValidation'))

router.get('/', userController.ingreso); /* GET - home page */
router.post('/', loginValidation, userController.login); /* GET -  */
router.put('/cambiopass/edit/:user', userController.editPass); /* GET - home page */
router.get('/exit', mainController.exit); /* GET - home */
router.get('/config', authMiddleware, configController.index); /* GET -  */
router.get('/config/users', authMiddleware, configController.users); /* GET -  */
router.get('/config/users/add', authMiddleware, configController.add); /* GET -  */
router.post('/config/users/add', authMiddleware, configController.addSave); /* GET -  */
router.get('/config/conceptos', authMiddleware, conceptosController.conceptos); /* GET -  */
router.get('/config/conceptos/add', authMiddleware, conceptosController.conceptosAdd); /* GET -  */
router.post('/config/conceptos/add', authMiddleware, conceptosController.conceptosAddSave); /* GET -  */
router.get('/config/conceptos/edit/:id', authMiddleware, conceptosController.conceptosDetalle); /* GET -  */
router.get('/home', authMiddleware, mainController.home); /* GET - home */
router.get('/empleados', authMiddleware, empleadosController.mostrar); /* GET - */
router.get('/empleado/:id', authMiddleware, empleadosController.mostrarEmpleado); /* GET - */
router.get('/payroll', authMiddleware, payrollController.principal); /* GET -  */
router.get('/payroll/process', authMiddleware, payrollController.index); /* GET - home page */
router.get('/payroll/:anio', authMiddleware, payrollController.process); /* GET - home page */
router.get('/payroll/crearLiq/new', authMiddleware, payrollController.crearLiq); /* GET - home page */
router.post('/payroll/process', authMiddleware, payrollController.saveLiq); /* GET - home page */
router.get('/payroll/nroLiquidacion/:id', authMiddleware, payrollController.verLiq); /* GET - home page */
router.get('/payroll/nroLiquidacion/liquidar/:id', authMiddleware, payrollController.liquidar); /* PUT - Update in DB */
router.get('/payroll/nroLiquidacion/liquidar/:id/ejecutar', authMiddleware, payrollController.liquidarEjecutar); /* PUT - Update in DB */
router.get('/payroll/nroLiquidacion/liquidar/:id/:leg', authMiddleware, payrollController.liquidarVer); /* PUT - Update in DB */
router.put('/payroll/nroLiquidacion/edit/:id', authMiddleware, payrollController.update); /* PUT - Update in DB */
router.get('/payroll/nroLiquidacion/edit/:id/addEmple', authMiddleware, payrollController.addEmple); /* GET - home page */
router.put('/payroll/nroLiquidacion/edit/:id/addEmple', authMiddleware, payrollController.putAddEmple); /* GET - home page */
router.delete('/payroll/nroLiquidacion/delete/:id', authMiddleware, payrollController.delete); /* DELETE - Delete from DB */


module.exports = router;
