
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Box from "3box";
import ProfileControl from "./ProfileControl";

export type Profile = {
  publicName: string;
};

function App() {
  const [box, setBox] = useState<Box.Box | null>(null);
  useEffect(() => {
    (async () => {
      const box = await Box.create((window as any).ethereum);
      await box.syncDone;
      console.log(box);
      setBox(box);
    })();
  }, []);
  return box == null ? <p>Loading...</p> : <ProfileControl box={box} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
