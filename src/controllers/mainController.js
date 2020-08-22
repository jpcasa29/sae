const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const { Op } = require("sequelize");
const User = require("../database/models/User");

const controller = {
	home: (req, res) => {
		let usuario = req.session.usuario
		res.render('home', {usuario: usuario})
	},
	exit: (req, res) => {
		req.session.destroy();
		res.redirect('/')
	}
	
};

module.exports = controller;
