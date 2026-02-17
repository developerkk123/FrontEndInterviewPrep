variable = 10;

(()=>{
    foo = 100;
    console.log(variable);
    var foo = 100;
    variable = 20;
    console.log(variable);
})();

console.log(foo);
console.log(variable);
var variable = 30;


/**
 * GEC m wahi variable register hote hai jo gloabl level m defined hote hai
 * na ki function k inside wale, so first ans is foo is not defined
 * line 11 throw error
 * 
 * inside function javascript create another GEC and define variables 
 * and functions, so line 10 tak sahi chalega line 11 ko code fat jayega
 * 
 */