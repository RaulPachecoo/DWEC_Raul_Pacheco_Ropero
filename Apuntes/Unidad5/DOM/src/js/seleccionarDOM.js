/*
window
document
*/

/*
console.log(document.head);
console.log(document.body);
*/


let elemento = document.getElementById("unico"); 
//console.log(elemento);


//coleccion
let lista = document.getElementsByTagName("p"); 
//console.log(lista[1]);


let aux = console.log(document.getElementsByClassName("especial"));

aux = document.getElementsByName("nombre");
//console.log(aux);

aux = document.querySelector("section");
// console.log(aux);

aux = document.querySelectorAll("section");
// console.log(aux);

aux = document.querySelector("section:last-of-type ul>li:last-of-type");
//console.log(aux); 