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
} from "./UserFeedback.styles";
import Pagination from "../../../component/Pagination/Pagination";

const FeedbackData = [
  {
    _id: "1",
    name: "User 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...",
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

const UserFeedback = () => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = feedback.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = feedback.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Container>
      <Title>User Feedback</Title>

      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
              <Th>Name</Th>
              <Th>Description</Th>
            </tr>
          </TableHead>
          <tbody>
            {currentPageData.map((item) => (
              <tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}</Td>
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
    </Container>
  );
};

export default UserFeedback;
