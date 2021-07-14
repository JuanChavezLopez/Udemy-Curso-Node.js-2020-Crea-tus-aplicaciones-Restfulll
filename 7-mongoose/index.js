const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carsdb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectar MongoDB'))


const carSchema= new mongoose.Schema({
    company: String,
    model: String,
    price: Number,
    year: Number,
    sold: Boolean,
    extras: [String],
    date: {type: Date, default:Date.now}
})

const Car = mongoose.model('car', carSchema);

// !BUSCAR TODOS LOS CARROS
// getCars();
async function getCars() {
    const cars = await Car.find();
    console.log(cars);
}


// !BUSCAR POR DOS CARACTERISTICAS
// getCompanyAndSoldFilterCars();
async function getCompanyAndSoldFilterCars(){
    const cars = await Car.find({company: 'BMW', sold: false});
    console.log(cars);
}

// getMoreFilterCar();
async function getMoreFilterCar(){
    const cars = await Car
    .find({company:'BMW', sold: false})
    .sort({price: -1})
    .limit(2)
    .select({company:1, model:1, price:1});
    console.log(cars);
}

// !FILTRO CON OPERADORES

// getFilterPriceCars();
async function getFilterPriceCars(){
    const cars = await Car
        .find({price: {$gte: 2000, $lt:5000}});
    console.log(cars);
}

// !FILTRO CON OPERADORES IN / NIN
getFilterPriceInNinCars();
async function getFilterPriceInNinCars(){
    const cars = await Car
        .find({extras: {$in: 'Manual'}});
    console.log(cars);
}



createCar();

async function createCar(){
    const car = new Car({
        company: 'BMW',
        model: 'A3',
        price: 100,
        year: 1001,
        sold: false,
        extras: ['Manual', '4*4']
    })

   const result = await car.save();
   console.log(result);
}

