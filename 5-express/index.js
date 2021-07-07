const express = require('express')
const app = express();

// !importamos nuestro modulo y de asignamos su ruta
const car = require('./routes/car');
// ! PARSEAR , VAMOS A TRABAJAR CON EL METODO POST, esta es una funcion middleware
app.use(express.json());
app.use('/api/cars/', car);

const port = process.env.PORT || 3000;

const date = require('./date'); //importamos nuestro modulo

const morgan = require('morgan');


// !usamos mrogan
app.use(morgan('tiny'));

// !MIDDLEWARE  EN ARCHIVO EXTERNO date.js

// app.use(date);s

// ! ANIDAMOS OTRO MIDDLEWARE


app.use('/api/loggin',function(req, res, next){
    console.log('Aqui nos estamos logueando..!');
    next();
});

app.use(function(req, res, next){
    console.log('Aqui nos estamos logueando..!');
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.url);
    next();
});

app.use('/api/cars/list', function(req, res, next){
    console.log('Request Type: ', req.method);
    next();
});

// !END POINTS
app.get('/', function (req, res) {
  res.send('Hello World');
  console.log('Nueva conexion al home');
});

app.listen(port, ()=> console.log('Estamos escuchando en el puerto '+ port));
