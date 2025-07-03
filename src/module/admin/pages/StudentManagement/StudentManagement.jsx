import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
  SortSelect,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ActionsContainer,
  ButtonContainer,
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  StatusWrapper,
  KycDot,
  ModalOverlay,
  ModalContent,
  CourseList,
  CourseItem,
  CloseButton,
  CloseButtonContainer,
  PaymentStatus,
  PaymentDetailsList,
  PaymentDetailItem,
   ActivityDot,
  ActivityWrapper
} from "../StudentManagement/StudentManagement.style";

import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import Pagination from "../../component/Pagination/Pagination";
import { getAllStudents } from "../../../../api/userApi";
import { getAllCourses } from "../../../../api/courseApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt", // default sort by creation time
    direction: "descending", // newest first
  });

  const [modalCourses, setModalCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const ts = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) {
      return parseInt(item._id.substring(0, 8), 16) * 1000;
    }
    return 0;
  };

  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 1) Fetch all students + courses on mount
  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          getAllStudents(), // returns { data: { students: [...] } }
          getAllCourses(),  // returns { data: [ { _id, course_name, … }, … ] }
        ]);

        console.log("studentResponse", studentResponse);
        const students = studentResponse.data?.students || [];
        setData(students.sort((a, b) => ts(b) - ts(a)));
        
        const courseMap = {};
        (courseResponse.data || []).forEach((course) => {
          courseMap[course._id] = course.courseName; // Changed from course_name to courseName to match your data
        });
        setCoursesMap(courseMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
        toast.error("Failed to load data. Please try again.");
      }
    };
    fetchStudentsAndCourses();
  }, []);

  // Sorting logic
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];

    if (sortConfig) {
      sortableItems.sort((a, b) => {
        // Handle time-based sort
        if (sortConfig.key === "createdAt" || sortConfig.key === "signedUpAt") {
          const timeA = new Date(a[sortConfig.key] || 0).getTime();
          const timeB = new Date(b[sortConfig.key] || 0).getTime();
          return sortConfig.direction === "ascending"
            ? timeA - timeB
            : timeB - timeA;
        }

        // Handle text-based sorting
        const aValue = (a[sortConfig.key] || "").toString();
        const bValue = (b[sortConfig.key] || "").toString();
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return sortableItems;
  }, [data, sortConfig]);

  // Filtering by "displayName"
  const filteredStudents = sortedData.filter((student) =>
    (student.displayName || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredStudents.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleViewCourses = (subscriptions) => {
    const courses = subscriptions.map(sub => ({
      courseName: sub.course_enrolled?.courseName || coursesMap[sub.course_enrolled?._id] || "Unknown Course",
      enrolledDate: formatDate(sub.created_at)
    }));
    setCoursesList(courses);
    setCoursesModalOpen(true);
  };

  const handleViewPaymentDetails = (subscription) => {
    if (subscription && subscription.length > 0) {
      setPaymentDetails({
        status: subscription[0].payment_Status,
        razorpay_payment_id: subscription[0].payment_id?.razorpay_payment_id || "N/A",
        razorpay_order_id: subscription[0].payment_id?.razorpay_order_id || "N/A",
        amountPaid: subscription[0].payment_id?.amountPaid || "N/A",
        paymentType: subscription[0].payment_id?.paymentType || "N/A",
        transactionId: subscription[0].payment_id?.transactionId || "N/A",
        paymentDate: formatDate(subscription[0].payment_id?.createdAt)
      });
      setPaymentModalOpen(true);
    }
  };

  // "Delete student" stubs
  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    try {
      setData(data.filter((s) => s._id !== selectedStudent));
      setDeleteModalOpen(false);
      toast.success("Data deleted successfully.");
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast.error("Failed to delete data. Please try again.");
    }
  };

  // "View student details" stub
  const handleViewClick = (student) => {
    navigate(`/admin/student-management/view/${student._id}`, {
      state: { student },
    });
  };

    const renderActivityStatus = (isActive) => {
    const statusColor = isActive ? '#4CAF50' : '#F44336';
    return (
      <ActivityWrapper color={statusColor}>
        <ActivityDot color={statusColor} />
        {isActive ? "Active" : "Inactive"}
      </ActivityWrapper>
    );
  };


  return (
    <>
      <ButtonContainer>
        <CreateButton
          onClick={() => navigate("/admin/student-management/create")}
        >
          Add Student
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Students{" "}
            <span
              style={{
                color: "#6d6e75",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortConfig.key} onChange={(e) => requestSort(e.target.value)}>
              <option value="signedUpAt">Latest</option>
              <option value="displayName">Name</option>
              <option value="kyc_status">KYC Status</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader
                  onClick={() => requestSort("displayName")}
                  style={{ cursor: "pointer" }}
                >
                  Student name{" "}
                  {sortConfig.key === "displayName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHeader>
 
                <TableHeader>Contact details</TableHeader>
                <TableHeader>Course enrolled</TableHeader>
                <TableHeader>Payment Status</TableHeader>
                <TableHeader
                  onClick={() => requestSort("kyc_status")}
                  style={{ cursor: "pointer" }}
                >
                  KYC Status{" "}
                  {sortConfig.key === "kyc_status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHeader>
                <TableHeader
                  onClick={() => requestSort("signedUpAt")}
                  style={{ cursor: "pointer" }}
                >
                  Signed up date{" "}
                  {sortConfig.key === "signedUpAt" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHeader>

                <TableHeader>Activity Status</TableHeader> {/* New column */}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentItems.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{startIndex + idx + 1}</TableCell>

                  <TableCell
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => navigate(`/admin/student-management/edit/${item._id}`)}
                  >
                    {item.displayName || "N/A"}
                  </TableCell>

 
                  <TableCell>
                    {item.phone}
                    <br />
                    {item.email.length > 23 ? item.email.substring(0, 20) + "..." : item.email}
                  </TableCell>
                  <TableCell>
                    {(item.subscription?.length || 0)}{" "}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewCourses(item.subscription || []);
                      }}
                      style={{
                        color: "#007bff",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      View
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.subscription?.length > 0 ? (
                      <PaymentStatus 
                        status={item.subscription[0].payment_Status}
                        onClick={() => handleViewPaymentDetails(item.subscription)}
                      >
                        {item.subscription[0].payment_Status}
                      </PaymentStatus>
                    ) : "N/A"}
                  </TableCell>
                  <TableCell>
                    <StatusWrapper
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/admin/student-management/update-kyc/${item._id}`
                        )
                      }
                    >
                      <KycDot status={item.kyc_status} />
                      {item.kyc_status}
                    </StatusWrapper>
                  </TableCell>
                  <TableCell>
                    {formatDate(item.signedUpAt)}
                  </TableCell>
                  <TableCell>
                  {renderActivityStatus(item.isActive || false)}
                </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {deleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
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

      {coursesModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ margin: "0rem", backgroundColor: "#f1f1f1", padding: "1rem" }}>Enrolled Courses</h2>
            {coursesList.length === 0 ? (
              <p>No courses enrolled.</p>
            ) : (
              <CourseList>
                {coursesList.map((course, index) => (
                  <CourseItem key={index}>
                    <div>
                      <strong>{course.courseName}</strong>
                      <div>Enrolled Date: {course.enrolledDate}</div>
                    </div>
                  </CourseItem>
                ))}
              </CourseList>
            )}
            <CloseButtonContainer>
              <CloseButton onClick={() => setCoursesModalOpen(false)}>Close</CloseButton>
            </CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {paymentModalOpen && paymentDetails && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ margin: "0rem", backgroundColor: "#f1f1f1", padding: "1rem" }}>Payment Details</h2>
            <PaymentDetailsList>
              <PaymentDetailItem>
                <strong>Status:</strong> <PaymentStatus status={paymentDetails.status}>{paymentDetails.status}</PaymentStatus>
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Razorpay Payment ID:</strong> {paymentDetails.razorpay_payment_id}
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Razorpay Order ID:</strong> {paymentDetails.razorpay_order_id}
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Amount Paid:</strong> {paymentDetails.amountPaid}
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Payment Type:</strong> {paymentDetails.paymentType}
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Transaction ID:</strong> {paymentDetails.transactionId}
              </PaymentDetailItem>
              <PaymentDetailItem>
                <strong>Payment Date:</strong> {paymentDetails.paymentDate}
              </PaymentDetailItem>
            </PaymentDetailsList>
            <CloseButtonContainer>
              <CloseButton onClick={() => setPaymentModalOpen(false)}>Close</CloseButton>
            </CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}