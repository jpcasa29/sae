const fs = require('fs');
const path = require('path');


const empleadosFilePath = path.join(__dirname, '../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

const mesesFilePath = path.join(__dirname, '../data/meses.json');
const meses = JSON.parse(fs.readFileSync(mesesFilePath, {encoding: 'utf-8'}));

const liquidacionesFilePath = path.join(__dirname, '../data/payroll/liquidaciones.json');
const liquidaciones = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));

const tipoLiqFilePath = path.join(__dirname, '../data/payroll/tipoLiq.json');
const tipoLiq = JSON.parse(fs.readFileSync(tipoLiqFilePath, {encoding: 'utf-8'}));

const legaLiqFilePath = path.join(__dirname, '../data/payroll/legaLiq.json');
const legaLiq = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));

const resultLiqFilePath = path.join(__dirname, '../data/payroll/resultLiq.json');
const resultLiq = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));

const codConceptoFilePath = path.join(__dirname, '../data/payroll/codConcepto.json');
const codConcepto = JSON.parse(fs.readFileSync(codConceptoFilePath, {encoding: 'utf-8'}));

let Empresa = ['Jumbo Retail Argentina', 'Easy Argentina', 'Cencosud Corporación Argentina', 'Blaisten Argentina']
let Convenio = ['DC', 'FC']

const iniciarLiquidacion = require('../controllers/liquidar/inicio');

let contador = 0;
for (let i=0; i < liquidaciones.length; i++) {
    contador = liquidaciones[i].id
} 
contador = contador + 1



