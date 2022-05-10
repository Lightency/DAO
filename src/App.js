import "regenerator-runtime/runtime";
import React from "react";

import "./global.css";

import Wallet from "./Components/WalletConnect/wallet";
import DashboardLayout from "./Layouts/DashboardLayout";
import SideBar from "./Layouts/dashboardRouter";
import { Routes, Route , BrowserRouter} from "react-router-dom";
import WalletDetails from "./views/Wallet";
import Governance from "./views/Governance";
import Dashboard from "./views/Dashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes basename="/app">
        <Route path="/" element={<DashboardLayout />}>
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
      </BrowserRouter>
    </>
  );
}

// {/* <Wallet /> */}
// <DashboardLayout />
// <SideBar />
