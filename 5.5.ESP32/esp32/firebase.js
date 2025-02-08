import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQaYmOXz6u8d8i-JUy0FVASi79G8d8yak",
  authDomain: "esp32-01-228b7.firebaseapp.com",
  databaseURL: "https://esp32-01-228b7-default-rtdb.firebaseio.com", // Added databaseURL
  projectId: "esp32-01-228b7",
  storageBucket: "esp32-01-228b7.firebasestorage.app",
  messagingSenderId: "833929362119",
  appId: "1:833929362119:web:fc3d9f426f802248355ce2",
  measurementId: "G-2QVE65LETS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };