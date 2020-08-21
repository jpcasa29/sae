const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator')

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));


const controller = {
	ingreso: (req, res) => {
		res.render('ingreso')
	},
	login: (req, res) => {
		let errores = validationResult(req)
		if(errores.isEmpty()){
			for(let i=0; i<usuarios.length; i++){
			
				if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.pass, usuarios[i].passHash)){
					if(usuarios[i].cambioPass != 0){
					
						let usuarioALoguear = usuarios[i].email
						req.session.usuario = usuarioALoguear
						
						res.render('home', {
							usuario: usuarioALoguear
							})
					} else {
						res.render('_cambioPassInicial', {
							usuario: usuarios[i]
						})
					}
				} 
			}
			let userPass = "Usuario o contraseña incorrectos"
			res.render('ingreso', {
				errores2: userPass
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
			for(let i=0; i<usuarios.length; i++){
				
				if(usuarios[i].email == req.body.email) {
					usuarios[i].passHash = bcrypt.hashSync(req.body.pass1,10)
					usuarios[i].cambioPass = usuarios[i].cambioPass + 1
					
					let usuariosJSON = JSON.stringify(usuarios);
					fs.writeFileSync(usuariosFilePath, usuariosJSON)
					res.redirect('/')
				}
			}
			res.send('usuario no encontrado')
		} else {
			res.render('_cambioPassInicial', {
				errores: errores.mapped()
		})

	}
}
	
};

module.exports = controller;
