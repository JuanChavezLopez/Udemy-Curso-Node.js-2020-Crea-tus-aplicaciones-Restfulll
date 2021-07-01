const EventEmitter = require('events');

const emitter = new EventEmitter();


// !escuchando un evento
emitter.on('event', function(){
    console.log('Se ha ejecutado un evento');
})

// !lanzando un evento

emitter.emit('event');


// !evento con argumentos
emitter.on('eventWithArgument', function(arg){
    console.log('Un evento con los siguientes argumentos ha ocurrido: '+ arg.id + ' y  ' + arg.numero)
});

emitter.emit('eventWithArgument', {id:1, numero:20});


// !evento flecha
emitter.on('eventArrow', function(arg){
    console.log('Un evento con funcion arrow: '+ arg.id + ' y  ' + arg.numero)
});

emitter.emit('eventArrow', {id:1, numero:20});