// * More advanced type
// --- Most of these are well documented in https://www.typescriptlang.org/docs/handbook/basic-types.html
// I'll only point out something I found interesting

// ? Array (JS)
console.log("---Array");
// Array is a collection of objects. Index of array in JS starts from 0
console.log("Array creation and modification");
const myArr: Array<string> = ["first string", "second string"];
let myArr2: string[] = ["some string", "sum more string"]; // Same thing, just different syntax
console.log(myArr);
// To retrieve an element from an array
console.log(myArr[0]);
// To change value of an element in the array
myArr[0] = "new String";
console.log(myArr);
// To empty the array, there are many ways, but the most common I've found is:
myArr2 = []; // For low-level nerd: this asks myArr2 to point to another memory address for a new array
console.log("Empty array", myArr2);

// --- Shallow copy
console.log("Shallow copy---");
//  The 2nd array will point to the same place as the original one
const shallowCopy = myArr;
// More on deep copy later

// --- Array comparison
console.log("Shallow comparison---");
console.log(myArr === shallowCopy, "<--- Should return true");
// true because both of them have the same reference

// --- Iterating through array
console.log("Array iteration---");
for (let i = 0; i < myArr.length; i++) {
  console.log(myArr[i]);
}
// or
for (let ele of myArr) {
  // Remember, this is OF, not IN
  console.log(ele);
}

// --- Array operator
// ~ Spread operator, it destruct the entire array for the inner elements
console.log("Spread operator---");
console.log(...myArr); // This is equivalent to console.log(myArr[0], myArr[1], myArr[2]);
const myArr3 = [...myArr]; // This is also a way to copy the whole array
console.log(myArr3, "<--- Should have the same value as myArr");
console.log(myArr3 === myArr, "<--- Should return false");
// false because they have different reference even though elements are the same

// --- Array functions
console.log("Array built-in functions---");
// ~ push: add another element to the END of array
// ! this is destructive, meaning it modify the original array
myArr3.push("push example", "push example 2");
console.log(myArr3);
// Remember the spread operator?
myArr3.push(...myArr); // This is equivalent to myArr3.push(myArr[0], myArr[1], myArr[2]);
console.log(myArr3);

// ~ pop: remove the LAST element of the array, the reverse of pop,
// ! destructive

// ~ forEach: iterate through each element of the array,
//  accept a function that do something with each element (higher order function)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//  return undefined
//  ! non-destructive
// This is useful when you want to use the elements to modify something outside
console.log("forEach function");
const myArr4 = [1, 2, 3, 4, 5, 6, 7];
let forEachArr: Array<number> = [];
myArr4.forEach((arrayElement) => {
  forEachArr.push(arrayElement * 4);
});
console.log(forEachArr);

// The above is equivalent to
forEachArr = [];
for (let index = 0; index < myArr4.length; index++) {
  forEachArr.push(myArr4[index] * 4);
}
console.log(forEachArr);

// ~ map: iterate through each element of the array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// accept a function that do something with each element (higher order function)
// then return a NEW array with the modifed element
//  ! non-destructive
// This is useful when you want to create another array from the original array
forEachArr = myArr4.map((arrayElement) => arrayElement * 4);
console.log("map function", forEachArr);

// NOTE: as you have notice, the forEach and map can you interchangeably

// ~ reduce: iterate through each element, accumulate the result and return a SINGLE value
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//  ! non-destructive
// This is useful when you want to return a SINGLE value which related to elements in an array
const myArr5 = [1, 2, 3, 4, 5, 6, 7];
const evenSum = myArr5.reduce((prevValue, curElement) => {
  if (curElement % 2 === 0) {
    // Only add up if the current element we're iterating through is even
    return prevValue + curElement;
  } else {
    // Else return the previous element
    return prevValue;
  }
}, 0); // 0 is the initial value I want
console.log("reduced function", evenSum, "<--- Should be 12");

// ~ filter: iterate through each element, filter based on condition and
//  return only the filtered value into a NEW array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//  ! non-destructive
const oddArr = myArr5.filter((element) => element % 2 !== 0); // Return element the condition is true
console.log("filter function", oddArr);

// --- Chaining functions together!
console.log("Chaining stuff");
const someSum = myArr5
  .filter((ele) => ele % 2 === 0) // First filter out even values
  .map((ele) => ele * 2) // Then multiply each value by 2
  .reduce((prev, cur) => prev + cur); // And sum them up
console.log(someSum);

// NOTE: There are a lot more, but I think those above are the hardest one to understand

console.log("\n");
/*

*/

// ? Map (JS) - Record (TS)
console.log("---Object - Map - Record");
// https://stackoverflow.com/questions/56444889/whats-the-difference-between-map-and-record
// ! There is also object type, but most of the time we'll use Record (or Map), so I'll leave Object to you

// --- Basic stuff
// A record is something that use <key, value> pair to define its properties
// This is similar to dictionary in many other languages
// To define a Map in TS, we use Record<key datatype, value datatype>
console.log("Map creation and modification");
const someMap: Record<string, number> = {
  // A map with key: string, value: number
  keyA: 3, // this works
  // keyB: "asd", // this won't work because of value datatype
  keyC: 999,
  keyD: 20,
};
console.log(someMap);

// To retrieve a map's value
console.log(someMap["keyA"]);
// or
console.log(someMap.keyA);

// To set a map's value
someMap["keyA"] = 10; // this works
// or
someMap.keyA = 50; // this works
// someMap["keyA"] = "test" // this won't, because value have to have number datatype

// To copy an map, usually we do just like how we copy an array
let copyMap = someMap; // Shallow copy
copyMap = { ...someMap }; // Deep copy
// ! Note, this only do deep copy on first level, nested object will be shallowed copied

