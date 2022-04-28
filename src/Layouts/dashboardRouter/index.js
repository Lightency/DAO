import * as React from "react";
import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./SideBar";

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
