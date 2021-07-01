const sumar = require('./sumar');
const multiplicar = require('./multiplicar');

// var restar = require('./restar');

console.log(sumar.sumarDosMasDos());
console.log(sumar.sumar());

console.log('La resta es :', sumar.restar());

console.log('La suma es: ',sumar.suma(100,100));

console.log('La multiplicacion es: ',multiplicar.multiplica(9,9));
