const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
// !express- validator
const { check, validationResult } = require('express-validator');

const date = require('./date');


// ! PARSEAR , VAMOS A TRABAJAR CON EL METODO POST
app.use(express.json());

// !MIDDLEWARE

app.use(date);

// ! ANIDAMOS OTRO MIDDLEWARE
app.use(function(req, res, next){
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.url);
    next();
})

// !ARRAY DE COCHES

var coches = [
    { id:0, company:'BMW', model:'X3', year: '2020'},
    { id:1, company:'Audi', model:'A', year: '2021'},
    { id:2, company:'Mercedes', model:'Clase A', year: '2022'}
]
 
app.get('/', function (req, res) {
  res.send('Hello World');
  console.log('Nueva conexion al home');
});

app.get('/api/cars/list', function (req, res) {
  res.send(['bmw s1', 'audi', 'mercedes clase A']);
  console.log('Nueva conexion a los carros');
});

app.get('/api/cars/id/:id', (req, res) => {
  res.send(req.params.id);
});

app.get('/api/cars/:company/:model', (req, res) => {
  res.send(req.params);
});

app.get('/api/cars/', (req, res) =>{
    res.send(coches);
})

// !BUSCAR DENTRO DEL ARRAY

app.get('/api/cars/:company', (req, res) =>{
    const coche = coches.find(coche =>coche.company === req.params.company);

    if(!coche){
        res.status(404).send('No tenemos ningun coche de esa marca');
    }else{
        res.send(coche);
    }
});

app.post('/api/cars', (req, res) => {
    var CardId= coches.length;

    var coche = {
        id: CardId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    coches.push(coche);
    res.status(201).send(coche);
});

// ! VERIFICAR SI NOS MANDAN CAMPOS VACIOS
app.post('/api/cars2', (req, res) => {
    if(!req.body.company || req.body.company.length < 3) {
        res.status(400).send('Introduce la empresa correcta!.');
        return;
    }

    var CardId= coches.length;

    var coche = {
        id: CardId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    coches.push(coche);
    res.status(201).send(coche);
});
// ! EXPRESS - VALIDATOR

app.post('/api/cars3', [
    check("company").isEmail(),
    check('model').isLength({min:3})

    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        var CardId= coches.length;

        var coche = {
            id: CardId,
            company: req.body.company,
            model: req.body.model,
            year: req.body.year
        }
        coches.push(coche);
        res.status(201).send(coche);
});

// !USAR EL METODO PUT, PARA MODIFICAR
app.put('/api/cars4/:id', [
    check("company").isLength({min:3}),
    check('model').isLength({min:3})
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const coche = coches.find(coche => coche.id === parseInt(req.params.id));
        if(!coche){
           return  res.status(404).send('El coche con ese ID no esta en la BBDD.')
        }

        coche.company = req.body.company;
        coche.model = req.body.model;
        coche.year = req.body.year;

        res.status(200).send();
});

// !METODO DELETE

app.delete('/api/cars/:id', (req, res) =>{
    const coche = coches.find(coche => coche.id === parseInt(req.params.id));

    if(!coche) {
        return res.status(404).send('El coche no esta.!!..no se puede borrar');
    }

    const index = coches.indexOf(coche);
    coches.splice(index,1);
    res.status(200).send('Coche borrado');

});
 
app.listen(port, ()=> console.log('Estamos escuchando en el puerto '+ port));
