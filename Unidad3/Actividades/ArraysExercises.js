////////////////////////
////simple exercises////
////////////////////////

//1. Creating arrays

//Exercise 1: Create an empty array and then add numbers from 1 to 5.

let arr1 = []; 

for(let i = 0; i<5; i++){
    mat1[i] = i + 1; 
}


//Exercise 2: Create an array with the names of five fruits and access the third element.

let fruits = ["plátano", "manzana", "fresa", "sandía", "naranja"]; 

console.log(fruits[2]); 


//Exercise 3: Create an array with five elements, including numbers, strings, and a boolean.

const arr2 = [1,2,"hola", true]; 


//Exercise 4: Create a 3x3 two-dimensional array that contains numbers from 1 to 9.

const mb1 = [ 
    [1,2,3],
    [4,5,6],
    [7,8,9]
]; 


//2. Accessing elements

//Exercise 1: Create an array with the names of four cities. Access and display the first and last elements.

const cities = ["Madrid", "Granada", "Córdoba", "Málaga"]; 
console.log(cities[0], cities[cities.length-1]); 


//Exercise 2: Given the array [2, 4, 6, 8, 10], access the second and penultimate elements.

const arr3 = [2, 4, 6, 8, 10]; 
console.log(arr3[1], cities[cities.length-2]); 


//Exercise 3: Given an array of arrays [[1,2], [3,4], [5,6]], access the second element of the third array.

const arr4 = [[1,2], [3,4], [5,6]]; 
console.log(arr4[2][1]); 


//Exercise 4: Create an array with the days of the week. Use a negative index to access the last day.

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"]; 
console.log(daysOfWeek.at(-1)); 


//3. Inserting and removing elements

//Exercise 1: Create an array with three colors. Add a new color at the end.

let colors = ["blanco", "negro", "verde"]; 
colors.push("azul"); 


//Exercise 2: Create an array with five numbers. Use pop() to remove the last element and push() to add a new one at the end.

let arr5 = [34,54,76,21,67]; 
console.log("Elemento eliminado: ", arr5.pop()); 
arr5.push(45); 
console.log(arr5); 


//Exercise 3: Use splice() to remove the third element from a five-fruit array.

let fiveFruits = ["plátano", "manzana", "naranja", "sandía", "fresa"];  
fiveFruits.splice(2, 1);
console.log(fiveFruits); 


//Exercise 4: Insert two elements at position 2 in a three-element array using splice().

let arr6 = [23,45,76]; 

arr6.splice(1, 0, 32,56); 
console.log(arr6); 


//4. Arrays behaving like stacks and queues

//Exercise 1: Create an empty array. Use push() to add three elements and pop() to remove the last one.

let arr7 = []; 
arr7.push(12, 43, 56); 
arr7.pop(); 
console.log(arr7); 


//Exercise 2: Use an array as a queue. Add elements to the end using push() and remove the first element with shift().

let arr8 = []; 
arr8.push(57, 234, 56); 
arr8.shift(); 
console.log(arr8); 


//Exercise 3: Simulate the behavior of a stack using push() and pop() with an array of numbers.

let arr9 = [67,32,45,86,12]; 
arr9.push(43); 
console.log(arr9);
arr9.pop(); 
console.log(arr9); 


//Exercise 4: Simulate the behavior of a queue using push() and shift() with an array of names.

let arr10 = ["Raúl", "Alberto", "Fran", "Jorge"]; 
arr10.push("Iván"); 
console.log(arr10); 
arr10.shift(); 
console.log(arr10); 


// 5. Iterating over arrays

//Exercise 1: Given an array of numbers [1, 2, 3, 4, 5], use a for loop to display each number.

const arr11 = [1, 2, 3, 4, 5];
for (let i = 0; i < arr11.length; i++) {
    console.log(arr11[i]); 
}


//Exercise 2: Use forEach() to iterate over an array of names and display each one in uppercase.

const arr12 = ["Raúl", "Jorge", "Fran", "Jesús"];
arr12.forEach((element) => console.log(element.toUpperCase()));


