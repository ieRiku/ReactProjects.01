import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQaYmOXz6u8d8i-JUy0FVASi79G8d8yak",
  authDomain: "esp32-01-228b7.firebaseapp.com",
  projectId: "esp32-01-228b7",
  databaseURL: "https://esp32-01-228b7-default-rtdb.firebaseio.com",
  storageBucket: "esp32-01-228b7.firebasestorage.app",
  messagingSenderId: "833929362119",
  appId: "1:833929362119:web:2f6e9d4cbf115a53355ce2",
  measurementId: "G-2SHNCC2870"
};

const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  // Only initialize analytics in browser environments
  getAnalytics(app);
}

const db = getDatabase(app);
export { db };