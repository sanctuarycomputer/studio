// This function accepts a callback function and returns a function that, no matter
// how many times has been called, would only return the result of invoking itself once.

const once = callback => {
  // keep track of whether or not oncifiedCallback has been invoked already
  let hasBeenCalled = false;
  // store result of invoking oncifiedCallback once
  let cachedResult;
  const oncifiedCallback = (...args) => {
    if (hasBeenCalled === false) {
      // set hasBeenCalled = true
      hasBeenCalled = true;
      // store result of invoking callback on array of arguments
      cachedResult = callback(...args);
    }
    // return cachedResult by default (if hasBeenCalled is true)
    return cachedResult;
  }
  // returns function after "oncifying"
  return oncifiedCallback;
}

const addByTwoOnce = once(function (num) {
  return num + 2;
});

console.log(addByTwoOnce(5));  //should log 7
console.log(addByTwoOnce(10));  //should log 7
console.log(addByTwoOnce(9001));  //should log 7