//Exercise 3: Use a for...of loop to iterate over an array of fruits and display only those starting with "a."

const fruits2 = ["fresa", "pera", "kiwi", "melón", "aguacate"]; 
for(let element of fruits2){
    if(element.startsWith("a")){
        console.log(element); 
    }
}
  


//Exercise 4: Iterate over a two-dimensional array and display each number in the console.

const mb2 = [ 
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

mb2.forEach((fila, indiceFila) => {
    fila.forEach((elemento, indiceElemento) => {
      console.log(elemento); 
    });
});


//6. Returning the position of an element or checking if it exists

//Exercise 1: Given an array of fruits, use indexOf() to find the position of "mango."

const fruits3 = ["aguacate", "caqui", "pomelo", "mango", "mnadarina"]; 
console.log(fruits3.indexOf("mango")); 


//Exercise 2: Use includes() to check if the array [3, 5, 7, 9] contains the number 5.

const arr13 = [3, 5, 7, 9]; 

console.log(arr13.includes(5)); 


//Exercise 3: Given an array with repeated elements, use lastIndexOf() to find the last occurrence of "banana."

const arr14 = [2, 6, 4, 2, 5, 9, 2]; 
console.log(arr14.lastIndexOf(2)); 


//Exercise 4: Given an array of names, use indexOf() to return the position of a name, or -1 if it doesn't exist.

const arr15 = ["Raúl", "Pablo", "Santi", "Sergio"]; 
console.log(arr15.indexOf("Jorge")); 


//7. Array comparison

//Exercise 1: Compare two arrays [1, 2, 3] and [1, 2, 3] using === and explain the result.

const arr16 = [1, 2, 3]; 
const arr17 = [1, 2, 3]; 
console.log(arr16 === arr17); 

/* Devuelve False ya que en JavaScript cuando comparas asi los arrays, estás comparando su referencia de memoria, 
y los dos arrays anteriores apuntan a dos direcciones de memoria diferentes*/


//Exercise 2: Write a function that compares two arrays and returns true if they are equal in content and length.

const arr18 = [1,2,3]; 
const arr19 = [1,2,3]; 

function compareArrays(arr1, arr2){
    let iguales = true;
    if (arr1.length !== arr2.length) {
        iguales = false; 
    } else {
        for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {  
            iguales = false;
            break;  
        }
        }
    }
    console.log(iguales);
}

compareArrays(arr18, arr19); 
  


//Exercise 3: Create two two-dimensional arrays and compare them element by element.

const mb3 = [ 
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const mb4 = [ 
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
function compare2DArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].length !== arr2[i].length) return false;
      for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          console.log(`Desigualdad encontrada en la fila ${i}, columna ${j}: ${arr1[i][j]} !== ${arr2[i][j]}`);
          return false;
        }
      }
    }
    return true;
}
if(compare2DArrays){
    console.log("Iguales"); 
}else{
    console.log("Desiguales"); 
}

//Exercise 4: Use JSON.stringify() to compare two arrays and check if they have the same content.

const arr20 = ["hola", "adiós"]; 
const arr21 = ["hola", "adiós"]; 

console.log(arr20.toString() == arr21.toString());


//8. Finding elements in arrays

//Exercise 1: Given an array of numbers, use find() to locate the first number greater than 10.

const arr22 = [2, 5, 34, 2, 4, 9, 7]; 
const found = array1.find((element) => element > 10);

console.log(found);


//Exercise 2: Use findIndex() to find the position of the first negative number in an array.

const arr23 = [3, 45, 67, 23, -6, 5]; 
const esNegativo = (element) => element < 0;

console.log(arr23.findIndex(esNegativo));


//Exercise 3: Given an array with repeated elements, use findLastIndex() to find the last position of a number greater than 5.

const arr24 = [23, 45, 23, 67, 23];
const num23 = (element) => element == 23; 
console.log(arr24.findLastIndex(num23)); 


//Exercise 4: Given an array of objects representing people, use find() to locate the first person over 30 years old.

