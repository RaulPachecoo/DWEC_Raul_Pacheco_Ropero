//Problem 1: Create a regular expression to validate if a string is a valid email address, ensuring it ends with .com, .net, or .org.

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;

const email = "raulpacheco@gmail.com";
if (emailRegex.test(email)) {
  console.log("Correo electrónico válido");
} else {
  console.log("Correo electrónico inválido");
}


//Problem 2: Design a regular expression that finds all words that begin with an uppercase letter in a text, using word boundaries.

const regexp = /\b[A-Z][a-z]*\b/g;
const texto = "Hola Mundo, esto Es un Ejemplo de JavaScript.";
const palabras = texto.match(regexp);

console.log(palabras);


//Problem 3: Find all occurrences of the syllable "ex" that are not at the start of a word.

const regexp2 = /\Bex/g;

const texto2 = "Explorar es excelente para expandir experiencias.";
const coincidencias2 = texto2.match(regexp2);

console.log(coincidencias2); 


//Problem 4: Use a regular expression with the metacharacter . to find any sequence of three characters that starts with "a" and ends with "b".

const regexp3 = /a.b/g;

const texto3 = "abc axb a_b aab alb a123b";
const coincidencias3 = texto3.match(regexp3);

console.log(coincidencias3); 


//Problem 5: Create a regular expression to capture numbers in currency format (e.g., $50, €30.99), using capture groups.

const regexp4 = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+(?:,\d{2})?)([€$¥£])/g;

const texto4 = "El precio es 50$ o 30,99€, mientras que 1,200.50¥ también es válido.";
const coincidencias4 = texto4.matchAll(regexp4);

for (const match of coincidencias4) {
  console.log(`Cantidad: ${match[1]}, Símbolo: ${match[2]}`);
}


//Problem 6: Design a regular expression that validates an IPv4 address, ensuring the entire string is a valid IP address.

const regexp5 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const ip = "192.168.1.1";
if (regexp5.test(ip)) {
  console.log("La dirección IP es válida.");
} else {
  console.log("La dirección IP no es válida.");
}


//Problem 7: Create a regular expression that finds words that repeat consecutively in a text, such as "hello hello" or "goodbye goodbye".

const regexp6 = /\b(\w+)\s*,?\s*\1\b/g;

const texto6 = "hola, hola y adios, adios. Esto no es una repetición.";
const coincidencias6 = texto6.match(regexp6);

console.log(coincidencias6); 


//Problem 8: Use a regular expression that finds strings with at least 2 consecutive "a" letters.

const regexp7 = /aa+/g;

const texto7 = "El Madrid va a contraatacar porque Haaland a fallado el tiro";
const coincidencias7 = texto7.match(regexp7);

console.log(coincidencias7); 


//Problem 9: Find all occurrences of the word "JavaScript" (case-insensitive) in a paragraph, showing each match's index.

const regexp8 = /javascript/gi; 
const texto8 = "JavaScript es un lenguaje de programación. Amo JAVASCRIPT y Javascript.";
let coincidencia8;
const indices = [];

while ((coincidencia8 = regexp8.exec(texto8)) !== null) {
  indices.push({ palabra: coincidencia8[0], indice: coincidencia8.index });
}

console.log(indices);


//Problem 10: Validate if a string contains exactly two words separated by a space.

const regexp9 = /^\w+\s\w+$/;

const texto9 = "Hola mundo";
const texto10 = "Hola mundo!";
const texto11 = "Hola";
const texto12 = "Hola  mundo"; 

console.log(regexp9.test(texto9)); 
console.log(regexp9.test(texto10)); 
console.log(regexp9.test(texto11)); 
console.log(regexp9.test(texto12)); 


//Problem 11: Design a regular expression to validate passwords that have at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special symbol.

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const contraseñas = [
  "Password1!",
  "pass1!",
  "PASSWORD1!",
  "Password!",
  "Password1",
  "Pass1!word"
];

contraseñas.forEach(password => {
  console.log(`${password}: ${regex.test(password)}`);
});


//Problem 12: Find all sentences that end with an exclamation mark ! or a question mark ?.

const regex10 = /[^.!?]*[!?](?=\s|$)/g;

const texto13 = "¡Hola! ¿Cómo estás? Esto es una prueba. ¿Te gusta? ¡Qué maravilla!";
const coincidencias10 = texto13.match(regex10);

console.log(coincidencias10);