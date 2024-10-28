/* 1- Write the function camelize(str) that changes dash-separated words like “my-shortstring” into camel-cased 
“myShortString”. That is: removes all dashes, each word after dash becomes uppercased. P.S. Hint: use split 
to split the string into an array, transform it and join back.
*/

function camelize(str) {
    let words = str.split('-');
    
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  
    return words.join('');
}
  
  
console.log(camelize("my-short-string")); 


/* 2- Write a function filterRange(arr, a, b) that gets an array arr, looks for elements
with values higher or equal to a and lower or equal to b and return a result as an array. The
function should not modify the array. It should return the new array.
*/

function filterRange(arr, a, b) {
    return arr.filter(item => item >= a && item <= b);
}


let arr = [5, 3, 8, 1, 6, 10];
console.log(filterRange(arr, 4, 9)); 


/* 3- Write a function filterRangeInPlace(arr, a, b) that gets an array arr and
removes from it all values except those that are between a and b. The test is: a ≤ arr[i]
≤ b. The function should only modify the array. It should not return anything.
*/