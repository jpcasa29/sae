const fs = require('fs');
const path = require('path');
let db = require('../../database/models');
const Empleado = require('../../database/models/Empleado');

const empleadosFilePath = path.join(__dirname, '../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));



const empleadosController = {
	
	empleados: (req, res) => {
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		res.render('empleados', {
			usuario: usuario
		})
	},
	mostrar: (req, res) => {
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		/*res.render('empleados', {
			empleados: empleados,
			usuario: usuario
		});*/
		
		db.Empleado.findAll({
			where: {
			  estado: 'ACTI'
			},
			order: [
			  ['legajo_id', 'ASC'],
			  ]
		  })
			.then(function(result){
			  //res.send(result)
				res.render('empleados', {
				empleados: result,
				usuario: usuario
			  })
			})

	},
	mostrarEmpleado: (req, res) => {
		let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		let empleado = empleados.filter(function(elemento){
			return elemento.Legajo == req.params.id;
		
		})
		res.render('idempleado', {
				empleados: empleado,
				usuario: usuario
		});
	}
		
	
}

module.exports = empleadosController