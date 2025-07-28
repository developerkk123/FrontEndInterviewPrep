import React from "react";
/**
 * @description
 * This component demonstrates the concept of closures in JavaScript.
 */

/**
 * @question
 * What is a closure in JavaScript????
 */

/**
 * @definition
 * A closure gives you access to an outer function’s scope from an inner function,
 * even after the outer function has finished executing.
 *
 * In JavaScript, functions create scope. When you define a function inside another function,
 * the inner function has access to:
 *
 * 1. Its own variables
 * 2. Variables in the outer function
 * 3. Global variables
 *
 * This behavior is called a closure.
 */

/**
 @example 1
 */
function outerFunction() {
  let outerVariable = "I'm from outer!";

  function innerFunction() {
    let innerVariable = "I'm from inner!";
    console.log(outerVariable);
    console.log(innerVariable);
  }
  return innerFunction;
}

const closureFunc = outerFunction();
closureFunc(); // Output: I'm from outer!

/**
 * What happened here?
	•	outerFunction runs and returns innerFunction.
	•	But instead of losing outerVariable (as outerFunction is done), 
        innerFunction keeps a reference to the scope where it was created.
	•	So when you call closureFunc(), it still has access to outerVariable.

    
    Why does it work?

    .  When a function is created, JavaScript keeps track of its lexical scope. 
       That is, where the function was physically written in the code.

    .  So even if that function is executed elsewhere (after the parent is done), 
       it remembers the variables from the place it was defined.

    .  This happens because of closures, and it’s possible due to the way 
       JavaScript uses the execution context stack and scope chain.

 */

/**
 * @usecases
 * Real-World Uses of Closures
 * 1. Private Variables
 * 2. Factory Functions
 * 3. Event Handlers
 */

/*
 * count is private — it can only be accessed via the returned function.
 */
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const increment = counter();
console.log("increament", increment()); // 1
console.log("increament", increment()); // 2

/*
 * • x is captured in a closure and reused.
 */
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(10)); // 15
console.log(add5(20)); // 25

/**
 * 	• The event listener keeps access to clicked, even after setupButton has executed.
 */
function setupButton() {
  let clicked = 0;
  const btn = document.getElementById("myBtn");
  console.log("Button found", btn);
  if (btn) {
    btn.addEventListener("click", function () {
      console.log("Button found");
      clicked++;
      console.log(`Button clicked ${clicked} times`);
    });
  }
}

/**
 * @interview question
 */
for (var i = 0; i < 5; i++) {
  ((j) => {
    // console.log("index = ", i);
    setTimeout(() => {
      console.log("index = ", j);
    }, 1000);
  })(i);
}

for (let i = 0; i < 5; i++) {
  console.log("index before = ", i);
  setTimeout(() => {
    console.log("index after = ", i);
  }, 1000);
}
// setupButton();
/**
 *
 * @summary
 * This component demonstrates the concept of closures in JavaScript.
 *
 * ---------------------------------------------------------------
 * | Concept         | Explanation                                |
 * ---------------------------------------------------------------
 * | Closure         | A function bundled with its lexical        |
 * |                 | environment.                               |
 * | Scope           | Where variables are accessible.            |
 * | Lexical scope   | Scope is determined by location in code.   |
 * | Persistence     | Closures remember variables even after     |
 * |                 | parent is gone.                            |
 * | Use cases       | Private state, event handlers, currying.   |
 * ---------------------------------------------------------------
 */

export default function Closure() {
  return (
    <div>
      <h1>Closure Example</h1>
      <button id="myBtn" onClick={setupButton}>
        Click me{" "}
      </button>
    </div>
  );
}
