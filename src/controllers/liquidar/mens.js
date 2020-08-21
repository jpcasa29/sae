const fs = require('fs');
const path = require('path');

const empleadosFilePath = path.join(__dirname, '../../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

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

// **** Require de Algoritmos ****
//const sueldoBasico = require('./algoritmos/conceptos/sueldoBasico')


module.exports = function(legajo,liquidacion,periodoLiq){


    //** determino los conceptos a liquidar  */
let conceptosLiq = liqConcepto.filter(function(elemento){
    return elemento.cod_liq == 'MENS';
})

let conceptosLiqDatos = []
let tiposAlgoritmos = [];

//** genera los conceptos con datos a liquidar */
for(let i=0; i< conceptosLiq.length; i++){
    let concepto = conceptosLiq[i].cod_concepto;
    for(let a=0; a<codConcepto.length; a++){
        if(codConcepto[a].codConcepto == concepto){
            conceptosLiqDatos.push({
                "ordenLiq": codConcepto[a].ordenLiq,
                "cod_concepto": concepto,
                "tipo": codConcepto[a].tipo,
                "modo": codConcepto[a].modo,
                "codAlgoritmo": codConcepto[a].codAlgoritmo 
             })
             tiposAlgoritmos.push({
                "tipo": codConcepto[a].tipo,
                "codAlgoritmo": codConcepto[a].codAlgoritmo 
             })
        }
        
    }
}
//** ordena los conceptos a liquidar */
conceptosLiqDatos.sort(function (a, b) {
    if (a.ordenLiq > b.ordenLiq) {
      return 1;
    }
    if (a.ordenLiq < b.ordenLiq) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

tiposAlgoritmos.sort(function (a, b) {
    if (a.tipo > b.tipo) {
      return 1;
    }
    if (a.tipo < b.tipo) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

let legajoXlegajo = legajo
let conceptoXlegajo
let cantidadXlegajo
let porcentajeXlegajo
let valorBaseXlegajo
let importeFinalXlegajo


let idResult = 0;
for(let i=0;i<resultLiq.length;i++){
    idResult = resultLiq[i].id
};
idResult = idResult + 1

//** ejecucion de conceptos de Haberes */
for(let i=0; i < conceptosLiqDatos.length; i++) {
        
        conceptoXlegajo = conceptosLiqDatos[i].cod_concepto
        importeFinalXlegajo = 0;

        
        if(conceptosLiqDatos[i].modo == 'auto' && conceptosLiqDatos[i].tipo == 'HaberRemu'){
        
            let funcionAlgoritmo = require(path.join(__dirname, '/algoritmos/conceptos/', conceptosLiqDatos[i].codAlgoritmo));
            
            importeFinalXlegajo = funcionAlgoritmo(legajoXlegajo,liquidacion)
            
            resultLiq.push({
                "id": idResult,
                "nroLiq": liquidacion,
                "periodo": periodoLiq,
                "legajo": legajoXlegajo,
                "codConcepto": conceptoXlegajo,
                "tipo": conceptosLiqDatos[i].tipo,
                "cantidad": 0,
                "porcentaje": 0,
                "valorBase": 0,
                "importeFinal": importeFinalXlegajo
            })
            
            idResult = idResult + 1;
        }
    }




//** subtotales remunerativos */
for(let i=0; i < conceptosLiqDatos.length; i++) {
        
    conceptoXlegajo = conceptosLiqDatos[i].cod_concepto
    importeFinalXlegajo = 0;

    if(conceptosLiqDatos[i].modo == 'auto' && conceptosLiqDatos[i].tipo == 'Informativos1'){
    
        let funcionAlgoritmo = require(path.join(__dirname, '/algoritmos/conceptos/', conceptosLiqDatos[i].codAlgoritmo));
        
        importeFinalXlegajo = funcionAlgoritmo(legajoXlegajo,liquidacion,resultLiq)
        
        resultLiq.push({
            "id": idResult,
            "nroLiq": liquidacion,
            "periodo": periodoLiq,
            "legajo": legajoXlegajo,
            "codConcepto": conceptoXlegajo,
            "tipo": conceptosLiqDatos[i].tipo,
            "cantidad": 0,
            "porcentaje": 0,
            "valorBase": 0,
            "importeFinal": importeFinalXlegajo
        })
        
        idResult = idResult + 1;
    }
}

//** Descuentos */
for(let i=0; i < conceptosLiqDatos.length; i++) {
        
    conceptoXlegajo = conceptosLiqDatos[i].cod_concepto
    importeFinalXlegajo = 0;

    if(conceptosLiqDatos[i].modo == 'auto' && conceptosLiqDatos[i].tipo == 'DescLegal'){
    
        let funcionAlgoritmo = require(path.join(__dirname, '/algoritmos/conceptos/', conceptosLiqDatos[i].codAlgoritmo));
        
        importeFinalXlegajo = funcionAlgoritmo(legajoXlegajo,liquidacion,resultLiq)
        
        resultLiq.push({
            "id": idResult,
            "nroLiq": liquidacion,
            "periodo": periodoLiq,
            "legajo": legajoXlegajo,
            "codConcepto": conceptoXlegajo,
            "tipo": conceptosLiqDatos[i].tipo,
            "cantidad": 0,
            "porcentaje": 0,
            "valorBase": 0,
            "importeFinal": importeFinalXlegajo
        })
        
        idResult = idResult + 1;
    }
}

//** Subtotal de Descuentos */
for(let i=0; i < conceptosLiqDatos.length; i++) {
        
    conceptoXlegajo = conceptosLiqDatos[i].cod_concepto
    importeFinalXlegajo = 0;

    if(conceptosLiqDatos[i].modo == 'auto' && conceptosLiqDatos[i].tipo == 'Informativos2'){
    
        let funcionAlgoritmo = require(path.join(__dirname, '/algoritmos/conceptos/', conceptosLiqDatos[i].codAlgoritmo));
        
        importeFinalXlegajo = funcionAlgoritmo(legajoXlegajo,liquidacion,resultLiq)
        
        resultLiq.push({
            "id": idResult,
            "nroLiq": liquidacion,
            "periodo": periodoLiq,
            "legajo": legajoXlegajo,
            "codConcepto": conceptoXlegajo,
            "tipo": conceptosLiqDatos[i].tipo,
            "cantidad": 0,
            "porcentaje": 0,
            "valorBase": 0,
            "importeFinal": importeFinalXlegajo
        })
        
        idResult = idResult + 1;
    }
}

//** NETOS */
for(let i=0; i < conceptosLiqDatos.length; i++) {
        
    conceptoXlegajo = conceptosLiqDatos[i].cod_concepto
    importeFinalXlegajo = 0;

    if(conceptosLiqDatos[i].modo == 'auto' && conceptosLiqDatos[i].tipo == 'Informativos3'){
    
        let funcionAlgoritmo = require(path.join(__dirname, '/algoritmos/conceptos/', conceptosLiqDatos[i].codAlgoritmo));
        
        importeFinalXlegajo = funcionAlgoritmo(legajoXlegajo,liquidacion,resultLiq)
        
        resultLiq.push({
            "id": idResult,
            "nroLiq": liquidacion,
            "periodo": periodoLiq,
            "legajo": legajoXlegajo,
            "codConcepto": conceptoXlegajo,
            "tipo": conceptosLiqDatos[i].tipo,
            "cantidad": 0,
            "porcentaje": 0,
            "valorBase": 0,
            "importeFinal": importeFinalXlegajo
        })
        
        idResult = idResult + 1;
    }
}

fs.writeFileSync(resultLiqFilePath, JSON.stringify(resultLiq));

for(let i=0; i<legaLiq.length; i++){
    if(legaLiq[i].id_liq == liquidacion && legaLiq[i].legajos == legajo) {
        legaLiq[i].estado = "liq";
    }
}

fs.writeFileSync(legaLiqFilePath, JSON.stringify(legaLiq));

for(let i=0; i<liquidaciones.length; i++){
    if(liquidaciones[i].id == liquidacion){
        liquidaciones[i].empleLiq = liquidaciones[i].empleLiq + 1;
        liquidaciones[i].empleNoLiq = liquidaciones[i].empleNoLiq - 1;
        
    }
}
fs.writeFileSync(liquidacionesFilePath, JSON.stringify(liquidaciones));

console.log('Liquidacion Terminada')

}


            