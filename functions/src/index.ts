// * In this tutorial, I'll walk you through the basic concept of Firebase Cloud Functions
// ! Make sure you run the emulator to interact with the endpoints
// `npm start` in 1 terminal to start the emulator and
// `npm run serve` in another window to watch for change

// ! If you're not familiar with these import or variable declaration syntax,
// !  I suggest taking a look at my TypeScript tutorial first
import * as functions from "firebase-functions";

// * Here is a link to the official doc
// * https://firebase.google.com/docs/functions/typescript

// Writing an endpoint can be as simple as this
//  You pass in a function that take in a request and response and write logic within it!
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// * There are some few things that we need to keep in mind

// --- Make sure to export your onRequest or onCall function.
// --- --- Whatever name you export, it will become the name of your endpoint
// --- --- For example: the corresponding endpoint for the helloWorld I exported above is /helloWorld
// --- ---    and if my resource location is http://localhost:5001/fir-typescript-tutorial/us-central1
// --- ---    I can access my endpoint at: http://localhost:5001/fir-typescript-tutorial/us-central1/helloWorld

// --- Firebase use Express JS underneath, so their Request and Response model can be found at
// --- --- https://expressjs.com/en/5x/api.html

// --- There are 2 types of functions you can export: onRequest and onCall
// --- --- There are no significant differences at all (on both performance and security aspects)
// --- --- https://stackoverflow.com/questions/49475667/are-callable-cloud-functions-better-than-http-functions
// --- --- 2 main difference: https://firebase.google.com/docs/functions/callable
// --- ---  1. Ways to call:
//              _ onCall can only be invoked by your client app through Firebase SDK
//              _ onRequest can be invoked using a standard HTTP protocol anywhere (curl, axios, postman, etc)
//          2. Request body:
//              _ onCall Firebase Auth info and FCM token are automatically included.
//                onCall also automatically desiralizes request body and validate auth token
//              _ onRequest will not do those, you have to do them manually :)

// * Because we don't have a client app, I'll only talk about onRequest function here

export {
  emojiSender,
  throwNoCatchEndpoint,
  throwWithCatch,
  jsonRequestDataEndpoint,
  asyncEndpoint,
} from "./basicFunctions"; //Re-export endpoints declared in basicFunctions.ts

export { helloFirestore, helloFirestoreToo } from "./basicFirestore";

// * Great! Let's head to basicFunctions.ts for basic examples.
// *    or you can go to firestoreFunctions.ts for examples on how to interact with Firestore
