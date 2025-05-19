import React, { useState } from "react";
import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableHead,
  Th,
  Td,
  BtnAchieve,
  AddButton,
  ImageModalOverlay,
  ImageModalContent,
  ModalImage,
  CloseButton,
} from "./WhyStudyWithUs.styles";
import { IoEyeOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";

const WhyStudy = [
  {
    id: 1,
    title: "Why Study With Us",
    description: "This is a description of why study with us.",
    image:
      "https://softspacesolutions.com/wp-content/uploads/2024/10/mern-stack-developer-interview-questions-1024x576.webp",
  },
  {
    id: 2,
    title: "Why Study With Us",
    description: "This is a description of why study with us.",
    image:
      "https://softspacesolutions.com/wp-content/uploads/2024/10/mern-stack-developer-interview-questions-1024x576.webp",
  },
  {
    id: 3,
    title: "Why Study With Us",
    description: "This is a description of why study with us.",
    image:
      "https://softspacesolutions.com/wp-content/uploads/2024/10/mern-stack-developer-interview-questions-1024x576.webp",
  },
];

const ITEMS_PER_PAGE = 8;

const WhyStudyWithUs = () => {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [whyStudy, setWhyStudy] = useState(WhyStudy);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleViewClick = (id) => {
    navigate(`/admin/web-management/why-study-with-us/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/web-management/why-study-with-us/edit/${id}`);
  };

  const handleDeleteConfirm = (id) => {
    setWhyStudy((prev) => prev.filter((item) => item.id !== id));
    setDeleteModalOpen(false);
  };

  const totalItems = whyStudy.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = whyStudy.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <BtnAchieve>
        <AddButton onClick={() => navigate("/admin/web-management/why-study-with-us/create")}>Add</AddButton>
      </BtnAchieve>

      <Container>
        <Title>Why Study With Us</Title>

        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Actions</Th>
              </tr>
            </TableHead>
            <tbody>
              {currentPageData.map((item) => (
                <tr key={item.id}>
                  <Td>{item.title}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewImage(item.image);
                      }}
                    >
                      View Image
                    </a>
                  </Td>
                  <Td>
                    <IoEyeOutline
                      title="View"
                      size={20}
                      color="#000"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleViewClick(item.id)}
                    />
                    <BiEditAlt
                      size={20}
                      color="#000"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(item.id)}
                    />
                    <RiDeleteBin6Line
                      size={20}
                      color="#FB4F4F"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(item.id)}
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

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDeleteConfirm(selectedId)}
      />

      {modal && selectedImage && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModal(false)}>X</CloseButton>
            <ModalImage src={selectedImage} alt="Selected" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </>
  );
};

export default WhyStudyWithUs;
