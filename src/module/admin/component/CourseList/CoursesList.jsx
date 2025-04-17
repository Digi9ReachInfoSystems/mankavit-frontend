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
  { label: 'All Courses', component: <AllCourses /> },
  { label: 'All Students', component: <AllStudents /> },
  { label: 'All Subjects', component: <AllSubjects /> },
  { label: 'All Notes', component: <Allnotes /> }, // Placeholder for now
  { label: 'All Test', component: <AllTests /> }, // Placeholder for now
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
        <Title>Courses List <span className='number'>(1424)</span></Title>
        <DivRight>
          <Sort>Sort by:</Sort>
          <Name>Name <IoIosArrowDown size={16} /></Name>
          <Seen>See All</Seen>
        </DivRight>
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
