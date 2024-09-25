// 1- What is the code below going to output?

alert( null || 2 || undefined ); // Devuelve 2 porque al utilizar || devuelve el primer valor verdadero.
alert( alert(1) || 2 || alert(3) ); // Devuelve 1 y 2 porque primero se llama a alert(1) y despues 2 porque es el primer valor verdadero que encuentra.
alert( 1 && null && 2 ); // Devuelve null porque al utilizar && devuelve el primer valor falso.
alert( alert(1) && alert(2) ); // Devuelve 1 y Undefined porque primero se ejecuta alert(1) que devuelve undefined y al utilizar $$ devuelve undefined ya que es falso y ahi ya se para la ejecución.
alert( null || 2 && 3 || 4 ); // Devuelve 3 porque primero comprueba el operador && ya que tiene preferencia y como los dos son verdaderos devuelve el último verdadero.

/* 2- Check the range between. Write an if condition to check that age is between 14 and 90
inclusively. “Inclusively” means that age can reach the edges 14 or 90.
*/

let age = 13; 
if(age >= 14 && age <= 90){
	console.log("In of the range"); 
}else{
	console.log("Out of the range"); 
}

/* 3- Check the range outside. Write an if condition to check that age is NOT between 14 and 90
inclusively. Create two variants: the first one using NOT !, the second one – without it.
*/

if (!(age >= 14 && age <= 90)) {
    console.log("Out of the range"); 
}
if (age < 14 || age > 90) {
     console.log("Out of the range"); 
}


// 4- Which of these alerts are going to execute?

if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
/* Devuelve la primera y la tercera a alerta
Comprueba el primer if y al utilizar || devuelve el primer valor verdader que es -1. Entonces al cumplirse la condición salta la alerta.
En la segunda condición && devuelve el primer valor falso que es 0. Como devuelve un valor falso no se cumple la condición y no salta la alerta.
En la tercera se utiliza los dos operadores pero como el && tiene preferencia se evalúa primero. Como -1 y 1 son verdaderos entonces devuelve
el último y por lo tanto se cumple la condición, entonces salta la alerta.
*/

/* 5- Check the login. Write the code which asks for a login with prompt. If the visitor enters
"Admin", then prompt for a password, if the input is an empty line or Esc – show
“Canceled”, if it’s another string – then show “I don’t know you”. The password is checked
as follows:
*/

let user = prompt("Introduce el nombre de usuario: "); 

if(user === "Admin"){
	let pass = prompt("Introduce la contraseña: ");
  if(pass === "TheMaster"){
  	alert("¡Bienvenido!"); 
  }else{
  	if(pass == "" || pass == null){
    	alert("Cancelado"); 
    }else{
    	alert("Contraseña Incorrecta"); 
    }
  }
}else{
	if(user == "" || user == null){
  	alert("Cancelado"); 
  }else{
  	alert("No te conozco"); 
  }
}

