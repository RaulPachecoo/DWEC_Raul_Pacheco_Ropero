//window objeto global
//screen

//propiedades
console.log(window.innerHeight,
            window.innerWidth,
            window.outerHeight, 
            window.outerWidth

); 

//métodos
// window.setTimeout(()=>{
//     console.log("Mensaje diferido")
// }, 3000); 


// console.log("El script se cargó hace: "); 
// let segundos = 0; 
// let intervalo = window.setInterval(()=>{
//     segundos++;
//     console.log(segundos + " segundos"); 
//     if(segundos == 5){
//         clearInterval(intervalo); 
//     }
// }, 1000);


// window.alert("Hola esto es una ventana bastante molesta"); 

// window.confirm("¿Aceptas?"); 

//let valor = window.prompt("Dame un valor"); 

let URL = "https://www.youtube.com/"
let destino = "_blank"; 
let carac = "height=400, width=600, resizable"; 


let ventana = window.open(URL, destino, carac); 
//ventana.resizeTo(1000, 800); 
 
//ventana.resizeBy(200, 200); 

// ventana.moveTo(900, 500); 

//screen
console.log(
    screen.width,
    screen.height, 
    screen.availHeight, 
    screen.availWidth,
    screen.colorDepth, 
    screen.orientation
); 


