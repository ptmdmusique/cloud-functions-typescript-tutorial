// ? Importing packages

// --- Make sure to always import at the top of the file
// --- Also, check if you already run npm install before hand
//    because node_modules folder which contain libraries's files is not committed to git by default
//    The reason is because node_modules can be regenerated using package.json, and that folder is quite large

// ! Do not ignore like this often, I add an ignore because this package doesn't have a corresponding type definition,
// !  so the compiler will throw a tantrum at me if I don't tell it to ignore!
// @ts-ignore
import cowsay from "cowsay"; // This is an ES6 type of import, more about the syntax later
// const cowsay = require("cowsay") // This is for ES5, but it won't come with type hinting!

// Default import
import dayjs from "dayjs"; // This means we import the default export from dayjs, more on that later
// Import all
import * as dayjsAll from "dayjs"; // This means we import everything exported in package at once
// ! Note that default import and all import aren't the same always
// Or you can do this and import only what you need
// This is technically object destructuring that you learn previously
import { locale, isDayjs, unix } from "dayjs"; // Named import, same thing as destructuring dayjsAll
// --- I can even rename stuff
import somethingElse from "dayjs"; // This is still the same as the above dayjs variable

// ? Using package components
// This is nothing special, we use what we import the same way as we use any variable/function/etc

// Since I import a function, I can just call it like any other function!
// Notice that I won't get a type hint here, because I didn't install type definition for this package
console.log(cowsay.say({ text: "Hello there. It's me, Cow :D" }));

// For the dayjs import, I can either do
console.log(dayjs.locale());
// or
console.log(locale()); // Because this one is from the destructured dayjs

// ? Exporting
// To use my variables in other files, I need to export them!
// ! This is ES6 ways, which is more modern, compact and readable then ES5 and earlier
export const myExportedVar = 10;
export const myExportedVar2 = 50;
export const someArr = [1, 2, 3];

// --- Exporting a type/interface
// I can do this
export interface CustomExportType {
  location: string;
}

// Or I can do this
// export type { CustomExportType };
// This won't work if I don't comment out the above CustomExportType export

// Or I can rename before exporting it
export type { CustomExportType as DisguisedCustomExportType };

// Note: All of the exports above is equivalent to
//  exporting a new object like this
// export { myExportedVar, myExportedVar2, someArr };
// If you uncomment it out, you will see error because we've already exported them once
// ! If you're not familiar with the syntax above,
// !  check out "Creating new objects" in advancedType.ts

// ? This is what we call default export, but we should avoid it
// https://basarat.gitbook.io/typescript/main-1/defaultisbad
// I don't use this much so I can't explain this very well
// https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript#:~:text=Up%20vote%20%2D3-,export%20default%20is%20used%20to%20export%20a%20single%20class%2C%20function,the%20function%20has%20no%20name.
export default myExportedVar;

// * Let's head to packageImportExportToo.ts to learn how to use your own exported stuff!
