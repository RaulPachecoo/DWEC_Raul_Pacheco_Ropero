//Exercise 1: Area Calculation: Write a function that calculates the area of a circle given its radius. Use π to perform the calculation.

function calcularAreaCirculo(radio) {
    if (radio < 0) {
        return "El radio no puede ser negativo.";
    }
    const area = Math.PI * Math.pow(radio, 2);
    return `El área del círculo con radio ${radio} es ${area.toFixed(2)}.`;
}

console.log(calcularAreaCirculo(5)); 
console.log(calcularAreaCirculo(10)); 
console.log(calcularAreaCirculo(-3)); 

//Exercise 2: Price Rounding: You have a product price with decimals. Create one function that rounds the price up and another that rounds it down.

function redondearHaciaArriba(precio) {
    return Math.ceil(precio);
}

function redondearHaciaAbajo(precio) {
    return Math.floor(precio);
}

const precio = 19.75;

console.log(`Precio original: ${precio}`);
console.log(`Redondeado hacia arriba: ${redondearHaciaArriba(precio)}`); 
console.log(`Redondeado hacia abajo: ${redondearHaciaAbajo(precio)}`);  

//Exercise 3: Random Number: Create a function that returns a random number between 1 and 100.

function numeroAleatorioEntreUnoYCien() {
    return Math.random() * 101; 
}

console.log(numeroAleatorioEntreUnoYCien()); 

//Exercise 4: Logarithms: Write a function that takes a positive number and returns its natural logarithm. Make sure to handle cases where the number is less than or equal to 0.

function logaritmoNatural(numero) {
    if (numero <= 0) {
        return "El logaritmo natural no existe para números menores o iguales a 0.";
    }
    return `El logaritmo natural de ${numero} es ${Math.log(numero).toFixed(5)}.`;
}

console.log(logaritmoNatural(10));   
console.log(logaritmoNatural(0));    
console.log(logaritmoNatural(-5));   

//Exercise 5: Powers: Write a function that calculates the power of a number. The function should take the base and the exponent as parameters.

function calcularPotencia(base, exponente) {
    return Math.pow(base, exponente);
}

console.log(calcularPotencia(2, 3));   
console.log(calcularPotencia(5, 4)); 

//Exercise 6: Square Root: Create a function that calculates the square root of a number. If the number is negative, it should return a message indicating that the square root cannot be calculated.

function calcularRaizCuadrada(numero) {
    if (numero < 0) {
        return "No se puede calcular la raíz cuadrada de un número negativo.";
    }
    return `La raíz cuadrada de ${numero} es ${Math.sqrt(numero).toFixed(2)}.`;
}

console.log(calcularRaizCuadrada(9));    
console.log(calcularRaizCuadrada(16));   
console.log(calcularRaizCuadrada(-4));  

//Exercise 7: Absolute Value: Write a function that takes a number and returns its absolute value.

function calcularValorAbsoluto(numero) {
    return Math.abs(numero);
}

console.log(calcularValorAbsoluto(5));     
console.log(calcularValorAbsoluto(-7));    

//Exercise 8: Maximum and Minimum Numbers: Write a function that takes a set of numbers and returns the largest and smallest among them.

function obtenerMaximoYMinimo(numeros) {
    const maximo = Math.max(...numeros);  
    const minimo = Math.min(...numeros);  
    return { maximo, minimo };          
}

const numeros = [34, 12, 98, 56, 23, -5, 0];
const resultado = obtenerMaximoYMinimo(numeros);

console.log(`El número máximo es: ${resultado.maximo}`);  
console.log(`El número mínimo es: ${resultado.minimo}`); 

//Exercise 9: Distance in a Straight Line: Given the position of two points on a Cartesian plane (x1, y1) and (x2, y2), create a function that calculates the distance between them using the Euclidean distance formula.

function calcularDistancia(x1, y1, x2, y2) {
    const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distancia;
}

const x1 = 1, y1 = 2;
const x2 = 4, y2 = 6;

const distancia = calcularDistancia(x1, y1, x2, y2);
console.log(`La distancia entre los puntos es: ${distancia}`);

//Exercise 10: Cube Roots Calculation: Write a function that calculates the cube root of a number. If the number is negative, it should return a message indicating that the cube root cannot be calculated.

function calcularRaizCubica(numero) {
    if (numero < 0) {
        return "No se puede calcular la raíz cúbica de un número negativo.";
    }
    return Math.cbrt(numero);  
}

console.log(calcularRaizCubica(27));    
console.log(calcularRaizCubica(-8)); 

//Exercise 11: Sine of an Angle: Write a function that receives an angle in degrees and returns its sine. Be sure to convert the angle to radians before calculating the sine.

//radianes=grados×(π/180​)

