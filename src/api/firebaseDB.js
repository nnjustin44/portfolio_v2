import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, push, ref, serverTimestamp, set } from "firebase/database";

const firebaseDb_key = process.env.REACT_APP_FIREBASE_DB_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const appId = process.env.REACT_APP_APP_ID;
const measureId = process.env.REACT_APP_MEASURE_ID;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const databaseURL =
  process.env.REACT_APP_FIREBASE_DATABASE_URL ||
  "https://portfoliov2-f8b68-default-rtdb.firebaseio.com";

const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: firebaseDb_key,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId: measureId,
  };

  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const FirebaseDB = async (input, time, date, response) => {
  const app = getFirebaseApp();
  const database = getDatabase(app);
  const messageRef = push(ref(database, "jonahMessages"));

  return set(messageRef, {
    input,
    time,
    date,
    response,
    createdAt: serverTimestamp(),
  });
};
