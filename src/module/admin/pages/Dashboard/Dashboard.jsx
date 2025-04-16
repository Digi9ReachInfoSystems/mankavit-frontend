import React from "react";
import {
  DashboardWrapper,
  DashboardContent,
  Application
//   DashboardTitle
} from "./Dashboard.style";
import Stats from "../../component/Stats/Stats";
import ApplicationsGraph from "../../component/ApplicationGraph/ApplicationGraph";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardContent>
        {/* <DashboardTitle>Dashboard Overview</DashboardTitle> */}
        <Stats />

      </DashboardContent>
      <Application> 
        <ApplicationsGraph />
      </Application>
    </DashboardWrapper>
  );
};

export default Dashboard;
