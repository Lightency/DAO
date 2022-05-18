import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { initContract } from "./utils";
import { BrowserRouter } from "react-router-dom";
// import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";
import getConfig from "./config";

async function initContract() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");

  return { nearConfig };
}

// window.nearInitPromise = initContract()
//   .then(() => {
//     ReactDOM.render(
//       <BrowserRouter>
//         <WalletSelectorContextProvider>
//           <App />
//         </WalletSelectorContextProvider>
//       </BrowserRouter>,
//       document.querySelector("#root")
//     );
//   })
//   .catch(console.error);
window.nearInitPromise = initContract().then(
  ({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <App nearConfig={nearConfig} />,
      document.getElementById("root")
    );
  }
);
