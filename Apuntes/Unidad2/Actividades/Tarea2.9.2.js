// 1- Rewrite the pow function to be recursive
function potenciaRecursiva(x, n){
    if(n == 1){
      return x; 
    }else{
      return (x * potenciaRecursiva(x, n-1)); 
    }
  }
  
console.log(potenciaRecursiva(2, 3));  

/* 2- Create a function that accepts an undetermined number of words and returns an string with
all these words concatenated.
*/

function concatena(...palabras){
  let cocatenacion = ""; 
  for(let palabra of palabras){
    cocatenacion += palabra; 
  }
  return cocatenacion; 
}

console.log(concatena("hola", "adios", "muy buenas"));

/* 3- Create a function that accepts three parameters: two numbers and a function that indicates
the operation to be applied to the numbers: division or pow.
*/

function calculadora(a,b,operacion){
	return(operacion(a,b)); 
}

let division = (a,b) => (a/b); 
let potencia = (a,b) => (Math.pow(a,b)); 

console.log(calculadora(8,2,division));
console.log(calculadora(2, 2, potencia));


// 4- Check the following code and explain the output

let a=b=5;
function calcula() {
 console.log(a*b);
}
a=b=10;
calcula();

/* La salida será 100 ya que antes de llamar a la función calcula() se cambia el valor de a y b. 
La función no coge los valores hasta que se realiza la llamada.
*/


// 5- Check the following code and explain the output

function crearCoche() {
  let marca= "Tesla";
  return function() {
  return nombre;
  };
 }
 let marca = "MG";
 let coche = crearCoche();
 coche();

/* El código anterior devuelve un error, ya que la variable nombre no esta inicializada, habría que cambiar dentro de la función
"return nombre;" por "return marca;" entonces la función devolvería "Tesla"; 
Como la variable marca coge el valor en la función siempre va a devolver "Tesla", para que devuelva "MG" se la tendríamos que pasar 
por parámetro.
function crearCoche(marca) {
 return function() {
 return marca;
 };
}
let marca = "MG";
let coche = crearCoche(marca);
console.log(coche());
*/


// 6- Check the following code and explain the output

function coche(aux){
  let nombre=aux;
  return function(){
  return nombre;
  }
 }
 let coche1=coche("tesla");
 let coche2=coche("mg");
 console.log(coche1());
 console.log(coche2());

// Esta función crea un coche y le asigna un nombre, el cual recibe por parámetro y lo devuelve a través de una función anónima.
 

// 7- Check the following code and explain the output

/*
let animal = "gato";
if (1) {
  let animal = "conejo";
  function habla() {
    If (animal1==conejo){
    console.log(“Los conejos no hacen ruido”);
    }else{
    console.log (“Los gatos maúllan”);
    }
  }
}
habla();


El código anterior contiene varios errores, como la condición dentro de la función que compara animal1 que no existe, 
además If está en mayúscula el cuál es un error de sintaxis y "conejo" debe de ir entre comillas ya que es el valor de animal y es un String
Las comillas de los console.log no son válidas.
*/




//CÓDIGO CORREGIDO
let animal = "gato";
if (1) {
   let animal = "conejo";
   function habla() {
     if(animal=="conejo"){
    	console.log("Los conejos no hacen ruido");
     }else{
    	console.log("Los gatos maúllan");
     }
  }
}
habla();

/* Esta función siempre devuelve "Los conejos no hacen ruido" ya que la variable se crea siempre que se llama la funcióon
y se le asigna el valor de "conejo".
*/

