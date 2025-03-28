"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // static verification
    if(email === "emal@gmail.com" && password === "password") {
      const expiry = Date.now() + 15 * 24 * 60 * 60 * 1000; // 15 days
      localStorage.setItem("auth", JSON.stringify({ token: "dummy-token", expiry }));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{display: "flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <form onSubmit={handleLogin}>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
