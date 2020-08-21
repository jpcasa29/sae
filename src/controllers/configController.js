const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));

const controller = {
	index: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		res.render('config', {
            usuario: usuario
        })
    },
    users: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        //res.send(usuarios[0].user)
		res.render('configUsers', {
            usuarios: usuarios,
            usuario: usuario
        })
    },
    add: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        //res.send(usuarios[0].user)
		res.render('configUsersAdd', {
            usuarios: usuarios,
            usuario: usuario
        })
    },
    addSave: (req, res, next) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        
		let nuevoRegistro = {
            user: req.body.user,
            passHash: bcrypt.hashSync(req.body.pass,10),
            email: req.body.email,
            nombre: req.body.nombre,
			apellido: req.body.apellido,
            rol:req.body.rol,
            legajo: req.body.legajo,
            cambioPass: 0
		}
		usuarios.push(nuevoRegistro)
		let usuariosJSON = JSON.stringify(usuarios);
		fs.writeFileSync(usuariosFilePath, usuariosJSON)
		/*res.render('configUsers', {
            usuarios: usuarios,
            usuario: usuario
        });*/
        res.redirect('/config/users')
    },
    conceptos: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }


    },
    conceptosDetalle: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }

        
    }
	
};

module.exports = controller;
