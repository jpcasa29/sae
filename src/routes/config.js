// ************ Require's ************
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************ Middleware Require ************
const authMiddleware = require('../middlewares/authMiddleware')





module.exports = router;
