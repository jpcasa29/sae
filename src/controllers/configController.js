const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let db = require("../database/models");
const { Op } = require("sequelize");
const User = require("../database/models/User");

//const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
//const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));

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

        db.User.findAll({
            include: [
                {association: "types"}
                ],
            where: {
              status: 1
            },
            order: [
              ['email', 'ASC'],
              ]
          })
            .then(function(result){

        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        //res.send(usuarios[0].user)
		res.render('configUsers', {
            usuarios: result,
            usuario: usuario
        })
    })
    },
    add: (req, res) => {
        db.User.findAll({
            include: [
                {association: "types"}
                ],
            where: {
              status: 1
            },
            order: [
              ['email', 'ASC'],
              ]
          })
            .then(function(result){

        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        //res.send(usuarios[0].user)
		res.render('configUsersAdd', {
            usuarios: result,
            usuario: usuario
        })
    })
    },
    addSave: (req, res, next) => {

        db.User.create({
            username: req.body.user,
            password: bcrypt.hashSync(req.body.pass,10),
            email: req.body.email,
            first_name: req.body.nombre,
			last_name: req.body.apellido,
            type_id:req.body.rol,
            birth_date: req.body.birth_date,
            cambiopass: 0,
            status: 1,
            block: 0
          })
          .then(function(result){

        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        
		
        res.redirect('/config/users')
    })
    },
    detail: function(req, res) {
        db.User.findByPk(req.params.id, {
            include: [
              {association: "types"}
              ],
          })
            .then(function(result){
                let usuario
                    if(req.session.usuario) {
                    usuario = req.session.usuario;
                    } else {
                    usuario = 'Juan'
                    }
                res.render('configUserDetail', {
                    usuarios: result,
                    usuario: usuario
                })
            })
    },
    detailSave: function(req, res) {
        db.User.update({
            block: req.body.block
          },
          { where: {
            email: req.body.email
          }
          })
            .then(function(result){
                
                res.redirect('/config/users')
            })
    }
	
};

module.exports = controller;