const payrollController = {
	// Root - Show all products
	principal: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
		res.render('payroll', {
            empleados: empleados,
            usuario: usuario
		});
    },
    index: (req, res, next) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        res.render('_payrollProcess', {
            meses: meses,
            liquidaciones: liquidaciones,
            usuario: usuario
        })
    },
    process: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        let liqAnio = liquidaciones.filter(function(elemento){
            return elemento.anio == req.params.anio;
        });
        res.render('_payrollProcess', {
            empleados: empleados,
            meses: meses,
            liquidaciones: liqAnio,
            usuario: usuario
        })
    },
    crearLiq: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        res.render('_crearLiq', {
            contador: contador,
            meses: meses,
            empleados: empleados,
            tipoLiq: tipoLiq,
            usuario: usuario
        })
    },
    saveLiq: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        let mesEnviado = Number(req.body.mes)
        let anioEnviado = Number(req.body.anioLiq)
        liquidaciones.push({
            "id": contador,
            "nro_mes": mesEnviado,
            "anio": anioEnviado,
            "tipo_liq": req.body.tipoLiq,
            "desc_liq": req.body.descLiq,
            "f_pago": req.body.f_pago,
            "f_acreditacion": req.body.f_acreditacion,
            "empleTot": 0,
            "empleLiq": 0,
            "empleNoLiq": 0
            
        });
        fs.writeFileSync(liquidacionesFilePath, JSON.stringify(liquidaciones));
        res.render('_payrollProcess', {
            meses: meses,
            liquidaciones: liquidaciones,
            usuario: usuario
        })
        
    },
    verLiq: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        let liqSeleccionada = liquidaciones.filter(function(elemento){
            return elemento.id == req.params.id;
        });

        for(let i=0; i<legaLiq.length; i++){

        }
        
        res.render('_payrollDetalle', {
            empleados: empleados,
            meses: meses,
            liquidaciones: liqSeleccionada,
            usuario: usuario
        })
    },
    update: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }

        let liqSeleccionada = liquidaciones.filter(function(elemento){
            return elemento.id == req.params.id;
        });

        

        res.send('actualizar liquidacion')
    },
    delete: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        res.send('Eliminar liquidacion')
    },
    addEmple: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
        let liqSeleccionada = liquidaciones.filter(function(elemento){
            return elemento.id == req.params.id;
        });
        res.render('_payrollAddEmple', {
            empleados: empleados,
            meses: meses,
            liquidaciones: liqSeleccionada,
            Empresa: Empresa,
            Convenio: Convenio,
            usuario: usuario
        })
    },
    putAddEmple: (req, res) => {
        let usuario
        if(req.session.usuario) {
            usuario = req.session.usuario;
        } else {
            usuario = 'Juan'
        }
       
        let empleSeleccionado = empleados.filter(function(elemento){
                return elemento.Legajo == req.body.legajo;
                                    
        });

        let liqSeleccionado = liquidaciones.filter(function(elemento){
            return elemento.id == req.body.idLiq;
        });
        let mesLiq = meses.filter(function(elemento){
            return elemento.id == liqSeleccionado[0].nro_mes;
        })
        let periodo = "";
        periodo = periodo.concat(liquidaciones[0].anio,mesLiq[0].mesPer)
        
        let ubicLiq = 0
        

        if(empleSeleccionado == "") {
            return res.send('el empleado no existe en la base')
        }

        for (let i=0; i < legaLiq.length; i++) {
            if(legaLiq[i].id_liq == req.body.idLiq && legaLiq[i].legajos == empleSeleccionado[0].Legajo) {
                return res.send('el empleado ya existe en esa liquidacion')
            } 
        }
        for (let i=0; i < legaLiq.length; i++) {
            if(legaLiq[i].id_liq == req.body.idLiq && legaLiq[i].legajos == '') {
                legaLiq[i].legajos = empleSeleccionado[0].Legajo;
                fs.writeFileSync(legaLiqFilePath, JSON.stringify(legaLiq));
                

                for(let a=0; a<liquidaciones.length; a++){
                    if(liquidaciones[a].id == req.body.idLiq){
                        liquidaciones[a].empleTot = liquidaciones[a].empleTot + 1;
                        liquidaciones[a].empleNoLiq = liquidaciones[a].empleNoLiq + 1;
                        
                    }
                }
                
                fs.writeFileSync(liquidacionesFilePath, JSON.stringify(liquidaciones));
                return res.redirect('/payroll/process')
            }
        } 
            
        let nuevaLegaLiq = {
            id_liq: req.body.idLiq,
            periodo: periodo,
            legajos: empleSeleccionado[0].Legajo,
            estado: 'no'
            }
            legaLiq.push(nuevaLegaLiq)
            fs.writeFileSync(legaLiqFilePath, JSON.stringify(legaLiq));

            for(let a=0; a<liquidaciones.length; a++){
                if(liquidaciones[a].id == req.body.idLiq){
                    liquidaciones[a].empleTot = liquidaciones[a].empleTot + 1;
                    liquidaciones[a].empleNoLiq = liquidaciones[a].empleNoLiq + 1;
                    
                }
            }
            fs.writeFileSync(liquidacionesFilePath, JSON.stringify(liquidaciones));
            return res.redirect('/payroll/process') 
        },
    liquidar: (req, res) => {
            let usuario
            if(req.session.usuario) {
            usuario = req.session.usuario;
            } else {
            usuario = 'Juan'
            }
            let legaLiqSeleccionada = legaLiq.filter(function(elemento){
            return elemento.id_liq == req.params.id;
            });
            let liqSeleccionada = liquidaciones.filter(function(elemento){
            return elemento.id == req.params.id;
            });

            
            res.render('_payrollLiquidar', {
            empleados: empleados,
            meses: meses,
            liquidaciones: liqSeleccionada,
            legaLiquidaciones: legaLiqSeleccionada,
            Empresa: Empresa,
            Convenio: Convenio,
            usuario: usuario
        })
        },
        liquidarEjecutar: (req, res) => {
            let usuario
            if(req.session.usuario) {
                usuario = req.session.usuario;
            } else {
                usuario = 'Juan'
            }
            let legaLiqAct1 = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));
            let liquidacionesAct1 = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));

            let liqSeleccionada = liquidacionesAct1.filter(function(elemento){
                return elemento.id == req.params.id;
            });
            
            iniciarLiquidacion(liqSeleccionada[0].id)

            let legaLiqAct2 = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));
            let liquidacionesAct2 = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));
            let resultLiqAct2 = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));

            let liqSeleccionadaLiquidada = liquidacionesAct2.filter(function(elemento){
                return elemento.id == req.params.id;
            });
            let legaLiqSeleccionada = legaLiqAct2.filter(function(elemento){
                return elemento.id_liq == req.params.id;
            });
            
                        
            res.render('_payrollLiquidar', {
                empleados: empleados,
                meses: meses,
                liquidaciones: liqSeleccionadaLiquidada,
                legaLiquidaciones: legaLiqSeleccionada,
                Empresa: Empresa,
                Convenio: Convenio,
                usuario: usuario
            })
        },
        liquidarVer: (req, res) => {
            let usuario
            if(req.session.usuario) {
                usuario = req.session.usuario;
            } else {
                usuario = 'Juan'
            }
            let resultLiqAct3 = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));
            let liqSeleccionada = resultLiqAct3.filter(function(elemento){
                return elemento.nroLiq == req.params.id && elemento.legajo == req.params.leg;
            });
            

            res.render('_payrollConsultaLiq', {
                empleados: empleados,
                meses: meses,
                resultLiqSeleccionada: liqSeleccionada,
                usuario: usuario,
                codConcepto: codConcepto
            })
        }
 
}

module.exports = payrollController