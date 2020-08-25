const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser')
const {check, validationResult, body} = require('express-validator')
let db = require("../database/models");
const { Op } = require("sequelize");
const User = require("../database/models/User");

//const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
//const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));

let contador = 5

const controller = {
	ingreso: (req, res) => {
		res.render('ingreso')
	},
	login: (req, res) => {
		let errores = validationResult(req)
		
		if(errores.isEmpty()){
			
			req.session.email = req.body.email
			let email = req.session.email

			db.User.findByPk(req.body.email, {
				include: [
				  {association: "types"}
				  ],
			  })
				.then(function(result){
			
					if(result != null) {
						console.log('entro al null')
						if(result.cambiopass == 0){
							res.render('_cambioPassInicial', {
							usuario: result
							})
						} else {

							if(result.block == 1) {
								errores = errores.mapped()
										errores.pass = {
											msg: "Contraseña bloqueada, contacte al administrador"
										}
										
										res.render('ingreso', {
											errores: errores,
											email: email
										})
							} else {
							if(bcrypt.compareSync(req.body.pass, result.password)){
								req.session.usuario = result
								res.cookie('usuario', result.email, {maxAge: 10000})
								contador = 5
								res.render('home', {
									usuario: result
								})
							} else {
							
								if(contador == 0){

									db.User.update({
										block: 1
							  		},
							  			{ where: {
											email: req.body.email
							  			}
							  		})
							  		.then(function(result){
										errores = errores.mapped()
										errores.pass = {
											msg: "Contraseña bloqueada, contacte al administrador"
										}
										contador = 5
										res.render('ingreso', {
											errores: errores,
											email: email
										})
									})	  
								} else {

									errores = errores.mapped()
									errores.pass = {
									msg: "Contraseña inválida, tiene " +  contador + " intentos antes de bloquearla"
									}
									contador = contador - 1
									console.log(contador)
									res.render('ingreso', {
										errores: errores,
										email: email
									})
								}
							}}
						}
					} else {
						console.log('entro donde yo queria')
						res.render('registroUser', {
							email: email
						})
					}
				}).catch(function (result){
					console.log(result)
					res.render('ingreso', {
						errores: result
					})
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
	},
	register: function(req, res) {
		
			res.render('registroUser')
    
    
	},
	registerSave: function(req, res) {
		let email = req.body.email
		let username = email.slice(0, email.indexOf('@'))

		db.User.create({
            username: username,
            password: bcrypt.hashSync(req.body.pass1,10),
            email: req.body.email,
            first_name: req.body.first_name,
			last_name: req.body.last_name,
            type_id: 3,
            birth_date: req.body.birth_date,
            cambiopass: 1,
            status: 1,
            block: 0
          })
          .then(function(result){

        res.redirect('/')
    })
    
	}
	
};

module.exports = controller;
