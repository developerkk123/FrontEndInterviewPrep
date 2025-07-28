/**
 * Callback component
 * @definition : A callback is a function passed into another function as an argument, and exceuted after some operation has been completed.
 */

// example 1
function greet(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function sayGoodBy() {
  console.log("Goodbye!");
}
greet("Kundan", sayGoodBy);

//example 2
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Kundan", age: 25 };
    callback(data);
  }, 1000);
}

function displayData(data) {
  console.log("Data fetched:", data);
}
fetchData(displayData);

export default function Callback() {
  return (
    <div>
      <h1>Callback Example</h1>
    </div>
  );
}
