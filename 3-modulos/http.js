const http = require('http');

// const server = http.createServer();

// server.on('connection', (socket) => {
//     console.log('Nueva conexion detectada.');
// });

// server.listen(3000);

// console.log('Escuchando en el puerto 3000');
const server = http.createServer((req, res) =>{
    if(req.url  === '/'){
        console.log('Entrastes a el home, genial, te devuelvo un saludo!');
        res.write('hola juan...merge la munca!!');
        res.write('Genial...');
        res.end();
    }

    if(req.url == '/carros') {
        console.log('Entrastes a ver los carros.');
        res.write('carros geniales');
        res.end();
    }

    if(req.url == '/moto') {
        console.log('Entrastes a ver motos');
        res.write('motos geniales.');
        res.end();
    }
});

server.listen(3030);

console.log('Estamos escuchando en el puerto 3030.')