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
  const data = Array(5).fill(null).map((_, index) => (  {
    id: 1,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  }));

  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
            <TableHeader>Note Title</TableHeader>
            <TableHeader>Note Description</TableHeader>
            <TableHeader>No. of Subjects</TableHeader>
            <TableHeader>	Last Active</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.noteTitle}</TableCell>
              <TableCell>{row.noteDescription}</TableCell>
              <TableCell>{row.subjectsCount}</TableCell>
              <TableCell>{row.lastActive}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Allnotes;
