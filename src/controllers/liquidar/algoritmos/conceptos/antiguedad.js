const fs = require('fs');
const path = require('path');

const empleadosFilePath = path.join(__dirname, '../../../../data/empleados.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

//** funcion de redondeo */
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = function(legajo, liquidacion) {
    for(let i=0; i < empleados.length; i++) {
        if(empleados[i].Legajo == legajo) {
            return roundToTwo(((empleados[i].sueldo_basico * 1) / 100)* empleados[i].ETC)
        }
    }
    
    return false
}