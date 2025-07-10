// src/pages/Admin/WebManagement/Blog/ContactSupport.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { getAllSupport, deleteSupportById, updateSupportById } from "../../../../../api/supportApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  StatusBadge,
} from "./ContactSupportView.styles";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

const ContactSupportView = () => {
  const navigate = useNavigate();
  const [supports, setSupports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
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
    const fetchSupports = async () => {
      try {
        const response = await getAllSupport();
        console.log("API Response:", response); // Debug log

        if (Array.isArray(response)) {
          setSupports(response);
          // toast.success("Support tickets loaded successfully");
        } else {
          console.error("Unexpected response format:", response);
          toast.error("Unexpected response format from server");
          setSupports([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supports:", error);
        toast.error("Failed to load support tickets");
        setLoading(false);
      }
    };

    fetchSupports();
  }, []);

  const totalItems = supports.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = supports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleView = (item) => {
    setSelectedSupport(item);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSupportById(selectedId);
      setSupports(supports.filter((support) => support._id !== selectedId));
      toast.success("Support ticket deleted successfully");
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting support:", error);
      toast.error("Failed to delete support ticket");
    }
  };

  const getStatusBadgeColor = (status) => {
    if (!status) return "#9e9e9e";

    switch (status.toLowerCase()) {
      case "open":
        return "#ff9800"; // orange
      case "in progress":
        return "#2196f3"; // blue
      case "closed":
        return "#4caf50"; // green
      default:
        return "#9e9e9e"; // default gray
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  const handleUpdateStatus = async (newStatus) => {
    if (readOnlyPermissions) {
      toast.error("You don't have permission to change status");
      return;
    }
    if (!selectedSupport) return;

    if (selectedSupport.status?.toLowerCase() === newStatus.toLowerCase()) {
      toast.warning(`Support ticket is already marked as ${newStatus}`);
      return;
    }

    setUpdateLoading(true);
    try {
      const updatedData = { status: newStatus };
      const updatedSupport = await updateSupportById(selectedSupport._id, updatedData);

      setSupports((prevSupports) =>
        prevSupports.map((support) =>
          support._id === updatedSupport._id ? updatedSupport : support
        )
      );

      setSelectedSupport(updatedSupport);
      toast.success(`Support ticket marked as ${newStatus}`);
      setModalOpen(false);
      setUpdateLoading(false);
    } catch (error) {
      console.error("Error updating support status:", error);
      toast.error("Failed to update support status");
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Title>Contact Support</Title>
        {supports.length === 0 ? (
          <p>No support tickets found</p>
        ) : (
          <>
            <TableWrapper>
              <Table>
                <TableHead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Message</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </TableHead>
                <tbody>
                  {currentPageData.map((item) => (
                    <tr key={item._id}>
                      <Td>{item.name || "N/A"}</Td>
                      <Td>{item.email || "N/A"}</Td>

                      <Td>{item.description?.slice(0, 50)}...</Td>
                      <Td>
                        <StatusBadge color={getStatusBadgeColor(item.status) }>
                          {item.status || "N/A"}
                        </StatusBadge>
                      </Td>
                      <Td>
                        <IoEyeOutline
                          size={20}
                          style={{ cursor: "pointer", marginRight: 10 }}
                          onClick={() => handleView(item)}
                        />
                        {
                          !readOnlyPermissions && (
                            <IoTrashOutline
                              size={20}
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => handleDeleteClick(item._id)}
                            />
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
          </>
        )}
      </Container>

      {modalOpen && selectedSupport && (
        <ImageModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpen(false)}> &times;</CloseButton>
            <ViewContainer>
              <Heading>View Contact Support Details</Heading>
               <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>Name: </strong>
                {selectedSupport.name || "N/A"}
              </ViewTitle>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>Email: </strong>
                {selectedSupport?.email || "N/A"}
              </ViewTitle>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>Status: </strong>
                <StatusBadge color={getStatusBadgeColor(selectedSupport.status)}>
                  {selectedSupport.status || "N/A"}
                </StatusBadge>
              </ViewTitle>
              <ViewDescription>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>Message: </strong>
                {selectedSupport.description || "N/A"}
              </ViewDescription>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>Created At: </strong>
                {selectedSupport.createdAt
                  ? new Date(selectedSupport.createdAt).toLocaleString()
                  : "N/A"}
              </ViewTitle>

              {/* Buttons to update status */}
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  disabled={updateLoading || selectedSupport.status?.toLowerCase() === "closed"}
                  onClick={() => handleUpdateStatus("closed")}
                  style={{
                    padding: "8px 16px",
                    background: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    opacity:
                      updateLoading || selectedSupport.status?.toLowerCase() === "closed" ? 0.5 : 1,
                  }}
                >
                  Mark as Closed
                </button>
              </div>
            </ViewContainer>
          </ImageModalContent>
        </ImageModalOverlay>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />

      {/* Toast Container must be added once in your app */}
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

export default ContactSupportView;