function calcularSeno(grados) {
    let radianes = grados * (Math.PI / 180);
    
    let seno = Math.sin(radianes);
    
    return seno;
}

console.log(calcularSeno(30));   
console.log(calcularSeno(90));  

//Exercise 12: Cosine of an Angle: Create a function that receives an angle in degrees and returns its cosine. Remember to convert the angle to radians.

function calcularCoseno(grados) {
    let radianes = grados * (Math.PI / 180);
    
    let coseno = Math.cos(radianes);
    
    return coseno;
}

console.log(calcularCoseno(0));     
console.log(calcularCoseno(90));   

//Exercise 13: Tangent of an Angle: Write a function that takes an angle in degrees and returns its tangent. Perform the conversion to radians before the calculation.

function calcularTangente(grados) {
    let radianes = grados * (Math.PI / 180);

    let tangente = Math.tan(radianes);
    
    return tangente;
}

console.log(calcularTangente(45));     
console.log(calcularTangente(90));     
console.log(calcularTangente(180)); 

//Exercise 14: Arcsine: Create a function that receives a value between -1 and 1 and returns the arcsine of that value in degrees.

function calcularArcoseno(valor) {
    if (valor < -1 || valor > 1) {
        return "El valor debe estar entre -1 y 1.";
    }
    
    let radianes = Math.asin(valor);
    
    let grados = radianes * (180 / Math.PI);
    
    return grados;
}

console.log(calcularArcoseno(0.5));  
console.log(calcularArcoseno(1)); 

//Exercise 15: Arccosine: Write a function that takes a value between -1 and 1 and returns the arccosine of that value in degrees.

function calcularArcocoseno(valor) {
    if (valor < -1 || valor > 1) {
        return "El valor debe estar entre -1 y 1.";
    }

    let radianes = Math.acos(valor);

    let grados = radianes * (180 / Math.PI);
    
    return grados;
}

console.log(calcularArcocoseno(0.5));  
console.log(calcularArcocoseno(0));    
console.log(calcularArcocoseno(-1));  

//Exercise 16: Arctangent: Create a function that receives a number and returns its arctangent in degrees.

function calcularArcotangente(valor) {
    let radianes = Math.atan(valor);

    let grados = radianes * (180 / Math.PI);
    
    return grados;
}

console.log(calcularArcotangente(1));    
console.log(calcularArcotangente(0));  

//Exercise 17: Tangent and Angle: Write a function that receives an angle in degrees and returns its tangent and the arctangent of that angle in degrees.

function calcularTangenteYArcotangente(anguloGrados) {

    let radianes = anguloGrados * (Math.PI / 180);

    let tangente = Math.tan(radianes);

    let arcotangenteRadianes = Math.atan(tangente);

    let arcotangenteGrados = arcotangenteRadianes * (180 / Math.PI);
    
    return {
        tangente: tangente,
        arcotangente: arcotangenteGrados
    };
}

console.log(calcularTangenteYArcotangente(45));    
console.log(calcularTangenteYArcotangente(90));    

//Exercise 18: Euclidean Distance: Given the position of two points on a Cartesian plane (x1, y1) and (x2, y2), create a function that calculates the distance between them using the Euclidean distance formula, and also returns the angle in degrees that the line between those points makes with respect to the x-axis.

function calcularDistanciaYAngulo(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let distancia = Math.sqrt(dx ** 2 + dy ** 2);

    let anguloRadianes = Math.atan2(dy, dx); 
    let anguloGrados = anguloRadianes * (180 / Math.PI);
    
    return {
        distancia: distancia,
        angulo: anguloGrados
    };
}

console.log(calcularDistanciaYAngulo(0, 0, 3, 4)); 

//Exercise 19: Area of a Triangle: Write a function that calculates the area of a triangle based on the lengths of its sides and the angle between them using the formula A=12absin⁡(C)A=21​absin(C), where aa and bb are the lengths of the sides and CC is the angle in degrees.

function calcularAreaTriangulo(ladoA, ladoB, anguloGrados) {
    let anguloRadianes = anguloGrados * (Math.PI / 180);

    let area = 0.5 * ladoA * ladoB * Math.sin(anguloRadianes);
    
    return area;
}

console.log(calcularAreaTriangulo(5, 7, 30)); 
console.log(calcularAreaTriangulo(8, 6, 90)); 

//Exercise 20: Conversion from Degrees to Radians: Create a function that receives an angle in degrees and returns its equivalent in radians.

function convertirGradosARadianes(anguloGrados) {
    return anguloGrados * (Math.PI / 180);
}

console.log(convertirGradosARadianes(0));    
console.log(convertirGradosARadianes(45));
console.log(convertirGradosARadianes(90));   
console.log(convertirGradosARadianes(180)); 