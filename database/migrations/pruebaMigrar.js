const fs = require('fs');
const path = require('path');
let db = require('../models');
const Empleado = require('../models/Empleado');
const Emplid = require('../models/Emplid');

const empleadosFilePath = path.join(__dirname, '../../src/data/empleadosAsql.json');
const empleados = JSON.parse(fs.readFileSync(empleadosFilePath, {encoding: 'utf-8'}));

// --> Creacion de Legajos en EMPLID <--
/*for(let i=0;i<empleados.length;i++){
    db.Emplid.create({
        legajo: empleados[i].legajo_id,
        country_id: 54
    })
    .then(function(result){
        console.log('termine ok')
          })

}*/

// --> Creacion de Legajos en EMPLEADOS <--
for(let i=0;i<empleados.length;i++){
    db.Empleado.create({
        legajo_id: empleados[i].legajo_id,
        nombres: empleados[i].nombres,
        apellidos: empleados[i].apellidos,
        tipo_doc1: empleados[i].tipo_doc_id_1,
        numero_doc1: empleados[i].numero_doc1,
        tipo_doc2: empleados[i].tipo_doc_id_2,
        numero_doc2: empleados[i].numero_doc2,
        estado: empleados[i].estado,
        metodo_pago: empleados[i].metodo_pago,
        cbu: empleados[i].cbu,
        posicion_id: empleados[i].posicion_id,
        obra_social_id: empleados[i].o_soc,
        convenio_id: empleados[i].convenio_id,
        categoria_id: empleados[i].categoria_id,
        tipo_empleado_id: empleados[i].tipo_empleado_id,
        grupo_pago_id: empleados[i].grupo_pago_id,
        base_horaria: empleados[i].base_horaria,
      })
    .then(function(result){
        console.log('termine ok')
          })

}

