import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initContract } from "./utils";
import { BrowserRouter } from "react-router-dom";
import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <WalletSelectorContextProvider>
          <App />
        </WalletSelectorContextProvider>
      </BrowserRouter>,
      document.querySelector("#root")
    );
  })
  .catch(console.error);
