// import "regenerator-runtime/runtime";
// import React from "react";

// import "./global.css";

// import DashboardLayout from "./Layouts/DashboardLayout";
// import { Routes, Route } from "react-router-dom";
// import WalletDetails from "./views/Wallet";
// import Governance from "./views/Governance";
// import Dashboard from "./views/Dashboard";

// export default function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<DashboardLayout />}>
//           <Route path="wallet">
//             <Route index element={<WalletDetails />}></Route>
//           </Route>

//           <Route path="governance">
//             <Route index element={<Governance />}></Route>
//           </Route>

//           <Route path="dashboard">
//             <Route index element={<Dashboard />}></Route>
//           </Route>
//         </Route>
//       </Routes>
//     </>
//   );
// }

// // {/* <Wallet /> */}
// // <DashboardLayout />
// // <SideBar />

import "regenerator-runtime/runtime";
import React, { useState, useEffect, useCallback } from "react";
import NearWalletSelector from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import PropTypes from "prop-types";
import "materialize-css/dist/css/materialize.css";
import { providers, utils } from "near-api-js";
import { Button } from "react-materialize";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import WalletDetails from "./views/Wallet";
import Governance from "./views/Governance";
import Dashboard from "./views/Dashboard";
import DashboardLayout from "./Layouts/DashboardLayout";

const App = ({ nearConfig }) => {
  const [selector, setSelector] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const syncAccountState = (currentAccountId, newAccounts) => {
    if (!newAccounts.length) {
      localStorage.removeItem("accountId");
      setAccountId(null);
      setAccounts([]);

      return;
    }

    const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId
      ? currentAccountId
      : newAccounts[0].accountId;

    localStorage.setItem("accountId", newAccountId);
    setAccountId(newAccountId);
    setAccounts(newAccounts);
  };

  useEffect(() => {
    NearWalletSelector.init({
      network: nearConfig.networkId,
      contractId: nearConfig.contractName,
      wallets: [setupNearWallet(), setupSender()],
    })
      .then((instance) => {
        return instance.getAccounts().then(async (newAccounts) => {
          syncAccountState(localStorage.getItem("accountId"), newAccounts);
          setSelector(instance);
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
  }, []);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.on("accountsChanged", (e) => {
      syncAccountState(accountId, e.accounts);
    });

    return () => subscription.remove();
  }, [selector, accountId]);

  const handleSignIn = () => {
    selector.show();
  };

  const handleSignOut = () => {
    selector.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchProvider = () => {
    selector.show();
  };

  const handleSwitchAccount = () => {
    const currentIndex = accounts.findIndex((x) => x.accountId === accountId);
    const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0;

    const nextAccountId = accounts[nextIndex].accountId;

    setAccountId(nextAccountId);
    alert("Switched account to " + nextAccountId);
  };

  // if wallet connected and account selected return routes for dashboard else return routes for login
  const routes = accountId ? (
    <Routes>
      <Route path="/" element={<DashboardLayout/>}>
        <Route path="wallet">
          <Route index element={<WalletDetails />}></Route>
        </Route>

        <Route path="governance">
          <Route index element={<Governance />}></Route>
        </Route>

        <Route path="dashboard">
          <Route index element={<Dashboard />}></Route>
        </Route>
      </Route>
    </Routes>
  ) : (
    <>
      <h1>login</h1>
    </>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Near Wallet Selector</h1>
          {accountId && (
            <div>
              <Button
                className="btn-small"
                onClick={handleSwitchAccount}
                disabled={accounts.length === 1}
              >
                Switch Account
              </Button>
              <Button className="btn-small" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          )}
          {!accountId && (
            <div>
              <Button className="btn-small" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button className="btn-small" onClick={handleSwitchProvider}>
                Switch Provider
              </Button>
            </div>
          )}
        </header>
        {routes}
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
