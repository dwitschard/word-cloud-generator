// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "",
    authDomain: "jap-wordcloud.firebaseapp.com",
    databaseURL: "https://jap-wordcloud-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jap-wordcloud",
    storageBucket: "jap-wordcloud.appspot.com",
    messagingSenderId: "941959563643",
    appId: "1:941959563643:web:abdd242a601e7d5a3c55de",
    measurementId: "G-9HC598C5BR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
