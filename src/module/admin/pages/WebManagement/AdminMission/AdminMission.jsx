import React, { useState, useEffect } from "react";
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
} from "./AdminMission.styles";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { getMissions, deleteMissionById } from "../../../../../api/missionApi";
import { IoEyeOutline } from "react-icons/io5";

import { toast, ToastContainer } from "react-toastify";  // <-- import toastify
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

const AdminMission = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
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
  // inside fetchMissions
  const fetchMissions = async () => {
    setLoading(true);
    try {
      const data = await getMissions();          // API returns an array

      // helper: convert MongoDB ObjectId → Date
      const idToDate = (id) =>
        new Date(parseInt(id.substring(0, 8), 16) * 1000);

      // 🔥 sort by createdAt (or updatedAt, or _id timestamp) – latest first
      const sorted = (Array.isArray(data) ? data : []).sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt) || idToDate(a._id);
        const dateB = new Date(b.createdAt || b.updatedAt) || idToDate(b._id);
        return dateB - dateA;                    // descending order
      });

      setMissions(sorted);
      setError(null);
    } catch (err) {
      console.error("Error fetching missions:", err);
      const errMsg = "Failed to load missions. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleAdd = () => {
    navigate("/admin/web-management/mission/create");
  };

  const handleEdit = (id) => {
    navigate(`/admin/web-management/mission/edit/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMissionById(selectedId);
      setMissions((prev) => prev.filter((item) => item._id !== selectedId));
      setError(null);
      toast.success("Data deleted successfully!");  // <-- success toast
    } catch (err) {
      console.error("Error deleting mission:", err);
      const errMsg = "Failed to delete data. Please try again.";
      setError(errMsg);
      toast.error(errMsg);  // <-- error toast
    } finally {
      setDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  // View mission details
  const handleViewClick = (mission) => {
    navigate(`/admin/web-management/mission/view/${mission._id}`, {
      state: { mission },
    });
  };

  // Open image modal
  const handleViewImage = (imageUrl) => {
    if (!imageUrl) {
      toast.warning("No image to display."); // just a precautionary warning toast
      return;
    }
    setSelectedImage(imageUrl);
    setModal(true);
  };

  // Pagination logic
  const totalItems = missions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = missions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
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

      <BtnAchieve>
        <AddButton onClick={handleAdd}>Add Mission</AddButton>
      </BtnAchieve>

      <Container>
        <Title>Missions</Title>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                {currentPageData.length === 0 ? (
                  <tr>
                    <Td colSpan={4} style={{ textAlign: "center" }}>
                      No missions found.
                    </Td>
                  </tr>
                ) : (
                  currentPageData.map((item) => (
                    <tr key={item._id}>
                      <Td>{item.title}</Td>
                      <Td>{item.description}</Td>
                      <Td>
                        {item.image ? (
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
                        ) : (
                          "No Image"
                        )}
                      </Td>
                      <Td>
                        <IoEyeOutline
                          title="View"
                          size={20}
                          color="#000"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleViewClick(item)}
                        />
                        {
                          !readOnlyPermissions && (
                            <>
                              <BiEditAlt
                                size={20}
                                color="#000"
                                style={{ cursor: "pointer", marginRight: "10px" }}
                                onClick={() => handleEdit(item._id)}
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
                  ))
                )}
              </tbody>
            </Table>
          )}
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
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

export default AdminMission;