const arr25 = [
    {nombre:"pepe", edad:25},
    {nombre: "lucia", edad: 31},
    {nombre: "felipe", edad: 19}
];

const person = arr25.find((element) => element.edad > 30); 
console.log(person); 


//9. Filtering elements

//Exercise 1: Given the array [1, 2, 3, 4, 5], use filter() to return a new array with numbers greater than 3.

const arr26 = [1, 2, 3, 4, 5]; 

let newArr = arr26.filter(elemento => elemento > 3); 
console.log(newArr); 


//Exercise 2: Filter an array of names to return only those that start with the letter "J."

const arr27 = ["Raúl", "Pablo", "Juan", "Fran", "Jorge"]; 
console.log(arr27.filter(elemento => elemento.startsWith("J"))); 


//Exercise 3: Given an array of objects {name: "John", age: 25}, use filter() to return an array of people over 18.

const arr28 = [
    {name: "John", age: 25},
    {name:"Raúl", age: 20}
]
let over18 = arr28.filter(elemento => elemento.age > 18); 
console.log(arr28); 


//Exercise 4: Use filter() and map() to filter numbers greater than 10 and return a new array with the numbers multiplied by 2.

const arr29 = [34, 2, 12, 54, 23, 5, 7]; 
let arr30 = arr29.filter(elemento => elemento > 10);
let arr31 = arr30.map(x=> x*2, arr30); 
console.log(arr31); 




//10. Operations with elements (map, reduce)

//Exercise 1: Use map() to create a new array containing the squares of the numbers [1, 2, 3, 4].

const arr32 = [1, 2, 3, 4]; 
let arr33 = arr32.map(x => x**2, arr32); 
console.log(arr33); 


//Exercise 2: Use reduce() to sum all the numbers in the array [5, 10, 15, 20].

const arr34 = [5, 10, 15, 20]; 
console.log(arr34.reduce((total, actual)=> total + actual)); 


//Exercise 3: Given an array of names, use map() to return a new array where each name is in lowercase.

const arr35 = ["Raúl", "Antonio", "Manolo", "Carlos"]; 
let arr36 = arr35.map(x=> x.toLowerCase()); 
console.log(arr36); 


//Exercise 4: Use filter() followed by reduce() to filter numbers greater than 5 and then sum them.

const arr37 = [3, 6, 5, 7, 2, 8]; 
console.log((arr37.filter(elemento => elemento > 5)).reduce((total,actual) => total + actual)); 


//11. Array concatenation

//Exercise 1: Use concat() to join two arrays of numbers [1, 2, 3] and [4, 5, 6].

const arr38 = [1, 2, 3]; 
const arr39 = [4, 5, 6]; 

let arr40 = arr38.concat(arr39); 
console.log(arr40); 


//Exercise 2: Concatenate two arrays of strings and display the length of the new concatenated array.

const arr41 = ["Hola", "Mundo"]; 
const arr42 = ["Adiós", "Máquina"]; 

let arr43 = arr41.concat(arr42); 
console.log(arr43.length);  


//Exercise 3: Concatenate three arrays of fruits and use join() to convert the new array into a string.

const arr44 = ["Melocotón", "Sandía", "Melón"]; 
const arr45 = ["Plátano", "Naranja", "Uva"]; 
const arr46 = ["Mango", "Aguacate", "Caqui"]; 

let arr47 = arr44.concat(arr45, arr46); 
console.log(arr47.join()); 


//Exercise 4: Use concat() to join two-dimensional arrays and then access one of their elements.

const arr48 = [
    [1, 2, 3],
    [4, 5, 6]
];
  
const arr49 = [
[7, 8, 9],
[10, 11, 12]
];
  
  
const arr50 = arr48.concat(arr49);

const element = arr50[1][2];

console.log(arr50); 
console.log(element); 


//12. Sorting arrays

//Exercise 1: Use sort() to sort an array of numbers [3, 1, 4, 1, 5, 9] in ascending order.

const arr51 = [3, 1, 4, 1, 5, 9];
arr51.sort((a, b) => a - b);
console.log(arr51);


//Exercise 2: Alphabetically sort an array of names using sort().

