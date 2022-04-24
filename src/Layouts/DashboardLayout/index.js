import * as React from "react";
import Wallet from "../../Components/WalletConnect/wallet";
import "./index.css";
export default function DashboardLayout() {
  return (
    <>
      <div className="topBar">
        <div className="logo">
          <h3>Lightency</h3>
        </div>
        <Wallet />
      </div>
    </>
  );
}
