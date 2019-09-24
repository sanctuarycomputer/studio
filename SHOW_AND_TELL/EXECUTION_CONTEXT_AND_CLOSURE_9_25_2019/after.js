// This function takes two parameters: a callback and the number of times that
// callback needs to be called before being executed.

const after = (times, callback) => {
  // keep track of how many times after has been called
  let counter = 1;
  // conditionally add one to counter or return result from callback
  const afterizedCallback = (...args) => {
    if (counter !== times) {
      counter += 1;
    } else {
      return callback(...args);
    }
  }
  return afterizedCallback;
}

const called = function (string) { return ('hello ' + string); };
const afterCalled = after(3, called);

console.log(afterCalled('world')); // -> nothing is printed
console.log(afterCalled('world')); // -> nothing is printed
console.log(afterCalled('world')); // -> 'hello world' is printed