const arr52 = ["Raúl", "Alberto", "Vinicius", "Jorge"];
arr52.sort((a, b) => a.localeCompare(b)); 
console.log(arr52);


//Exercise 3: Use sort() with a comparison function to sort an array of numbers from largest to smallest.

const arr53 = [3, 1, 4, 1, 5, 9];
arr53.sort((a, b) => b - a); 
console.log(arr53);


//Exercise 4: Sort an array of objects {name: "John", age: 25} by the age property using sort().

const arr54 = [
    { name: "Raúl", age: 25 },
    { name: "Pablo", age: 30 },
    { name: "Iván", age: 20 }
];
    
arr54.sort((a, b) => a.age - b.age);

console.log(arr54);


//13. Reversing arrays

//Exercise 1: Use reverse() to reverse an array of numbers [1, 2, 3, 4, 5].

const arr55 = [1, 2, 3, 4, 5]; 
console.log(arr55.reverse());


//Exercise 2: Reverse an array of strings and use join() to create a string with the words in reverse order.

const arr56 = ["máquina", "mundo", "Hola"]; 
console.log(arr56.reverse().join(" ")); 


//Exercise 3: Given a two-dimensional array, use reverse() to reverse the order of the rows.

const arr57 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
    
arr57.reverse();

console.log(arr57);


//Exercise 4: Use sort() and then reverse() to sort and then reverse an array of numbers.

const arr58 = [3, 1, 4, 1, 5, 9];

arr58.sort((a, b) => a - b);

arr58.reverse();

console.log(arr58);


//14. Filling arrays with values (fill)

//Exercise 1: Use fill() to fill an empty array of length 5 with the number 0.

const arr59 = new Array(5);

arr59.fill(0);

console.log(arr59);


//Exercise 2: Fill part of an array of numbers [1, 2, 3, 4, 5] with the value 9 starting from index 2.

const arr60 = [1, 2, 3, 4, 5];

arr60.fill(9, 2);

console.log(arr60);


//Exercise 3: Create an array of length 10 and fill it with the value "x" in the last 5 elements.

const arr61 = new Array(10);

arr61.fill("x", 5);

console.log(arr61);


//Exercise 4: Use fill() to replace the first 3 elements of an array with the value "A."

const arr62 = [1, 2, 3, 4, 5];

arr62.fill("A", 0, 3);

console.log(arr62);


//15. Destructuring

//Exercise 1: Destructure a two-element array [10, 20] into two variables.

const [a, b] = [10, 20];

console.log(a);
console.log(b); 


//Exercise 2: Destructure the first two elements of an array and store the rest in another variable using the spread operator.

const arr63 = [10, 20, 30, 40, 50];

const [first, second, ...rest] = arr63;

console.log(first); 
console.log(second); 
console.log(rest); 


//Exercise 3: Given a two-dimensional array, destructure the first row into three variables.

const arr64 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
  
const [c, d, e] = arr64[0];
  
console.log(c); 
console.log(d); 
console.log(e); 


//Exercise 4: Destructure an array of objects {name: "John", age: 25} to get the name and age properties from the first object.

const arr65 = [
    { nombre: "Raúl", edad: 25 },
    { nombre: "Santi", edad: 30 },
    { nombre: "Jesús", edad: 20 }
];
  
const [{ nombre, edad }] = arr65;
  
console.log(nombre); 
console.log(edad);  


/////////////////////////////
////final array exercises////
/////////////////////////////

//Exercise 1: Given an array of numbers, remove all negative numbers, reverse the order of the array, and then sum the remaining even numbers. Return the result.

function procesarArray(numeros) {

    const numerosNoNegativos = numeros.filter(num => num >= 0);
    
    const reversedArray = numerosNoNegativos.reverse();
    
    const sumaPares = reversedArray.reduce((sum, num) => {
      return num % 2 === 0 ? sum + num : sum;
    }, 0);
    
    return sumaPares;
}
  
const numeros = [3, -1, 4, -2, 6, -5, 8];
const resultado = procesarArray(numeros);
console.log(resultado); 


