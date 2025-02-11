//      ARRAY METHODS EXERCISES

/* 1- Write the function camelize(str) that changes dash-separated words like “my-shortstring” into camel-cased “myShortString”. That is: removes all dashes, each word after dash
becomes uppercased. P.S. Hint: use split to split the string into an array, transform it and
join back.
*/

function camelize(str) {
    return str.split('-').map((palabra, index) => 
        index === 0 ? palabra : palabra.charAt(0).toUpperCase() + palabra.slice(1)) .join(''); 
}
  
console.log(camelize("my-short-string")); 


/* 2- Write a function filterRange(arr, a, b) that gets an array arr, looks for elements
with values higher or equal to a and lower or equal to b and return a result as an array. The
function should not modify the array. It should return the new array.
*/

function filterRange(arr,a,b){
    let newArr = []; 
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] >= a){
            newArr.push(arr[i]); 
        }else{
            if(arr[i] <= b){
                newArr.push(arr[i]); 
            }
        }
    }
  return newArr; 
}

console.log(filterRange([34, 56, 12, 82, 43], 80, 40)); 


/* 3- Write a function filterRangeInPlace(arr, a, b) that gets an array arr and
removes from it all values except those that are between a and b. The test is: a ≤ arr[i]
≤ b. The function should only modify the array. It should not return anything.*/

function filterRangeInPlace(arr, a, b) {
    for (let i = arr.length - 1; i >= 0; i--) {
      
      if (arr[i] < a || arr[i] > b) {
        arr.splice(i, 1);
      }
    }
}
  
let arr1 = [5, 3, 8, 1, 10, 2, 7];
filterRangeInPlace(arr1, 3, 7);
console.log(arr1); 


// 4- Sort an array in decreasing order

const arr2 = [3, 1, 4, 1, 5, 9];
arr2.sort((a, b) => b - a);
console.log(arr2);


/* 5- We have an array of strings arr. We’d like to have a sorted copy of it, but keep arr
unmodified. Create a function copySorted(arr) that returns such a copy.
*/

function copySorted(arr) {
    return arr.slice().sort(); 
  }
  
  
let arr3 = ["Plátano", "Naranja", "Manzana", "Mango"];
let sortedArr = copySorted(arr3);

console.log(sortedArr); 
console.log(arr3); 

/* 6- You have an array of user objects, each one has user.name and user.age. Write the
code that converts it into an array of names.*/

let usuarios = [
    { nombre: "Juan", edad: 25 },
    { nombre: "Sara", edad: 30 },
    { nombre: "Fran", edad: 22 },
    { nombre: "Miguel", edad: 35 }
];

let nombres = usuarios.map(usuario => usuario.nombre);

console.log(nombres); 


/* 7- You have an array of user objects, each one has name, surname and id. Write the code
to create another array from it, of objects with id and fullName, where fullName is
generated from name and surname.
*/

let usuarios2 = [
    { id: 1, nombre: "Jorge", apellido: "Herrero" },
    { id: 2, nombre: "Raúl", apellido: "Pacheco" },
    { id: 3, nombre: "Fran", apellido: "Aguilera" }
];

let usuariosNombreCompleto = usuarios2.map(usuario => ({
id: usuario.id,
nombreCompleto: `${usuario.nombre} ${usuario.apellido}`
}));

console.log(usuariosNombreCompleto);


/* 8- Write the function sortByAge(users) that gets an array of objects with the age
property and sorts them by age.
*/


function ordenaPorEdad(usuarios) {
    usuarios.sort((a, b) => a.edad - b.edad);
}

let usuarios3 = [
{ nombre: "Jorge", edad: 25 },
{ nombre: "Raúl", edad: 20 },
{ nombre: "Pablo", edad: 30 }
];

ordenaPorEdad(usuarios3);

console.log(usuarios3);


/* 9- Write the function shuffle(array) that shuffles (randomly reorders) elements of the
array. All element orders should have an equal probability. For instance, [1,2,3] can be
reordered as [1,2,3] or [1,3,2] or [3,1,2] etc, with equal probability of each case.
In order to do so there are some algorithms being Fisher-Yates shuffle algorithm one of the
most equality. It consists on walking the array in the reverse order and swapping each
element with a random one before it.
*/

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

let arr4 = [1, 2, 3, 4, 5];
shuffle(arr4);
console.log(arr4); 

/* 10- Write the function getAverageAge(users) that gets an array of objects with property
age and returns the average age.
*/

function getAverageAge(usuarios) {
    let edadTotal = usuarios.reduce((sum, usuario) => sum + usuario.edad, 0);
    
    return edadTotal / usuarios.length;
}

let usuarios4 = [
{ nombre: "John", edad: 25 },
{ nombre: "Jane", edad: 30 },
{ nombre: "Mike", edad: 35 }
];

let averageAge = getAverageAge(usuarios4);
console.log(averageAge); 

/* 11- . Let’s say we received an array of users in the form {id:..., name:...,
age:... }. Create a function groupById(arr) that creates an object from it, with id
as the key, and array items as values. In this task we assume that id is unique. There may be
no two array items with the same id. Please use array .reduce method in the solution.
*/

function groupById(arr) {
    return arr.reduce((arr, usuario) => {
      arr[usuario.id] = usuario; 
      return arr; 
    }, {}); 
  }
  
  
  let usuarios5 = [
    { id: 'jorge', name: "Jorge Herrero", age: 20 },
    { id: 'raul', name: "Raúl Pacheco", age: 24 },
    { id: 'ivan', name: "Iván Rodriguez", age: 31 }
  ];
  
  let usersById = groupById(usuarios5);
  
  console.log(usersById);

  
