import React from "react";
import {
  DashboardWrapper,
  DashboardContent,
  Application,
  Courses
//   DashboardTitle
} from "./Dashboard.style";
import Stats from "../../component/Stats/Stats";
import ApplicationsGraph from "../../component/ApplicationGraph/ApplicationGraph";
import ApplicationByCourses from "../../component/ApplicationByCourses/ApplicationByCourses";
import CourseList from "../../component/CourseList/CoursesList";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardContent>
        {/* <DashboardTitle>Dashboard Overview</DashboardTitle> */}
        <Stats />

      </DashboardContent>
      {/* <Application> 
        <ApplicationsGraph />
        <ApplicationByCourses />
      </Application>
      <Courses>
        <CourseList />
      </Courses> */}
    </DashboardWrapper>
  );
};

export default Dashboard;
