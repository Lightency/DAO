import * as React from "react";

import "./sidebar.module.css";

import Navigation from "./Navigation";
// import { ReactComponent as Logo } from 'assets/images/logoWestic.svg'
// import logo from 'assets/images/logoW.svg'

function Sidebar() {
  return (
    <div className="sidebar">
      <Navigation />
    </div>
  );
}

export default Sidebar;
