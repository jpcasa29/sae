/*const fs = require('fs');
const path = require('path');

const resultLiqFilePath = path.join(__dirname, '../../../../data/payroll/resultLiq.json');
const resultLiq = JSON.parse(fs.readFileSync(resultLiqFilePath, {encoding: 'utf-8'}));
*/

let porcenAporteJubi = 0.11;

//** funcion de redondeo */
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = function(legajoXlegajo, liquidacion, resultLiq) {
    let sumatoria = 0;
    for(let i=0; i < resultLiq.length; i++) {
        if(resultLiq[i].nroLiq == liquidacion && resultLiq[i].legajo == legajoXlegajo && resultLiq[i].codConcepto == "IN-5000") {
            sumatoria = resultLiq[i].importeFinal * porcenAporteJubi;
        }
    }
    
    return roundToTwo(sumatoria)
}