import * as React from "react";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faMoneyBill,
  faWallet,
  faBallot,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.module.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/dashboard">
            <FontAwesomeIcon icon={faGauge} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/wallet">
            <FontAwesomeIcon icon={faWallet} />
            <span>Wallet</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/governance">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Governance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/community-governance">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Community</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
