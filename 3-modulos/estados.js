const http = require('http');


const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hola a todos</h1>');
    res.write('<p>Mi web de coches</p>');
}).listen(5050);

console.log('Estamos escuchando tu peticion.')