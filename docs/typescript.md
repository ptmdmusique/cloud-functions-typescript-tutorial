# Typescript

## Overview

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components. The TypeScript language specification has full details about the language. Checkout the [source](https://code.visualstudio.com/docs/typescript/typescript-compiling) for more info about how to get started with Typescript installation

## **Documentation**

Checkout: https://www.typescriptlang.org/ The documentation is very well written. They also have sections for programmers coming from different background :D

There are some other crash courses worth checking out too [link](https://www.youtube.com/watch?v=ahCwqrYpIuM) and [link](https://www.youtube.com/watch?v=WBPrJSw7yQA)! (Psst, I learned how to use TypeScript from them)

### **Development**

1. My favorite IDE is Visual Studio Code. It integrates with `tsc` through their integrated task runner so you won't have to config much.
2. I add some configuration in `tsconfig.json` so you always compile in watch mode, meaning once you run `tsc` command inside `/typescript/` folder, you only have to type, save and the result file will be automatically re-compiled. You can always turn this off by switching the `watch` flag in `tsconfig.json` to `false`
3. To start compiling, you can run `tsc` or `npm start` once inside `/typescript/` folder
4. After compilation, run `node <your file name>.js` to run the compiled file. NOTE: make sure you run against a `.js` file, which is the compiled version of `.ts`

### **Adding packages**

1. TypeScript uses `npm` to manage its packages, just like Javascript.
2. To install a new package, run `npm install <your package name>`. You can check out a list of available package [here](https://www.npmjs.com/). MAKE SURE YOU GO INTO THE `/typescript/` FOLDER FIRST!
3. Some useful npm related websites: [package comparer](https://www.npmtrends.com/), [package information](https://bundlephobia.com/)
4. Note, adding package like above is how we do it for JS, for SOME TypeScript library, we also have to add type definition for that package also (if there is one), to do it, simple run `npm install -D @types/<your package name>`. Some library already add their type definition by default
The `-D` flag is to install into dev dependencies, I usually do this so that the type definition won't be carried into production

### **Ready?**

Let's head to `/typescript/startHere.ts` for the first step!

### **Roadmap**

You can follow this order, from basic to advance

1. `startHere.ts`: basic stuff for TS! Content: Variable declaration, Function and Math operations
2. `basicStuffToo.ts`: more basic stuff! Content: Scope, Condition, and Loop
3. `advancedType.ts`: deep dive into TS and JS! Content: Array, Object/Map, Interface, Union and Intersection etc with a lot of related operations
4. `advancedStuff.ts`: learn about JS Promise! Content: Async-await, then-catch chaining.
5. `packageImportExport.ts`: learn how to use external library through import, and learn how to export your variable! Content: Using Libs, Importing libs and exporting
6. `packageImportExportToo.ts`: learn how to import and use your own exported variables!
