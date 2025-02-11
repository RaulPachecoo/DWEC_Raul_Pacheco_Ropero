/*
- quién valida: exclu JS. usar "novalidate" -> se evalua la val. nativa -> pseudoclases y prop
- mensajes de error: JS -> insertando nodos en el DOM
- cuándo se valida: al enviar el form (submit)
- quién estila: nativo
*/


document.querySelector("form").addEventListener("submit", (evento) => {
    evento.preventDefault();
    let formVallido = true; 
    const campos = document.querySelectorAll("input");
    
    campos.forEach(campo => {
        let campoError = document.getElementById(`error${campo.name}`);
        if (campoError) {
            campoError.textContent = ""; 
            campoError.classList.add("oculto");
        }

        if (!campo.validity.valid) {
            let error = "";
            if (campo.validity.valueMissing) {
                error = `El campo ${campo.name} es obligatorio`;
            }else if(campo.validity.tooShort){
                error = `El campo ${campo.name} es demasiado corto`;
            }else if(campo.validity.patternMismatch){
                error = `El campo ${campo.name} no cumple con el patrón requerido`;
            }else if(campo.validity.rangeOverflow){
                error = `El campo ${campo.name} se ha pasado del rango`;
            }else if(campo.validity.rangeUnderflow){
                error = `El campo ${campo.name} no llega al mínimo`;
            }else if(campo.id == "password" && campo.value!=document.getElementById("confirm-password").value){
                error = `Las contraseñas no coinciden`;
            }

            if (error && campoError) {
                campoError.textContent = error;
                campoError.classList.remove("oculto");
                formVallido = false; 
            }
        }
    });
    if(formVallido){
        evento.target.submit(); 
    }
    

});