import "regenerator-runtime/runtime";
import React from "react";

import "./global.css";

import Wallet from "./Components/WalletConnect/wallet";
import DashboardLayout from "./Layouts/DashboardLayout";
import SideBar from "./Layouts/dashboardRouter/sidebar";

export default function App() {
  return (
    <>
      {/* <Wallet /> */}
      <DashboardLayout />
      <SideBar />
    </>
  );
}
