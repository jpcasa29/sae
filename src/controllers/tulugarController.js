const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let db = require("../database/models");
const { Op } = require("sequelize");

//const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
//const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));

let tiposEscritorios = [
    'escritorio_verde.png',
    'escritorio_rojo.png',
    'aun nada',
    'pasillo.png',
    'impresora.png',
    'escritorio_no.png'
]
let letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
]

const controller = {
	index: (req, res) => {
        let usuario = req.session.usuario;
        let acceso = usuario.areas;
        
        let promesaDesk = db.Desk.findAll({
            include: {
                all: true
            }
        })
        let promesaLocations = db.Locations.findAll({
            include: {
                all: true
            }
        })
        let promesaReservation = db.Reservation.findAll({
            include: {
                all: true
            }
        })
        
    Promise.all([promesaDesk, promesaLocations, promesaReservation])
        .then(function([resultadoDesk, resultadoLocations, resultadoReservation]){
            
            //return res.send(resultadoDesk)
            let deskLibres = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 1;
            })
            let deskOcupados = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 2;
            })
            let deskReservados = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 3;
            })
            let deskPendLimpieza = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 4;
            })
            
            for (let i=0;i<acceso.length;i++){
                for(let j=0; i<resultadoLocations.length;i++){
                    if(acceso[i].location_id == resultadoLocations[j].id){
                        acceso[i].location_id = resultadoLocations[j]
                    }
                    
                }
            }
            
		res.render('tulugar', {
            deskLibres: deskLibres,
            deskOcupados: deskOcupados,
            deskReservados: deskReservados,
            deskPendLimpieza: deskPendLimpieza,
            acceso: acceso,
            escritorios: resultadoDesk,
            locations: resultadoLocations,
            tipos: tiposEscritorios,
            usuario: usuario,
            letras: letras
        })
    })
    },
    detalle: (req, res) => {

        let usuario = req.session.usuario;
        
        //return res.send(req.params.id)
        let promesaDesk = db.Desk.findAll({
            include: {
                all: true
            },
            where: {
                area_id: req.params.id
            }
        })
        
        let promesaReservation = db.Reservation.findAll({
            include: {
                all: true
            }
        })
        
    Promise.all([promesaDesk, promesaReservation])
        .then(function([resultadoDesk, resultadoReservation]){
            
            //return res.send(resultadoDesk)
            let deskLibres = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 1;
            })
            let deskOcupados = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 2;
            })
            let deskReservados = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 3;
            })
            let deskPendLimpieza = resultadoDesk.filter(function(elemento){
                return elemento.status.id == 4;
            })
            
        //return res.send(resultadoDesk)    
            
		res.render('tulugarDetalle', {
            deskLibres: deskLibres,
            deskOcupados: deskOcupados,
            deskReservados: deskReservados,
            deskPendLimpieza: deskPendLimpieza,
            escritorios: resultadoDesk,
            tipos: tiposEscritorios,
            usuario: usuario,
            letras: letras
        })
    })

    },
    reserva: (req, res) => {
        
        let usuario = req.session.usuario;
        let date = new Date()
        
        let promesaDesk = db.Desk.update({
            status_id: 3
          },
          { where: {
            id: req.body.id
          }
          })
        
        let promesaReservation = db.Reservation.create({
            desk_id: req.body.id,
            user_id: usuario.email,
            date: date,
            status: 1
          })
        
    Promise.all([promesaDesk, promesaReservation])
        .then(function([resultadoDesk, resultadoReservation]){
            
        return res.json(resultadoReservation);
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
