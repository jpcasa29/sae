const fs = require('fs');
const path = require('path');
let db = require('../../database/models');
//const Empleado = require('../../database/models/Empleado');

const incidentesFilePath = path.join(__dirname, '../data/incidentes.json');
const incidentes = JSON.parse(fs.readFileSync(incidentesFilePath, {encoding: 'utf-8'}));



const incidentesController = {
	
	mostrar: (req, res) => {
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		res.render('incidentes', {
			incidentes: incidentes,
			usuario: usuario
		});
		

	},
	mostrarIncidente: (req, res) => {
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		let incidente = incidentes.filter(function(elemento){
			return elemento.Legajo == req.params.id;
		
		})
		res.render('idempleado', {
				empleados: incidente,
				usuario: usuario
		});
	}
		
	
}

module.exports = incidentesController