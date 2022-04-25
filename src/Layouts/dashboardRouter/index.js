import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./SideBar";

const Overlay = styled.div`
  display: none;
  z-index: 9;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  &.open {
    @media screen and (min-width: 700px) {
      display: none;
    }
    display: block;
    height: 100vh;
    width: 100vw;
    position: fixed;
    overflow: hidden;
  }
`;
const MainLayout = styled.div`
  display: flex;
  background-color: #f3f3f3;
`;

const DashboardContainer = styled.div`
  padding: 0px;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

function DashboardRouter() {
  return (
    <MainLayout>
      <Sidebar />
      <DashboardContainer>
        <Outlet />
      </DashboardContainer> 
    </MainLayout>
  );
}

export default DashboardRouter;
