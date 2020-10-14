// * More advanced type

// ? Array (JS)
console.log("---Array");
// Array is a collection of objects. Index of array in JS starts from 0
const myArr: Array<string> = ["asd", "aad"];
const myArr2: string[] = ["asd", "aad"]; // Same thing, just different syntax
console.log(myArr);
// To retrieve an element from an array
console.log(myArr[0]);
// To change value of an element in the array
myArr[0] = "new String";
console.log(myArr[0]);

// ? Map (JS) - Record (TS)
console.log("---Object - Map - Record");
// https://stackoverflow.com/questions/56444889/whats-the-difference-between-map-and-record

// A record is something that use <key, value> pair to define its properties
// This is similar to dictionary in many other languages
// To define a Map in TS, we use Record<key datatype, value datatype>
const someMap: Record<string, number> = {
  // A map with key: string, value: number
  keyA: 3, // this works
  // keyB: "asd", // this won't work
  keyC: 999,
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

// ! There is also object type, but most of the time we'll use Record (or Map), so I'll leave that to you

// * Check out the official doc for more types! https://www.typescriptlang.org/docs/handbook/basic-types.html

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

// ? Union and Intersections type
console.log("---Intersection and Union");
// --- Union
// Sometimes, we an object can change type during runtime (which is not encouraged),
//  or a map can contain key with different datatype for values
// That's where Union comes in, it means either this or that but not both
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
  picture: Picture;
  age: number | null;
}
interface House {
  picture: Picture;
  address: string;
}

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

// TODO: Add more later
