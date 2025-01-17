/*
tipos de nodos
1-> elemento <p>
2-> atributo
3-> texto
8-> comentario
9-> documento
*/


let titulo1 = document.getElementById("titulo1");
// console.log(titulo1.nodeType, titulo1.nodeName, titulo1.nodeValue);
// console.log(document.body.nodeType, document.body.nodeName, document.body.nodeValue);
// console.log(titulo1.firstChild.nodeType, titulo1.firstChild.nodeValue);

// console.log(document.getElementById("titulo1").nodeType);
// console.log(document.body.firstChild.nodeType, document.body.firstChild.nodeValue);

//console.log(document.body.getElementsByTagName(("section")[0].firstChild.nodeType));

//innerHTML, outerHTML
document.getElementById("titulo1").innerHTML = "<strong>Esto es un texto generador por JS</strong>";
document.getElementsByTagName("h2")[0].outerHTML = "<strong>Esto es un título de nivel 2</strong>";

/*
let lista = Array.from(document.getElementsByTagName("h3"));
lista.forEach((elemento) => {
    setTimeout(() => {
        elemento.outerHTML = "<h2>Este texto está recien generado</h2>";
    },3000);
});
*/ 
/*
let lista = Array.from(document.getElementsByTagName("h3"));
lista.forEach((elemento) => {
    setTimeout(() => {
        let nuevoElemento = document.createElement("h2");
        nuevoElemento.innerHTML = elemento.innerHTML;
        elemento.parentNode.replaceChild(nuevoElemento, elemento);
    }, 3000);
});
*/

//innerText, outerText, textContent
//incluir etiquetas HTML, incluir espacios

// lista = document.getElementsByTagName("p");
// lista[0].innerText = "<p>hola  </p>";
// lista[1].outerText = "<p>hola  </p>";
// lista[2].textContent = "<p>hola  </p>";
//document.getElementById("titulo1").innerText = "Estoy utilizando innerText";
//document.getElementById("titulo1").outerText = "Estoy utilizando outerText";
//document.getElementById("titulo1").textContent = "Estoy utilizando textContent";

//let imagen = document.getElementsByTagName("img")[0]; 
//imagen.alt = "Un precioso paisaje"; 
//imagen.nombreImagen = "paisaje.jpg";
//imagen.setAttribute("hola", "aaa");
//console.log(imagen.hasAttribute("hola"));

/*
Interpretan las etiquetas HTML
    - innerHTML
    - outerHTML

No las interpretan
    - innerText
    - outerText
    - textContent
*/

let cabecera = document.getElementsByTagName("header")[0];
//cabecera.innerHTML = "<h2>Esto es un sustituto de h1</h2>";
//titulo1.innerHTML = "<h2>Esto es un sustituto de H1</h2>";
//titulo1.outerHTML = "<h2>Esto es un sustituto de H1</h2>"; 


//console.log(cabecera.innerText);
//cabecera.outerText = "<h2>Esto es un sustituto de H1</h2>";

//console.log(cabecera.textContent); 
//cabecera.textContent = "<h2>Esto es un sustituto de H1</h2>"; 


//manipular atributos
/*dos tipos
    -estándar
    -Definidos por el usuario
*/
//comprobar si un nodo tiene un atributo
let imagen = document.querySelector("img"); 
//console.log(imagen.hasAttributes());
//console.log(imagen.hasAttribute("src"));

//creo propiedad no estándar o darle valor si ya existe
document.body.setAttribute("fecha", "17/01/2025"); 

//darle valor a propiedad estándar
imagen.alt = "Una imagen estupenda"; 

//leer valor
//console.log(document.body.getAttribute("fecha"));
//console.log(imagen.alt); 


let p1 = document.getElementsByTagName("p")[0].setAttribute("id", "rojo")


// imagen.getAttributeNames().forEach(atributo=>{
//     console.log(atributo); 
// }); 



// for (let atributo of imagen.attributes) {
//     console.log(`nombre: ${atributo.name} valor:${atributo.value}`); 
// }

// console.log(document.getElementsByTagName("p")[0].attributes); 

document.body.removeAttribute("id")

//clases
/*
classList -> DOMTokenList
    -length
    -value
    -name
    -item(0)
    contains("algo")
*/

let lista = Array.from(document.getElementsByClassName("especial"));
/*
lista.forEach(parrafo=>{
    console.log(parrafo.classList.length)
    console.log(parrafo.classList.value)
    console.log(parrafo.classList.contains("unaclasequenoexiste"))
    console.log(parrafo.classList.contains("especial"))
    parrafo.classList.forEach(clase=>{
        console.log(clase); 
    })
}); 
*/

//eliminar
lista[0].classList.remove("especial"); 


//añadimos
lista[0].classList.add("una_clase_nueva"); 


lista[1].className="una_clase otra_clase";
lista[1].classList.add("otra_clase_mas");

lista[2].classList.replace("especial", "del_monton"); 

lista[1].classList.toggle("verde"); 

//atributos lógicos (boolean)
/*
valor=true
valor=false
*/

let boton = document.getElementsByTagName("button"); 
console.log(boton[0]); 
boton[0].setAttribute("disabled", ""); 
setTimeout(()=>{
    boton[0].toggleAttribute("disabled"); 
}, 5000)


