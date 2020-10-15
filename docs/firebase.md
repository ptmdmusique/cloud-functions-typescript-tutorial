# Firebase

## Overview
### **About Firebase**
Firebase is mostly useful for Web and Mobile development. It includes a set of services that serve just enough for almost all of Web and Mobile development needs, including database, web hosting, machine learning, etc.
### **Firebase and GCP**
To me, Firebase is like a sub service of Google Cloud Platform (GCP). What's different you ask? Here you go: [doc](https://medium.com/google-developers/whats-the-relationship-between-firebase-and-google-cloud-57e268a7ff6f)
For more information, check out their [tutorial](https://firebase.google.com/). One thing I like about Firebase is how easy it is to get started with a simple project (and their free tier is sweet too!), and you can always connect it to other GCP services too!
### **Note**
If you're reading this, I assume you already have basic TypeScript and NodeJS knowledge. Checkout my TypeScript tutorial if you need more information on those two


## Cloud Functions
### **Overview**
Cloud Functions is one of the services belong to GCP, or Firebase specifically. You can access its console through both GCP dashboard or Firebase dashboard. However, some functionalities only show up if you access it through GCP dashboard, such as testing the function manually through their UI.
<br>[Doc](https://cloud.google.com/functions/docs/concepts/overview)

### **Developing**
Although you can do this in any folder, I suggest go to `/functions/` before hand or else the emulator might not work correctly. The step I mention below will take place inside `/functions/` folder. We will use the emulator for our tutorial <br>
1. To start the emulator, run `npm run`
2. To also watch for file changes, open up another terminal (while keeping `npm run` running) and run `npm run serve`
3. To shut down the emulator, simply terminate the process in your terminal (`ctrl + C` for Git Bash)
4. To deploy, run `npm deploy`
<br>
For the list of commands, check out the `scripts` section under file `package.json`

### Ports
Once you start the emulator, the ports are:
1. 4000: Emulator UI. Go to http://localhost:4000/ to see the UI
2. 8000: Firestore resource port
3. 5001: Functions resource port
> To invoke a function, go to `http://localhost:5001/fir-typescript-tutorial/us-central1/<endpoint's name>`

### **Ready?**
The entries file will be `/functions/src/index.ts`. Let's go there for more tutorial :D