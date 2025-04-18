import React from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './Allnotes.styles';

const Allnotes = () => {
  const data = Array(5).fill(null).map((_, index) => ({
    key: index,
    courseName: 'CLAT Coaching',
    internalName: 'Anuja Admin',
    subjects: 27,
    mockTests: 12,
    studentsEnrolled: 12,
    price: '₹599.00',
  }));

  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
            <TableHeader>Course Name</TableHeader>
            <TableHeader>Internal Name</TableHeader>
            <TableHeader>No. of Subjects</TableHeader>
            <TableHeader>No. of Mock Test</TableHeader>
            <TableHeader>No. of Student Enrolled</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.internalName}</TableCell>
              <TableCell>{row.subjects}</TableCell>
              <TableCell>{row.mockTests}</TableCell>
              <TableCell>{row.studentsEnrolled}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Allnotes;
