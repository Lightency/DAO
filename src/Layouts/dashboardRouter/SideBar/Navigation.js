import * as React from "react";

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faMoneyBill,
  faWallet,
  faUsers,
  faRightLeft,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.module.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        {/* <li>
          <NavLink to="/dashboard">
            <FontAwesomeIcon icon={faGauge} />
            <span>Dashboard</span>
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/wallet">
            <FontAwesomeIcon icon={faWallet} />
            <span>Wallet</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Governance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/community-governance">
            <FontAwesomeIcon icon={faUsers} />
            <span>Community</span>
          </NavLink>
        </li>

        <li>
          <a href="https://testnet.ref.finance/">
            <FontAwesomeIcon icon={faRightLeft} />
            <span>Swap Token</span>
          </a>
        </li>

        <li>
          <a href="https://testnet.ref.finance/pool/630">
            <FontAwesomeIcon icon={faFire} />
            <span>Light Pool</span>
          </a>
        </li>

        <li>
          <NavLink to="/lockups">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>lockups</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
