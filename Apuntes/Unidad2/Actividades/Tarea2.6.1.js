// 1- What are the final values of all variables a, b, c and d after the code below?

let a = 1, b = 1;
let c = ++a; // Devuelve 2.
let d = b++; // Devuelve 1 y la b pasaría  a valer 2.

// 2- What are the values of n and x after the code below?

let n = 2;
let x = 1 + (a *= 2);

// El nuevo valor de n = 4 y el valor de x = 5.


// 3- What are the results of these expressions?

5 > 4 // True
"apple" > "pineapple" // False
"2" > "12" // True
undefined == null // True
undefined === null // False
null == "\n0\n" // False
null === +"\n0\n" // False
"" + 1 + 0 // "10"
"" - 1 + 0 // -1
true + false // 1
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // "9px"
"$" + 4 + 5 // "$45"
"4" - 2 // 2
"4px" - 2 // NaN
" -9 " + 5 // " -9 5"
" -9 " - 5 // -14
null + 1 // 1
undefined + 1 // NaN
" \t \n" - 2 // -2

/* 4- Here’s a code that asks the user for two numbers and shows their sum. It works incorrectly.
The output in the example below is 12 (for default prompt values). Why? Fix it. The result
should be 3
*/

let l = prompt("First number?", 1);
let k = prompt("Second number?", 2);
alert(l + k); // 12

/* El resultado es 12 porque reconoce los datos como String.
Para solucionarlo basta con hacer un casting a los datos. Es decir añadir Number(prompt("First number?", 1))
 y Number(prompt("Second number?", 2)).
*/