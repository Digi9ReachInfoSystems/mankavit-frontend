import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  DivRight,
  Sort,
  Seen,
  Tabs,
  Tab,
  Name
} from './CoursesList.styles';
import { IoIosArrowDown } from 'react-icons/io';
import AllCourses from './AllCourses/Allcourses';  // Import your components
import AllStudents from './AllStudents/AllStudents';
import AllSubjects from './AllSubjects/AllSubjects';
import Allnotes from './Allnotes/Allnotes';
import AllTests from './AllTests/AllTests';

const tabLabels = [
  { label: 'All courses', component: <AllCourses /> },
  { label: 'All students', component: <AllStudents /> },
  { label: 'All subjects', component: <AllSubjects /> },
  { label: 'All notes', component: <Allnotes /> }, // Placeholder for now
  { label: 'All mock tests', component: <AllTests /> }, // Placeholder for now
];

const CoursesList = () => {
  const [activeTab, setActiveTab] = useState(tabLabels[0].label); // Default to "All Courses"

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  // Get the component corresponding to the active tab
  const activeTabComponent = tabLabels.find(tab => tab.label === activeTab).component;

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
        <Title>Courses Lists</Title>
        {/* <DivRight>
          <Sort>Sort by:</Sort>
          <Name>Name <IoIosArrowDown size={16} /></Name>
          <Seen>See All</Seen>
        </DivRight> */}
      </div>

      <Tabs>
        {tabLabels.map(({ label }) => (
          <Tab
            key={label}
            active={label === activeTab}
            onClick={() => handleTabClick(label)}
          >
            {label}
          </Tab>
        ))}
      </Tabs>

      {/* Conditionally render the active tab content */}
      <div>{activeTabComponent}</div>
    </Container>
  );
};

export default CoursesList;
