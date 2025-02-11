// 1- Check if a number is odd or even

let a = prompt("Introduce un número: "); 

if(a % 2 == 0){
	alert("Es par"); 
}else{
	alert("Es impar"); 
}

// 2- Check if input variable is a number or not

let v = prompt("Introduce una variable: "); 

if (typeof v === 'number') {
    console.log("v es un número.");
} else {
    console.log("v NO es un número.");
}

// 3- Find the largest of two number

let b = prompt("Introduce un número: ");
let c = prompt("Introduce otro número: ");

if(b>c){
	alert(b + " es mayor"); 
}else{
	alert(c + " es mayor"); 
}

// 4- Find the largest of three number

let d = prompt("Introduce un número: ");
let e = prompt("Introduce otro número: ");
let f = prompt("Introduce el último número: ");


if(d>e && d>f){
	alert(d + " es mayor"); 
}else{
	if(e > d && e > f){
  	alert(e + " es mayor"); 
  }else{
  	alert(f + " es mayor"); 
  }
}

/* 5- Check if a triangle is equilateral (all side equal), scalene (all side unequal), or isosceles (2
sides are equals)
*/ 

let h = prompt("Introduce un lado del triángulo: ");
let i = prompt("Introduce otro lado del triángulo: ");
let j = prompt("Introduce el último lado del triángulo: ");

if(h == i && h == j){
	alert("Es un triángulo equilatero"); 
}else{
	if(h != i && h != j){
  	alert("Es un triángulo escaleno"); 
  }else{
  	alert("Es un triángulo isosceles"); 
  }
}

// 6- Find the a number is present in given range (provide start, end and number to be found)

let number = Number(prompt("Introduce el número a buscar")); 
let start = Number(prompt("Introduce el inicio del rango")); 
let end = Number(prompt("Introduce el final del rango")); 


if (number >= start && number <= end) {
	alert("El número " + number + " esta dentro del rango de " + start + " y " + end); 
} else {
  alert("El número " + number + " NO esta dentro del rango de " + start + " y " + end); 
}

/* 7- Check if a year is leap year or not. A leap year is 1.- divisible by 400 OR 2.- divisible by 4
and not by 100
*/

let year = Number(prompt("Introduce el año a comprobar"));  

if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
  alert(year + " es un año bisiesto");
} else {
  alert(year + " NO es un año bisiesto");
}

// 8- Rewrite the former if by using the ternary operator

let year2 = Number(prompt("Introduce el año a comprobar"));

// Usando el operador ternario para la verificación
let result = (year2 % 400 === 0 || (year2 % 4 === 0 && year2 % 100 !== 0)) 
    ? year2 + " es un año bisiesto" 
    : year2 + " NO es un año bisiesto";

alert(result);

// 9- Show the number of days in a given month

let month = prompt("Introduce un mes: ");

if (month === "Enero" || month === "Marzo" || month === "Mayo" || month === "Julio" || month === "Agosto" || month === "Octubre" || month === "Diciembre") {
    alert(month + " tiene 31 días.");
} else if (month === "Febrero") {
    alert(month + " tiene 28 días.");
} else if (month === "Abril" || month === "Junio" || month === "Septiembre" || month === "Noviembre") {
    alert(month + " tiene 30 días.");
} else {
    alert("Ese mes no existe.");
}


// 10- Rewrite the former if by using a switch statement

let month2 = prompt("Introduce un mes: ");

switch (month2) {
  case "Febrero":
    alert(month2 + " tiene 28 días.");
    break;
  case "Abril":
  case "Junio":
  case "Septiembre":
  case "Noviembre":
    alert(month2 + " tiene 30 días.");
    break;
  case "Enero":
  case "Marzo":
  case "Mayo":
  case "Julio":
  case "Agosto":
  case "Octubre":
  case "Diciembre":
    alert(month2 + " tiene 31 días.");
    break;
  default:
    alert("Ese mes no existe");
}

// 11- Rewrite the former if by using && and || operators

let month3 = prompt("Introduce un mes: ");
let daysInMonth;

daysInMonth = (month3 === "Febrero") ? 28
            : (month3 === "Abril" || month3 === "Junio" || month3 === "Septiembre" || month3 === "Noviembre") ? 30
            : (month3 === "Enero" || month3 === "Marzo" || month3 === "Mayo" || month3 === "Julio" || month3 === "Agosto" || month3 === "Octubre" || month3 === "Diciembre") ? 31
            : null;

if (daysInMonth !== null) {
  alert(`${month3} tiene ${daysInMonth} días.`);
} else {
  alert("Ese mes no existe");
}

// 12- Will alert be shown?

if ("0") {
	alert( 'Hello' );
}

// Si se muestra el mensaje, ya que las cadenas no vacías siempre se consideran como true.

/* 13- Rewrite the following code to optimize it (do not use switch). Rewrite again the following
code by using a switch statement
*/

let n = +prompt('n?', '');
if (n == 0) {
 alert( 0 );
}
if (n == 1) {
 alert( 1 );
}
if (n == 2 || n == 3) {
 alert( '2,3' );
}


/*
>>OPTIMIZED<<

let n = +prompt('n?', '');
const messages = {
    0: 0,
    1: 1,
    2: '2,3',
    3: '2,3'
};

if (messages[n] !== undefined) {
    alert(messages[n]);
}
*/

/*
>>SWITCH<<

let n = +prompt('n?', '');

switch (n) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
        break;
    default:
        alert("n no válido"); 
        break;
}
*/






