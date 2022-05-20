import "regenerator-runtime/runtime";
import React from "react";

import "./global.css";

import DashboardLayout from "./Layouts/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import WalletDetails from "./views/Wallet";
import Governance from "./views/Governance";
import Dashboard from "./views/Dashboard";
import GovernanceCommunity from "./views/Community";

export default function App() {
  return (
    <>
      <Routes>
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
          <Route path="community-governance">
            <Route index element={<GovernanceCommunity />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

// {/* <Wallet /> */}
// <DashboardLayout />
// <SideBar />
