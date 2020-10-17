// * For a brief introduction, check out: https://firebase.google.com/docs/firestore
// * For list of APIs, checkout https://googleapis.dev/nodejs/firestore/latest/
// * Even though we're using Admin SDK, Firestore API should be very similar to:
//  https://firebase.google.com/docs/firestore/manage-data/add-data

// * Firestore has a loooot of APIs, but I'll only cover the very basic
// *  just enough so you guys can get the gasp of how Firestore work

// ! I'll use a lot of TypeScript knowledge here,
// ! turn back to my TS tutorial while you still can!
import admin from "firebase-admin";
import { https } from "firebase-functions";

import faker from "faker";

// Initializing the app for later use
admin.initializeApp();
const db = admin.firestore();

// ? How does Firestore work?
//  Firestore is a NoSQL document database. It's structured as follow:
//    _ The whole database contains multiple collections:
//      _ Each collection contains multiple documents
//        _ Each document contains multiple fields
//  You can think of a Firestore db instance is like a 3-layer nested JSON
/*
  {
    collectionA: {
      document1: {
        name: "A random guy",
        age: 200,
        readTypescriptTutorial: false,
        suggestion: "go back and read the TS tutorial",
      },
      document2: {
        name: "Hairy Potter",
        age: 3,
        suggestion: "notice the field readTypescriptTutorial is missing",
      },
    },
    ...
  }
*/
// * That's it! You work with FireStore as if you're working with a simple JSON :D
// NOTE: Firestore also have sub-collection, and the concept of reference
// See https://firebase.google.com/docs/firestore/data-model for explanation

// ! As always, NoSQL db doesn't really have a solid schema
// * This is where TS power comes into play
// Even though type assertion can't do much during runtime,
//  it can greatly reduce the risk of us making silly error
//  by doing some type asserting during development process

// * The recommended workflow is to always "define" a schema for your object first
// This is usually for the document-level object
interface HelloPerson {
  name: string;
  age?: number; // "?" means optional
  wasGreeted: boolean;
}

/*

*/

// ? This function will teaching you about
// ?  pushing new data into the db and
// ?  chaining some updates
export const helloFirestore = https.onRequest(async (request, response) => {
  try {
    // * First, I'll make a reference to the helloPersonList collection
    const collectionRef = db.collection("helloPersonList");

    // * Then I add a HelloPerson object
    // Notice that my HelloPerson is a document in helloPersonList collection
    const myHelloPerson: HelloPerson = {
      name: faker.name.findName(), // Generate a random name
      wasGreeted: false,
    };
    const result = await collectionRef.add(myHelloPerson);
    // This will add a document with an auto-generated ID
    //  where the fields are the attriubtes of myHelloPerson

    // The result object is a reference to the document I just created
    const docId = result.id;

    // That's why I can do this do update it attribute!
    await result.update({
      wasGreeted: true,
    });

    // ! However, this is where the no-solid-schema disadvantage kicks in
    // ! You can just accidentally add a random field like this
    await result.update({
      whyYouHereKey: true,
    });
    // and no one will ever complain except the hair you pull out during
    // debugging time :)

    // * Luckily... I got a way around...
    const updateProp: Partial<HelloPerson> = {
      // someRandomKey: "someRandomValue", // Can't do this dude
      wasGreeted: true, // This is totally fine
      age: 30,
    };
    // Partial will turn all the properties in the type/interface into optional
    // So, no property is fine, but adding another property that's not in the
    //  original interface/type is not valid!
    // https://www.typescriptlang.org/docs/handbook/utility-types.html

    // * This is not completely fool-proof, but at least it helps ¯\_(ツ)_/¯
    await result.update(updateProp);

    // * Note: In case you want to create a document's id by yourself, you can also do
    // await collectionRef.doc("your id here").set(myHelloPerson);
    // Notice how I use `set` instead of `update`

    response.status(200).send(`data id: ${docId}`);
    // * Run the function and refresh the Firestore emulator UI to see update
  } catch (error) {
    response.status(500).send(`error: ${error}`);
  }
});

/*

*/

