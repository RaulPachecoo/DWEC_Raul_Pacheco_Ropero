// 1- What is this code going to show?

let fruits = ["Apples", "Pear", "Orange"];
// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push("Banana");
// what's in fruits?
alert( fruits.length ); // ?

/* Este código devuelve 4. Primero crea un array que es fruits con 3 elementos. Luego crea el array shoppingCart que lo iguala a 
fruits, por lo que no hace una copia sino que asignas la referencia de fruits a shoppingCart. Ambos arrays(fruits y shoppingCart) 
apuntan al mismo array en memoria. Después añade un elemento a shoppingCart que es "Banana" y por último devuelve el tamño del 
array fruits.
*/



// 2- Let’s try 5 array operations.

// a) Create an array styles with items “Jazz” and “Blues”.

let styles = ["Jazz", "Blues"]; 

// b) Append “Rock-n-Roll” to the end.

styles.push("Rock-n-Roll"); 

// c) Replace the value in the middle with “Classics”. Your code for finding the middle value should work for any arrays with odd length.

let middleIndex = Math.floor(styles.length / 2);
styles[middleIndex] = "Clásicos";

// d) Strip off the first value of the array and show it.

let removedFirst = styles.shift();

// e) Prepend Rap and Reggae to the array. 

styles.unshift("Rap", "Reggae");




// 3- What is the result? Why?

let arr = ["a", "b"];
arr.push(function() {
 alert( this );
});
arr[2](); // ?

/* Se crea un array con lo valores iniciales "a" y "b". Después añade otro elemento que es una función. Hace la llamada
al elemento 2 del array que es la función, la cual muestra this cuyo valor es el propio array.
*/


/* 4- Write the function sumInput() that:
• Asks the user for values using prompt and stores the values in the array.
• Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
• Calculates and returns the sum of array items. 
*/

function sumInput() {
    let numeros = []; 
    let entrada;
  
   
    while (true) {
      entrada = prompt("Ingresa un número (o deja vacío/Cancel para terminar):");
  
      
      if (entrada === null || entrada === "" || isNaN(entrada)) {
        break;
      }
  
      
      numeros.push(+entrada);
    }
  
   
    let sum = numeros.reduce((acc, num) => acc + num, 0);
  
    return sum; 
  
}
alert("La suma de los números ingresados es: " + sumInput());

/* 5- The input is an array of numbers arr = [1, -2, 3, 4, -9, 6] and the task is to
find the contiguous subarray of arr with the maximal sum of items. Write the function
getMaxSubSum(arr) that will return that sum. Please try to think of a fast solution:
 O(n2) or even O(n) if you can.
*/


function getMaxSubSum(arr) {

let maxSum = arr[0]; 
let currentSum = arr[0];  


for (let i = 1; i < arr.length; i++) {
    
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    
    
    maxSum = Math.max(maxSum, currentSum);
}

return maxSum;
}