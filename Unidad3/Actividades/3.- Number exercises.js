//1.-JavaScript Precision
//Exercise 1.- In JavaScript, 0.1 + 0.2 does not result in exactly 0.3 due to floating-point precision issues. Compare the results of 0.1 + 0.2 and 0.3 using a comparison with tolerance. Print true or false depending on the result.

let sum=0.1+0.2; 
console.log(sum == 0.3); 

console.log(sum.toFixed(2) == 0.3); 

//2.-Creating a Number Object
/* Exercise 2.- Create a Number object from the following values:
    - An integer.
    - A decimal number.
    - A string containing a valid number.*/

let int = new Number(5); 
let double = new Number(2.5); 
let string = new Number('50'); 

console.log(Number.isInteger(5));
console.log(typeof double.valueOf());
console.log(typeof string.valueOf());

//Exercise 3: Create a Number object and obtain its primitive value. Print the result.

const numero1 = new Number(31);

const valorPrimitivo1 = numero1.valueOf();

console.log(valorPrimitivo1);

//Exercise 4.- Use the Number constructor to attempt creating an object with invalid values, such as "Hello", undefined, and null.

let hola = new Number('Hola'); 
let indefinido = new Number(undefined); 
let nulo = new Number(null); 

console.log(hola); 
console.log(indefinido); 
console.log(nulo); 

//3.-Getting the Value of a Number Object
// Exercise 5.- Create a Number object with the value 42. Use the appropriate method to get its primitive value and verify its type.

const numero2 = new Number(42);

const valorPrimitivo2 = numero2.valueOf();

console.log(valorPrimitivo2); 
console.log(typeof valorPrimitivo2); 

// 4.- Comparison
//Exercise 6: Create a variable num1 as a primitive number and a variable num2 as a Number object with the same value. Compare their values using == and ===. What do you observe?

let num1 = 5;

let num2 = new Number(5);

console.log(num1 == num2);  

console.log(num1 === num2); 

//5.- Checking if a Number is Finite
/* Exercise 7.- Write a function that takes a number as a parameter and checks if it is finite or infinite. Test the function with the following values:
    - 42
    - Infinity
    - -Infinity
    - NaN*/

function verificarFinito(numero) {
    if (typeof numero !== 'number') {
        return `El valor "${numero}" no es un número válido.`;
    }
    return isFinite(numero) ? `${numero} es finito.` : `${numero} es infinito o no es un número finito.`;
}

console.log(verificarFinito(42));         
console.log(verificarFinito(Infinity));   
console.log(verificarFinito(-Infinity));  
console.log(verificarFinito(NaN)); 

//6.- Checking for NaN
/* Exercise 8.- Create a function that determines if a value is NaN. Test it with:
    - The result of 0 / 0.
    - The result of 42 / "Hello".
    - A valid number.*/

function esNaNPersonalizado(valor) {
    return Number.isNaN(valor) ? `${valor} es NaN.` : `${valor} no es NaN.`;
}

console.log(esNaNPersonalizado(0 / 0));        
console.log(esNaNPersonalizado(42 / "Hola"));  
console.log(esNaNPersonalizado(42));

//7.- Checking if a Number is an Integer
/* Exercise 9.- Write a function that takes a number and returns true if it is an integer or false otherwise. Test it with the following values:
    - 3
    - 3.14
    - -42
    - NaN*/

function esEntero(numero) {
    return Number.isInteger(numero) ? `${numero} es un número entero.` : `${numero} no es un número entero.`;
}

console.log(esEntero(3));       
console.log(esEntero(3.14));    
console.log(esEntero(-42));     
console.log(esEntero(NaN));

// 8. Conversion to String
/* Exercise 10.- Convert the following numbers to strings using different methods and analyze the results:
    - 42
    - 3.14159
    - Infinity
    - NaN
*/
const numeros = [42, 3.14159, Infinity, NaN];

numeros.forEach(numero => {
    console.log(`Número: ${numero}`);
    console.log(`1. Usando String(): "${String(numero)}"`);
    console.log(`2. Usando .toString(): "${numero.toString()}"`);
    console.log(`3. Usando concatenación: "${numero + ''}"`);
    console.log('----------------------------------------');
});

//Exercise 11: Create a Number object and convert its value to a string in different bases (2, 8, 10, 16).

let num = new Number(42);

let binario = num.toString(2);  
let octal = num.toString(8);    
let decimal = num.toString(10); 
let hexadecimal = num.toString(16); 


console.log(`Binario: ${binario}`);     
console.log(`Octal: ${octal}`);        
console.log(`Decimal: ${decimal}`);
console.log(`Hexadecimal: ${hexadecimal}`); 

