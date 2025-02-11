// 1- Explain each otuput of the following code

Console.log( null || 2 || undefined ); // Aquí al utilizar el operador || devuelve el primer valor verdadero. null y undefined son falsos por lo tanto devuelve 2. 
Console.log( 1 && null && 2 ); // Utiliza el operador && que devuelve el primer valor falso. Tanto 1 como 2 son verdaderos por lo tanto devuelve null ya que es falso.
Console.log( null || 2 && 3 || 4 ); // En este caso && tiene preferencia sobre || por lo tanto se evalúa primero y devuelve el último valor verdader ya que 2 y 3 son verdaderos.
// Por lo tanto quedaría algo así: null || 3 || 4. Como || devuelve el primer valor verdadero. Como 3 y 4 son verdaeros, devuelve 3.

let x = 3;
console.log((x < 5) && (x > 0)); // Devuelve true ya que se cumple las dos condiciones.
console.log((x < 5) && (x > 6)); // Devuelve true ya que s ecumple la primera condición pero no la segunda.
console.log((x > 2) || (x > 5)); // Devuelve true ya que se cumple una de las dos condiciones, es decir, la primera.
console.log((x > 3) || (x < 0)); // Devuelve false ya que no se cumple ninguna de las dos condiciones.
console.log(!(x == 3)); // Devuelve false ya que no se cumple que x sea diferente de 3.
console.log(!(x < 2)); // Devuelve true ya que x no es menor que 2.

// 2- Change the code inside console.log so output is true

const numOne = 5;
const numTwo = 6;
console.log(numOne == numTwo);

console.log(numOne < numTwo); 


/* 3- Ask user for his age and check that it is not between 14 and 90 inclusively. Create two
variants: the first one using NOT !, the second one – without it.
*/

let edad = prompt("Introduce tu edad: "); 

console.log(!(edad >= 14 && edad <= 90) ? "Tu edad NO está entre 14 y 90" : "Tu edad SÍ está entre 14 y 90");

console.log(edad < 14 || edad > 90 ? "Tu edad NO está entre 14 y 90" : "Tu edad SÍ está entre 14 y 90");

// 4- Explain what result will produce the following code

(-1 || 0) && ( 'first' ); // El resultado es 'first'. Primero evalua la expresión -1 || 0 que devuelve true ya que el primer valor es verdadero.
// Después comprueba -1 && 'first'. El operador && devuelve el primer valor falso o el último verdadero si los dos son verdaderos. Como los dos son verdaderos devuelve first.

(-1 && 0) || ( 'second' ); // // El resultado es 'second'. Primero evalua -1 && 0 que devuelve el primer valor falso que es 0.
// Después comprueba 0 || second que devuelve el primer valor verdadero, por lo tanto devuelve 'second'.

(null || -1 && 1) && ( 'third' ); // El resultado es 'third'. Primero comprueba -1 && 1, ya que los dos son verdaderos && devuelve el último, que es 1.
// Después pasa a comprobar null || 1 que devuelve el primer valor verdadero. Como null es falso, devuelve 1. Por último, comprueba 1 && 'third', 
// que devuelve el último valor si los dos son verdaderos, por lo que devuelve 'third'.