class Persona{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar(){
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
    }

    async obtenerDatos(){
        const info = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const datos = await info.json();
        return datos.name;
    }
}

const miPersona = new Persona('Juan', 30);
const {nombre, edad} = persona;

const saludoFlecha = () => {
    console.log(`Hola, soy ${nombre} y tengo ${edad} años`);
}

console.log(persona.saludo); 
console.log(saludoFlecha());
persona.obtenerDatos().then(info=>console.log("Información que me ha devuelto la página", info));