// ? Importing packages

// --- Make sure to always import at the top of the file
// --- Also, check if you already run npm install before hand

// ! Do not ignore like this often, I add an ignore because this package doesn't have a corresponding type definition, so the compiler will throw a tantrum at me if I don't tell it to ignore!
// @ts-ignore
import { say } from "cowsay"; // This is an ES6 type of import
// const cowsay = require("cowsay") // This is for ES5, but it won't come with type hinting!

// ? Using package components
// --- Since I import a function, I can just call it like any other function!
// Notice that I won't get a type hint here, because I didn't install type definition for this package
console.log(say({ text: "Hello there :D" }));
