//Exercise 1: Create a person object with properties name and age. Define a greet method that prints a greeting to the console. Then, create a function that changes the context of this to greet from another object.

const persona = {
    nombre: "Raúl",
    edad: 20,
    saludo() {
      console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
};

const otraPersona = {
nombre: "Pablo",
edad: 30
};

function cambiarContextoSaludo(objeto) {
persona.saludo.call(objeto); 
}

persona.saludo(); 

cambiarContextoSaludo(otraPersona); 


//Exercise 2: Define a book object with properties title, author and year. Use destructuring to print each of these properties to the console.

const libro = {
    titulo: "1984",
    autor: "George Orwell",
    anio: 1949
};
  
console.log(`Título: ${libro.titulo}`); 
console.log(`Autor: ${libro.autor}`);   
console.log(`Año: ${libro.anio}`);  
  


//Exercise 3: Create a product object with properties name, price and discount. Implement a method that returns the final price after the discount and another method that validates that the price and discount are positive.

class Producto{
    #nombre; 
    #precio; 
    #descuento; 
  
    constructor(nombre,precio,descuento){
      this.#nombre = nombre; 
      if(precio > 0 && descuento > 0){
        this.#precio = precio;
        this.#descuento = descuento;
      } 
    }
  
    get precio() {
      return this.#precio * (1 - this.#descuento / 100);
    }
}
  
const producto1 = new Producto("Portatil", 1500, 20); 

console.log(producto1.precio); 


//Exercise 4: Create a company object with an employee property, which is an array of person objects. Access the name property of a specific employee and display a message in the console if it exists.

const empresa = {
    empleados: [
      { nombre: "Juan", edad: 28 },
      { nombre: "María", edad: 34 },
      { nombre: "Pedro", edad: 25 }
    ]
  };
  
  function mostrarNombreEmpleado(empresa, nombreEmpleado) {
    const empleado = empresa.empleados.find(emp => emp.nombre === nombreEmpleado);
    
    if (empleado) {
      console.log(`Empleado encontrado: ${empleado.nombre}`);
    } else {
      console.log("Empleado no encontrado");
    }
  }
  
  mostrarNombreEmpleado(empresa, "María"); 
  mostrarNombreEmpleado(empresa, "Carlos"); 
  


//Exercise 5: Define an animal object with a method makeSound. Create a cat object that inherits from animal and override the method to return ‘Meow’. Then, create a dog object that also inherits from animal and override the method to return ‘Woof’.


class Animal {
    makeSound() {
    }
  }
  
  
  class Cat extends Animal {
    makeSound() {
      console.log("Meow");
    }
  }
  
  class Dog extends Animal {
    makeSound() {
      console.log("Woof");
    }
  }
  
  const cat = new Cat();
  cat.makeSound();
  
  const dog = new Dog();
  dog.makeSound(); 


//Exercise 6: Create a function that accepts two objects and returns true if they have at least one property in common, or false if they do not.

function tienenPropiedadComun(obj1, obj2) {
    const propiedadesObj1 = Object.keys(obj1);
    const propiedadesObj2 = Object.keys(obj2);
  
    for (const propiedad of propiedadesObj1) {
      if (propiedadesObj2.includes(propiedad)) {
        return true; 
      }
    }
    
    return false; 
}


const objetoA = { nombre: "Mario", edad: 25, ciudad: "Madrid" };
const objetoB = { pais: "España", edad: 30 };
const objetoC = { color: "rojo", tamaño: "grande" };

console.log(tienenPropiedadComun(objetoA, objetoB)); 
console.log(tienenPropiedadComun(objetoA, objetoC)); 


//Exercise 7: Create a car object with properties make and model. Define a method that uses these properties and displays a message on the console.

const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    
  
    mostrarInfo() {
      console.log(`Este coche es un ${this.marca} ${this.modelo}.`);
    }
};


coche.mostrarInfo(); 


//Exercise 8: Define a student object with properties name and grades. Implement a method that calculates and returns the average grade of the students.

const estudiante = {
    nombre: "María",
    calificaciones: [9, 8.5, 7.8, 9.2, 8.8],
    
  
    calcularPromedio() {
      const suma = this.calificaciones.reduce((acumulador, calificacion) => acumulador + calificacion, 0);
      return suma / this.calificaciones.length;
    }
};


console.log(`El promedio de ${estudiante.nombre} es: ${estudiante.calcularPromedio()}`);


//Exercise 9: Create a book object with a review property that can be null. Make sure to display the review in the console only if it exists.

const libro2 = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    reseña: null 
  };
  
  function mostrarReseña(libro) {
    if (libro2.reseña) {
      console.log(`Reseña: ${libro2.reseña}`);
    } else {
      console.log("No hay reseña disponible.");
    }
}


mostrarReseña(libro2); 


libro2.reseña = "Una historia cautivadora sobre la amistad y la inocencia.";
mostrarReseña(libro2); 


//Exercise 10: Create a university object with a faculties property, which is an array of objects. Use the appropriate syntax to access a specific faculty and display its name in the console.

