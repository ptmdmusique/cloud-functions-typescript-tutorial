// ? Using your own export
// ES6 style import, easy!
import {
  someArr,
  myExportedVar,
  myExportedVar2,
  CustomExportType,
  DisguisedCustomExportType, // You expected a different interface? But it was me, CustomExportType!
} from "./packageImportExport"; // Notice that I didn't include a .ts at the end
// Or I can import all and give a name to it
import * as AllExport from "./packageImportExport";
// I can import default like this
import anyName from "./packageImportExport";
// or
import { default as myDefault } from "./packageImportExport";

// One line import
// import defaultImport, { someArr, myExportedVar } from "./packageImportExport";

// You see a cow saying hello in your log? Yes, you see it right
// This is a little bit more advanced, but I'll try to explain it
// When you import something,
//  the file you imported it from has be compiled and run
//  so that the values you imported are defined
// Therefore, it will run everything you have in there
//  which includes the log of cowsay.say() and locale()

console.log("--- Default import");
console.log(anyName, myDefault, anyName === myDefault);

console.log("--- Using your import");
if (myExportedVar === AllExport.myExportedVar) {
  console.log("See, they are the same");
} else {
  throw new Error("You're in a dangerous zone dude...");
}

if (someArr === AllExport.someArr) {
  // This means both are pointing to the same reference!
  console.log("2 Reference are the same!");
} else {
  throw new Error("You're in a dangerous zone dude...");
}

// ? Reexporting
// Sometimes, you want to reporting stuff to separate the files, logic and other stuff
//  this usually happens in index.ts, somewhat similar to __init__.py in Python
export { myExportedVar2, CustomExportType };
// Or you can export directly
export { default, myExportedVar } from "./packageImportExport";
// Or even export all directly
export * from "./packageImportExport"; // ! This won't include the default export

// * That's it! If you understand or starting to get the gasp of it,
// *  then I think you're ready to head to Cloud Functions tutorial :D
