import * as React from "react";

import SideBar from "../dashboardRouter";
import styled from "styled-components";
import Navbar from "./Navbar";
import Navigation from "../dashboardRouter/SideBar";

const Content = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
`;

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <SideBar />
      <Content>{children}</Content>
    </div>
  );
}
