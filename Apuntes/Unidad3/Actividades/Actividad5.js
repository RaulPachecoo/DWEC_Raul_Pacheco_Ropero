/* 1- Write a function ucFirst(str) that returns the string str with the uppercased first
character.
*/
function ucFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
    
console.log(ucFirst("hola")); 
console.log(ucFirst("mundo"));

/* 2- Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’,
otherwise false. The function must be case-insensitive
*/

function checkSpam(str) {
    let lowerStr = str.toLowerCase();
    
    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}
    
console.log(checkSpam("¿Quieres comprar VIAGRA?")); 
console.log(checkSpam("Esta es una cadena normal"));
console.log(checkSpam("Ofertas de XXX contenido")); 

/* 3- Create a function truncate(str, maxlength) that checks the length of the str and,
if it exceeds maxlength – replaces the end of str with the ellipsis character "…", to
make its length equal to maxlength. The result of the function should be the truncated (if
needed) string.
*/


function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 3) + '...';
  }

  
  return str;
}


console.log(truncate("Aquí hay una cadena bastante larga", 20)); 
console.log(truncate("Corta", 10)); 
  
/* 4- We have a cost in the form "$120". That is: the dollar sign goes first, and then the number.
Create a function extractCurrencyValue(str) that would extract the numeric value
from such string and return it.
*/

function extractCurrencyValue(str) {
    return +str.slice(1);
  }
  
  
  console.log(extractCurrencyValue("$120")); 
  console.log(extractCurrencyValue("$99.99")); 
  

