const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({id: 1, model:'Seat', company: 'Seat'});
        reject(new Error('Se ha producido un error al leer la BBDD'));
    }, 1000)
})

promesa
    .then(result => console.log(result))
    .catch(err => console.error(err.message));