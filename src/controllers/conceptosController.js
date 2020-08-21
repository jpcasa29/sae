const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const empleadosFilePath = path.join(__dirname, '../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

const mesesFilePath = path.join(__dirname, '../data/meses.json');
const meses = JSON.parse(fs.readFileSync(mesesFilePath, {encoding: 'utf-8'}));

const liquidacionesFilePath = path.join(__dirname, '../data/payroll/liquidaciones.json');
const liquidaciones = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));

const legaLiqFilePath = path.join(__dirname, '../data/payroll/legaLiq.json');
const legaLiq = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));

const codConceptoFilePath = path.join(__dirname, '../data/payroll/codConcepto.json');
const codConcepto = JSON.parse(fs.readFileSync(codConceptoFilePath, {encoding: 'utf-8'}));

let Empresa = ['Jumbo Retail Argentina', 'Easy Argentina', 'Cencosud Corporación Argentina', 'Blaisten Argentina']
let Convenio = ['DC', 'FC']

let idCodConcepto = 0;
for (let i=0; i < codConcepto.length; i++){
    idCodConcepto = codConcepto[i].id;
}
idCodConcepto = idCodConcepto + 1

const controller = {
    conceptos: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        
        //res.send(codConcepto)
        res.render('configConceptos', {
			conceptos: codConcepto,
			usuario: usuario
		});
        

    },
    conceptosDetalle: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        res.send('detalle de concepto')
        
    },
    conceptosAdd: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        res.render('configConceptosAdd', {
			usuario: usuario
		});
    },
    conceptosAddSave: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }

        for(let i=0; i < codConcepto.length; i++) {
            if(codConcepto[i].codConcepto == req.body.codConcepto) {
                return res.send('el concepto ya existe')
            }
        }

        let idCodConcepto = 0;
        for (let i=0; i < codConcepto.length; i++){
            idCodConcepto = codConcepto[i].id;
        }
        idCodConcepto = idCodConcepto + 1

        let nuevoConcepto = {
            id: idCodConcepto,
            codConcepto: req.body.codConcepto,
            descConcepto: req.body.descConcepto,
            tipo: req.body.tipo,
            modo: req.body.modo,
            codAlgoritmo: req.body.codAlgoritmo
        }
        codConcepto.push(nuevoConcepto)
        fs.writeFileSync(codConceptoFilePath, JSON.stringify(codConcepto));
        return res.redirect('/config/conceptos')
        
    }
	
};

module.exports = controller;
