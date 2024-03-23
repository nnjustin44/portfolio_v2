import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
const firebaseDb_key = process.env.REACT_APP_FIREBASE_DB_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const appId = process.env.REACT_APP_APP_ID;
const measureId = process.env.REACT_APP_MEASURE_ID;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;

export const FirebaseDB = async (input, time, date, userId) => {
  // Firebase code snippet for writing data
  const firebaseConfig = {
    apiKey: firebaseDb_key,
    authDomain: authDomain,
    databaseURL: "https://portfoliov2-f8b68-default-rtdb.firebaseio.com",
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measureId,
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = getDatabase(app);
  // Get a reference to your database

  // Write data to Firebase
  var data = {
    input: input,
    time: time,
    date: date,
  };
  console.log("userId:", userId);
  set(ref(database, userId), {
    data,
  })
    .then(() => {
      console.log("Data has been written successfully!");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
};
