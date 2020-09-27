// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session')

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(session({secret: 'Esto es secreto'}))

// ************ Template Engine  ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main
const configRouter = require('./routes/config'); // Rutas config
const tulugarRouter = require('./routes/tulugar'); // Rutas tulugar


app.use('/', mainRouter);
app.use('/config', configRouter);
app.use('/tulugar', tulugarRouter);


app.listen(3000, function() {
  console.log('Servidor corriendo en el puerto 3000')
})

// ************ exports app - dont'touch ************
module.exports = app;