//Exercise 2: You have an array of objects representing people, where each object has the properties name, age, and profession. Filter out people older than 30 who work as "engineers." Then, sort the filtered people by age in descending order and return a new array with just their names.

const personas = [
    { nombre: "Raúl", edad: 35, profesion: "ingeniero" },
    { nombre: "María", edad: 28, profesion: "doctora" },
    { nombre: "Luis", edad: 32, profesion: "ingeniero" },
    { nombre: "Marta", edad: 40, profesion: "abogada" },
    { nombre: "Carlos", edad: 45, profesion: "ingeniero" }
];
  
const ingenierosMayoresDe30 = personas.filter(persona => persona.edad > 30 && persona.profesion === "ingeniero").sort((a, b) => b.edad - a.edad).map(persona => persona.nombre);

console.log(ingenierosMayoresDe30);


//Exercise 3:Given an array of words, remove words that are less than 5 letters long, convert them all to uppercase, sort them alphabetically, and join them into a single string separated by dashes (-). Return the resulting string.

const palabras = ["hola", "mundo", "desarrollo", "web", "javascript", "node"];

const resultado3 = palabras.filter(palabra => palabra.length >= 5).map(palabra => palabra.toUpperCase()).sort().join('-');

console.log(resultado);



//Exercise 4:You have two arrays of numbers. First, combine both arrays, removing any duplicates. Then, find the highest and lowest numbers and return a new array containing only the numbers between the second lowest and the second highest values (inclusive).

function procesarMatrices(mt1, mt2) {
    const combinada = [...mt1, ...mt2];
  
    const noDuplicados = Array.from(new Set(combinada));
    
    noDuplicados.sort((a, b) => a - b);
    
    const segundoMasBajo = noDuplicados[1];
    const segundoMasAlto = noDuplicados[noDuplicados.length - 2];
    
    const resultado = noDuplicados.filter(num => num >= segundoMasBajo && num <= segundoMasAlto);
    
    return resultado;
}   
  
const mt1 = [3, 5, 7, 9];
const mt2 = [2, 5, 8, 10, 3];

const resultado4 = procesarMatrices(mt1, mt2);
console.log(resultado4); 


//Exercise 5:Given a two-dimensional array representing a warehouse table of products (each subarray contains the product name, quantity in stock, and price per unit), do the following:

    //Find the product with the highest quantity in stock.
    //Calculate the total value of that product based on its quantity and price.
    //Return an object with the product name and the total value calculated.

function productoConMayorExistencia(productos) {
    let productoMaximo = null;

    for (const producto of productos) {
        const [nombre, cantidad, precio] = producto;

        if (!productoMaximo || cantidad > productoMaximo.cantidad) {
        productoMaximo = { nombre, cantidad, precio };
        }
    }

    const valorTotal = productoMaximo.cantidad * productoMaximo.precio;

    return {
        nombre: productoMaximo.nombre,
        valorTotal: valorTotal
    };
}

const inventario = [
["Producto A", 10, 5],
["Producto B", 15, 7],
["Producto C", 5, 10],
["Producto D", 20, 2]
];

const resultado5 = productoConMayorExistencia(inventario);
console.log(resultado5);


//Exercise 6:Given an array of numbers, separate the odd numbers from the even ones. Then, multiply the even numbers by 2 and the odd numbers by 3. Finally, combine both sets of numbers into a single array sorted from lowest to highest and return the result.

function procesarNumeros(numeros) {
  
    const pares = numeros.filter(num => num % 2 === 0);
    const impares = numeros.filter(num => num % 2 !== 0);
    
    const paresMultiplicados = pares.map(num => num * 2);
    
    const imparesMultiplicados = impares.map(num => num * 3);
    
    const combinados = [...paresMultiplicados, ...imparesMultiplicados];
    
    const resultadoFinal = combinados.sort((a, b) => a - b);
    
    return resultadoFinal;
  }
  
  const numeros6 = [5, 2, 8, 3, 1, 4, 7, 10];
  const resultado6 = procesarNumeros(numeros);
  console.log(resultado); 
  

