console.log("Inicio"); 
for (let i = 0; i < 1e6; i++) {
    console.log(i);
}

console.log("Fin"); 

function cargarScript(origen, callback){
    const script = document.createElement("script"); 
    script.src = origen; 
    script.type = "text/javascript"; 
    script.addEventListener("load", callback); 
    document.head.append(script); 
}

document.querySelector("button").addEventListener("click", ()=>{
    cargarScript("https://code.jquery.com/jquery-3.7.1.min.js", ()=>{
        console.log("JQuery se ha cargado con éxito"); 
        $('body').css('background-color', 'lightgreen'); 
    })
}); 

