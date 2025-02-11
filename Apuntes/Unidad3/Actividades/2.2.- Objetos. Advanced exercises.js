//Destructuring

//Exercise 1: Create a function that receives an object with the properties name and age, and uses destructuring to return a string that says "Hello, my name is [name] and I am [age] years old."

function presentar({ nombre, edad }) {
    return `Hola, mi nombre es ${nombre} y tengo ${edad} años`;
}

const persona = { nombre: "Carlos", edad: 25 };
console.log(presentar(persona));

  
//Exercise 2: Create an object representing a book with properties like title, author, and year. Use destructuring to print each of these properties to the console.

const libro ={titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", año: 1605}; 
console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}, Año: ${libro.año}`);


//Exercise 3: Create a function that receives an array of objects (each object representing a person with properties name and age) and uses destructuring to return a new array that contains only the names.

function obtenerNombres(personas) {
    return personas.map(({ nombre }) => nombre);
}

const personas = [
    { nombre: "Pablo", edad: 25 },
    { nombre: "Antonio", edad: 30 },
    { nombre: "Luis", edad: 20 }
];
  
console.log(obtenerNombres(personas));  


//Exercise 4: Given a nested object that contains information about a city (name, population, country), use destructuring to access the country property and display it in the console.

const ciudad = {
    nombre: "Granada",
    población: 228682,
    ubicación: {
      país: "España",
      continente: "Europa"
    }
};
  
const { ubicación: { país } } = ciudad;

console.log(país);  


//Advanced Usage of this

//Exercise 5: Create an object representing a car with a method showDetails that uses this to access its properties brand and model. Then, create a function that calls this method and demonstrates the correct use of this.

const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    showDetails() {
      return `Este coche es un ${this.marca} ${this.modelo}.`;
    }
};
  
function mostrarDetallesCoche() {
console.log(coche.showDetails());
}
   
mostrarDetallesCoche();


//Exercise 6: Define an arrow function inside a method of an object that tries to access this and shows what happens. Then, fix the problem using a traditional function.

const persona2 = {
    nombre: "Fran",
    edad: 30,
    mostrarInfo: function() {
      const info = () => `Nombre: ${this.nombre}, Edad: ${this.edad}`;
      return info();
    }
};

console.log(persona2.mostrarInfo()); 


//Exercise 7: Create an object representing a counter with methods to increment and show the value. Ensure that this works correctly in both methods.

const contador = {
    valor: 0,
    incrementar() {
      this.valor += 1;
    },
    mostrarValor() {
      console.log(`Valor actual del contador: ${this.valor}`);
    }
};


contador.incrementar();
contador.mostrarValor(); 

contador.incrementar();
contador.mostrarValor(); 


//Exercise 8: Create a user object with a present method. Then, call this method from another context (outside the object) using call or apply to demonstrate how the context of this can be changed.

const usuario = {
    nombre: "Lucía",
    edad: 28,
    saluda() {
      return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
    }
};

const otroUsuario = {
nombre: "Carlos",
edad: 35
};

console.log(usuario.saluda.call(otroUsuario));


//Optional Chaining


//Exercise 9: Create a nested object that represents a student with properties name and course. Use optional chaining to access a property that may not exist (e.g., student.course.name) and display a message in the console if the property exists.

const estudiante = {
  nombre: "Raúl",
  curso: {
    nombre: "DAW",
    duracion: "4 meses"
  }
};

if (estudiante.curso?.nombre) {
  console.log(`El estudiante está inscrito en el curso: ${estudiante.curso.nombre}`);
} else {
  console.log("El curso o el nombre del curso no están disponibles.");
}


//Exercise 10: Define an object representing a person with optional properties. Use optional chaining to access properties that may not be defined and return a default value if they do not exist.


const persona3 = {
  nombre: "Raúl",
  edad: 20,
  direccion: {
    city: "Granada",
    calle: "Ribera del Genil"
  }
  
};


const city = persona3.direccion?.ciudad ?? "Ciudad no especificada";
const calle = persona3.direccion?.calle ?? "Calle no especificada";
const codigoPostal = persona3.direccion?.codigoPostal ?? "Código postal no disponible";
const telefono = persona3.telefono ?? "Teléfono no disponible";

console.log(`Nombre: ${persona3.nombre}`);
console.log(`Ciudad: ${city}`);
console.log(`Calle: ${calle}`);
console.log(`Código Postal: ${codigoPostal}`);
console.log(`Teléfono: ${telefono}`);


//Exercise 11: Create an object that contains information about a company and use optional chaining to access the company's address, displaying a message in the console if the address is not defined.

const empresa = {
  nombre: "Domotec",
  sector: "Tecnología",
  //direccion: { ciudad: "Churriana", calle: "Gran Vía" }
};

if (empresa.direccion?.ciudad && empresa.direccion?.calle) {
  console.log(`Dirección de la empresa: ${empresa.direccion.calle}, ${empresa.direccion.ciudad}`);
} else {
  console.log("La dirección de la empresa no está disponible.");
}


//Exercise 12: Define an object representing a book with a review property that can be null. Use optional chaining to display the review in the console only if it exists.

const libro2 = {
  titulo: "Cien Años de Soledad",
  autor: "Gabriel García Márquez",
  reseña: null 
};

if (libro2.reseña?.length > 0) {
  console.log(`Reseña del libro: ${libro.reseña}`);
} else {
  console.log("No hay reseña disponible para este libro.");
}


//Getters and Setters

//Exercise 13: Create an object representing an employee with properties name and salary. Define a getter for salary that returns the salary in currency format and a setter that validates if the salary is a positive number.

class Empleado{
  #nombre; 
  #salario; 

  constructor(nombre, salario){
    this.#nombre = nombre; 
    this.#salario = salario;
  }
  get salario(){
    return this.#salario + "€"; 
  }
  set salario(newSalario){
    if(newSalario>0){
      this.#salario = newSalario; 
    }
  }
}

const empleado1 = new Empleado("Santiago", 1000); 
console.log(empleado1.salario); 
empleado1.salario = 2000; 
console.log(empleado1.salario);

//Exercise 14: Define an object representing a circle with a radius property. Create a getter that calculates and returns the area of the circle and a setter that validates the value of the radius.

class Circulo{
  #radio; 

  constructor(radio){
    if(radio>0){
      this.#radio = radio;
    }
  }

  get area(){
    return 2.14 * Math.pow(this.#radio, 2); 
  }

  set radio(newRadio){
    if(newRadio > 0){
      this.#radio = newRadio; 
    }
  }
}

const circulo1 = new Circulo(3); 
console.log(circulo1.area);
circulo1.radio = 7;  
console.log(circulo1.area);

//Exercise 15: Create an object representing a student with properties name and grades. Define a getter that returns the average grade and a setter that adds a new grade.

class Estudiante {
  #nombre;
  #calificaciones;

  constructor(nombre, calificaciones) {
    this.#nombre = nombre;
    this.#calificaciones = [...calificaciones]; // Asignamos el arreglo directamente
  }

  get calificacionPromedio() {
    let suma = 0;
    for (let i = 0; i < this.#calificaciones.length; i++) {
      suma += this.#calificaciones[i];
    }
    return suma / this.#calificaciones.length;
  }

  set calificacion(newCalificacion) {
    if (newCalificacion >= 0 && newCalificacion <= 10) {
      this.#calificaciones.push(newCalificacion);
    } else {
      console.log("Calificación no válida");
    }
  }
}


const estudiante1 = new Estudiante("Raúl", [8, 7, 6, 9, 10]);
console.log("Promedio: " + estudiante1.calificacionPromedio);
estudiante1.calificacion = 5;
console.log("Promedio: " + estudiante1.calificacionPromedio);



//Exercise 16: Define an object representing a product with properties name, price, and discount. Create a getter that returns the final price after the discount and a setter that validates that the price and discount are positive.

class Producto{
  #nombre; 
  #precio; 
  #descuento; 

  constructor(nombre,precio,descuento){
    this.#nombre = nombre; 
    this.#precio = precio;
    this.#descuento = descuento;  
  }

  get precio() {
    return this.#precio * (1 - this.#descuento / 100);
  }

  set precio(newPrecio){
    if(newPrecio >=0){
      this.#precio = newPrecio; 
    }else{
      console.log("Precio negativo"); 
    }
  }

  set descuento(newDescuento){
    if(newDescuento >= 0){
      this.#descuento = newDescuento; 
    }else{
      console.log("Descuento negativo"); 
    }
  }
}


//Prototypical Inheritance and Method Overriding

//Exercise 17: Create an object animal with a method makeSound. Then, create a dog object that inherits from animal and overrides the makeSound method to return "Woof".

class Animal {
  constructor(nombre, especie) {
    this.nombre = nombre; 
    this.especie = especie; 
  }

  makeSound() {
    console.log("Este animal hace un sonido");
  }
}

class Perro extends Animal {
  constructor(nombre, especie) {
    super(nombre, especie); 
  }

  makeSound() {
    console.log("Woof!!");
  }
}

const boby = new Perro("Boby", "Podenco"); 
boby.makeSound(); 
  


//Exercise 18: Define a vehicle object with a type property and an info method. Create a motorcycle object that inherits from vehicle and overrides the info method to include specific information about the motorcycle.

class Vehiculo {
  constructor(tipo) {
    this.tipo = tipo; 
  }

  info() {
    console.log(`Tipo: ${this.tipo}`);
  }
}

class Moto extends Vehiculo {
  constructor(tipo, cilindrada, marca, modelo) {
    super(tipo); 
    this.cilindrada = cilindrada; 
    this.marca = marca; 
    this.modelo = modelo; 
  }

  info() {
    super.info();
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Cilindrada: ${this.cilindrada}`);
  }
}