//Exercise 7:You have an array of objects representing different books, where each object has the properties title, author, and year of publication. Filter out books published after the year 2000, group them by author, and return an object where each key is the author’s name, and the value is an array with the titles of their books.

function agruparLibrosPorAutor(libros) {
    const librosFiltrados = libros.filter(libro => libro.año > 2000);
  
    const agrupadosPorAutor = {};
  
    librosFiltrados.forEach(libro => {
      const { autor, titulo } = libro;
      
      if (!agrupadosPorAutor[autor]) {
        agrupadosPorAutor[autor] = [];
      }
  
      agrupadosPorAutor[autor].push(titulo);
    });
  
    return agrupadosPorAutor;
}

const biblioteca = [
{ titulo: "El Alquimista", autor: "Paulo Coelho", año: 1998 },
{ titulo: "Cien años de soledad", autor: "Gabriel García Márquez", año: 1967 },
{ titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", año: 1997 },
{ titulo: "El código Da Vinci", autor: "Dan Brown", año: 2003 },
{ titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", año: 2001 },
{ titulo: "Los hombres que no amaban a las mujeres", autor: "Stieg Larsson", año: 2005 },
{ titulo: "El maestro y Margarita", autor: "Mijaíl Bulgákov", año: 2005 },
{ titulo: "El cuento de la criada", autor: "Margaret Atwood", año: 2017 },
{ titulo: "La chica del tren", autor: "Paula Hawkins", año: 2015 }
];

const resultado7 = agruparLibrosPorAutor(biblioteca);
console.log(resultado7);
  

//Exercise 8:Given an array of numbers, return a new array where the numbers are squared if they are odd and cubed if they are even. Then, remove any number greater than 500 and return the result.

function transformarYFiltrarNumeros(numeros) {
    const transformados = numeros.map(num => {
      return num % 2 === 0 ? Math.pow(num, 3) : Math.pow(num, 2);
    });
  
    const filtrados = transformados.filter(num => num <= 500);
  
    return filtrados;
  }
  
  const numeros8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const resultado8 = transformarYFiltrarNumeros(numeros8);
  console.log(resultado8); 


//Exercise 9:You have an array of strings representing usernames. You must perform the following actions:

    //Remove duplicate names.
    //Filter names that start with a vowel.
    //Sort the remaining names in descending order by length.
    //Return a string where each name is separated by a comma and a space.

function procesarNombres(nombres) {
    const nombresUnicos = [...new Set(nombres)];

    const nombresFiltrados = nombresUnicos.filter(nombre => {
        const primeraLetra = nombre.charAt(0).toLowerCase();
        return ['a', 'e', 'i', 'o', 'u'].includes(primeraLetra);
    });

    const nombresOrdenados = nombresFiltrados.sort((a, b) => b.length - a.length);

    return nombresOrdenados.join(', ');
}

const nombresDeUsuario = [
"Ana", "Pedro", "Isabel", "Eduardo", "Ana", "Alfredo", 
"Omar", "Evelyn", "Juan", "Alejandro", "Ursula", "Ines"
];

const resultado9 = procesarNombres(nombresDeUsuario);
console.log(resultado9); 
      
      


//Exercise 10: Given a two-dimensional array representing a grid of colors (each subarray is a row of colors), do the following:

    //Reverse the order of the rows and columns of the array (matrix transposition).
    //Replace all colors containing the letter "a" with "black."
    //Return the new grid.

function transformarCuadricula(colores) {

    const matrizTranspuesta = colores[0].map((_, colIndex) => colores.map(row => row[colIndex])).reverse();
    
    const nuevaCuadricula = matrizTranspuesta.map(fila =>
        fila.map(color => color.includes('a') ? 'negro' : color)
    );
    
    return nuevaCuadricula;
}
    
const cuadrigaColores = [
["rojo", "azul", "verde"],
["amarillo", "morado", "naranja"],
["negro", "blanco", "gris"]
];

const resultado10 = transformarCuadricula(cuadrigaColores);
console.log(resultado10);