// src/pages/Admin/WebManagement/Blog/ContactSupport.jsx

import React, { useState } from "react";
import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableHead,
  Th,
  Td,
    ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CloseButton,
} from "./ViewStudentFeedback.styles";
import Pagination from "../../../component/Pagination/Pagination";

const FeedbackData = [
  {
    _id: "1",
    name: "User 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...",
  },
  {
    _id: "2",
    name: "User 2",
    description: "Feedback from user 2.",
  },
  {
    _id: "3",
    name: "User 3",
    description: "Feedback from user 3.",
  },
  {
    _id: "4",
    name: "User 4",
    description: "Feedback from user 4.",
  },
  {
    _id: "5",
    name: "User 5",
    description: "Feedback from user 5.",
  },
];

const ITEMS_PER_PAGE = 10;

const ViewStudentFeedback = () => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const totalItems = feedback.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = feedback.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleClose = () => setSelectedFeedback(null);

  const handleApprove = () => {
    alert("Feedback approved!");
    handleClose();
  };

  const handleDeny = () => {
    alert("Feedback denied!");
    handleClose();
  };

  return (
    <Container>
      <Title>View Student Feedback</Title>

      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
              <Th>Student Name</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {currentPageData.map((item) => (
              <tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>
                  <a
                    href="#"
                    onClick={() => setSelectedFeedback(item)}
                    style={{ textDecoration: "none", color: "#007BFF", cursor: "pointer" }}
                  >
                    View
                  </a>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      {selectedFeedback && (
        <ModalOverlay onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ModalHeader>Feedback from {selectedFeedback.name}</ModalHeader>
            <ModalBody>{selectedFeedback.description}</ModalBody>
            <ModalFooter>
              <Button onClick={handleApprove} style={{ background: "#4CAF50" }}>Approve</Button>
              <Button onClick={handleDeny} style={{ background: "#f44336" }}>Deny</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ViewStudentFeedback;
