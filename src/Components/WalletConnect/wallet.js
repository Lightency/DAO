import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "../../utils";

export default function Wallet() {
  React.useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // window.contract is set by initContract in index.js
      console.log("window.contract", window.contract);
    }
  }, []);

  if (window.walletConnection.isSignedIn()) {
    //return logout button
    return (
      <button className="link" style={{ float: "right" }} onClick={logout}>
        Sign out
      </button>
    );
  }
  return (
    <button className="link" style={{ float: "right" }} onClick={login}>
      Sign in
    </button>
  );
}
