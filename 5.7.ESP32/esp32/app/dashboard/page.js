"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

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

  // Simulate fetching toggle value from Firebase on mount
  useEffect(() => {
    // Simulated fetch:
    setToggle(false);
  }, []);

  const handleToggle = () => {
    setToggle((prev) => !prev);
    // Here you would update the value on Firebase.
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button onClick={handleToggle}>{toggle ? "ON" : "OFF"}</button>
      </div>
    </div>
  );
}