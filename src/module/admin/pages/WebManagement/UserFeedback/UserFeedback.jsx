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
} from "./UserFeedback.styles";
import Pagination from "../../../component/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUserFeedback, approveFeedback } from "../../../../../api/feedbackApi";
import { getCookiesData } from "../../../../../utils/cookiesService";
import { getAllCourses } from "../../../../../api/courseApi";
import { Select } from 'antd';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "../../../../../utils/authService";

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
        setCourses(response.data); // ⬅️ Correctly set the array of courses 
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
          My Feedback{" "}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
            ({currentPageData.length}/{totalItems})
          </span>
        </Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <Select
            allowClear
            value={sortOption}
            style={{ width: 200 }}
            onChange={(value) => {
              setSortOption(value);
              setCurrentPage(1); // reset to first page on change
            }}
            placeholder="Select course"
            options={[
              { label: "All Courses", value: null }, // ⬅️ Default option
              ...courses.map(course => ({
                label: course.courseName,
                value: course._id
              }))
            ]}
          />


        </SortByContainer>
      </HeaderRow>

      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
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
                <Td colSpan={6} style={{ textAlign: "center" }}>
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