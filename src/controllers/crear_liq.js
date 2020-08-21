const fs = require('fs');
const path = require('path');

const liquidacionesFilePath = path.join(__dirname, '../data/payroll/liquidaciones.json');
const liquidaciones = JSON.parse(fs.readFileSync(liquidacionesFilePath, {encoding: 'utf-8'}));

let liqConstruir = [];
let mes = 1;
let contador = 1;

for(let i=2; i<50;i++){
    if(contador == 5){
        mes = mes + 1;
        contador = 1;
    }
    liqConstruir.push({
        "id": i,
        "nro_mes": mes,
        "anio": 2020,
        "tipo_liq": "MENS",
        "desc_liq": "Liquidación " + mes + "-2020",
        "f_pago": "30." + mes + ".2020",
        "f_acreditacion": "30." + mes + ".2020"
    })
    contador = contador + 1;
}


fs.writeFileSync(liquidacionesFilePath, JSON.stringify(liqConstruir));


