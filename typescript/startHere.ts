// * Hey there! It seems like you make it through all the wall of text I put up there. Good job!
// --- Notice that this tutorial also talks about JS in general, so you can skip some parts if you already know how to use it

// ? Variable declaration --- Definition with type is new in TS, definition without type is already in JS
// --- This is a standard way to declare a TS variable. The syntax should be very similar:
// const|let|var <yourVarName>: <data type> = <value>;
const message: string = "HELLO WORLD! :D"; // I usually use `const` as much as possible to avoid accidentally changing variable's value
// Once I declare a variable, I need to stick with that datatype for the rest of its life, I mean scope
// message = 3; // so this won't work. Try to uncomment it to see how scary it is when the compiler is mad at you

// --- I can always omit the type if I initialize it, but it doesn't work well with array and object
const message2 = "This should be string by default";

// --- You can also declare multiple variables like this
const a: string = "10",
  b: number = 10; // But I always avoid this for readability

// --- To represent truthy value, or boolean value, TS/JS uses true or false
const someBool = true;
const someOther = false;

let testBool: boolean;
testBool = true; // This works
testBool = false; // This works
// testBool = 3;  // But this won't

// For more information about basic data type, check out https://www.typescriptlang.org/docs/handbook/basic-types.html

// --- We also have 2 special value: undefined and null
const someNull: null = null; // has been declared and assigned to value null
const someUndefined: undefined = undefined; // has been declared but not yet been assigned
//Fore more info: stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript

// --- Template string
// Instead of combining string like:
const normString = "first " + a + " second " + b + " third";
// We can do
const templateString = `first ${a} second ${b} third`;
// This is quite similar to {} and format in Python

console.log("\n");
/*

*/

// ? Logging --- These are already in JS
// --- To log something out, simply do
console.info("---LOGGING");
console.log("How simple is this?");
console.log(message, "more!", "more more more!"); // The "," will separate the log output by space each
// --- There are multiple level of logs
console.error("Here is an error");
console.info("Here is just an info");
console.debug("Debug log!");
// and so on

console.log("\n");
/*

*/

// ? Type Conversion (JS)
console.info("---TYPE CASTING");
// Just like any other programming languages, JS support type casting
// For all type casting available: https://www.w3schools.com/js/js_type_conversion.asp
console.log(`typeof "5" is ${typeof "5"}`);
console.log(`typeof 5 is ${typeof 5}`);
console.log(`typeof parseInt("5") is ${typeof parseInt("5")}`);

console.log("\n");
/*

*/

// ? Math --- These are already in JS
// --- Just like any other language, the basic type of math operators are: + - * /
console.log("---MATH");
let numA = 20; // Why I use "let"? You will see when you get to the comparison part. Stay tune :)
const numB = 10;
const numC = (numA + numB * numA) / numB;

// Notice that some terminal will change color for you to distinguish between text and number easily
console.log(numA + numB, numB * numC, numC, "Some text");
// --- JS also have some built-in libraries to help you with Math
console.log(Math.max(1, 2, 3), "<--- Should return 3");
console.log(Math.abs(-1), "<--- Should return 1");
console.log(Math.ceil(5.5), "<--- Should return 6");
console.log(Math.LN10, "<--- Should return the natural log of 10");
console.log(Math.PI, "<--- A delicious PIE");

// --- Wonder how to do division and get back int value?
const numD = Math.floor(5 / 2);
console.log(numD, "<--- Should return 2"); // This should be similar to a // b for you Pythonian

// --- Comparison
// This might be tricky at first:
//  ----- 1. for strict comparison, use === for equal comparison or !== for not equal comparison
//  This will strictly check BOTH data type and value. For example:
console.log(3 === 3, "<--- Should return true");
// If I didn't use "let" previously, TS will throw you an error,
//  because it's useless to use === for 2 constant that already not equal, because they're constant!
console.log(numA === numB, "<--- Should return false");
// console.log("ab" === "bcd", "<--- Should return false"); // TS is smart enough to prevent us from doing something like this

//  ----- 2. for loose comparison, use == or !=
//  This will convert value to the same type, and check only value
// @ts-ignore
console.log("3" == 3, "<--- Should return true!!!");
console.log(
  null == undefined,
  null === undefined,
  null != undefined,
  null !== undefined
);

console.log("\n");
/*

*/

// ? Functions --- These are already in JS minus the type definition
console.log("---FUNCTIONS");
// --- There are 2 way to declare a function
function myNormFunc(arg1: number, arg2: string): string {
  // Traditional function
  // This kind of declaration has been there forever
  return arg1.toString() + arg2;
}
//  or
(arg1: number, arg2: string): string => {
  // Anonymous function or Arrow function
  // This is new, starting from ES6
  // There are some advantages comparing to traditional function
  //  but let's not get to that here
  return arg1.toString() + arg2;
};
// I can also simplify the function if there is only 1 return
(arg1: number, arg2: string): string => arg1.toString() + arg2; // This becomes like lambda in Python

// The reason why it's called anonymous or arrow function is because
//  ... it has an arrow, and there is no name to that function
// Usually, we assign it to a variable
const myArrowFunc = (arg1: number, arg2: string): string => {
  return arg1.toString() + arg2;
};

// ! Note: I can always omit the return type and let the compiler infer it,
//    but usually I add a return type to avoid returning something unexpected

// --- To call a function, simply add () to the end
console.log(myNormFunc(3, "test"));
console.log(myArrowFunc(3, "test"));

// --- Optional argument and default argument
(arg: number, optionalWithDefault: number = 3, optionalArg?: number) => {
  // ! Note, optional argument has to be declare AFTER required argument
  // This is guaranteed exist
  console.log(arg);
  // But this is not, it will be undefined if we don't pass anything
  console.log(optionalArg);
  // If we don't pass anything, this will use the default value
  console.log(optionalWithDefault);
};

// --- I can also pass function as argument!
const someFunc = (funcArg: (someArg: string) => string, someStr: string) => {
  // funcArg has the type of a function that accept a string and return a string
  // This is also call higher order function
  console.log(funcArg(someStr));
};
const testFunc = (myString: string): string => {
  return `This is my string: ${myString}`;
};

// To call it, I can
someFunc(testFunc, "Duc");
// Notice that I don't call testFunc, but I pass in the variable itself,
//  which points to a function

// I can also do
someFunc((myString: string) => myString, "Duc"); // This is the power of anonymous function
// Notice again, I did not call the function, but just passing the definition of the function into someFunc

/*

*/

// * Congratulation, you've leveled up!
// *  let's move on to basicStuffToo.ts for the next tutorial

// * Some notes before we move on to the next tutorial
/*
  --- Semi colon in TS/JS is optional, but I suggest to always use it, 1 more character won't kill anybody...
  --- There exists a type call "any", but let's not use that boi unless it's really really really really neccessary, it defeats the purpose of Typescript!
  --- The concept of named parameters in JS, a work around is to destruct parameter, more on that later
  --- There are some other special concepts like:
    --- Hoisting: https://www.w3schools.com/js/js_hoisting.asp
    --- Higher order functions: https://www.sitepoint.com/higher-order-functions-javascript/
    --- Closure: https://www.w3schools.com/js/js_function_closures.asp
*/
