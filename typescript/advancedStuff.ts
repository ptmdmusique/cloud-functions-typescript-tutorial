// @ts-ignore
import axios from "axios"; // More on import later

// ? Promise - Async - Await (JS)
console.log("--- Promise!");
// JavaScript is asynchronous (thus, so is TypeScript)
//  meaning it's good at leaving responsibilities to others while
//  doing what it likes to do :)

// ? More formally, JS has something called callback queue
//  when it does some tasks like making an HTTP call,
//  it will leave that task to the server to handle it and put a reminder on the queue
//  then it will keep doing what it's supposed to do and once everything is done
//  it will check back with the queue and see which one has finished (or crashed)
//  to get the result

// Imagine that you are tasks with making egg toast breakfast
//  meaning you have to: 1. toast a bread using a toaster and 2. fry an egg
// Technically, I can:
//  1. put the bread in the toaster,
//  2. wait for it to finishes and
//  3. start to fry the egg
//  4. profit

// But, I can also:
//  1. put the bread in the toaster,
//  2. start to fry the egg and leave the toaster to it job
//  3. profit

// In both case, notice that we don't have to toast the bread ourselves
//  but we need to fry the egg ourselves
// ? In JS language, making a toast is something we call Promise
//  and frying an egg is just a regular task/job/whatever-you-want-to-call-it
// We can 'await' for the toaster, or
//  we can leave it be and hope that it will come back to us

// * Let's take a look at some code!
const makeAToast = () => {
  console.info("Start making a toast...");
  // This function will wait for 2000 milliseconds and just toast something
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(); // This will signal a stop to the Promise
    }, 2000)
  );
};

const fryAnEgg = () => {
  console.info("I'm frying an egg instantaneously!");
};

// Use this if you want to wait for the toaster to finish
// ! notice the async keyword
const makingBreakfastAsync = async () => {
  // * It's a good practice to always wrap a Promise execution
  // *  between a try-catch pair in case your toaster needs a sick leave
  try {
    console.log("!- Async");

    await makeAToast();
    console.info("Finish toasting!");

    fryAnEgg(); // This will not be called until makeAToast() finishes
    console.info("My breakfast is ready!");
  } catch (error) {
    console.error(`Toaster is broken! ${error}`);
  }
};
// makingBreakfastAsync();  // uncomment to see effect
// ! If you uncomment both makingBreakfastAsync() and makingBreakfastNoAsync(),
//  magic will happens, try to guess why :)

// Use this if you DON'T want to wait for the toaster to finish
const makingBreakfastNoAsync = () => {
  console.log("!- No async");

  // * Instead of try-catch, we use chaining then-catch in this case
  makeAToast()
    .then(() => {
      // Even if this finishes first before fryAnEgg,
      //  it will NOT be called before fryAnEgg()
      console.info("Finish toasting!");
    })
    .catch((error) => {
      console.error(`Toaster is broken! ${error}`);
    });

  fryAnEgg(); // This is guaranteed to be called BEFORE makeAToast() finishes
  console.info("My breakfast is ready...?");
};
// makingBreakfastNoAsync();  // uncomment to see effect

// ? So, when do you use await-async, when do you use then-catch?
// You might want to use await-async if you need the result of your toaster
//  first before frying an egg
// You might want to use then-catch if you don't really care if your bread
//  is a goner or not

// Another reason to use await-async is to avoid callback hell (nested then-catch)
// http://callbackhell.com/

// * Technically, you can always use one in place of another!

// ? "Real" example
console.info("---Real example");
const fetchRandomText = async () => {
  // HTTP call is always asynchronous
  try {
    const result = await axios.get("https://litipsum.com/api");

    // ? Type casting in case you're wondering
    if ((result.data as string).length > 0) {
      console.info("I got a NONempty text!");
    } else {
      console.info("I got an EMPTY text!");
    }
  } catch (error) {
    console.error(`Server is broken ${error}`);
  }
};
// fetchRandomText(); // uncomment to see effect

// https://stackoverflow.com/a/42507649/13118446
// * Good work! Let's head to packageImportExport.ts for the next level :D
