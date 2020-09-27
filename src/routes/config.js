// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator')
const fs = require('fs');
const path = require('path');


// ************ Controller Require ************
const configController = require('../controllers/configController');

// ************ Middleware Require ************
const authMiddleware = require(path.join(__dirname, '../middlewares/authMiddleware'))
const loginValidation = require(path.join(__dirname, '../validation/loginValidation'))
const editPassValidation = require(path.join(__dirname, '../validation/editPassValidation'))


router.get('/', authMiddleware, configController.index); /* GET -  */
router.get('/users', authMiddleware, configController.users); /* GET -  */
router.get('/users/:id', authMiddleware, configController.detail); /* GET -  */
router.post('/users/:id', authMiddleware, configController.detailSave); /* GET -  */
router.get('/users/add', authMiddleware, configController.add); /* GET -  */
router.post('/users/add', authMiddleware, configController.addSave); /* GET -  */


module.exports = router;
