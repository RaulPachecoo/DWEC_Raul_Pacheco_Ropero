// 1- What is the last value output by this code? Why?

let i = 3;
while (i) {
 Console.log( i-- );
}

// El último valor de salido será 1, porque todos los números positivos se consideran true, entonces se ejecutará el bucle hasta que llegue a 0.


/* 2- Rewrite the following code changing the for loop to while without altering its behavior
(the output should stay same)
*/

for (let i = 0; i < 3; i++) {
    Console.log ( `number ${i}!` );
} 

/*
let i = 0;
while (i < 3) {
    console.log(`number ${i}!`);
    i++;
}
*/


/* 3- Write a loop which keeps prompting for a number until it is greater than 100 or enters an
empty line.
*/

let n; 
do{
	n = Number(prompt("Inserte un número")); 
}while(n<=100 && n); 


/* 4- Using while loop, create two arrays: one with even numbers and another one with odds
numbers. Both of them from 1 to n, being n a number provided by user. Using a for loop,
create a third array whose nth number is the sum of nth number of both arrays.
*/

let m = Number(prompt("Introduce un número: "));

let pares = [];
let impares = [];
let j = 1;


let paresIndex = 0;
let imparesIndex = 0;

while (j <= m) {
    if (j % 2 === 0) {
        pares[paresIndex] = j; 
        paresIndex++; 
    } else {
        impares[imparesIndex] = j; 
        imparesIndex++; 
    }
    j++; 
}


let suma = [];
let maxLength = Math.max(paresIndex, imparesIndex); 

for (let k = 0; k < maxLength; k++) {
    let numPares = pares[k] || 0;    
    let numImpares = impares[k] || 0; 
    suma[k] = numPares + numImpares; 
}

console.log("Pares:", pares);
console.log("Impares:", impares);
console.log("Suma:", suma);



/* 5- Write code which outputs prime numbers from 1 to n, being the latter a numbrer
provided by user.
*/

let a = Number(prompt("Introduce un número: "));

let primos = [];
let index = 0; 

for (let i = 2; i <= a; i++) {
    let esPrimo = true;


    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
            esPrimo = false; 
            break; 
        }
    }


    if (esPrimo) {
        primos[index] = i; 
        index++; 
    }
}

console.log(`Números primos del 1 al ${a}:`, primos);


/* 6- Take odd numbers array and remove the prime numbers from it. Tip: as we have not
seen array methods yet, the only way is to create a new array without those numbers
*/

let imp = [1, 3, 5, 7, 9, 11, 13, 15]; 
let noPrimos = [];
let indice = 0; 

for (let i = 0; i < imp.length; i++) {
    let esPrimo = true;
    let num = imp[i];

    
    if (num < 2) {
        esPrimo = false; 
    } else {
        for (let j = 2; j <= Math.sqrt(num); j++) {
            if (num % j === 0) {
                esPrimo = false; 
                break;
            }
        }
    }

   
    if (!esPrimo) {
        noPrimos[indice] = num; 
        indice++; 
    }
}

console.log("Números impares sin los primos:", noPrimos);


/* 7- Ask the user for a number n. Create an array of n random numbers and print the highest
one. Use the following code to generate a random number between 0 and 9999
*/

let b = Number(prompt("Introduce un número: ")); 
let matrizNum = new Array(b); 
let mayor = 0; 

for (let i = 0; i < b; i++) {
    let e = Math.floor(Math.random() * 9999); 
    matrizNum[i] = e; 

    if (e > mayor) {
        mayor = e; 
    }
}

console.log(matrizNum);
console.log(mayor); 


// 8- Ask the user for a string and print it reversed

let palabra = prompt("Escribe una palabra"); 

let invertida = "";  


for (let i = palabra.length - 1; i >= 0; i--) {
    invertida += palabra[i];  
}

console.log("Cadena invertida: " + invertida);


/* 9- Ask the user for a number. Print a isosceles triangle made of asterisks with as many
levels as the number the user entered.
*/ 

let niveles = Number(prompt("Introduce el número de niveles para el triángulo: "));

for (let i = 1; i <= niveles; i++) {
    let espacio = ""; 
    let asteriscos = ""; 

    
    for (let j = 0; j < niveles - i; j++) {
        espacio += " ";
    }

    
    for (let k = 0; k < (2 * i - 1); k++) {
        asteriscos += "*";
    }

   
    console.log(espacio + asteriscos);
}

// 10- Ask the user for a number between 3 and 25. Calculate its factorial.

let numero = Number(prompt("Introduce un número entre 3 y 25: "));

if (numero < 3 || numero > 25) {
    alert("El número debe estar entre 3 y 25. Inténtalo de nuevo.");
} else {
    let factorial = 1;

    
    for (let i = 1; i <= numero; i++) {
        factorial *= i; 
    }

    console.log(`El factorial de ${numero} es ${factorial}.`);
}


/* 11- Ask the user for a string and write a program that checks if it is palindrome (it is spelled
the same forward and backward).
*/

let cadena = prompt("Introduce una cadena: ");


let cadenaInvertida = "";

for (let i = cadena.length - 1; i >= 0; i--) {
    cadenaInvertida += cadena[i];
}

if (cadena === cadenaInvertida) {
    alert(cadena + " es un palíndromo");
} else {
    alert(cadena + " NO es un palíndromo");
}



/* 12- Use the following code to generate a random pin number of 4 digits. Write code to allow
a user to try to guess the number in 4 attempts
*/

let pin = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
let intento; 
let nIntentos = 4; 
let correcto; 



do{
	intento = Number(prompt("Introduce un pin: "));
  nIntentos--; 
  if(intento != pin){
  	correcto = false;
    alert("Incorrecto!");
    if(nIntentos == 0){
    	alert("Se te acabaron los intentos :(")
    }
  }else{
  correcto = true; 
  	alert("Correcto máquina!")
  }
}while(!correcto && nIntentos>0); 




