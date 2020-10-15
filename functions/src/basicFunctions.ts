import { https } from "firebase-functions";
import axios from "axios";

// ? Emoji endpoint - Send back a random emoji!
export const emojiSender = https.onRequest((request, response) => {
  const getRandomIndex = (arrLength: number) =>
    Math.floor(Math.random() * arrLength);

  const allEmojiString =
    "😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
  const emojiArray = allEmojiString.split(" ");
  const randomEmoji = emojiArray[getRandomIndex(emojiArray.length)];

  // No return at all, response.send will ends the HTTP call
  response.status(200).send(`Here is your emoji: ${randomEmoji}`);
});

// ? Throwing an error but not catching like this is generally not a good idea
export const throwNoCatchEndpoint = https.onRequest((request, response) => {
  // This will crash the function, show some log but might not be useful
  throw new Error("Some error here");

  // Since we don't have a response set here, the client might not receive
  //  any notification at all and just wait for a timeout
});

// ? Instead, we should always catch one, even if we can't come up with
//  a meaningful response
export const throwWithCatch = https.onRequest((request, response) => {
  // Always try to make sure you have a try-catch or then-catch for async stuff
  try {
    throw new Error("This error will be caught");
  } catch (error) {
    // Depends on what causes error, error can be a simple string (like in this case)
    //  or an object with code and message (in the case of Firebase)
    console.error(`Got error ${error}`);
    response.status(500).send(`Got an error ${error}`);
  }
});

// ? You can also send an JSON object back and get user data in request
export const jsonRequestDataEndpoint = https.onRequest((request, response) => {
  // https://medium.com/@fullsour/when-should-you-use-path-variable-and-query-parameter-a346790e8a6d
  const pathData = request.path; // Data coming from path in URL
  const queryParam = request.query; // Query parameters
  const bodyData = request.body; // Data from the body

  response.status(200).json({
    message: "You sent me these",
    pathData,
    queryParam,
    bodyData,
  });
});

// ? You can also make it async!
// ! Don't forget the async keyword though
export const asyncEndpoint = https.onRequest(async (request, response) => {
  console.info("Fetching data from litipsum.com");

  try {
    const result = await axios.get("https://litipsum.com/api");
    console.info("Successfully fetched data");

    response.status(200).send(result.data);
  } catch (error) {
    response.status(500).send(`Fail to fetch lorem with error ${error}`);
  }
});

// * That should be it for basic examples! Let's head to firestoreExamples for more information
