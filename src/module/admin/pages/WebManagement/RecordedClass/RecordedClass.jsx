import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  HeaderRow,
  Title,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ViewLink,
  CreateButton,
  ButtonContainer
} from "../RecordedClass/RecordedClass.style";

// sample data — replace with real fetch
const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    coursesEnrolled: 7,
    bannerUrl: "/path/to/banner1.jpg",
    schedule: "2024-07-24T10:30:00Z"
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    coursesEnrolled: 7,
    bannerUrl: "/path/to/banner2.jpg",
    schedule: "2024-07-24T10:30:00Z"
  },
  // …more rows
];

const RecordedClass = ({ data = sampleData }) => {
  // format ISO → IST dd-mm-yyyy HH:MM
  const formatIST = iso => {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" });
    const time = d.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit"
    });
    return `${date} ${time}`;
  };

  return (
      <>
          <ButtonContainer>
            <Link to="/admin/web-management/recorded-classes/create">
              <CreateButton>Uplaod recorded class</CreateButton>
            </Link>
          </ButtonContainer>
    <Container>
      <HeaderRow>
        <Title>Live Class</Title>
      </HeaderRow>
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Courses Enrolled</TableHeader>
              <TableHeader>Uploaded Time</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  {row.coursesEnrolled}{" "}
                  <ViewLink href={`#view/${row.id}`}>View</ViewLink>
                </TableCell>
                <TableCell>{formatIST(row.schedule)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>
    </Container>
    </>
  );
};

export default RecordedClass;
