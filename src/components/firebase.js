import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX-OAcdJpBnQZJEq5xFm5ZC_QSSJdN6lU",
  authDomain: "horne-hyundai.firebaseapp.com",
  databaseURL: "https://horne-hyundai-default-rtdb.firebaseio.com",
  projectId: "horne-hyundai",
  storageBucket: "horne-hyundai.appspot.com",
  messagingSenderId: "357331981365",
  appId: "1:357331981365:web:b722d032814bbc338dcd7c",
  measurementId: "G-WVZ8CGB16N",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
