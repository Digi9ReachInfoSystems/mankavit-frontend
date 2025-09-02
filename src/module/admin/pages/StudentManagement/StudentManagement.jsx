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
  ActivityWrapper,
  ButtonContainer,
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "../StudentManagement/StudentManagement.style";

import { CiSearch } from "react-icons/ci";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import { getAllStudents, studentBulkDelete, deleteStudentById, studentByCourse } from "../../../../api/userApi";
import { getAllCourses } from "../../../../api/courseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../config/axiosConfig";
import { getAuth } from "../../../../utils/authService";

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "descending" });

  // Bulk selection state
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  // Single delete state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Modals
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(true);


  // Timestamp helper
  const ts = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) return parseInt(item._id.substring(0, 8), 16) * 1000;
    return 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Fetch data
  const fetchStudentsAndCourses = async (courseId) => {
    setLoading(true);
    try {
      const [coursesRes] = await Promise.all([getAllCourses()]);
      if (courseId !== "all") {
        const response = await studentByCourse(courseId);
        const students = response.data?.students || [];
        setData(students.sort((a, b) => ts(b) - ts(a)));
      } else {
        const studentsRes = await getAllStudents();
        console.log("STudnet response", studentsRes);
        const students = studentsRes.data?.students || [];
        setData(students.sort((a, b) => ts(b) - ts(a)));
      }

      const map = {};
      (coursesRes.data || []).forEach(c => { map[c._id] = c.courseName; });
      setCoursesMap(map);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["studentManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => { fetchStudentsAndCourses(); }, []);
  useEffect(() => { fetchStudentsAndCourses(selectedCourseId); }, [selectedCourseId]);

  // Sorting
  const requestSort = (key) => {
    let dir = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') dir = 'descending';
    setSortConfig({ key, direction: dir });
  };
  const sortedData = React.useMemo(() => {
    const items = [...data];
    if (sortConfig.key) {
      items.sort((a, b) => {
        if (sortConfig.key === 'createdAt' || sortConfig.key === 'signedUpAt') {
          const ta = new Date(a[sortConfig.key] || 0).getTime();
          const tb = new Date(b[sortConfig.key] || 0).getTime();
          return sortConfig.direction === 'ascending' ? ta - tb : tb - ta;
        }
        const av = (a[sortConfig.key] || '').toString();
        const bv = (b[sortConfig.key] || '').toString();
        return sortConfig.direction === 'ascending' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return items;
  }, [data, sortConfig]);

  // Filter & paginate
  const filtered = sortedData.filter(s => (s.displayName || '').toLowerCase().includes(searchText.toLowerCase()));
  const TOTAL_ENTRIES = filtered.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Bulk selection handlers
  const handleCheckboxChange = (id) => setSelectedStudents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const handleSelectAllChange = () => {
    if (selectAll) setSelectedStudents([]);
    else setSelectedStudents(currentItems.map(i => i._id));
    setSelectAll(!selectAll);
  };

  // Bulk delete
  const handleBulkDeleteClick = () => setBulkDeleteModalOpen(true);
  const handleBulkDelete = async () => {
    setLoading(true);
    try {
      await studentBulkDelete(selectedStudents);
      toast.success("Deleted selected students");
      setSelectedStudents([]);
      setSelectAll(false);
      await fetchStudentsAndCourses();
    } catch (err) {
      console.error(err);
      toast.error("Bulk delete failed");
    } finally {
      setBulkDeleteModalOpen(false);
      setLoading(false);
    }
  };

  // Single delete
  const handleDeleteClick = (id) => { setStudentToDelete(id); setDeleteModalOpen(true); };
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteStudentById(studentToDelete);
      toast.success("Deleted student");
      await fetchStudentsAndCourses();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setStudentToDelete(null);
      setLoading(false);
    }
  };

  // View modals
  const handleViewCourses = (subs) => {
    setCoursesList(subs.map(sub => ({
      courseName: sub.course_enrolled?.courseName || coursesMap[sub.course_enrolled?._id] || 'Unknown',
      enrolledDate: formatDate(sub.created_at)
    })));
    setCoursesModalOpen(true);
  };
  const handleViewPaymentDetails = (subs) => {
    if (!subs?.length) return;
    const p = subs[0];
    setPaymentDetails({
      status: p.payment_Status,
      razorpay_payment_id: p.payment_id?.razorpay_payment_id || 'N/A',
      razorpay_order_id: p.payment_id?.razorpay_order_id || 'N/A',
      amountPaid: p.payment_id?.amountPaid || 'N/A',
      paymentType: p.payment_id?.paymentType || 'N/A',
      transactionId: p.payment_id?.transactionId || 'N/A',
      paymentDate: formatDate(p.payment_id?.createdAt)
    });
    setPaymentModalOpen(true);
  };

  const renderActivityStatus = (isActive) => (
    <ActivityWrapper color={isActive ? '#4CAF50' : '#F44336'}>
      <ActivityDot color={isActive ? '#4CAF50' : '#F44336'} /> {isActive ? 'Active' : 'Inactive'}
    </ActivityWrapper>
  );

  return (
    <>
      <ButtonContainer>
        {
          !readOnlyPermissions &&
          <CreateButton onClick={() => navigate("/admin/student-management/create")}>Add Student</CreateButton>
        }
        {selectedStudents.length > 0 && (
          <CreateButton onClick={handleBulkDeleteClick} style={{ marginLeft: 8, backgroundColor: 'red' }}>
            Delete Selected ({selectedStudents.length})
          </CreateButton>
        )}
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>See all students <span>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>

          <SortByContainer >
            <SortByContainer style={{ marginLeft: "1rem" }}>
              <SortLabel>Filter by Course:</SortLabel>
              <SortSelect value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                <option value="all">All</option>
                {Object.entries(coursesMap).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </SortSelect>
            </SortByContainer>

            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortConfig.key} onChange={e => requestSort(e.target.value)}>
              <option value="signedUpAt">Latest</option>
              <option value="displayName">Name</option>
              <option value="kyc_status">KYC Status</option>
            </SortSelect>
          </SortByContainer>



        </HeaderRow>


        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TableWrapper>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    {
                      !readOnlyPermissions && (
                        <TableHeader><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></TableHeader>
                      )
                    }

                    <TableHeader>Student name</TableHeader>
                    <TableHeader>Contact details</TableHeader>
                    <TableHeader>Course enrolled</TableHeader>
                    <TableHeader>Payment status</TableHeader>
                    <TableHeader>KYC status</TableHeader>
                    <TableHeader>Signed up date</TableHeader>
                    <TableHeader>Activity status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((item, idx) => (
                    <TableRow key={item._id}>
                      {
                        !readOnlyPermissions && (
                          <TableCell><input type="checkbox" checked={selectedStudents.includes(item._id)} onChange={() => handleCheckboxChange(item._id)} /></TableCell>
                        )}
                      <TableCell style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => navigate(`/admin/student-management/edit/${item._id}`)}>
                        {item.displayName || 'N/A'}
                      </TableCell>
                      <TableCell>{item.phone}<br />{item.email.length > 23 ? item.email.slice(0, 20) + '...' : item.email}</TableCell>
                      <TableCell>
                        {item.subscription?.length || 0}{' '}
                        {item.subscription?.length > 0 && (<span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => handleViewCourses(item.subscription)}>View</span>)}
                      </TableCell>
                      <TableCell>
                        {item.subscription?.length > 0 ? (
                          <PaymentStatus status={item.subscription[0].payment_Status} onClick={() => handleViewPaymentDetails(item.subscription)}>
                            {item.subscription[0].payment_Status}
                          </PaymentStatus>
                        ) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <StatusWrapper onClick={() => navigate(`/admin/student-management/update-kyc/${item._id}`)}>
                          <KycDot status={item.kyc_status} /> {item.kyc_status}
                        </StatusWrapper>
                      </TableCell>
                      <TableCell>{formatDate(item.signedUpAt)}</TableCell>
                      <TableCell>{renderActivityStatus(item.isActive)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableWrapper>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={TOTAL_ENTRIES} itemsPerPage={ITEMS_PER_PAGE} />
          </>
        )}
      </Container>

      {/* Modals */}
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleConfirmDelete} />
      <DeleteModal isOpen={bulkDeleteModalOpen} onClose={() => setBulkDeleteModalOpen(false)} onDelete={handleBulkDelete} />

      {/* Courses Modal */}
      {coursesModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem' }}>Enrolled Courses</h2>
            {coursesList.length === 0 ? <p>No courses enrolled.</p> : (
              <CourseList>{coursesList.map((c, i) => (<CourseItem key={i}><strong>{c.courseName}</strong><div>Enrolled: {c.enrolledDate}</div></CourseItem>))}</CourseList>
            )}
            <CloseButtonContainer><CloseButton onClick={() => setCoursesModalOpen(false)}>Close</CloseButton></CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Payment Modal */}
      {paymentModalOpen && paymentDetails && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem' }}>Payment Details</h2>
            <PaymentDetailsList>
              <PaymentDetailItem><strong>Status:</strong> <PaymentStatus status={paymentDetails.status}>{paymentDetails.status}</PaymentStatus></PaymentDetailItem>
              <PaymentDetailItem><strong>Payment ID:</strong> {paymentDetails.razorpay_payment_id}</PaymentDetailItem>
              <PaymentDetailItem><strong>Order ID:</strong> {paymentDetails.razorpay_order_id}</PaymentDetailItem>
              <PaymentDetailItem><strong>Amount:</strong> {paymentDetails.amountPaid}</PaymentDetailItem>
              <PaymentDetailItem><strong>Type:</strong> {paymentDetails.paymentType}</PaymentDetailItem>
              <PaymentDetailItem><strong>Txn ID:</strong> {paymentDetails.transactionId}</PaymentDetailItem>
              <PaymentDetailItem><strong>Date:</strong> {paymentDetails.paymentDate}</PaymentDetailItem>
            </PaymentDetailsList>
            <CloseButtonContainer><CloseButton onClick={() => setPaymentModalOpen(false)}>Close</CloseButton></CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
