// 1- Will alert be shown?

if ("0") {
    alert( 'Hello' );
}

// Sí se muestra esta la alerta, porque "0" se considera como true.

/* 2- The name of JavaScript.- Using the if..else construct, write the code which asks: ‘What
is the “official” name of JavaScript?’
*/

let answer = prompt("What is the “official” name of JavaScript?");

if(answer == "ECMAScript"){
	alert("Right!")
} else{
	alert("You don't know? ECMAScript!")
}

/* 3- Show the sign. Using if..else, write the code which gets a number via prompt and
then shows in alert:
◦ 1, if the value is greater than zero,
◦ -1, if less than zero,
◦ 0, if equals zero.
In this task we assume that the input is always a number.
*/

let num = Number(prompt("Introduce un número: ")); 

if(num > 0){
	alert(1); 
}else{
	if(num == 0){
  	alert(0); 
  } else{
  	if(num < 0){
    	alert(-1); 
    } 
  }
}


// 4- Rewrite 'if' into '?'

let result;
if (a + b < 4) {
 result = 'Below';
} else {
 result = 'Over';
}

//let result = (a + b < 4) ? 'Below' : 'Over';

/* 5- Rewrite 'if..else' into '?'. For readability, it’s recommended to split the code into multiple
lines.
*/

let message;
if (login == 'Employee') {
 message = 'Hello';
} else if (login == 'Director') {
 message = 'Greetings';
} else if (login == '') {
 message = 'No login';
} else {
 message = '';
}

/*
let message = 
    login == 'Employee' ? 'Hello' :
    login == 'Director' ? 'Greetings' :
    login == '' ? 'No login' :
    '';
*/

// 6- Write the code using if..else which would correspond to the following switch:

switch (browser) {
    case 'Edge':
    alert( "You've got the Edge!" );
    break;
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;
    default:
    alert( 'We hope that this page looks ok!' );
   }

/*
if(browser == "Edge"){
    alert( "You've got the Edge!" );
}else{
   if(browser == "Chrome" || browser == "Firefox" || browser == "Safari" || browser == "Opera"){
      alert( 'Okay we support these browsers too' );  	
 } else{
      alert( 'We hope that this page looks ok!' );
 }
}
 */

// 7- Rewrite the code below using a single switch statement:

let a = +prompt('a?', '');
if (a == 0) {
 alert( 0 );
}
if (a == 1) {
 alert( 1 );
}
if (a == 2 || a == 3) {
 alert( '2,3' );
}

/*
switch (a) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
        break;
    default:
        break;
}
*/