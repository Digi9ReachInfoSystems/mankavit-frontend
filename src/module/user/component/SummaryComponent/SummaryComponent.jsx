import React from "react";
import {
  Container,
  Title,
  SummaryTable,
  TableWrapper,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ButtonWrapper,
  OkayButton
} from "./SummaryComponent.styles";
import { useNavigate } from "react-router-dom";

const summaryData = [
  {
    section: "ENGLISH LANGUAGE",
    total: 1,
    answered: 0,
    notAnswered: 2,
    marked: 2,
    notVisited: 3,
  },
  {
    section: "GENERAL KNOWLEDGE",
    total: 12,
    answered: 5,
    notAnswered: 3,
    marked: 3,
    notVisited: 12,
  },
  {
    section: "LEGAL REASONING",
    total: 3,
    answered: 12,
    notAnswered: 1,
    marked: 3,
    notVisited: 0,
  },
  {
    section: "LOGICAL REASONING",
    total: 4,
    answered: 33,
    notAnswered: 0,
    marked: 2,
    notVisited: 0,
  },
  {
    section: "QUANTITATIVE TECHNIQUES",
    total: 11,
    answered: 12,
    notAnswered: 0,
    marked: 0,
    notVisited: 0,
  },
  {
    section: "CLAT",
    total: 4,
    answered: 12,
    notAnswered: 3,
    marked: 0,
    notVisited: 0,
  },
];

const SummaryComponent = () => {
  const navigate = useNavigate();

  
  return (
    <Container>
      <Title>Exam Summary</Title>
      <TableWrapper>
      <SummaryTable>
        <TableHead>
          <TableRow>
            <TableHeader>Section Name</TableHeader>
            <TableHeader>No. of Questions</TableHeader>
            <TableHeader>Answered</TableHeader>
            <TableHeader>Not Answered</TableHeader>
            <TableHeader>Marked for Review</TableHeader>
            <TableHeader>Not Visited</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.section}</TableCell>
              <TableCell>{item.total}</TableCell>
              <TableCell>{item.answered}</TableCell>
              <TableCell>{item.notAnswered}</TableCell>
              <TableCell>{item.marked}</TableCell>
              <TableCell>{item.notVisited}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </SummaryTable>
</TableWrapper>

      <ButtonWrapper>
        <OkayButton onClick={() => {navigate("/test-results")}}>Okay</OkayButton>
      </ButtonWrapper>
    </Container>
  );
};

export default SummaryComponent;
