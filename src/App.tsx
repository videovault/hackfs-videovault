import React from "react";
import ReactDOM from "react-dom";
import Box from "3box";
import { Libp2pCryptoIdentity } from "@textile/threads-core";

const SPACE = "hackfs-videovault-space";

async function getIdentity() {
  console.log("Get Identity");
  const box = await Box.create((window as any).ethereum);
  const [address] = await (window as any).ethereum.enable();
  console.log(address);
  await box.auth([], { address });
  const space = await box.openSpace(SPACE);
  await box.syncDone;
  console.log(space);

  try {
    // We'll try to restore the private key if it's available
    var storedIdent = await space.private.get("identity");
    console.log(storedIdent);
    if (storedIdent === null) {
      throw new Error("No identity");
    }
    const identity = await Libp2pCryptoIdentity.fromString(storedIdent);
    console.log(identity);
    return identity;
  } catch (e) {
    const identity = await Libp2pCryptoIdentity.fromRandom();
    const identityString = identity.toString();
    await space.private.set("identity", identityString);
    console.log(identity);
    return identity;
  }
}

const App = <button onClick={getIdentity}>Get Identity</button>;

ReactDOM.render(App, document.getElementById("root"));
