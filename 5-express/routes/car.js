const express = require('express')
// const app = express();
// !express- validator
const { check, validationResult } = require('express-validator');

const router = express.Router();

// !ARRAY DE COCHES

var coches = [
    { id:0, company:'BMW', model:'X3', year: '2020'},
    { id:1, company:'Audi', model:'A', year: '2021'},
    { id:2, company:'Mercedes', model:'Clase A', year: '2022'}
]

// !END POINTS
router.get('/list', function (req, res) {
    res.send(['bmw s1', 'audi', 'mercedes clase A']);
    console.log('Nueva conexion a los carros');
});
  
router.get('/id/:id', (req, res) => {
    res.send(req.params.id);
});

router.get('/:company/:model', (req, res) => {
    res.send(req.params);
});

router.get('/', (req, res) =>{
    res.send(coches);
});
  
  // !BUSCAR DENTRO DEL ARRAY
  
  router.get('/:company', (req, res) =>{
      const coche = coches.find(coche =>coche.company === req.params.company);
  
      if(!coche){
          res.status(404).send('No tenemos ningun coche de esa marca');
      }else{
          res.send(coche);
      }
  });
  
  router.post('', (req, res) => {
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
  router.post('/2', (req, res) => {
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
  
  router.post('/3', [
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
  router.put('/:id', [
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
  
  router.delete('/:id', (req, res) =>{
      const coche = coches.find(coche => coche.id === parseInt(req.params.id));
  
      if(!coche) {
          return res.status(404).send('El coche no esta.!!..no se puede borrar');
      }
  
      const index = coches.indexOf(coche);
      coches.splice(index,1);
      res.status(200).send('Coche borrado');
  
  });
   
  module.exports = router;