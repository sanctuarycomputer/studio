
/* 
 *           S H O W  +  T E L L
 *      Type Systems & Type Safety
 * 
 */

/* TYPE SAFETY 
  the degree to which a computer language discourages or prevents type errors
/*

/* Type Systems can be implemented in different ways…

STATIC TYPE CHECKING: the compiler checks / enforces type constraint rules.
DYNAMIC TYPE CHECKING - happens at runtime, don’t do implicit type conversion.
“DUCK” typing
(as in If it walks like a duck and it quacks like a duck, then it must be a duck)
Suitable typing is determined based on whether appropriate methods and properties are available on the object, 
rather than the type of the object itself. (Ruby, Python, Perl). It makes code easier to re-use, but you lose some of the benefits of a statically typed system.

Java, Ada, Pascal, and C require a declared type for every variable, and support 
explicit “casts” of arithmetic values to other arithmetic types. No inferred types here.

Ruby, Perl, Python  use inferred types. 
They can be considered “strongly” typed in the sense that typing errors are prevented at runtime and 
allow very little type conversion, but the compiler does not do any static type checking.
This makes them great for prototyping.
*/

/*  BUT IS IT STRONGLY TYPED?
Developers throw around the terms “strongly typed” and “weakly typed”
One definition for the ideal strongly typed environment is “A system in which there is
no possibility of unchecked run-time errors”[1].
Worth noting that “strong” and “weak” are mushy concepts.
there is no universally agreed upon definition of a “strong” type system.

Different languages implement differently
- There are tradeoffs between code reusability / ease of use (esp. initially) / accessibility for new developers and type safety, so different languages make different compromises.
For example…
* C allows pointer arithmetic, which weakens its type safety some
* C allows “coercion”. Coercion is when a developer uses syntax in a statically typed language to force the usage of one type as if it were a different type. An example of this is void* in C. By contrast, strongly typed languages can allow for conversion, in which a brand-new object is created of the appropriate type.
* C# and VB.NET allow the creation of “unsafe context” - parts of the code where type checking is intentionally disabled
* eval() functions, in which arbitrary data is executed as code, weaken the type system
* Lisp family (including Clojure)
* Haskell and Rust are statically type-checked, but the compiler automatically infers a precise type for most values

CAN YOU GO TOO FAR?
People complain that Pascal is too strongly typed because size is a component of an array or string’s type,
which can be onerous.
*/

/* Adding Type Safety to Javascript 

Javascript is an intepreted language - that means that an engine (the browser or node) reads the code line-by-line and executes it.
Other examples are PHP and Perl. By contrast, a compiled language will pass its source code through  a compiler up - front,
before running the program at all.Then this machine code(a.k.a.bytecode) is passed along to an interpreter to be executed line-by-line.
The benefits here are that the compiled code is more efficient.This is also a great time to check the code for known errors…
like improper syntax, invalid references, undeclared variables, and type errors!Not all compiled languages have type safety though.
Popular compiled languages include Java, C(and its derivatives, BASIC, Haskell, Ruby).


So to get static type checking, you'd need to build a program that will run on top of your Javascript to do the checking... or turn JS into a compiled language.

*/


/* React Proptypes 
  React PropTypes adds some basic type checking to React components. Here is an example.
  You can choose fail builds or unit tests on Invalid type errors.
  It’s pretty lightweight and unobtrusive, because you don’t have to specify prop types, and the warnings don’t show up in production.
*/
const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

PropTypes.checkPropTypes(propTypes, props, 'props', 'addNumbersComponent');



/* Flowtypes and Typescript
  The features of Flow and Typescript are very similar, but they work in different ways
  Flow is a static type checker (written in OCaml) that you can run on top of your Javascript, 
  while Typescript its own language that compiles down to Javascript.

  They have many of the same features, including
  - Type definitions
  - Ability to import and export 
  - Generic Types
  - React Support  
*/

/* Flow in Action
  https://flow.org/en/docs/types/
  https://flow.org/en/docs/react/types/
*/


/* Typescript in Action */

// In this compose function, Typescript is using "type argument inference" to figure out the 
// relationship of these arguments. This is also available in Flow, but in my experience it works less well

