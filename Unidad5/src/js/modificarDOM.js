/*
// Creando nodos
// Element, Comment, Text
let seccion = document.createElement("section");
let comentario = document.createComment("Esto es un comentario que irá en el HTML");
let texto = document.createTextNode("Esto es un texto creado en JS");

// Mostrando información sobre los nodos
console.log(seccion.nodeType, seccion.nodeName, seccion.nodeValue); // Corregido de "elemnto" a "seccion"
console.log(comentario.nodeType, comentario.nodeName, comentario.nodeValue);
console.log(texto.nodeType, texto.nodeName, texto.nodeValue);

// Clonar nodos
let seccionClonada = seccion.cloneNode(true); 
console.log(seccionClonada.isConnected);



// Insertar nodos usando Node API (antigua)
seccion.appendChild(comentario);
seccion.appendChild(texto);

let puntoInsercion = document.getElementsByTagName("section");

puntoInsercion[0].appendChild(seccion);


//insertar estructura temporal con ul li*5{hola}

// Crear una estructura temporal
let estructuraTemporal = document.createDocumentFragment();
let inicioLista = document.createElement("ul"); 

for (let i = 0; i < 5; i++) {
    let nodo = document.createElement("li");
    let texto = document.createTextNode("hola");
    nodo.appendChild(texto); 
    inicioLista.appendChild(nodo); 
}

estructuraTemporal.appendChild(inicioLista); 
document.body.appendChild(estructuraTemporal);

//contenedorDeReferencia.insertBefore
elemento = document.createElement("p"); 
texto = document.createTextNode("hola, este texto se ha insertado con js"); 
elemento.appendChild(texto);  
let contenedorReferencia = document.querySelector("section");
let nodoReferencia = document.querySelector("section > ul"); 

contenedorReferencia.insertBefore(elemento, nodoReferencia); 


// Element API (nuevo enfoque)
//before
//after
//append
//prepend
//insertAdjacentHTML
//insertAdjacentText
//insertAdjacentElement

//ejemplo de before
let comentario = document.createComment("Esto es un comentario totalmente aleatorio"); 
document.querySelector("section").before(comentario); 

//ejemplo con after
let elemento = document.createElement("p"); 
elemento.textContent = "Este es el texto del parrafo";  

document.querySelector("section").after(elemento); 

//append
let insercion = document.querySelector("ul > li:nth-of-type(3)"); 
let nuevaLista = document.createElement("ul"); 
let el1 = document.createElement("li");
el1.textContent = "elemento1"; 

let el2 = document.createElement("li"); 
el2.textContent = "elemento2"; 
 
nuevaLista.append(el1); 
nuevaLista.append(el2); 
insercion.append(nuevaLista); 


//contenedor.prepend(nuevoNodo) -> primer hijo
let listaClonada = nuevaLista.cloneNode(true); 
insercion.prepend(listaClonada); 


//nodoReferencia = insertAdjacentElement("where", newNode)
//insertAdjacentText
//insertAdjacentHTML
// where-> beforeBegin, afterBegin, beforeEnd, afterEnd
let puntoInsercion = document.querySelector("section"); 
let nodo = document.createElement("p"); 
nodo.textContent = "<strong>insertAdjacentText</strong>"; 
nodo.classList.add("fondoRojo"); 

puntoInsercion.insertAdjacentElement("beforebegin", nodo); 
puntoInsercion.insertAdjacentElement("beforeend", nodo); 
puntoInsercion.insertAdjacentElement("afterbegin", nodo); 
puntoInsercion.insertAdjacentElement("afterend", nodo); 


puntoInsercion.insertAdjacentText("afterend", "<p>este párrafo se va a quedar en un simple texto</p>"); 
puntoInsercion.insertAdjacentHTML("afterend", "<p>este párrafo si que es un párrafo de verdad</p>");

//XSS (cross site scripting)
cadena= "<script> alert(\"Eres un pringao\")</script>"; 
puntoInsercion.insertAdjacentHTML("afterend", cadena);

*/

//reemplazarlos
//NODE API: replaceChild
//nodoReferencia.replaceChild(newNode, oldNode)
let nodoReferencia = document.querySelector("ul"); 
let nodoViejo = document.querySelector("ul>li:nth-of-type(3)>ul"); 
const nodoNuevo = document.createComment("comentario dentro de una lista"); 
//nodoReferencia.replaceChild(nodoNuevo, nodoViejo); 


//Element API
//oldNode.replaceWith(nuevoNodo)

nodoViejo.replaceWith(nodoNuevo); 


//replaceChildren



//eliminarlos

