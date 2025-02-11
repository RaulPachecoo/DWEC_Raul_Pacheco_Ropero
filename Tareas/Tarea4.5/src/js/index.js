// Código moderno con ES6+
class Usuario {
    constructor(nombre, email, empresa) {
        this.nombre = nombre;
        this.correo = email;
        this.empresa = empresa; // Se espera que sea un objeto con una propiedad "name"
    }

    saludar() {
        return `Hola, me llamo ${this.nombre}, mi correo es ${this.correo} y trabajo en ${this.empresa.name}`;
    }

    // Método asíncrono adicional para simular obtener información extra
    async obtenerInfo() {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users?email=${this.correo}`);
        const data = await respuesta.json();
        return data.length ? data[0] : null;
    }
}

// Función asíncrona para obtener usuarios
const obtenerUsuarios = async () => {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await respuesta.json();
        return usuarios.map((usuario) => new Usuario(usuario.name, usuario.email, usuario.company));
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

// Uso de promesas y funciones flecha
obtenerUsuarios()
    .then((usuarios) => {
        usuarios.forEach((usuario) => {
            console.log(usuario.saludar());
        });
    })
    .catch((error) => console.error('Error al procesar usuarios:', error));

// Uso de la desestructuración
const persona = new Usuario('Juan', 'juan@juan.es', { name: 'Juan S.L.' });
const { nombre, correo } = persona;

// Uso del operador de propagación
const persona2 = { ...persona, ciudad: 'Madrid' };

// Función flecha con contexto adecuado
const saludoFlecha = (nombre) => {
    return `Soy una función de flecha, y mi nombre es ${nombre}.`;
};

console.log(persona.saludar());
console.log(saludoFlecha(persona.nombre));
console.log(persona2);

// Uso de async/await para obtener información adicional
persona.obtenerInfo().then(info => {
    if (info) {
        console.log('Info de la API:', info);
    } else {
        console.log('No se encontró información adicional.');
    }
});

// Ejemplo de Polyfill con Object.assign
const objeto1 = { a: 1 };
const objeto2 = { b: 2 };
const combinado = Object.assign({}, objeto1, objeto2);
console.log(combinado);
