import { database } from "firebase";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  
 firebaseConfig: {
    apiKey: "AIzaSyCGonlouPpZf3uS-v6srwkiw4m2fAddY14",
    authDomain: "fir-demo-b87be.firebaseapp.com",
    databaseURL: "https://fir-demo-b87be.firebaseio.com",
    projectId: "fir-demo-b87be",
    storageBucket: "fir-demo-b87be.appspot.com",
    messagingSenderId: "252781031412"
  }
};
