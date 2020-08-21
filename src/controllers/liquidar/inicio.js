const fs = require('fs');
const path = require('path');

const empleadosFilePath = path.join(__dirname, '../../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

const mesesFilePath = path.join(__dirname, '../../data/meses.json');
const meses = JSON.parse(fs.readFileSync(mesesFilePath, {encoding: 'utf-8'}));

const liquidacionesFilePath = path.join(__dirname, '../../data/payroll/liquidaciones.json');
const liquidaciones = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));

const legaLiqFilePath = path.join(__dirname, '../../data/payroll/legaLiq.json');
const legaLiq = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));

const liqConceptoFilePath = path.join(__dirname, '../../data/payroll/liqConcepto.json');
const liqConcepto = JSON.parse(fs.readFileSync(liqConceptoFilePath, {encoding: 'utf-8'}));

const codConceptoFilePath = path.join(__dirname, '../../data/payroll/codConcepto.json');
const codConcepto = JSON.parse(fs.readFileSync(codConceptoFilePath, {encoding: 'utf-8'}));

const resultLiqFilePath = path.join(__dirname, '../../data/payroll/resultLiq.json');
const resultLiq = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));

const mens = require(path.join(__dirname, '/mens.js'))
const periodo = require(path.join(__dirname, '/periodo.js'))

module.exports = function(liquidacion) {

let liqSeleccionada = liquidacion;
let legajosLiquidar = []
let periodoLiq = periodo(liqSeleccionada, liquidaciones, meses)

let legaLiqAct4 = JSON.parse(fs.readFileSync(legaLiqFilePath, {encoding: 'utf-8'}));
//** determino los legajos a liquidar segun LEGALIQ */
for(let i=0; i < legaLiq.length; i++){
    if(legaLiqAct4[i].id_liq == liqSeleccionada && legaLiqAct4[i].estado != "liq"){
    legajosLiquidar.push(legaLiqAct4[i].legajos)
    }
}

if(legajosLiquidar == "") {
 
    console.log('No hay legajos para liquidar');
    
} else {

for(let i=0; i<legajosLiquidar.length; i++){
    let legajoLiquidado = mens(legajosLiquidar[i],liqSeleccionada,periodoLiq)
    
}
} 
}