function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
    return x => g(f(x));
}

interface Box<T> {
  value: T;
}

function makeArray<T>(x: T): T[] {
  return [x];
}
function makeBox<U>(value: U): Box<U> {
  return { value };
}
// has type '<T>(arg: T) => Box<T[]>'
const makeBoxedArray = compose(
  makeArray,
  makeBox,
)

// works with no problem!
makeBoxedArray("hello!").value[0].toUpperCase();



/* Usage with React
 * component template https://gist.github.com/aheitzmann/8959cea7a56303189082b488780a7702#file-my-connected-component-tsx
 * Look up redux connect in definitely typed
 */

/* Definitely Typed
 * The repository for high quality TypeScript type definitions
 * moment-range: A Good Simple Example
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/moment-range/index.d.ts
 * React-Redux: Whoa Buddy
 * https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-redux
 */
 
 /* flickity - Method Overloading
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/flickity/index.d.ts#L595-L616 
*/
// This is Java - Just an example
class ExampleClass {
  public int add(int a, int b) {
    return a + b;
  }
  public int add(int a, int b, int c) {
    return a + b + c;
  }
}
// This is Typescript
declare class Flickity {
  constructor(selector: string | Element, options?: Flickity.Options);
  selectedIndex: number;
  selectedElement: Element;
  playPlayer(): void;
  // ...etc
  on(eventname: Flickity.FlickityEvents, callback: (event?: Event, pointer?: Element | Touch, cellElement?: Element, cellIndex?: number) => any): void;
  on(eventname: Flickity.FlickityEvents, callback: (event?: Event, pointer?: Element | Touch, moveVector?: { x: number, y: number }) => any): void;
  on(eventname: Flickity.FlickityEvents, callback: (event?: Event, cellElement?: Element) => any): void;
  on(eventname: Flickity.FlickityEvents, callback: (event?: Event, pointer?: Element | Touch) => any): void;
}


/* When to use

GREAT USECASES
- Reduces the number of unit tests you have to write
- API Contract

WHY NOT?
- Can’t trust your API and you find yourself using getters or “any” all over the place. Unless you’re designing your app in such a way that there is a layer of code that is locking down the unruly api data into a dependable shape (e.g. some very well written selectors), your type system won’t actually be providing a ton of value (& even worse, could give you false security!)
- Cost-benefit analysis on a case-by-case basis. It makes writing code take longer, esp. if devs are new to it. Some developers argue that it doesn’t reduce overall bug-density and it makes code bases harder to maintain… although I kind of disagree with these points of view. A lot of grumpy people have a lot of opinions on medium, but essentially type systems aren’t good or bad on their own.
- Syntax noise that can make code less readable. (e.g. Ruby vs Java). Elegance?
*/




/*
  APPENDIX
[1] Runtime Errors 
like the name suggests, occur while your program is running. In contrast with  syntax errors
(which can be caught with linting in your editor) or compile time errors (which in compiled languages, are caught by the compiler),
it might not be apparent that your program has a runtime error until you run it.There are many kinds of runtime errors, 
including logic errors, memory leaks, or undefined object errors.
Runtime errors are often called “bugs” a slang term that is said to have been born back when computers were mechanical and a 
literal bug had jammed the machine while it was running. 

[2] Compiled vs Interpreted languages. Interpreted languages, like Javascript, are executed directly 
by an interpreter(such as the browser or node engine.this is kind of an over - simplification, but let’s leave it there for now).
The process reads each statement line - by - line, translating it into machine code as it goes for rapid execution. 
Other examples are PHP and Perl.By contrast, a compiled language will pass its source code through  a compiler up - front, 
before running the program at all.Then this machine code(a.k.a.bytecode) is passed along to an interpreter to be executed line-by-line.
The benefits here are that the compiled code is more efficient.This is also a great time to check the code for known errors… 
like improper syntax, invalid references, undeclared variables, and type errors!Not all compiled languages have type safety though.
Popular compiled languages include Java, C(and its derivatives, BASIC, Haskell, Ruby).
This strong distinction is also all an oversimplification, but good enough for now.
*/