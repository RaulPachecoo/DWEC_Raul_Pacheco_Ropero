console.log("Inicio");
//asincrono
setTimeout(()=> {
    for (let i = 0; i < 1e5; i++){
        console.log("Dentro del settimeout");
    }
}, 0); 

console.log("Fin"); 