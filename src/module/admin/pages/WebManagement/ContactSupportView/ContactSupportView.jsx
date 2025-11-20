// src/pages/Admin/WebManagement/Blog/ContactSupport.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import {
  getAllSupport,
  deleteSupportById,
  updateSupportById,
  bulkcontactdeletion,
} from "../../../../../api/supportApi";
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
  ViewDescription,
  ViewTitle,
  ViewContainer,
  CloseButton,
  Heading,
  StatusBadge,
  AddButton
} from "./ContactSupportView.styles";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

// Fallback: derive created date from Mongo _id if createdAt is missing
const getCreatedAtFromId = (id) => {
  if (!id || id.length < 8) return new Date(0);
  const tsHex = id.substring(0, 8);
  const tsMs = parseInt(tsHex, 16) * 1000;
  const d = new Date(tsMs);
  return isNaN(d.getTime()) ? new Date(0) : d;
};

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

  // Bulk delete state
  const [selectedIds, setSelectedIds] = useState([]); // array of support _id
  const [selectAll, setSelectAll] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const response = await getAllSupport();

        if (Array.isArray(response)) {
          // sort by creation time (latest first). Use createdAt or fallback to _id
          const sorted = response.slice().sort((a, b) => {
            const da = a.createdAt ? new Date(a.createdAt) : getCreatedAtFromId(a._id);
            const db = b.createdAt ? new Date(b.createdAt) : getCreatedAtFromId(b._id);
            return db - da; // DESC
          });

          setSupports(sorted);
        } else {
          toast.error("Unexpected response format from server");
          setSupports([]);
        }
      } catch (error) {
        toast.error("Failed to load support tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchSupports();
  }, []);

  const totalItems = supports.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = supports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Keep select-all in sync when page/selection changes
  useEffect(() => {
    const allSelected =
      currentPageData.length > 0 &&
      currentPageData.every((item) => selectedIds.includes(item._id));
    setSelectAll(allSelected);
  }, [currentPageData, selectedIds]);

  const handleView = (item) => {
    setSelectedSupport(item);
    setModalOpen(true);
  };

  // Single delete
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSupportById(selectedId);
      setSupports((prev) => prev.filter((support) => support._id !== selectedId));
      // also unselect if it was selected
      setSelectedIds((prev) => prev.filter((x) => x !== selectedId));
      toast.success("Support ticket deleted successfully");
      setDeleteModalOpen(false);
    } catch {
      toast.error("Failed to delete support ticket");
    }
  };

  // Bulk selection handlers
  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      // unselect all items on this page
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageData.some((item) => item._id === id))
      );
    } else {
      // select all items on this page (merge)
      setSelectedIds((prev) => {
        const pageIds = currentPageData.map((item) => item._id);
        const add = pageIds.filter((id) => !prev.includes(id));
        return [...prev, ...add];
      });
    }
    setSelectAll(!selectAll);
  };

  const openBulkDelete = () => setBulkModalOpen(true);

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      setBulkModalOpen(false);
      return;
    }
    try {
      setBulkLoading(true);
      await bulkcontactdeletion(selectedIds); // API expects { ids }

      setSupports((prev) => prev.filter((item) => !selectedIds.includes(item._id)));
      setSelectedIds([]);
      setSelectAll(false);
      toast.success("Selected support tickets deleted successfully");
      setBulkModalOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Bulk delete failed:", error);
      toast.error(
        error?.response?.data?.error || "Failed to delete selected support tickets"
      );
    } finally {
      setBulkLoading(false);
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
        return "#9e9e9e";
    }
  };

  if (loading) {
    return <Container>Loading support tickets...</Container>;
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
    } catch {
      toast.error("Failed to update support status");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Title>
          Contact Support{" "}
          <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
            ({currentPageData.length}/{supports.length})
          </span>
        </Title>

        {/* Bulk Delete CTA when there are selections */}
        {!readOnlyPermissions && selectedIds.length > 0 && (
          <div style={{   display: "flex", justifyContent: "flex-end",

            marginBottom: 12  }}>
            <AddButton
              onClick={openBulkDelete}
              style={{
                backgroundColor: "red",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete Selected ({selectedIds.length})
            </AddButton>
          </div>
        )}

        {supports.length === 0 ? (
          <p>No support tickets found</p>
        ) : (
          <>
            <TableWrapper>
              <Table>
                <TableHead>
                  <tr>
                    {!readOnlyPermissions && (
                      <Th style={{ width: 40 }}>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </Th>
                    )}
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
                      {!readOnlyPermissions && (
                        <Td>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item._id)}
                            onChange={() => toggleRow(item._id)}
                          />
                        </Td>
                      )}

                      <Td>{item.name || "N/A"}</Td>
                      <Td>{item.email || "N/A"}</Td>
                      <Td>{item.description?.slice(0, 300)}...</Td>
                      <Td>
                        <StatusBadge color={getStatusBadgeColor(item.status)}>
                          {item.status || "N/A"}
                        </StatusBadge>
                      </Td>
                      <Td>
                        <IoEyeOutline
                          size={20}
                          style={{ cursor: "pointer", marginRight: 10 }}
                          onClick={() => handleView(item)}
                        />
                        {!readOnlyPermissions && (
                          <IoTrashOutline
                            size={20}
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDeleteClick(item._id)}
                          />
                        )}
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
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>
                  Name:{" "}
                </strong>
                {selectedSupport.name || "N/A"}
              </ViewTitle>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>
                  Email:{" "}
                </strong>
                {selectedSupport?.email || "N/A"}
              </ViewTitle>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>
                  Status:{" "}
                </strong>
                <StatusBadge color={getStatusBadgeColor(selectedSupport.status)}>
                  {selectedSupport.status || "N/A"}
                </StatusBadge>
              </ViewTitle>
              <ViewDescription>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>
                  Message:{" "}
                </strong>
                {selectedSupport.description || "N/A"}
              </ViewDescription>
              <ViewTitle>
                <strong style={{ marginRight: "10px", fontWeight: "600" }}>
                  Created At:{" "}
                </strong>
                {selectedSupport.createdAt
                  ? new Date(selectedSupport.createdAt).toLocaleString()
                  : "N/A"}
              </ViewTitle>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  disabled={
                    updateLoading ||
                    selectedSupport.status?.toLowerCase() === "closed"
                  }
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
                      updateLoading ||
                      selectedSupport.status?.toLowerCase() === "closed"
                        ? 0.5
                        : 1,
                  }}
                >
                  Mark as Closed
                </button>
              </div>
            </ViewContainer>
          </ImageModalContent>
        </ImageModalOverlay>
      )}

      {/* Single delete confirmation */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />

      {/* Bulk delete confirmation */}
      <DeleteModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onDelete={handleBulkDelete}
        loading={bulkLoading}
      />

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
