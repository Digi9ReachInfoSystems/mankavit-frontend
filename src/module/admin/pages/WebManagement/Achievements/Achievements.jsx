import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableHead,
  Th,
  Td,
  ViewLink,
  BtnAchieve,
  AddButton,
  ModalOverlay,
  ModalContent,
  ModalImage,
  CloseIcon
} from "./Achievements.styles";
import { IoEyeOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination"; // This is your component
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// API functions
import { getAllAchievers, deleteAchieverById } from "../../../../../api/achieverApi";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

const Achievements = () => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
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

  // Fetch all achievers
// Fetch all achievers
useEffect(() => {
  const fetchAchievers = async () => {
    try {
      const res = await getAllAchievers();

      // ✅ sort by sequence numerically
      const sorted = (Array.isArray(res) ? res : []).sort((a, b) => {
        const seqA = parseFloat(a.sequence) || 0;
        const seqB = parseFloat(b.sequence) || 0;
        return seqA - seqB; // ascending
      });

      setAchievers(sorted);
    } catch (err) {
      console.error("Error fetching achievers:", err);
      setError("Failed to load achievers");
    } finally {
      setLoading(false);
    }
  };

  fetchAchievers();
}, []);



  const getCreatedAtFromId = (id) => {
    if (!id || id.length < 8) return "Invalid Date";

    const timestampHex = id.substring(0, 8);
    const timestamp = parseInt(timestampHex, 16) * 1000;

    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date;
  };

  const totalPages = Math.ceil(achievers.length / ITEMS_PER_PAGE);
  const paginatedAchievers = achievers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAdd = () => {
    navigate("/admin/web-management/achievement/create");
  };

  const handleEdit = (id) => {
    navigate(`/admin/web-management/achievement/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAchieverById(selectedId);
      setAchievers((prev) => prev.filter((item) => item._id !== selectedId));
      toast.success("Data deleted successfully");
    } catch (err) {
      console.error("Error deleting achiever:", err);
      toast.error("Failed to delete. Please try again");
    } finally {
      setDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleViewClick = (id) => {
    navigate(`/admin/web-management/achievement/view/${id}`);
  };

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {
        !readOnlyPermissions && (
          <BtnAchieve>
            <AddButton onClick={handleAdd}>
              Add Achievement
            </AddButton>
          </BtnAchieve>
        )
      }


      <Container>
        <Title>Achievements</Title>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHead>
                <tr>
                   <Th>Student Name</Th>
                  <Th>Rank</Th>
                  <Th>Exam Name</Th>
                 
                  <Th>Sequence</Th>
                  <Th>Image</Th>
                  <Th>Date Created</Th>
                  <Th>Actions</Th>
                </tr>
              </TableHead>
              <tbody>
                {paginatedAchievers.length === 0 ? (
                  <tr>
                    <Td colSpan="6" style={{ textAlign: "center" }}>
                      No achievements found.
                    </Td>
                  </tr>
                ) : (
                  paginatedAchievers.map((item) => (
                    <tr key={item._id}>
                        <Td>{item.name}</Td>
                      <Td>AIR {item.rank}</Td>
                      <Td>{item.exam_name || "N/A"}</Td>
                    
                      <Td>{item.sequence}</Td>
                      <Td>
                        {item.image ? (
                          <span
                            onClick={() => {
                              setSelectedImage(item.image);
                              setImageModalOpen(true);
                            }}
                            style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }}
                          >
                            View Image
                          </span>
                        ) : (
                          "No Image"
                        )}
                      </Td>


                      <Td>
                        {getCreatedAtFromId(item._id).toLocaleDateString()}{" "}
                        {getCreatedAtFromId(item._id).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Td>
                      <Td>
                        {/* <IoEyeOutline
                          size={20}
                          color="#000000"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleViewClick(item._id)}
                        /> */}
                        {
                          !readOnlyPermissions && (
                            <>
                              <BiEditAlt
                                size={20}
                                color="#000000"
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
          totalItems={achievers.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />

      {imageModalOpen && selectedImage && (
        <ModalOverlay
          onClick={() => {
            setImageModalOpen(false);
            setSelectedImage(null);
          }}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon
              onClick={() => {
                setImageModalOpen(false);
                setSelectedImage(null);
              }}
            >
              &times;
            </CloseIcon>
            <ModalImage src={selectedImage} alt="Achiever" />
          </ModalContent>
        </ModalOverlay>
      )}


    </>
  );
};

export default Achievements;