import { useEffect, useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("HEX");
  const [color, setColor] = useState("#000000");
  function handleCreateRandomColor() {
    console.log("Color: "+typeOfColor);
    if (typeOfColor === "HEX") {
      // # 123456 6 digits
      const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
      let hexColor = "#";
      for(let i=0;i<6;i++){
        let rand = Math.floor(Math.random()*16);
        hexColor += hex[rand];
      }
      setColor(hexColor);
    }
    else {
        // rgb ( 10, 0, 23);
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        setColor(`rgb(${r},${g},${b})`);
    }
  }

  useEffect(()=>{
    handleCreateRandomColor();
  }, [typeOfColor])

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      <button onClick={() => setTypeOfColor("HEX")}>Create HEX Color</button>
      <button onClick={() => setTypeOfColor("RGB")}>Create RGB Color</button>
      <button onClick={() => handleCreateRandomColor()}>
        Generate Random Color
      </button>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "60px",
        marginTop: "50px",
        flexDirection: "column"
      }}>
        <h3>{typeOfColor}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
