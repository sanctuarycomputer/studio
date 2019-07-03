# Typescript

**Table of Contents**
- [Background](#background)
- [What is Typescript?](#what-is-typescript)
- [Why Typescript?](#why-typescript)
- [Using Typescript with React](#using-typescript-with-react)

## Background
### Why was Typescript developed?
- JavaScript was introduced as a **client-side** scripting language to work on the Netscape navigator in 1995.
- ["It is not a programming language in a strict sense."](https://www.quirksmode.org/js/intro.html)
- It was not intended to be used as a server-side programming language.
- In large-scale appilcations, JavaScript code often becomes complex and heavy, i.e. it is very flexible in terms of how object-oriented programming can be performed.

## What is TypeScript?
- TypeScript is a compile-to-JavaScript language that is a syntactical **superset** of JavaScript
- Developed by Microsoft in 2012 to meet demands internally and externally from clients for a more productive and maintainable tool

## Why Typescript?
### Recap:
> To get static type checking, we can either build a program that will run on top of your JavaScript to do the checking... or turn JS into a compiled language.

> Flow is a static type checker that runs on top of JavaScript.

> TypeScript code is not understandable by the browsers; it  gets transpiled into plain JavaScript.

### Features
#### Static Typing
- TypeScript supports static typing and shows compilation errors at the time of development. So at run-time, there is a lower probability for errors.
#### Better Tooling
- When using with VS Code, development becomes more efficient and productive with out-of-box tools, including code navigation, refactoring, static error messages, and IntelliSense (code-completion aid), and interface type hints
#### Maintainability
- Typescript offers better code structuring and object-oriented programming techniques
#### Scalability
- The output of the TypeScript compiler runs on any browser, in any host, on any operating system.
#### Starts and Ends with JavaScript
- TypeScript is nothing but JavaScript with some additional features, i.e. ES6 features. All JavaScript code is already TypeScript code (.js --> .ts)

### Using Typescript with React
#### Various Ways of Rendering Buttons and Links
- Single Component
- All-Purpose
- Individually Typed