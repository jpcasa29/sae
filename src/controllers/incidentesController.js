const fs = require('fs');
const path = require('path');
let db = require('../database/models');
const { Op } = require("sequelize");
const Incident = require("../database/models/Incident");
//const Empleado = require('../../database/models/Empleado');

const incidentesFilePath = path.join(__dirname, '../data/incidentes.json');
const incidentes = JSON.parse(fs.readFileSync(incidentesFilePath, {encoding: 'utf-8'}));



const incidentesController = {
	
	mostrar: (req, res) => {
		
		db.Incident.findAll({
            include: [
				{association: "types"},
				{association: "status"},
				{association: "user"}
                ],
            where: {
              status_id: 1
            },
            order: [
              ['id', 'ASC'],
              ]
          })
            .then(function(result){
		
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		res.render('incidentes', {
			incidentes: result,
			usuario: usuario
		});
	})
		

	},
	mostrarIncidente: (req, res) => {

		db.Incident.findByPk(req.params.id, {
			include: [
				{association: "types"},
				{association: "status"},
				{association: "user"}
			  ],
		  })
			.then(function(result){

		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		
		
		res.render('idIncidente', {
				incidente: result,
				usuario: usuario
		});
	})
	}
		
	
}

module.exports = incidentesController