// --- More advanced stuff
// Object destructuring - This break down the object and extract only what is needed
console.log("Object destructuring---");
{
  const { keyA, keyC } = someMap;
  console.log(keyA, keyC);
}
{
  // I can also rename the key
  const { keyA: keyANewName, keyC } = someMap;
  console.log(keyANewName, keyC);
}
{
  // I can also omit the key I don't need into a separate object
  const { keyA, ...otherKeys } = someMap;
  console.log(keyA, otherKeys);
}

// Creating new objects
console.log("Creating new object from variables---");
{
  const numA = 10;
  const numB = 20;
  const stringA = 10;
  // I can create a new object like this
  const newObj = {
    numA: numA,
    numB: numB,
    stringA: stringA,
  };
  console.log(newObj);

  // See how the key and value has the same variable name?
  //  I can omit it, meaning I can do this
  const newObjToo = {
    numA,
    numB,
    stringA,
  };
  console.log(newObjToo);
}

// Turning object keys, values into array
console.log("Map into array");
console.log(Object.keys(someMap)); // Retrieving keys of a map
// Note, the 2 below only work if you use ES2017 or above for "target" in tsconfig.json
console.log(Object.values(someMap)); // Retrieving values of a map
console.log(Object.entries(someMap)); // Retrieving both keys and values in form of tuple

// Short hand to iterate through keys in object
for (let key in someMap) {
  // Remember, this is IN, not OF
  console.log(key, ":", someMap[key]);
}
// which is the same as
Object.keys(someMap).forEach((key) => console.log(key, ":", someMap[key]));

console.log("\n");
/*

*/

// ? Interface
// --- This is a way to define the "schema" of an object
console.log("---Interface");
// Name should be capitalized
interface Profile {
  name: string;
  grade: number;
  age?: number; // optional
}
const profileB: Profile = {
  name: "Duc",
  grade: 0,
  age: 22,
};
const profileA: Profile = {
  name: "Thy",
  grade: 10,
  // Doesn't throw us an error even if we don't declare age
};
console.log(profileA);

console.log("\n");
/*

*/

// ? Union and Intersections type
console.log("---Intersection and Union");
// --- Union
// Sometimes, we an object can change type during runtime (which is not encouraged),
//  or a map can contain key with different datatype for values
// That's where Union comes in, it means either this or that
let myVar: string | number = 10; // myVar can be a string or number
myVar = "123"; // Doesn't complain at all

// But this can be useful in this case:
let myVar2: number | null = null; // at first, we don't have anything decided for it yet
console.log(myVar2);
// ... some other time
myVar2 = profileA["grade"]; // Later on, we decide to give it a value
console.log(myVar2);

// With record
const myRecord: Record<string | number, undefined | string> = {
  1: undefined,
  key: undefined,
  someOtherKey: "10",
};
console.log(myRecord);

// --- That leads to type alias. It's useful in the case we use the same union types again and again
type Picture = string | null;
interface ProfileWithPicture {
  picture: Picture; // Of course I can use string | null directly
  age: number | null;
}
interface House {
  picture: Picture; // But that means I'll also repeat string | null here
  address: string;
}
// Single source of truth FTW!

// --- We also have Intersection
// It's just like Union, but it combines multiple types into 1
type MyUnion = ProfileWithPicture | House; // EITHER ProfileWithPicture OR a House OR both
type MyIntersection = ProfileWithPicture & House; // BOTH ProfileWithPicture AND a House
const testUnion: MyUnion = {
  picture: null,
  age: 10,
  address: "ASD", // Can have both, doesn't complain
};
const testIntersection: MyIntersection = {
  // Object has all value
  picture: null,
  age: 30,
  address: "ASD", // Needs to have this, try to comment this and you'll be in trouble
};
console.log(testUnion, testIntersection);

// ? any - unknown and Type Assertion (TS)
// ! Don't mistake this for JS Type casting!
// !  type casting = convert type in runtime
// !  type assertion = static type check for compiler
//  https://techformist.com/type-casting-typescript/
console.info("--- Any and Unknown");
// unknown is used to indicate that the type will and has to be defined later to be used
let unknownString: unknown = "Some unknown type";

// any is used to indicate that the variable can have any type
let anyString: any = "Some any string";

// So, what's the different from any?
// Unknown is much safer, why?
console.info("--- Type assertion");
console.info("any length: ", anyString.length);
// The compiler allows that, but what if I do
anyString = 5;
console.info("any length too: ", anyString.length);
// Still allowed, but return undefined because number doesn't have prop length
// Very dangerous if you use that later

// * But unknown will make the compiler stop you,
//  because it wants to make sure you known what you're doing
// console.log("unknown length: ", unknownString.length); // compiler will be mad at you

// * That's when type assertion comes into play!
const assertedString = unknownString as string;
// Hooray!
console.info("unknown length too: ", assertedString.length);
// Or in short
console.info("unknown length capu2: ", (unknownString as string).length);

// ! But remember, TypeScript is a static type check, so you can still do ...
unknownString = 5;
const whyYouNoBroken = unknownString as string;
// * Does that mean the compiler is broken?
// No, TypeScript does type check during compile time, NOT run time
// So, it won't know unknownString has been assigned to 5 when it compile
// (unless it's a constant, which you can't re-assign the variable)

// * Most of the type I see people use type assertion with any or unknown
// There are some advanced use cases, but you'll understand it better when you see them

/*

*/
// * There are also Classes, Generic, Omit, etc,
// * I'll let you check it out by yourselves... for now
// https://www.typescriptlang.org/docs/handbook/basic-types.html

// * Good job so far! Let's go to advancedStuff.ts for the next step
