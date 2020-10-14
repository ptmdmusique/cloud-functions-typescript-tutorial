// * In this file, I'll go over conditional and for loop as well as scope
//  I assume you already have at least basic programming knowledge

// ? Scope
// Usually, I think of scope as a block of code that a certain variable has effect in
// https://www.typescriptlang.org/docs/handbook/variable-declarations.html
// You will see scope every where, function, if else, for, while, etc
// I can create empty scope like this
console.log("--- Sniping... I mean scope");
const customVar = 10;
{
  const customVar = 20;
  console.log(customVar, "<--- Should be 20");
  // Notice that the above log is 20, not 10
  // The outer customVar has been shadowed by the inner customVar!
}
// But now it returns to normal
console.log(customVar, "<--- Should be 10");

// ? Looping
// This is quite similar to for loop in many other languages, nothing special
console.log("---For loop");
let someVal = 0;
for (let i = 0; i < 10; i += 3) {
  someVal += i;
  console.log(someVal);
}

console.log("---While loop");
while (someVal > 0) {
  someVal -= 10;
  console.log(someVal);
}

// ? Condition
// ! Just like how I already mentioned, be careful with === and == or !== and ==
console.log("---Single condition If else");
const newVal = 10;
if (newVal === someVal) {
  console.log(`${someVal} and ${newVal} are equal`);
} else {
  // This means !(newVal === someVal) which is the same as newVal !== someVal
  console.log(`${someVal} and ${newVal} are NOT equal`);
}

console.log("---Multiple conditions If else");
console.log("For AND condition, use &&");
console.log("For OR condition, use ||");
if (newVal > 5 && newVal % 2 === 0) {
  console.log(`${newVal} is greater than 5 and is even`);
} else {
  // This means !(newVal > 5 && newVal % 2 === 0) which is
  //  newVal <= 5 || newVal % 2 !== 0 <---- DeMorgan's law
  console.log(`${newVal} is less than or equal to 5 and is odd`);
}

console.log("--- Chaining multiple If else");
if (newVal > 10) {
  console.log(`${newVal} is > 10`);
} else if (newVal > 5) {
  console.log(`${newVal} is > 5`);
} else {
  console.log(`${newVal} is <= 5`);
}

console.log("--- Switch condition");
switch (someVal) {
  case 3:
    console.log(`${someVal} is 3`);
    break; // If I don't have a break here, if will execute everything above and also the next case
  case 5:
    console.log(`${someVal} is 5`);
    break;
  default:
    // If no case work, it will go here
    console.log(`${someVal} is not as predicted`);
    break;
}

// * Great! You made it :D Let's move on to advancedType.ts for the next step
