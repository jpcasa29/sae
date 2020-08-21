const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator')
let db = require("../../database/models");
const { Op } = require("sequelize");
const User = require("../../database/models/User");

//const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
//const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));


const controller = {
	ingreso: (req, res) => {
		res.render('ingreso')
	},
	login: (req, res) => {
		let errores = validationResult(req)
		if(errores.isEmpty()){
			
			db.User.findByPk(req.body.email, {
				include: [
				  {association: "types"}
				  ],
			  })
				.then(function(result){
					
					if(result.cambiopass == 0){
						res.render('_cambioPassInicial', {
							usuario: result
						})
					} else {

						if(bcrypt.compareSync(req.body.pass, result.password)){
							req.session.usuario = result
							res.render('home', {
								usuario: result
							})
						} 
					}
				}) 
		} else {
			res.render('ingreso', {
				errores: errores.mapped()
			})

		}
			
	},
	editPass: (req, res) => {
		let errores = validationResult(req)
		if(errores.isEmpty()){

			db.User.update({
				password: bcrypt.hashSync(req.body.pass1,10),
				cambiopass: 1
			  },
			  { where: {
				email: req.body.email
			  }
			  })
			  .then(function(result){
				
					res.redirect('/')
				})

		} else {
			res.render('_cambioPassInicial', {
				errores: errores.mapped()
		})

	}
}
	
};

module.exports = controller;
