// 1- Take loop exercises from 4 until the last one and rewrite them by using functions


/*
>> 4

let m = Number(prompt("Introduce un número: "));


function clasificarNumeros(m) {
    let pares = new Array(Math.floor(m / 2)); 
    let impares = new Array(Math.ceil(m / 2)); 
    let paresIndex = 0;
    let imparesIndex = 0;
    
    for (let j = 1; j <= m; j++) {
        if (j % 2 === 0) {
            pares[paresIndex] = j;
            paresIndex++;
        } else {
            impares[imparesIndex] = j;
            imparesIndex++;
        }
    }
    
    return { pares, impares };
}

function sumarArrays(pares, impares) {
    let maxLength = Math.max(pares.length, impares.length);
    let suma = new Array(maxLength); 
    
    for (let k = 0; k < maxLength; k++) {
        let numPares = pares[k] || 0;
        let numImpares = impares[k] || 0;
        suma[k] = numPares + numImpares;  
    }
    
    return suma;
}

let { pares, impares } = clasificarNumeros(m);
let suma = sumarArrays(pares, impares);

console.log("Pares:", pares);
console.log("Impares:", impares);
console.log("Suma:", suma);
*/

/*
>> 5

let a = Number(prompt("Introduce un número: "));

function primos(final){
	let primos = [];
  let index = 0; 

  for (let i = 2; i <= final; i++) {
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
  return primos; 

}


console.log(`Números primos del 1 al ${a}:`, primos(a));
*/

/*
>> 6

let imp = [1, 3, 5, 7, 9, 11, 13, 15]; 

function imparesSinPrimos(imp){
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
  return noPrimos; 
}

console.log("Números impares sin los primos:", imparesSinPrimos(imp));
*/

/*
>> 7

let b = Number(prompt("Introduce un número: ")); 

function matrizAleatoria(n){
  let matrizNum = new Array(b); 
  

  for (let i = 0; i < n; i++) {
      let e = Math.floor(Math.random() * 9999); 
      matrizNum[i] = e; 

      
  }
  return matrizNum; 
}

function mayorMatriz(matriz){
	let mayor = 0; 
  for(let i = 0; i<matriz.length; i++){
		if (matriz[i] > mayor) {
      mayor = matriz[i]; 
    }
  }
  return mayor; 
  
}

let matriz = matrizAleatoria(b); 

console.log(matriz);
console.log(mayorMatriz(matriz));
*/

/*
>> 8

let palabra = prompt("Escribe una palabra"); 

function revertir(word){
	let invertida = "";  


  for (let i = word.length - 1; i >= 0; i--) {
      invertida += word[i];  
  }

  console.log("Cadena invertida: " + invertida);
}

revertir(palabra); 

*/
/*
>> 9


let niveles = Number(prompt("Introduce el número de niveles para el triángulo: "));

function pintarTriangulo(niveles){

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
}

pintarTriangulo(niveles); 
*/

/*
>> 10

let numero = Number(prompt("Introduce un número entre 3 y 25: "));

function factorial(n){
  if (n < 3 || n > 25) {
      alert("El número debe estar entre 3 y 25. Inténtalo de nuevo.");
  } else {
      let factorial = 1;


      for (let i = 1; i <= n; i++) {
          factorial *= i; 
      }

      console.log(`El factorial de ${numero} es ${factorial}.`);
  }
}

factorial(numero); 
*/

/*
>> 11

let cadena = prompt("Introduce una cadena: ");

function esPalindromo(palabra){

  let cadenaInvertida = "";

  for (let i = cadena.length - 1; i >= 0; i--) {
      cadenaInvertida += cadena[i];
  }

  if (cadena === cadenaInvertida) {
     return true;  
  } else {
      return false; 
  }
}

if(esPalindromo(cadena)){
	alert(cadena + " es un palíndromo");
}else{
	alert(cadena + " NO es un palíndromo");
}
*/

/*
>> 12

let pin = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;


function inicioSesion(pin){
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
}

inicioSesion(pin); 
*/

// FIN DEL EJERCICIO 1

// 2- Write a function that returns the square of a number

let a = prompt("Introduce un número: "); 

function cuadrado(a){
	return a * a; 
}

console.log(cuadrado(a)); 

// 3- . Write a function min(a,b) which returns the least of two numbers a and b.

let b = prompt("Introduce un número:"); 
let c = prompt("Introduce otro número"); 

function menor(a, b){
	if(a<b){
  	console.log(a + " es menor"); 
  }else{
  	console.log(b + " es menor"); 
  }
}
menor(b,c); 

// 4- Rewrite min function as an expression function

let d = prompt("Introduce un número:");
let e = prompt("Introduce otro número");

let menor = function(a, b) {
    if (a < b) {
        console.log(a + " es menor");
    } else {
        console.log(b + " es menor");
    }
};

menor(d, e);

// 5 - Rewrite min function as an arrow function

