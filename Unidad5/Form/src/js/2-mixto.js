/* 
validación: nativa
mensajes: JS
momento de validación: input y submit
mensajes: JS
estilos: nativos
*/

const validarCampo=campo=>{
    campo.setCustomValidity("");  //sobreescribir los msj de error nativos
    //si yo le doy un valor, el validador considera el campo no válido

    // if(campo.name == "nombre"){
    //     if(campo.required){
    //         campo.setCustomValidity("Este campo es obligatorio y no puede estar en blanco"); 
    //     }
    // }

    if(!campo.validity.valid){
        campo.setCustomValidity("Este campo es obligatorio y no puede estar en blanco");
    }

    campo.reportValidity(); 
    
}; 



const formulario = document.getElementsByTagName("form")[0]; 
const campos = document.querySelectorAll("input"); 


formulario.addEventListener('input', evento=>{
    if(evento.target.tagName=='INPUT'){
        validarCampo(evento.target); 
    }
}); 

formulario.addEventListener('submit', function(evento){
    campos.forEach(campo=>validarCampo(campo)); 

    if(!formulario.checkValidity()){
        evento.preventDefault(); 
        console.log("Hay algún campo mal, revísalo"); 
    }else{
        formulario.submit(); 
        console.log("enviando"); 

    }

}); 