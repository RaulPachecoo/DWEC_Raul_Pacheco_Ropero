// 1- Write the code, one line for each action:

//a) Create an empty object user.

let user = {};

//b) Add the property name with the value John.

user.name = "John"; 

//c) Add the property surname with the value Smith.

user.surname = "Smith"; 

//d) Change the value of the name to Pete.

user.name = "Pete"; 

//e) Remove the property name from the object.

delete user.name; 

/*f) Write the function isEmpty(obj) which returns true if the object has no properties,
false otherwise.
*/

function isEmpty(obj) {
    for (let key in obj) {
        
        return false;
    }
    return true;
}
  

/* 2- We have an object storing salaries of our team. Write the code to sum all salaries and store in
the variable sum.
*/

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
};

let sum = 0;

for (let key in salaries) {
sum += salaries[key];  
}

console.log(sum);    

/* 3- Create a function multiplyNumeric(obj) that multiplies all numeric property values
of obj by 2.
*/

function multiplyNumeric(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'number') {
        obj[key] *= 2;  
      }
    }
}

/*4- Here the function makeUser returns an object. What is the result of accessing its ref?
Why?
*/

function makeUser() {
    return {
    name: "John",
    ref: this
    };
}
let user = makeUser();
alert( user.ref.name );

/*  En JavaScript, el valor de this depende de cómo se llame a la función. En el caso de makeUser(), 
que es una llamada de función normal se refiere al objeto global, a la ventana del navegador, 
es decir, no apunta al objeto que contiene "John". 
*/

/* 5- Create an object calculator with three methods:
a) read() prompts for two values and saves them as object properties with names a and
b respectively.
b) sum() returns the sum of saved values.
c) mul() multiplies saved values and returns the result.
*/

let calculator = {
  
    read() {
      this.a = +prompt("Ingresa el primer número:", 0);
      this.b = +prompt("Ingresa el segundo número:", 0);
    },
    
    
    sum() {
      return this.a + this.b;
    },
    mul() {
      return this.a * this.b;
    }
};
  
  
calculator.read();  
alert( "Suma: " + calculator.sum() );  
alert( "Multiplicación: " + calculator.mul() ); 

/* 6- Having the following object, write a function that gets the total amount of kg that the fruit
shop has. Create two pieces of code solving the problem. In one of them, Object.values must
appear and in the other one, for...of must be present. Prepare the function for the case that
there is no fruit at all
*/

let frutas={
    "manzanas golden": 25,
    "manzanas fuji": 20,
    "pera conferencia": 17,
    "pera ercolina": 12,
}

function totalKgFrutas(frutas) {
    
    if (Object.keys(frutas).length === 0) {
      return 0;  
    }
    
    
    return Object.values(frutas).reduce((total, kg) => total + kg, 0);
}

function totalKgFrutas(frutas) {
    let total = 0;
    
    
    if (Object.keys(frutas).length === 0) {
      return total;  
    }
    
    
    for (let [fruta, kg] of Object.entries(frutas)) {
      total += kg;  
    }
  
    return total;
}


/* 7- Take the last code and write a function that returns an object containing the name of the fruit
(including all varieties) and the total number of kgs
*/


function totalKgPorFruta(frutas) {
    let resultado = {};
  

    for (let [fruta, kg] of Object.entries(frutas)) {
      
      let nombreGeneral = fruta.split(" ")[0];  
      
      
      if (resultado[nombreGeneral]) {
        resultado[nombreGeneral] += kg;
      } else {
        resultado[nombreGeneral] = kg;
      }
    }
  
    return resultado;
}


/* 8- There’s a number object that allows to add and subtract:

let number = {
 current: 0,
 add() {
 this.current++;
 },
 subtract() {
 this.current--;
 },
 showNumber: function() {
 console.log( this.current );
 }
};

Now, if we need to make several calls in sequence, can do it like this:

number.add();
ladder.add();
ladder.subtract();
ladder.add();
ladder.subtract();
ladder.showNumber();

Modify the code to make the calls chainable, like this:

number.add().add().subtract().add().subtract().showNumber();
*/

let number = {
  current: 0,
  add() {
    this.current++;
    return this; 
  },
  subtract() {
    this.current--;
    return this; 
  },
  showNumber: function() {
  console.log( this.current );
  }
};


