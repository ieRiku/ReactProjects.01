"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBQaYmOXz6u8d8i-JUy0FVASi79G8d8yak",
  authDomain: "esp32-01-228b7.firebaseapp.com",
  databaseURL: "https://esp32-01-228b7-default-rtdb.firebaseio.com",
  projectId: "esp32-01-228b7",
  storageBucket: "esp32-01-228b7.firebasestorage.app",
  messagingSenderId: "833929362119",
  appId: "1:833929362119:web:fc3d9f426f802248355ce2",
  measurementId: "G-2QVE65LETS"
};

export default function Dashboard() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  // Initialize Firebase app and Database instance with useMemo for stability
  const app = initializeApp(firebaseConfig);
  const db = useMemo(() => getDatabase(app), [app]);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { expiry } = JSON.parse(auth);
      if (Date.now() > expiry) {
        localStorage.removeItem("auth");
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  // Sync pumpState with Firebase Realtime Database
  useEffect(() => {
    const pumpRef = ref(db, "pumpState");
    const unsubscribe = onValue(pumpRef, (snapshot) => {
      setToggle(snapshot.val());
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [db]);

  const handleToggle = () => {
    const newState = !toggle;
    set(ref(db, "pumpState"), newState)
      .then(() => setToggle(newState))
      .catch(error => console.error("Error updating pumpState:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <div className={styles.dashboardContainer}>
      <button
        className={styles.logoutButton}
        onClick={handleLogout}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        Logout
      </button>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
        <button className={styles.toggleButton} onClick={handleToggle}>
          {toggle ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}