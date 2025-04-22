import React from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllStudents.styles';

const AllStudents = () => {
  const data = Array(5).fill(null).map((_, index) => (  {
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  }));

  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
            <TableHeader>Student Name</TableHeader>
            <TableHeader>Contact Details</TableHeader>
            <TableHeader>Subject Enrolled</TableHeader>
            <TableHeader>Last Active</TableHeader>
            <TableHeader>KYC Status</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.subjectsEnrolled}</TableCell>
              <TableCell>{row.lastActive}</TableCell>
              <TableCell>{row.kycStatus}</TableCell>
              <TableCell>{row.status}</TableCell>
              
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllStudents;