// ? This function will teacher you about
// ?  getting documents
// ?  updating documents
// ?  deleting documents
export const helloFirestoreToo = https.onRequest(async (request, response) => {
  try {
    const collectionRef = db.collection("helloPersonList");

    // * First, lemme create some data and push it to the store
    const ageList = [10, 20];
    const idList: Array<string> = [];
    const amountToCreate = faker.random.number({ min: 3, max: 6 });
    for (let i = 0; i < amountToCreate; i++) {
      // Create a new person
      const name = faker.name.findName(); // Generate a random name
      const age = faker.random.arrayElement(ageList); // Get a random age from ageList
      const newPerson: HelloPerson = { name, wasGreeted: false, age };

      // Add them to the db
      const result = await collectionRef.add(newPerson);

      // And store the id of that person
      idList.push(result.id);
    }

    /*

     */

    // * To get a single document, you can execute queries
    // https://firebase.google.com/docs/firestore/query-data/queries
    console.log("--- Single doc");
    const docId = faker.random.arrayElement(idList); // Get a random id from idList
    const myPerson = await collectionRef.doc(docId).get();
    console.log("I got: ", myPerson.data(), "\n");

    /*

     */

    // * To get multiple documents at once, you can do
    console.log("--- Multiple docs");
    const personListSnapshot = await collectionRef
      // This means get all document where documentId is in idList
      .where(admin.firestore.FieldPath.documentId(), "in", idList)
      .get();
    // documentId() generates a sentinel
    // https://stackoverflow.com/questions/50232785/what-is-a-sentinel-in-the-context-of-firebase-firestore

    // Check if our snapshot is valid
    if (personListSnapshot.empty) {
      throw new Error("Error retrieving snapshot");
    }
    console.log("\tGot result: ");
    personListSnapshot.forEach((doc) => {
      const person = doc.data();
      // Now, if I just use person, I won't get any type hint
      // ? Can you think of why? (Psst, something about `any`)

      // * So... I'll have to do a type assertion!
      const { name, wasGreeted } = person as HelloPerson;
      // In case you forgot, the above is called destructuring
      console.log(`\t ${name} => Greeted: ${wasGreeted}`);

      // ! This is also a downside of NoSQL, I can't guarantee
      // !  the data I get back is in the correct format
      // If you're working on a serious project,
      //  I suggest you validate the data first
      // One validator to consider: https://ajv.js.org/
    });
    console.log("\n");

    /*

     */

    // * Other query example
    console.log("--- Age query");
    const ageSnapshot = await collectionRef
      // This means get all document where age field is the same as 10
      .where("age", "==", ageList[0]) // ageList[0] = 10
      .get();
    // ! Notice that "age" is a plain string which is not completely type safe
    // ! I'll let you guys think about how to solve this :)

    if (ageSnapshot.empty) {
      // Check if our snapshot is valid
      throw new Error("Error retrieving snapshot");
    }
    console.log("\tGot result: ");
    ageSnapshot.forEach((doc) => {
      console.log("\t", doc.id, "=>", doc.data());
    });

    console.log("\n");

    /*

     */

    // * Cleaning up!
    console.log("--- Deleting Field");
    const chosenId = idList[0];

    // To delete a single field in a document, you can do
    let deletePerson = (await collectionRef.doc(chosenId).get()).data();
    console.log("Before delete:", deletePerson);

    await collectionRef.doc(chosenId).update({
      age: admin.firestore.FieldValue.delete(),
    });

    deletePerson = (await collectionRef.doc(chosenId).get()).data();
    console.log("After delete:", deletePerson);

    console.log("\n");
    /*

     */

    console.log("--- Deleting Document");
    deletePerson = (await collectionRef.doc(chosenId).get()).data();
    console.log("Before delete:", deletePerson);

    await collectionRef.doc(chosenId).delete();

    deletePerson = (await collectionRef.doc(chosenId).get()).data();
    console.log("After delete:", deletePerson);

    console.log("\n");
    /*

     */

    // You can also delete a whole collection, I'll let you guys figure that out
    // https://firebase.google.com/docs/firestore/manage-data/delete-data

    /*

     */
    console.log("--- Clean up all");
    idList.forEach(async (id) => {
      await collectionRef.doc(id).delete();
    });
    console.log("Finish cleaning");

    response.status(200).send(`Finish helloFirestoreToo!`);
  } catch (error) {
    response.status(500).send(`error: ${error}`);
  }
});

// * Firebase also support
//  --- Transaction and batch: https://firebase.google.com/docs/firestore/manage-data/transactions
//  --- Pagination: https://firebase.google.com/docs/firestore/query-data/query-cursors
//  ...
// * But I'll leave it to you. I might add them later but there is no plan yet.
// * With the basic knowledge, I think you can definitely do it! Give it your best :D

// * Congratulation! You finish all of my tutorials :D Time to use them in real projects!
