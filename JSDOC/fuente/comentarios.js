
/**
 * @module funcionesEnGeneral
 */

/**
 * 
 * @type {number}   
 */
const numero = 23; 

/**
 * 
 * @type {number[]}
 */
const numeros = [1, 2, 3, 4];


/**
 * 
 * @type {Array<number|string>}
 */
const matrizVariada = [1,2,3,4, "hola", "don pimpón"];

/**
 * Representa una persona
 * @property {string} nombre - El nombre de la persona
 * @property {number} edad - La edad de la persona
 */
const persona = {
    nombre: "Juan",
    edad: 23
};

/**
 * 
 * @param {string} mensaje - El mensaje que se mostrará en consola 
 */
function saludar(mensaje) {
    console.log(mensaje);
}

/**
 * 
 * @param {number} a - El primer n
 * @param {number} b - El segundo número a sumar
 * @returns {number} El resultado de sumar a y b 
 */
function sumar(a, b) {
    return a + b;
}

/**
 * Divide dos números
 * @deprecated Esta función es obsoleta y pronto será reemplazada. Usa nuevaDivisión en su lugar
 * @param {number} a El primer número a dividir
 * @param {number} b El segundo número a dividir
 * @returns {number} El resultado de dividir a entre b
 * @throws {error} Si b es cero
 * @todo Falta implementar la división de números reales
 * @example
 * //devuelve 10
 * dividir(100, 10)
 */
function dividir(a, b) {
    if(b==0){
        throw new Error("No se puede dividir por cero");
    }else{
        return a / b;
    }
    
}



/**
 * ## Ejemplo de uso ##
 * ```JavaScript
 * invertir(true); // devuelve false
 * ```
 * 
 * 
 * @param {Boolean} condicion 
 * @returns {Boolean} La condición invertida
 * @example
 * //Devuelve lo contrario de la condición
 * invertir(true) // false
 */
function invertir(condicion){
    return !condicion;
}

/*
    -anónimas
    -flecha
    -asincronas
    -dentro de objetos
    -con nombre dinámicos
*/

/**
 * @async 
 * @function 
 * @returns {Promise<Object[]>}
 */
async function obtenerDatos(){
    //funcion asincrona
}

/**
 * @function
 */
const saludo = function(){
    console.log("Hola");
}

/**
 * @function
 * @param {number} a - numero a multiplicar
 * @param {number} b - numero a multimplicar
 * @returns (number) - El resultado de multiplicar a por b
 */
const multiplicar = (a, b) => a * b;

const objeto = {
    /**
     * @function
     * @param {*} x 
     * @returns {*}
     */
    duplicar: function(x){
        return x*2; 
    }
}


//callback
/**
 * 
 * @param {number[]} datos - Matriz de números a procesar
 * @param {CallbackParaProcesar} funcion - Función a ejecutar tras procesar los números
 */
function procesarDatos(datos, funcion){
    const resultado = datos.map(x=>x*2);
    funcion(resultado);
}

/**
 * @callback CallbackParaProcesar
 */
procesarDatos([1,2,3], function(resultado){
    console.log(resultado);
});

/**
 * @ignore
 * @todo - Hacer algo interesante y útil
 */
let funcionIrrelevante=(a=>console.log(a));


/**
 * @namespace funcionesMatematicas
 */


/**
 * @memberof funcionesMatematicas
 * @param {number} a - El primer número
 * @param {number} b - El segundo número
 * @returns {number} La resta de a y b
 */
let restar =(a,b=>a-b);
/**
 * @memberof funcionesMatematicas
 * @param {number} a - El primer número
 * @param {number} b - El segundo número
 * @returns {number} La suma de a y b
 */
let sumar2 =(a,b=>a+b);


/**
 * @typedef {Object} Persona
 * @property {string} nombre - El nombre de la persona
 * @property {number} edad - La edad de la persona
 * 
 */

/**
 * @param{string} nombre
 * @param{number} edad
 * @return {Persona}
 */

function createPersona(nombre, edad){
    return (nombre, edad);
}