const universidad = {
    nombre: "Universidad de Granada",
    facultades: [
      { nombre: "Facultad de Ingeniería", departamentos: 5 },
      { nombre: "Facultad de Medicina", departamentos: 8 },
      { nombre: "Facultad de Artes", departamentos: 4 }
    ]
};


console.log(universidad.facultades[1].nombre); 


//Exercise 11: Define a house object with properties colour and number of rooms. Use a getter to return a description of the house and a setter to validate the colour before assigning it.

class Casa {
    constructor(color, numeroDeHabitaciones) {
      this._color = color;  
      this.numeroDeHabitaciones = numeroDeHabitaciones;
    }
  
    get descripcion() {
      return `Esta casa es de color ${this._color} y tiene ${this.numeroDeHabitaciones} habitaciones.`;
    }
  
    set color(nuevoColor) {
      const coloresPermitidos = ["rojo", "azul", "verde", "blanco", "negro"];
      if (coloresPermitidos.includes(nuevoColor.toLowerCase())) {
        this._color = nuevoColor;
      } else {
        console.log("Color no válido. Solo se permiten colores: rojo, azul, verde, blanco, negro.");
      }
    }
}

const miCasa = new Casa("rojo", 3);
console.log(miCasa.descripcion); 

miCasa.color = "amarillo"; 


//Exercise 12: Create a counter object with methods to increment and display the value. Make sure the value is updated correctly.

const contador = {
    valor: 0, 
   
    incrementar() {
      this.valor++; 
    },
  
    mostrarValor() {
      console.log(`El valor actual del contador es: ${this.valor}`);
    }
};


contador.mostrarValor(); 
contador.incrementar(); 
contador.mostrarValor(); 
contador.incrementar(); 
contador.mostrarValor(); 


//Exercise 13: Create a game object that contains information about a board game. Implement a method that displays the description of the game and its number of players.

const juego = {
    nombre: "Ajedrez",
    descripcion: "Un juego de mesa estratégico entre dos jugadores, donde cada uno mueve piezas con reglas específicas en un tablero.",
    numeroDeJugadores: 2,
    
    mostrarInfo() {
      console.log(`Juego: ${this.nombre}`);
      console.log(`Descripción: ${this.descripcion}`);
      console.log(`Número de jugadores: ${this.numeroDeJugadores}`);
    }
};

juego.mostrarInfo();


//Exercise 14: Define an employee object with properties name, age and position. Implement a getter that returns a description of the employee.

const empleado = {
    nombre: "Carlos",
    edad: 30,
    puesto: "Desarrollador",
  
    get descripcion() {
      return `${this.nombre}, de ${this.edad} años, trabaja como ${this.puesto}.`;
    }
};

console.log(empleado.descripcion); 


//Exercise 15: Create a food object with properties name and calories. Implement a method that determines if the food is healthy based on its calorie count.

const comida = {
    nombre: "Ensalada",
    calorias: 150,
  
  
    esSaludable() {
      if (this.calorias < 200) {
        return `${this.nombre} es una comida saludable.`;
      } else {
        return `${this.nombre} no es una comida saludable.`;
      }
    }
};


console.log(comida.esSaludable()); 


comida.nombre = "Pizza";
comida.calorias = 350;
console.log(comida.esSaludable()); 


//Exercise 16: Create a user object with properties name, email and a method to display the user's information in the console.

const usuario = {
    nombre: "Raúl Pérez",
    correoElectronico: "raul.perez@example.com",
  
    mostrarInfo() {
      console.log(`Nombre: ${this.nombre}`);
      console.log(`Correo Electrónico: ${this.correoElectronico}`);
    }
};

usuario.mostrarInfo();
  

//Exercise 17: Define a movie object with properties title, director and year. Implement a method to return the synopsis of the movie.

const pelicula = {
    titulo: "Inception",
    director: "Christopher Nolan",
    año: 2010,
  
    sinopsis() {
      return `${this.titulo} es una película dirigida por ${this.director}, estrenada en ${this.año}. En ella, un grupo de ladrones se infiltra en los sueños de sus víctimas para robar secretos de su subconsciente.`;
    }
};

console.log(pelicula.sinopsis());


//Exercise 18: Create a vehicle object with properties make, model and year. Implement a method that returns a string describing the vehicle.

const vehiculo = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2022,
  
    descripcion() {
      return `Este es un ${this.marca} ${this.modelo} del año ${this.año}.`;
    }
};

console.log(vehiculo.descripcion());


//Exercise 19: Define a fruit object with properties name and colour. Implement a method that returns a message about the fruit.

const fruta = {
    nombre: "Manzana",
    color: "Rojo",
  
    mensaje() {
      return `La ${this.nombre} es de color ${this.color}.`;
    }
};

console.log(fruta.mensaje());


//Exercise 20: Create a device object with properties type, make and model. Implement a method that prints the device information to the console.

const dispositivo = {
    tipo: "Smartphone",
    marca: "Honor",
    modelo: "200 Pro",
  
    mostrarInfo() {
      console.log(`Tipo: ${this.tipo}`);
      console.log(`Marca: ${this.marca}`);
      console.log(`Modelo: ${this.modelo}`);
    }
};

dispositivo.mostrarInfo();

