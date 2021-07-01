const os = require('os');

console.log('Version SO', os.release());
console.log('Memoria libre', os.freemem());
console.log('Memortia total: ', os.totalmem());