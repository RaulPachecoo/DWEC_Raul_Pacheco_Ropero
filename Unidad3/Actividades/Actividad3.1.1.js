// 1- Create a script that prompts the visitor to enter two numbers and then shows their sum.

let n1 = 	Number(prompt("Introduce un número"));
let n2 = 	Number(prompt("Introduce otro número"));

console.log("El resultado de la suma es: " + (n1+n2) ); 


/* 2- According to the documentation Math.round and toFixed both round to the nearest
number: 0..4 lead down while 5..9 lead up. For instance
alert( 1.35.toFixed(1) ); // 1.4
In the similar example below, why is 6.35 rounded to 6.3, not 6.4? How to round 6.35
the right way?

Alert( 6.35.toFixed(1) ); // 6.3
*/

// Ocurre esto porque internamente el número es ligeramente menor a 6.35, es decir, sería 6.3499999999999 y por ello se redondea hacia abajo.
// Para que el resultado del redondeo sea 6.4 tendríamos que hacerlo de forma manual.

alert( Math.round(6.35 * 10) / 10).toFixed(1); 

/* 3- Create a function readNumber which prompts for a number until the visitor enters a valid
numeric value. The resulting value must be returned as a number. The visitor can also stop
the process by entering an empty line or pressing “CANCEL”. In that case, the function
should return null.
*/

function readNumber(){
	let n; 
	do{
  	n = prompt("Introduce un número");
    if (n === null || n === '') return null;
  }while(isNaN(n)); 
  
  return +n; 
}

let result = readNumber();
alert(result === null ? "Operación cancelada." : "El número ingresado es: " + result);

// 4- This loop is infinite. It never ends. Why?

let i = 0;
while (i != 10) {
 i += 0.2;
}
 
/* Este bucle es infinito ya que números como 0.2 no se pueden representar de manera exacta en binario y esto produce imprecisiones.
Puede que tras sumar varias veces 0.2, i valga algo como 9.99999999999 pero nunca va a ser igual a 10.
*/

/* 5- The built-in function Math.random() creates a random value from 0 to 1 (not including
1). Write the function random(min, max) to generate a random floating-point number
from min to max (not including max).
*/

function generateRandom(min, max){
	return Math.random() * (max - min) + min; 
}

console.log(generateRandom(1, 10)); 

/* 6- Create a function randomInteger(min, max) that generates a random integer number
from min to max including both min and max as possible values. Any number from the
interval min..max must appear with the same probability.
*/

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  
  console.log(randomInteger(1, 5)); 