/* 9- Create an object, fruits, with the properties name and kg. Once created, assign four methods
to the object: sell, buy, outOfStockDate and buyingDate. As there is no date property, the
last methods must be programmed but user should see no error
*/

let fruits = {
  nombre: "platano", 
  kg: 50,             
  
  vender(cantidad) {
    if (this.kg >= cantidad) {
      this.kg -= cantidad;
      console.log(`${cantidad} kg vendidos. Quedan ${this.kg} kg de ${this.nombre}.`);
    } else {
      console.log(`No hay suficientes ${this.nombre}. Solo quedan ${this.kg} kg.`);
    }
  },

  
  comprar(cantidad) {
    this.kg += cantidad;
    console.log(`Compraste ${cantidad} kg de ${this.nombre}. Ahora tienes ${this.kg} kg.`);
  },

  
  setFechaAgotado(fecha) {
    this.fechaAgotado = fecha || null;  
  },

  getFechaAgotado() {
    if (this.fechaAgotado) {
      console.log(`La fecha de agotado es: ${this.fechaAgotado}`);
    } else {
      console.log(`La fruta ${this.nombre} aún no está agotada o no tiene fecha de agotado.`);
    }
  },

  
  setFechaCompra(fecha) {
    this.fechaCompra = fecha || null;  
  },

  getFechaCompra() {
    if (this.fechaCompra) {
      console.log(`La fecha de compra es: ${this.fechaCompra}`);
    } else {
      console.log(`La fruta ${this.nombre} aún no tiene fecha de compra asignada.`);
    }
  }
};


/* 10- Create an object that stores information about a spare car parts sold by a car shop. It should
contain 4 or more rows and, for each one, name and numer of parts. Create a function that
sum a number to every spare part.
*/

let repuestos = {
  "filtroAceite": 15,
  "pastillasFreno": 30,
  "bujías": 20,
  "baterías": 8,
};

function incrementarRepuestos(cantidad) {
  for (let pieza in repuestos) {
    repuestos[pieza] += cantidad;
  }
}


/* 11- Create a function that creates an object storing the following information about an user:
name, address, body dimensions. Use as less number of primary properties as possible.
Create an user “usuario1” and copy this object to “usuario2”. Both of them must be different
objects.
*/

function crearUsuario(nombre, direccion, altura, peso) {
  return {
    nombre: nombre,
    direccion: direccion,
    cuerpo: {
      altura: altura,
      peso: peso
    }
  };
}

let usuario1 = crearUsuario("Raúl", "Calle Ribera del Genil, 19", 180, 75);
let usuario2 = JSON.parse(JSON.stringify(usuario1));

console.log("Usuario 1:", usuario1);
console.log("Usuario 2:", usuario2);


/* 12- Add functions to get user’s information to the previous object. Add a function to get user’s
friends. Despite this property does not exist, it must give no error. Call a function to get
user’s mate, which does not exist. Again it must give no error.
*/


function crearUsuario(nombre, direccion, altura, peso) {
  return {
    nombre: nombre,
    direccion: direccion,
    cuerpo: {
      altura: altura,
      peso: peso
    },
    

    obtenerInfo() {
      return `Nombre: ${this.nombre}, Dirección: ${this.direccion}, Altura: ${this.cuerpo.altura} cm, Peso: ${this.cuerpo.peso} kg`;
    },


    obtenerAmigos() {
      if (!this.amigos) {
        return "Este usuario no tiene amigos.";
      } else if (this.amigos.length === 0) {
        return "La lista de amigos está vacía.";
      }
      return `Amigos: ${this.amigos.join(", ")}`;
    }
  };
}


let usuario3 = crearUsuario("Raúl", "Calle Ribera del Genil, 19", 180, 75);


let usuario4 = crearUsuario(usuario3.nombre, usuario3.direccion, usuario3.cuerpo.altura, usuario3.cuerpo.peso);


usuario4.amigos = ["Pedro", "Ana", "Luis"];

console.log(usuario3.obtenerInfo());  
console.log(usuario4.obtenerInfo());  


console.log(usuario3.obtenerAmigos());  


console.log(usuario4.obtenerAmigos());  





