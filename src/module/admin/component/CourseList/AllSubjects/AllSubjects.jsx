import React from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllSubjects.styles';

const AllSubjects = () => {
  const data = Array(5).fill(null).map((_, index) => (  {
    id: 10,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  }));

  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
              <TableHeader>Subject Name</TableHeader>
              <TableHeader>Internal Name</TableHeader>
              <TableHeader>No. of Mock Test</TableHeader>
              <TableHeader>Active Courses</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.subjectName}</TableCell>
              <TableCell>{row.internalName}</TableCell>
                <TableCell>
                  {row.mockTestCount}
                  <a href="#view">View</a>
                </TableCell>
                <TableCell>
                  {row.activeCoursesCount}
                  <a href="#view">View</a>
                </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllSubjects;
