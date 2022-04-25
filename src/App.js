import "regenerator-runtime/runtime";
import React from "react";

import "./global.css";

import Wallet from "./Components/WalletConnect/wallet";
import DashboardLayout from "./Layouts/DashboardLayout";
import SideBar from "./Layouts/dashboardRouter";
import { Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <>
      <Routes>
     
        <Route path="/" element={<DashboardLayout />} />
       
      </Routes>
    </>
  );
}


  // {/* <Wallet /> */}
  // <DashboardLayout />
  // <SideBar />