const bmw = new Moto("Moto", 1000, "BMW", "S1000RR"); 
bmw.info();



//Exercise 19: Create a base person object with properties name and age. Then, create a teacher object that inherits from person and adds a subject property, overriding the method that presents the information.


class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }


  presentar() {
    console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}`);
  }
}


class Profesor extends Persona {
  constructor(nombre, edad, asignatura) {
    super(nombre, edad); 
    this.asignatura = asignatura; 
  }


  presentar() {
    console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}, Sujeto: ${this.asignatura}`);
  }
}


const persona1 = new Persona("Juan", 30);
persona1.presentar();

const profesor1 = new Profesor("Laura", 40, "Matemáticas");
profesor1.presentar(); 



//Exercise 20: Define a book object with a description method. Then, create a novel object that inherits from book and overrides the description method to include additional information specific to a novel.


class Libro {
  constructor(titulo, autor, año) {
    this.titulo = titulo;
    this.autor = autor;
    this.año = año;
  }


  descripcion() {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Año: ${this.año}`);
  }
}


class Novela extends Libro {
  constructor(titulo, autor, año, genero) {
    super(titulo, autor, año); 
    this.genero = genero; 
  }

  
  descripcion() {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Año: ${this.año}, Género: ${this.genero}`);
  }
}


const libro1 = new Libro("Cien años de soledad", "Gabriel García Márquez", 1967);
libro1.descripcion(); 

const novela1 = new Novela("Crimen y castigo", "Fiódor Dostoyevski", 1866, "Ficción psicológica");
novela1.descripcion(); 
