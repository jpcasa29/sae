let db = require('../../database/models')
let sequilize = db.sequelize;

sequilize.query("SELECT * FROM artistas")
    .then(function(resultados) {
        let peliculas = resultados[0]
        console.log(peliculas)
    })