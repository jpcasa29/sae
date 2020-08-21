/*const fs = require('fs');
const path = require('path');

const resultLiqFilePath = path.join(__dirname, '../../../../data/payroll/resultLiq.json');
const resultLiq = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));
*/


//** funcion de redondeo */
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = function(legajoXlegajo, liquidacion, resultLiq) {
    let suman = 0;
    let restan = 0;
    let neto = 0;
    for(let i=0; i < resultLiq.length; i++) {
        if(resultLiq[i].nroLiq == liquidacion && resultLiq[i].legajo == legajoXlegajo && resultLiq[i].codConcepto == "IN-5000") {
            suman = resultLiq[i].importeFinal
        }
        if(resultLiq[i].nroLiq == liquidacion && resultLiq[i].legajo == legajoXlegajo && resultLiq[i].codConcepto == "IN-5002") {
            restan = resultLiq[i].importeFinal
        }
        
    }
    neto = suman - restan;
    return roundToTwo(neto)
}