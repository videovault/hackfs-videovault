import React from "react";
import ReactDOM from "react-dom";
import Box from "3box";

async function getIdentity() {
  console.log("Get Identity");
  const box = await Box.create((window as any).ethereum);
}

const App = <button onClick={getIdentity}>Get Identity</button>;

ReactDOM.render(App, document.getElementById("root"));
