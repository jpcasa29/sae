module.exports = function(liqSeleccionada, liquidaciones, meses){
    let periodo = "";
    for(let i=0; i<liquidaciones.length; i++){
        if (liquidaciones[i].id == liqSeleccionada){
            let mesLiq = meses.filter(function(elemento){
                return elemento.id == liquidaciones[i].nro_mes;
            })
            
            periodo = periodo.concat(liquidaciones[i].anio,mesLiq[0].mesPer)
        }
    }
    return periodo
}