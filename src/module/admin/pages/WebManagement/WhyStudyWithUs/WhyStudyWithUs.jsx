// src/pages/Admin/WebManagement/WhyStudyWithUs/WhyStudyWithUs.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import Pagination from "../../../component/Pagination/Pagination";

import { getAllWhy, deleteWhyById } from "../../../../../api/whyApi";

// Import react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 8;

const WhyStudyWithUs = () => {
  const navigate = useNavigate();
  const [whyStudy, setWhyStudy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getTimestamp = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) {
      return parseInt(item._id.substring(0, 8), 16) * 1000; // fallback: from MongoDB ObjectId
    }
    return 0;
  };
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWhy();
        const sorted = (response.data ?? response).sort(
          (a, b) => getTimestamp(b) - getTimestamp(a)
        );
        setWhyStudy(sorted);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load data.");
      }
    };
    fetchData();
  }, []);


  const totalItems = whyStudy.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = whyStudy.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteWhyById(selectedId);
      setWhyStudy((prev) => prev.filter((item) => item._id !== selectedId));
      toast.success("Data deleted successfully.");
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast.error("Failed to delete data. Please try again.");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      <BtnAchieve>
        {
          !readOnlyPermissions && (
            <AddButton onClick={() => navigate("/admin/web-management/why-study-with-us/create")}>
              Add
            </AddButton>
          )
        }

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
                <tr key={item._id}>
                  <Td>{item.title}</Td>
                  {/* <Td>{item.description}</Td> */}
                  <Td dangerouslySetInnerHTML={{ __html: item.description }}></Td>
                  <Td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewImage(item.image);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      View Image
                    </a>
                  </Td>
                  <Td>
                    <IoEyeOutline
                      title="View"
                      size={20}
                      style={{ cursor: "pointer", marginRight: 10 }}
                      onClick={() =>
                        navigate(`/admin/web-management/why-study-with-us/view/${item._id}`)
                      }
                    />
                    {
                      !readOnlyPermissions && (
                        <>
                          <BiEditAlt
                            size={20}
                            style={{ cursor: "pointer", marginRight: 10 }}
                            onClick={() =>
                              navigate(`/admin/web-management/why-study-with-us/edit/${item._id}`)
                            }
                          />
                          <RiDeleteBin6Line
                            size={20}
                            color="#FB4F4F"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteClick(item._id)}
                          />
                        </>
                      )
                    }

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
        onDelete={handleDeleteConfirm}
      />

      {modalOpen && selectedImage && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
            <ModalImage src={selectedImage} alt="Selected" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}

      {/* Toast Container for react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default WhyStudyWithUs;