let f = prompt("Introduce un número:");
let g = prompt("Introduce otro número");

let menor = (a, b) => {
    if (a < b) {
        console.log(a + " es menor");
    } else {
        console.log(b + " es menor");
    }
};

menor(f, g);

// 6- Write a function pow(x,n) that returns x in power n. Ask the user fot both numbers.

let h = prompt("Introduce un número:"); 
let i = prompt("Introduce el exponente:"); 

function pow(x, n){
    let resultado = 1;
    for (let i = 0; i < n; i++) {
        resultado *= x;
    }
    return resultado;
}

console.log(pow(h,i)); 

// 7- Rewrite pow function as an expression function

let j = prompt("Introduce un número:"); 
let k = prompt("Introduce el exponente:"); 

let pow = function(x, n) {
    let resultado = 1;
    for (let i = 0; i < n; i++) {
        resultado *= x;
    }
    return resultado;
};

console.log(pow(j,k)); 

// 8- Rewrite pow function as an arrow function

let l = prompt("Introduce un número:"); 
let m = prompt("Introduce el exponente:"); 

let pow = (x, n) => {
    let resultado = 1;
    for (let i = 0; i < n; i++) {
        resultado *= x;
    }
    return resultado;
};

console.log(pow(l,m)); 

// 9- Replace Function Expressions with arrow functions in the code below:

function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
   }
   ask(
    "Do you agree?",
    function() { alert("You agreed."); },
    function() { alert("You canceled the execution."); }
);

/*
let ask = (question, yes, no) => {
    if (confirm(question)) yes();
    else no();
}; 

ask(
"Do you agree?",
function() { alert("You agreed."); },
function() { alert("You canceled the execution."); }
); 
*/

/* 10- Write a function named calculateSupply that: 
    a) takes 2 arguments: age, amount per day.
    b) calculates the amount consumed for rest of the life (based on a constant max age).
    c) outputs the result to the screen like so: "You will need NN to last you until the ripe old
    age of X"
    Express it as an arrow function, if possible
*/

let edad = prompt("Introduce tu edad:"); 
let cantidadDia = prompt("Introduce la cantidad por día:");

const calculateSupply = (edad, cantidadPorDia) => {
    const edadMaxima = 90; 
    const añosRestantes = edadMaxima - edad; 
    const totalConsumido = añosRestantes * 365 * cantidadPorDia; 

    console.log(`Necesitará ${totalConsumido} para que le dure hasta la madura edad de ${edadMaxima}.`);
};


calculateSupply(edad, cantidadDia);

/* 11- Create a function that greets the user by his name and with a message according to the
moment of the day (morning, afternoon, night). It accepts two parameters: user name and a
callback function.
*/

let nombre = prompt("Introduce tu nombre:");
let saludarUsuario = (nombre, obtenerMomentoDelDia) => {
    const momentoDelDia = obtenerMomentoDelDia(); 
    let saludo;

    
    if (momentoDelDia === "mañana") {
        saludo = "¡Buenos días";
    } else if (momentoDelDia === "tarde") {
        saludo = "¡Buenas tardes";
    } else if (momentoDelDia === "noche") {
        saludo = "¡Buenas noches";
    } else {
        saludo = "¡Hola";
    }

    console.log(`${saludo}, ${nombre}!`);
};


let obtenerMomentoDelDia = () => {
    const horaActual = new Date().getHours(); 

    if (horaActual >= 5 && horaActual < 12) {
        return "mañana";
    } else if (horaActual >= 12 && horaActual < 18) {
        return "tarde"; 
    } else {
        return "noche"; 
    }
};


saludarUsuario(nombre, obtenerMomentoDelDia);

/* 12- . Create a function that accepts three parameters: two numbers and the mathematical
operation to be performed with these numbers. The following mathematical operations must
be supported: addition, subtraction, division and multiplication. Use callback functions.
*/

let numero1 = parseFloat(prompt("Introduce el primer número:"));
let numero2 = parseFloat(prompt("Introduce el segundo número:"));
let operacion = prompt("Introduce la operación a realizar (suma, resta, multiplicacion, division):");

const calcular = (num1, num2, operacion) => {
    return operacion(num1, num2);
};


let sumar = (a, b) => a + b;
let restar = (a, b) => a - b;
let multiplicar = (a, b) => a * b;
let dividir = (a, b) => b !== 0 ? a / b : "No se puede dividir por cero";

let resultado;
if (operacion === "suma") {
    resultado = calcular(numero1, numero2, sumar);
} else if (operacion === "resta") {
    resultado = calcular(numero1, numero2, restar);
} else if (operacion === "multiplicacion") {
    resultado = calcular(numero1, numero2, multiplicar);
} else if (operacion === "division") {
    resultado = calcular(numero1, numero2, dividir);
} else {
    resultado = "Operación no válida.";
}

console.log(`El resultado es: ${resultado}`);