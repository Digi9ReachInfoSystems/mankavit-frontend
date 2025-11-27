// src/pages/Admin/WebManagement/Blog/ContactSupport.jsx
import React, { useEffect, useState } from "react";
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
  ApproveButton,
  CloseButton,
  StatusBadge,
  HeaderRow,
  SortByContainer,
  SortLabel,
  AddButton, // You might need to add this to your styles
} from "./UserFeedback.styles";
import Pagination from "../../../component/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUserFeedback, approveFeedback, bulkFeedbackDeletion } from "../../../../../api/feedbackApi";
import { getCookiesData } from "../../../../../utils/cookiesService";
import { getAllCourses } from "../../../../../api/courseApi";
import { Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "../../../../../utils/authService";
import DeleteModal from "../../../component/DeleteModal/DeleteModal"; // Import DeleteModal

const ITEMS_PER_PAGE = 10;

const UserFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  // Bulk delete states (same as Achievements component)
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

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
    const fetchUserFeedback = async () => {
      setLoading(true);
      try {
        const { userId } = getCookiesData();
        if (!userId) throw new Error("User not authenticated");

        const list = await getUserFeedback(userId);
        setFeedback(list);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        toast.error("Failed to load feedbacks. Please try again.");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFeedback();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        toast.error("Failed to load courses. Please try again.");
      }
    };

    fetchCourses();
  }, []);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    try {
      if(readOnlyPermissions){
        toast.error("You don't have permission to approve feedback.");
        return;
      }
      const response = await approveFeedback(selectedFeedback._id);

      // Update the feedback list
      const updatedFeedback = feedback.map(item =>
        item._id === selectedFeedback._id ? { ...item, isappproved: true } : item
      );

      setFeedback(updatedFeedback);
      setIsModalOpen(false);
      toast.success("Feedback approved successfully!");

    } catch (error) {
      console.error('Error approving feedback:', error);
      let errorMessage = error.message;

      // If it's a 404 error, provide more specific message
      if (error.response && error.response.status === 404) {
        errorMessage = "Approval endpoint not found. Please check backend configuration.";
      }

      setError(errorMessage);
      toast.error("Failed to approve feedback. Please try again.");
    }
  };

  // Bulk selection logic (same as Achievements)
  const handleCheckboxChange = (feedbackId) => {
    setSelectedFeedbacks((prev) =>
      prev.includes(feedbackId)
        ? prev.filter((id) => id !== feedbackId)
        : [...prev, feedbackId]
    );
  };

 const handleSelectAllChange = () => {
  // compute the current page's items robustly
  const filtered = sortOption
    ? feedback.filter(item => item.courseRef?._id === sortOption)
    : feedback;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageData = filtered.slice(start, start + ITEMS_PER_PAGE);
  const pageIds = pageData.map(a => a._id);

  if (selectAll) {
    // unselect all from this page
    setSelectedFeedbacks(prev => prev.filter(id => !pageIds.includes(id)));
  } else {
    // select all on this page, merging with existing (avoid duplicates)
    setSelectedFeedbacks(prev => Array.from(new Set([...prev, ...pageIds])));
  }
  setSelectAll(!selectAll);
};


  // If page changes, reset the selectAll checkbox state based on page selection
  useEffect(() => {
    const pageIds = currentPageData.map((a) => a._id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedFeedbacks.includes(id));
    setSelectAll(allSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, feedback, selectedFeedbacks.length]);

  const openBulkDeleteModal = () => setBulkDeleteOpen(true);

const handleBulkDelete = async () => {
  try {
    setBulkLoading(true);

    // Validate selection
    if (selectedFeedbacks.length === 0) {
      toast.error("No feedbacks selected for deletion");
      setBulkLoading(false);
      return;
    }

    console.log("Attempting to delete:", selectedFeedbacks);

    const result = await bulkFeedbackDeletion(selectedFeedbacks);

    // Update UI only after successful deletion
    setFeedback((prev) => prev.filter((a) => !selectedFeedbacks.includes(a._id)));

    toast.success(
      result?.message || `Successfully deleted ${selectedFeedbacks.length} feedback(s)`,
      { autoClose: 3000 }
    );

    // Reset selection
    setSelectedFeedbacks([]);
    setSelectAll(false);
    setBulkDeleteOpen(false);
  } catch (error) {
    console.error("Bulk delete failed:", error, error?.response?.data);

    // Detailed error messages based on response
    if (error.response?.status === 404) {
      toast.error("Bulk delete endpoint not found. Please contact administrator.");
    } else if (error.response?.status === 500) {
      const serverError = error.response.data?.error ?? JSON.stringify(error.response.data);
      if (serverError?.includes('ObjectId')) {
        toast.error("Invalid feedback ID format. Please refresh the page and try again.");
      } else {
        toast.error("Server error. Please try again or contact support.");
      }
    } else if (error.response?.status === 400) {
      toast.error(error.response.data?.message || "Invalid request format");
    } else {
      toast.error("Failed to delete selected feedbacks. Please try again.");
    }
  } finally {
    setBulkLoading(false);
  }
};


  if (loading) return <div>Loading feedback…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  const filteredFeedback = sortOption
    ? feedback.filter(item => item.courseRef?._id === sortOption)
    : feedback;

  const totalItems = filteredFeedback.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = filteredFeedback.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Container>
      <HeaderRow>
        <Title>
          User Feedback{" "}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: 400 }}>
            ({currentPageData.length}/{totalItems})
          </span>
        </Title>

        {/* Right-side controls (becomes full-width on small screens) */}
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <Select
            allowClear
            value={sortOption}
            onChange={(value) => {
              setSortOption(value);
              setCurrentPage(1);
            }}
            placeholder="Select course"
            options={[
              { label: "All Courses", value: null },
              ...courses.map((course) => ({
                label: course.courseName,
                value: course._id,
              })),
            ]}
          />
        </SortByContainer>
      </HeaderRow>

      {/* Bulk Delete button appears when there is at least one selection */}
      {!readOnlyPermissions && selectedFeedbacks.length > 0 && (
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end",
          marginBottom: 12 
        }}>
          <AddButton
            onClick={openBulkDeleteModal}
            style={{ backgroundColor: "red" }}
          >
            Delete Selected ({selectedFeedbacks.length})
          </AddButton>
        </div>
      )}

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
              <Th>Course Name</Th>
              <Th>User</Th>
              <Th>Rating</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {currentPageData.length > 0 ? (
              currentPageData.map(item => (
                <tr key={item._id}>
                  {!readOnlyPermissions && (
                    <Td>
                      <input
                        type="checkbox"
                        checked={selectedFeedbacks.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </Td>
                  )}
                  <Td>{item.courseRef?.courseName ?? "–"}</Td>
                  <Td>
                    {item.userRef?.name ?? item.userRef?.email ?? "–"}
                  </Td>
                  <Td>{item.rating ?? "–"}</Td>
                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <StatusBadge className={item.isappproved ? 'approved' : 'pending'}>
                      {item.isappproved ? 'Approved' : 'Pending'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <IoEyeOutline
                      title="View"
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewFeedback(item)}
                    />
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan={readOnlyPermissions ? 6 : 7} style={{ textAlign: "center" }}>
                  No feedback found for your account.
                </Td>
              </tr>
            )}
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

      {/* Feedback Modal */}
      {isModalOpen && selectedFeedback && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>Feedback Details</h3>
              <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p><strong>Course:</strong> {selectedFeedback.courseRef?.courseName || "–"}</p>
              <p><strong>User:</strong> {selectedFeedback.userRef?.name || selectedFeedback.userRef?.email || "–"}</p>
              <p><strong>Rating:</strong> {selectedFeedback.rating || "–"}</p>
              <p><strong>Date:</strong> {new Date(selectedFeedback.createdAt).toLocaleDateString()}</p>
              <p><strong>Review:</strong></p>
              <p>{selectedFeedback.review || "No review provided"}</p>
              <p><strong>Status:</strong> {selectedFeedback.isappproved ? "Approved" : "Pending"}</p>
            </ModalBody>
            <ModalFooter>
              {!selectedFeedback.isappproved && (
                <ApproveButton onClick={handleApprove}>
                  Approve
                </ApproveButton>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Bulk Delete Confirmation Modal */}
      <DeleteModal
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onDelete={handleBulkDelete}
        loading={bulkLoading}
      />

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
    </Container>
  );
};

export default UserFeedback;
