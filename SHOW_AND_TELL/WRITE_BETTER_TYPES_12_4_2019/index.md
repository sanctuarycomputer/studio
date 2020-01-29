# ALGEBRAIC DATA TYPES

## Objectives

1. Write error-proof types (prevent impossible states)
2. Write more informative types

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### Sum Types vs. Product Types

Let's create a type representing some component state.  
Pretend we're sending a request to get a `User` record from our server:
```ts
interface State {
  status: 'Idle' | 'Pending' | 'Rejected' | 'Fulfilled'
  data: User | null,
  error: string | null,
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

What we've done here is created a __Product Type__. A product type has an amount of possible variations that are explained via multiplication. The `State` type has 16 (4 * 2 * 2) possible variations:
```ts
status: 'Idle',      data: null,   error: null
status: 'Idle',      data: User,   error: string
status: 'Idle',      data: null,   error: string
status: 'Idle',      data: User,   error: null
status: 'Pending',   data: null,   error: null
...
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Why do we care about the amount of possibilities in a type?

1. It's hard to keep track of.
2. It's error prone!


Most of the possible states are __not__ valid!:
```ts
status: 'Pending',    data: {...},   error: null,
status: 'Pending',    data: {...},   error: "404",
status: 'Fulfilled',  data: null,    error: "404"
status: 'Fulfilled',  data: {...},   error: "404"
status: 'Rejected',   data: {...},   error: null
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

## We can fix this with types!

Let's refactor our `State` type:
```ts
interface State {
  status: 'Idle',
} | {
  status: 'Pending',
} | {
  status: 'Fulfilled',
  data: User,
} | {
  status: 'Rejected',
  error: string
}
```

Now our `State` type has only 4 possibilities and they are all valid! This is called a `Sum Type`. Sum Types have an amount of variations represented by addition.

You couldn't even write a test to put this in an invalid state, because it wouldn't compile!

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Another benefit is how easy it is to work with! Instead of:
```ts
render() {
  if (status === 'Idle' && error == null && data == null) {
    return "click this button";
  }
  if (status === 'Pending' && error == null && data == null) {
    return "pending";
  }
  if (status === 'Rejected' && error !== null && data == null) {
    return error;
  }
  if (status === 'Fulfilled' && error === null && data !== null) {
    return data;
  }
  return "sorry, something wen't wrong"
}
```

We can write
```ts
render() {
  switch (status) {
    case 'Idle': return "click this button";
    case 'Pending': return "pending";
    case 'Fulfilled': return data;
    case 'Rejected': return error;
  }
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's look at another example of how we can use types to reduce invalid states in our code:

First, let's create a User type:
```ts
interface User {
  email: string,
  name: string,
  dob: Date
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>


This is okay for now, but what if we need a form that creates a `User` record from input. We'll need to adjust our type to look more like this:

```ts
interface User {
  email: null | string,
  name: null | string,
  dob: null | Date
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

*But,* what happens in this scenario:

```ts
function createUser(user: User) {
  return sendRequest(user);
}

const user: User = {
  email: null,
  name: "John Denver",
  dob: "11/23/53"
}

createUser(user) # 422 from server
```
Error from the server! But I sent an object of type `User` wtf??...

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

We'll have to do some validation to give the developer some better feedback:

```ts
function createUser(user: User) {
  if (user.email == null) throw(new Error("email is null"))
  if (user.name == null) throw(new Error("name is null"))
  if (user.dob == null) throw(new Error("dob is null"))
  return sendRequest(user);
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### This is all well and good, but is there a way that we can solve this without doing any checking at runtime?..

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

## How about with types!

Two different ones to be exact!

```ts
interface PendingUser {
  email: null | string,
  name: null | string,
  dob: null | Date
}

interface ValidUser {
  email: string,
  name: string,
  dob: Date
}

function createUser(user: ValidUser) {
  return sendRequest(user);
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's use our new example to fix one more error-prone scenario.  

This `State` interface represents a basic onboarding flow where a user gets created:

```ts
interface State {
  stage: "EnteringEmail" | "EnteringName" | "EnteringDob" | "Saving",
  newUser: PendingUser | ValidUser
}

class Onboarding extends Component {
  state: State = {
    stage: "EnteringEmail",
    newUser: {
      email: null,
      name: null,
      dob: null
    }
  }
}
```
<br/><br/><br/><br/><br/><br/>

Can anybody see any problems with this?

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Think of all these impossible states!!!
```ts
stage: 'EnteringEmail', data: { email: "a@b.com", name: "Bill", dob: null }
stage: 'EnteringName',  data: { email: null, name: "Bill", dob: null }
stage: 'Saving',        data: { email: null, name: null, dob: null }
...
```
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### How can we use types to fix these issues?

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's craft some bespoke, handcrafted types and stricten this Onboarding flow up!
```ts
interface State = {
  stage: "EnteringEmail",
  newUser: {
    email: null,
    name: null,
    dob: null
  }
} | {
  stage: "EnteringName",
  newUser: {
    email: string,
    name: null,
    dob: null
  }
} | {
  stage: "EnteringDob",
  newUser: {
    email: string,
    name: string,
    dob: null
  }
} | {
  stage: "Saving",
  newUser: ValidUser
}
```
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Good luck breaking that! And so easy to work with!!!
```ts
render() {
  switch (stage) {
    case 'EnteringEmail': ...
    case 'EnteringName': ...
    case 'EnteringDob': ...
    case 'Saving': ...
  }
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### I think we've met our first goal and shown how we can use types to prevent impossible states. But how about written more informative ones 🧐?


<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

There's another pattern that you may have noticed in all of these examples. 

In all of these examples the data is wrapped in a *container* of sorts. We have some sort of tag and then the data itself. This tag allows us to discern whether the data is valid/invalid without doing any validation at all.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's look at the Onboarding example again:

```ts
interface State {
  stage: "EnteringEmail" | "EnteringName" | "EnteringDob" | "Saving",
  newUser: PendingUser | ValidUser
}
```

Notice how we have two keys: `stage` and `newUser`. The `stage` key provides us additional information about the `newUser`. 

Without the `stage` key, the routing in our component might look something like this:

```ts

render() {
  if (this.state.newUser.email === null) return renderEmailForm();
  if (this.state.newUser.name === null) return renderNameForm();
  if (this.state.newUser.dob === null) return renderDobForm();
  return renderSaving(); 
}
```
Not only does the order of the `if` statements matter, but it allows for invalid states.

What if `name` is not `null` and `email` is? That shouldn't be allowed!

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Having our extra-informative `stage` key, we get the benefit of more declarative, less error-prone code! 😍
```ts
render() {
  switch (stage) {
    case 'EnteringEmail': ...
    case 'EnteringName': ...
    case 'EnteringDob': ...
    case 'Saving': ...
  }
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### You may have seen this sort of tagging scheme before...

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

## Redux is based on this concept!

As we know, a Redux action type looks like:

```ts
interface SetFirstNameAction = {
  type: "SET_FIRST_NAME",
  payload: string
}
```
This shape allows our reducers to be extremely simple!
```ts
case "SET_FIRST_NAME":
  return {
    ...state,
    firstName: action.payload
  }
```
We don't have to do any validation on the payload to know what the data looks like. That's because it is tagged with our extra `type` key.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

An even more useful example is with asynchronous actions:
```ts
type GetUserFulfilledAction = {
  type: "GET_USER_FULFILLED",
  payload: User
}
```
We know that the payload is going to be a valid user, because otherwise our action type would be something like `GET_USER_REJECTED`.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

This tagging scheme is not new! Redux is based entirely off of the Elm architecture, which has its roots in functional programming. 

Let's dive into some functional programming terminology that helps describe this concept—

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

## Pure Values & Effectful Values

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

__Pure__ values are values without any context / container:
```ts
2
"c"
{ name: "john" }
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

__Effectful__ values are wrapped in a container to give them more context:

```ts
{
  status: "ok",
  value: {
    name: "john"
  }
}

{
  status: "error",
  value: NoUserFoundException
}
```
^^^ You may have seen this somewhere 😉

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

There are a few languages that have the concept of an effectful value baked into their type system. They are known as __type classes__. The simplest examples of type classes are the *Option* (also known as Maybe) and *Either* type.  

Let's take a look at the option type:


```ts
type Option<A> = Some<A> | None
```
The type can either have Some or None of something.


<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

```ts
type maybeFistName = Option<string>
```
`maybeFirstName` can either be in the state of having some string or nothing at all.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

In languages that support type classes, types are able to be matched against. You can write code that looks like this:
```ts
const maybeFirstName: Option<string> = getFirstName();
switch (maybeFirstName) {
  case Some name:
    saveFirstName(name);
  case None:
    showErrorModal();
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

This is effectively the same as writing this in Typescript:
```ts
const maybeUser: string | null = getUser();
if (maybeUser === null) {
  return showErrorModal();
} else {
  return saveUser(maybeUser);
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's look at how we could use an effectful type here instead. `fp-ts` is a typescript library that supplies all of these functional primitives.

The type signature for an `Option` type look like this:

```ts
interface None {
  _tag: 'None'
}

interface Some<A> {
  _tag: 'Some'
  value: A
}

type Option<A> = Some<A> | None;
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Using the types from `fp-ts` let's write the same `getUser` logic:

```ts
const maybeUser: Option<string> = getUser();
switch (maybeUser._tag) {
  case 'Some': 
    saveUser(maybeUser.value);
  case 'None':
    showErrorModal();
}
```
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

This may not seem very helpful right now. 

For context, `null` does not exist in these stricter functional languages and that's why the `Option` type exist. These languages also happen to be a lot less error-prone than javascript...

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's look at a more practical example: the `Either` type:

```ts
interface Left<E> {
  _tag: 'Left'
  left: E
}

interface Right<A> {
  _tag: 'Right'
  right: A
}

type Either<E, A> = Left<E> | Right<A>
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>


## 🤣 lololol wtf that's not practical!!!

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's rewrite this type to make a little more sense:

```ts
interface Error<E> {
  _tag: 'Error'
  value: E
}

interface Success<A> {
  _tag: 'Success'
  value: A
}

type Either<E, A> = Error<E> | Success<A>
```

Still though, how is this helpful? 

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

The *MOST* important thing here is conformity. We have one way to describe a success path and one way to describe an error path.

If we use the `Either` type everywhere in our codebase then all we have to do to check that a function is giving us back valid data is:

```ts
switch (maybeUser._tag) {
  case 'Success': 
    setUser(maybeUser.value);
  case 'Error':
    showErrorModal(maybeUser.value);
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Let's really push this level of conformity! Let's refactor some code once more.

First let's right some simple methods:

```ts
const parseDate = (input: string): DateFnsDate => {
  #
  # parse some date
  #
}

const validateIsThisYear = (date: DateFnsDate): DateFnsDate => {
  #
  # validate if the date is in this year
  #
}

const addTwoWeeks = (date: DateFnsDate): DateFnsDate => {
  #
  # add two weeks to the date
  #
}
```

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Now, let's use them:

```ts
onSubmit(event) {
  const userInput: string | null = event.target.value;
  if (userInput === null) return "input_not_found";
  try {
    const parsedDate = parseDate(userInput);
    const isInThisYear = validateIsThisYear(parsedDate);
    if (!isInThisYear) return "date_out_of_year";
    return addTwoWeeks(parsedDate);
  catch (e) {
    return "invalid_input";
  }
}
```
We have to do a lot of coercion here, making sure that we safely gate each function from being called with improper arguments. We have to know which methods are safe to call, which ones error — It almost feels like walking through a minefield 💥.  

FYI, this is how most code that I write looks like. Writing error-proof code takes work.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### But is there a better way 🧐?

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

First, some convenience functions. Remember, we going to use the `Error` and `Success` type everywhere so it helps to make them easy.
```ts
const error = <T>(value: T) => ({ _tag: "Error", value });
const success = <T>(value: T) => ({ _tag: "Success", value });

# success("works") == { _tag: "Success", value: "works" }
```
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Next, let's rewrite our methods to return `Error` and `Success` types instead:
```ts
const parseDate = (input: string): Either<DateFnsDate, string> => {
  try {
    const parsed = DateFns.parse(input);
    return success(parsed);
  } catch(e) {
    return error(e);
  }
}

const validateIsThisYear = (date: DateFnsDate): Either<DateFnsDate, string> => {
  const isInThisYear = DateFns.isThisYear(date);
  if (isInThisYear) return success(date);
  return error(date);
}

const addTwoWeeks = (date: DateFnsDate): Either<DateFnsDate, string> => {
  try {
    const afterTwoWeeks = DateFns.add(data, 2, "weeks");
    return success(afterTwoWeeks);
  } catch(e) {
    return error(e)
  }
}
```
Still, a few simple functions that do one job. None of them throw an exception, just return one of two values.

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

Now, with the power of `Either` let's chain them together:

```ts
const eitherMap = (initial, ...funcs) => {
  return funcs.reduce((either, fn) => {
    switch (either._tag) {
      case 'Success': 
        fn(either.value);
      case 'Error':
        return either;
    }
  }, initial);
}

const userInput = event.target.value;

const parsedValidatedAndTwoWeeksLater = eitherMap(userInput, parseDate, validateIsThisYear, addTwoWeeks);
```

Given that we know the return type of each function will be tagged, we can safely call each function in the chain knowing that the previous function operated successfully. 

Care free!

<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

### We know this because each function returns a Sum Type. Either a `Success` or `Error`.

### This allows us to write extremely concise, extremely error-proof errors.



<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>

## Takeaways

- Think of every possible state that your type allows and see if any are invalid. If so, improve your type.

- You can use more informative type signatures to make your code do less work.


<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/>


## Sources

- ["Algebraic Data Types" by James Sinclair](https://jrsinclair.com/articles/2019/algebraic-data-types-what-i-wish-someone-had-explained-about-functional-programming/)
- ["Making Impossible States Impossible" by Richard Feldman](https://www.youtube.com/watch?v=IcgmSRJHu_8)


