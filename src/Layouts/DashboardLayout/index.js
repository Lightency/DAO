import * as React from "react";
import Wallet from "../../Components/WalletConnect/wallet";
import { initContract } from "../../utils";
import SideBar from "../dashboardRouter";
import styled from "styled-components";
import Navbar from "./Navbar";
import { Children } from "react/cjs/react.production.min";

const Content = styled.div`
  padding: 20px;
`;

export default function DashboardLayout(props) {
  return (
    <>
      <div>
        <Navbar />
        <SideBar />
        <Content>{props.children}</Content>
      </div>
    </>
  );
}
