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
          <NavLink to="/dashboard" activeClassName="active">
            <FontAwesomeIcon icon={faGauge} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/wallet" activeClassName="active">
            <FontAwesomeIcon icon={faWallet} />
            <span>Wallet</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/governance" activeClassName="active">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Governance</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
