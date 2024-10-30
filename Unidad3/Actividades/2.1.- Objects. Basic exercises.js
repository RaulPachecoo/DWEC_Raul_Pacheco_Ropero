// Exercises on Objects in JavaScript

// Exercise 1: Create an object with properties that describe a car (brand, model, year).

const car = {
    brand: "Seat",
    model: "Toledo",
    year: 2001
};
console.log(car);  

// Exercise 2: Create a constructor function for a Person and instantiate two objects from it.

function Person(name, age, profession) {
    this.name = name;
    this.age = age;
    this.profession = profession;
}
  
const person1 = new Person("Raúl", 20, "Software Developer");
const person2 = new Person("Juan", 62, "Farmer");
console.log(person1, person2);    

// Exercise 3: Access properties of a book object using both dot notation and bracket notation.

const book = {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    añoPublicacion: 1605,
    paginas: 230
}; 

console.log(book.titulo, book["autor"]);

// Exercise 4: Modify the year published property of the book object.

book.añoPublicacion = 1606; 
console.log(book); 

// Exercise 5: Add a new property (color) to the car object.

Object.defineProperty(car, 'color', {
    value: 'negro',
    writable: false, 
    enumerable: false,
    configurable: false
}); 

// Exercise 6: Remove the model property from the car object.

delete car.model;
console.log(car);


// Exercise 7: Create an object and freeze it. Try to change one of its properties.

Object.freeze(car); 
car.year = 2002; // Devuelve un error ya que al congelarlo no nos permite modificarlo.


// Exercise 8: Create an object and prevent it from having new properties added. Try to add a new property.

Object.preventExtensions(book); 
book.editorial = "anaya"; 


// Exercise 9: Use Object.keys() to get the keys of a student object and print them.

const student = {
    name: "Raúl",
    age: 20,
    course: "Desarrollo de aplicaciones web"
};

console.log(Object.keys(student));


// Exercise 10: Use Object.values() to get the values of a student object and print them.

console.log(Object.values(student));


// Exercise 11: Iterate through the properties of a pet object and print each property with its value.

const pet = {
    species: "Perro",
    name: "Sonic",
    age: 5
};

for (let key in pet) {
    if (pet.hasOwnProperty(key)) {
        console.log(`${key}: ${pet[key]}`);
    }
}


// Exercise 12: Write a function that checks if two objects have at least one property in common.

function haveCommonProperty(obj1, obj2) {
    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

console.log(haveCommonProperty({a: 1, b: 2}, {b: 3, c: 4})); // true
console.log(haveCommonProperty({x: 1}, {y: 2})); // false


// Exercise 13: Create a function that returns a new object that merges two given objects.

function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

console.log(mergeObjects({a: 1, b: 2}, {b: 3, c: 4}));


// Exercise 14: Create a function that clones a given object.

function cloneObject(obj) {
    return { ...obj };
}

const original = { name: "Original", value: 100 };
const clone = cloneObject(original);
console.log(clone);


// Exercise 15: Create a function that compares two objects and returns true if they are equal, false otherwise.

function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log(areObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); 
console.log(areObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 3 })); 


// Exercise 16: Write a function that destructures an object and returns its properties as variables.

function destructureObject(obj) {
    const { name, age, profession } = obj;
    return { name, age, profession };
}

const person = { name: "Raúl", age: 30, profession: "Informático" };
const destructured = destructureObject(person);
console.log(destructured);

// Exercise 17: Create an object that uses 'this' in a method and show how to call it correctly.

const Person2 = {
    name: "Pablo",
    showName() {
        console.log(`Name: ${this.name}`);
    }
};

Person2.showName();
