import React, { useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  ButtonContainer,
  CreateButton,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ViewLink,
  PaginationContainer,
  PageButton
} from "../LiveClass/LiveClass.style";
import { Link } from "react-router-dom";

// sample data – replace with your real fetch
const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    bannerUrl: "/path/to/banner1.jpg",
    schedule: "2024-07-24T10:30:00Z"
  },
  // …add as many items as you like
];

const LiveClass = ({ data = sampleData }) => {
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const pageData = data.slice(start, start + rowsPerPage);

  // helper to format to IST
  const formatIST = (iso) => {
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
        <Link to="/admin/web-management/live-classes/create">
          <CreateButton>Schedule live class</CreateButton>
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
                <TableHeader>View Banner</TableHeader>
                <TableHeader>Schedule IST time</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {pageData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <ViewLink
                    //   href={row.bannerUrl}
                    //   target="_blank"
                      rel="noopener"
                    >
                      View
                    </ViewLink>
                  </TableCell>
                  <TableCell>{formatIST(row.schedule)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <PaginationContainer>
          <PageButton
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </PageButton>

          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}

          <PageButton
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationContainer>
      </Container>
    </>
  );
};

export default LiveClass;
