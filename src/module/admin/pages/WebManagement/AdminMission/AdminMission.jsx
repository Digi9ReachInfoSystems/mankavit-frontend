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

const ITEMS_PER_PAGE = 10;

const AdminMission = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ Added
  const navigate = useNavigate();

  // Fetch all missions from the API
  const fetchMissions = async () => {
    setLoading(true);
    try {
      const data = await getMissions();
      setMissions(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching missions:", err);
      setError("Failed to load missions. Please try again.");
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

  // Confirm delete: call API then update state
  const handleConfirmDelete = async () => {
    try {
      await deleteMissionById(selectedId);
      setMissions((prev) => prev.filter((item) => item._id !== selectedId));
      setError(null);
    } catch (err) {
      console.error("Error deleting mission:", err);
      setError("Failed to delete mission. Please try again.");
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
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
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
  