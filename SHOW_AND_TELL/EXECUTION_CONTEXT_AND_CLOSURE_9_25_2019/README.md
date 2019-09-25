# Execution Context and Closure

**Table of Contents**
- [Overview of Execution Context](#overview-of-execution-context)
- [Types of Execution Contexts](#Types-of-execution-contexts)
- [Call stack](#call-stack)
- [What happens when a function is executed?](#what-happens-when-a-function-is-executed?)
- [Closure](#closure)

## Overview of Execution Context
- Fundamental concept in JavaScript, important for understanding scope, scope chain, hoisting, and closure
- In simpler terms:
  > The environment where the current piece of code is executed
- Complexity Management
  - Humans write code in modules and components to manage the complexity of our programs.
  - We can think of execution contexts as a way that the JavaScript engine separates code into smaller pieces to manage complexity of interpreting and running the code.

## Types of Execution Contexts
- **Global**: environment that gets created by default, is where our code is initially executed - can only have one
- **Function**: when a function gets called, it creates its own execution context - can have many
- **eval()**: this function evaluates a given string as JS code and executes it

## Call Stack
- A collection of execution contexts starting with the global execution context
- Every time a function is called, an execution context gets created, and it gets pushed to the call stack.
- LIFO - Whatever is on top of the stack will get executed by the engine
- When a function finished executing, it gets popped off the call stack, and we are onto the next execution context

## What happens when a function is executed?
- Inside a function’s execution context, there are two phases:
  - ***Creation Phase*** happens before any code is executed inside the function
    - **Scope Chain** is created
      - Current execution context’s scope (*variables and functions it has access to*) and its parent’s scopes
      - *Reference to the outer environment* - if variables aren’t found in this *lexical environment*, it will look for them in the outer environment (its scope), all the way up its the scope chain
    - **Variable Object** - Interpreter scans the function for arguments passed in, local variable and function declarations and stores them in memory
      1) *Arguments*: Initialize name and value and create reference copy
      2) *Functions*: Create property that is the name of the function, has a reference pointer to the function in memory
      3) *Variables*: Create a property that is the name of the variable, and initialize value as `undefined` ("Hoisting" - variable declarations are assigned this default value)
    - **The current value of "`this`"** is determined - references where the current code belongs, default in browser: Window
  - ***Execution Phase*** happens when the code is actually executed
    - Values are assigned to variables and functions
    - Code gets interpreted and executed line by line

Example #1: [JavaScriptVisualizer: Nested functions](
https://tylermcginnis.com/javascript-visualizer?code=function%20one%28%29%20%7B%0A%20%20var%20a%20%3D%201%3B%0A%20%20two%28%29%3B%0A%20%20%0A%20%20function%20two%28%29%20%7B%0A%20%20%20%20var%20b%20%3D%202%3B%0A%20%20%20%20printResult%283%29%3B%0A%20%20%20%20%0A%20%20%20%20function%20printResult%28number%29%20%7B%0A%20%20%20%20%20%20console.log%28a%20%2B%20b%20%2B%20number%29%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aone%28%29%3B)

```
function one() {
  var a = 1;
  two();
  
  function two() {
    var b = 2;
    printResult(3);
    
    function printResult(number) {
      console.log(a + b + number);
    }
  }
}

one();
```

## Closure
- So far we've seen what happens we're calling a function in the same scope as it was defined
  - *Where we define our functions* — **not** where we call it — determines what variables the function has access to when we call the function
- When a function finishes executing and gets pops off the call stack, its local memory is deleted (automatic garbage collection), except the returned value.
- So, what happens when we call our function outside of where it was defined?
  - If we *return that function from another function and assign it to another variable*, we can actually hold onto live data/state in between the executions.

- Example #2:
[JavaScriptVisualizer: makeAdder](
https://tylermcginnis.com/javascript-visualizer?code=var%20count%20%3D%200%3B%0A%0Afunction%20makeAdder%28x%29%20%7B%0A%20%20return%20function%20inner%28y%29%20%7B%0A%20%20%20%20return%20x%20%2B%20y%3B%0A%20%20%7D%3B%0A%7D%0A%0Avar%20add5%20%3D%20makeAdder%285%29%3B%0Acount%20%2B%3D%20add5%282%29%3B)

  ```
  var count = 0;

  function makeAdder(x) {
    return function inner(y) {
      return x + y;
    };
  }

  var add5 = makeAdder(5);
  count += add5(2);
  ```

  - When we have an inner function inside a function, the inner function is going to create a **closure** over the variable environment of the parent function.
  - When `inner` (now assigned the variable `add5`) is invoked, it has access to the parent’s variable environment even though the parent’s execution context has been removed from the stack.
  - `add5` takes an argument `y` and returns the sum of `x` (whose value it has access to in the closure scope) and `y`.
  > An inner function always has access to the variables and parameters of its outer function, even after the outer function has returned...
  
- **Our functions that are defined inside other functions have “memories”** — i.e. can write functions that can be called a specified number of times, memoization, etc.
  - Example #3: [Once](once.js)
  - Example #4: [After](after.js)
- **The power of closure**
  - Helps us implement OOP features:
    - **Encapsulation**: Restrict access to functions and state that are bound together inside the function
    - **Abstraction**: Hide all but the relevant data in order to reduce complexity and increase efficiency
    - Module design pattern in our apps