import * as React from "react";
import Styles from "./index.css";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-body">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/wallet">Wallet</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="/stake">Stake</a>
          </li>
          <li>
            <a href="/governance">Governance</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
