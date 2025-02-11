/*
validación: mixta: JS+HTML
momento de validación: input y submit
mensajes: JS
estilos: 
*/

function compararValor(){
    let claves = document.querySelectorAll("[type=password]"); 
    if(claves[0].value != claves[1].value){
        claves[1].setCustomValidity("Las claves no coinciden");
        claves[1].classList.add('no-valido'); 
        claves[1].classList.remove('valido'); 
    } else{
        claves[1].setCustomValidity(""); 
        claves[1].classList.add('valido'); 
        claves[1].classList.remove('no-valido'); 
    }

    claves[0].reportValidity(); 
    claves[1].reportValidity(); 
}

let formulario = document.querySelector("form"); 
formulario.addEventListener('input', evento =>{
    //Solo con las claves
    if(evento.target.id == "confirm-password"){
        compararValor(); 
    }
});


