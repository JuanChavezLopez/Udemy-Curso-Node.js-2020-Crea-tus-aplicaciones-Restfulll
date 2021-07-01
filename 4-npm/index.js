const d3 = require('d3-time');


var start = new Date(2021, 00 , 01);
var end = new Date(2021, 03, 18);


var miliSegundosDia = 24*60*60*1000;

var resultado = (end - start)/miliSegundosDia;
var resultado2 = d3.timeDay.count(start, end);

console.log(resultado);
console.log(resultado2);