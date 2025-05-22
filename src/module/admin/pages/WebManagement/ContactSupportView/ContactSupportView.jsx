// src/pages/Admin/WebManagement/Blog/ContactSupport.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableHead,
  Th,
  Td,
  ImageModalOverlay,
  ImageModalContent,
  UpdateButton,
  ViewDescription,
  ViewTitle,
  ViewContainer,
  CloseButton,
  Heading,
} from "./ContactSupportView.styles";

import { IoEyeOutline } from "react-icons/io5";
import Pagination from "../../../component/Pagination/Pagination";

const BlogData = [
  {
    _id: "1",
    title: "Blog 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum...",
  },
  {
    _id: "2",
    title: "Blog 2",
    description: "Description 2",
  },
  {
    _id: "3",
    title: "Blog 3",
    description: "Description 3",
  },
  {
    _id: "4",
    title: "Blog 4",
    description: "Description 4",
  },
  {
    _id: "5",
    title: "Blog 5",
    description: "Description 5",
  },
];

const ITEMS_PER_PAGE = 10;

const ContactSupportView = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(BlogData);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const totalItems = blog.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = blog.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleView = (item) => {
    setSelectedBlog(item);
    setModalOpen(true);
  };

  return (
    <>
      <Container>
        <Title>Contact Support</Title>
        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </tr>
            </TableHead>
            <tbody>
              {currentPageData.map((item) => (
                <tr key={item._id}>
                  <Td>{item.title}</Td>
                  <Td>{item.description.slice(0, 50)}...</Td>
                  <Td>
                    <IoEyeOutline
                      size={20}
                      style={{ cursor: "pointer", marginRight: 10 }}
                      onClick={() => handleView(item)}
                    />
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
      </Container>

      {modalOpen && selectedBlog && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpen(false)}> &times;</CloseButton>
            <ViewContainer>
            <Heading>View Contact Support Details </Heading>

              <ViewTitle><strong style={{marginRight: "10px", fontWeight: "600"}}>Title: </strong> {selectedBlog.title}</ViewTitle>
              <ViewDescription><strong style={{marginRight: "10px", fontWeight: "600"}}>Description: </strong>{selectedBlog.description}</ViewDescription>
              <div className="buttons">
              <UpdateButton
                onClick={() =>
                  navigate(`/admin/web-management/blog/edit/${selectedBlog._id}`)
                }
              >
                Update
              </UpdateButton>
              </div>
            </ViewContainer>
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </>
  );
};

export default ContactSupportView;
