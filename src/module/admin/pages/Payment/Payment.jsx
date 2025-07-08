import React, { useEffect, useState } from "react";
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
  StatusCell,
  StatusWrapper,
  SearchIcon,
  PaymentstatusDot
} from "../Payment/Payment.style";
import Pagination from "../../component/Pagination/Pagination";
import { getAllPayments, getPaymentByCourseId } from "../../../../api/paymentApi";
import styled from "styled-components";
import { SearchWrapper } from "../StudentManagement/StudentManagement.style";
import { CiSearch } from "react-icons/ci";
import { getAllCourses } from "../../../../api/courseApi";
const ITEMS_PER_PAGE = 10;

// Status color mapping
const STATUS_COLORS = {
  success: '#4CAF50',
  created: '#FFC107',
  failed: '#F44336',
  pending: '#2196F3',
  default: '#9E9E9E'
};

// Styled search input
const SearchInput = styled.input`
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export default function Payment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Time");
  const [coursesMap, setCoursesMap] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await getAllPayments();
        // console.log("API Response:", response);
        const coursesRes = await getAllCourses();
        const map = {};
        (coursesRes.data || []).forEach(c => { map[c._id] = c.courseName; });
        setCoursesMap(map);
        if (response && response.success && response.payments) {
          setPayments(response.payments);
          setFilteredPayments(response.payments);
        } else {
          setError("No payment data received from server");
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(err.message || "Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
     const apiCaller = async () => {
       if(selectedCourseId !== "all") {
         const reponse= await getPaymentByCourseId(selectedCourseId);
         setPayments(reponse.payments);
         setFilteredPayments(reponse.payments);
       }else{
         const response = await getAllPayments();
         console.log("API Response:", response);
          setPayments(response.payments);
          setFilteredPayments(response.payments);
       }
     }
     apiCaller();
   }, [selectedCourseId]);


  // Filter and sort data
  useEffect(() => {
    let data = [...payments];

    // Search filter
    if (searchQuery) {
      data = data.filter((item) => {
        const student = getNestedValue(item, 'userRef.displayName').toLowerCase();
        const course = getNestedValue(item, 'courseRef.courseName').toLowerCase();
        return student.includes(searchQuery.toLowerCase()) || course.includes(searchQuery.toLowerCase());
      });
    }

    // Sort
    switch (sortBy) {
      case "Student":
        data.sort((a, b) =>
          getNestedValue(a, 'userRef.displayName').localeCompare(getNestedValue(b, 'userRef.displayName'))
        );
        break;
      case "AmountLow":
        data.sort((a, b) => a.amountPaid - b.amountPaid);
        break;
      case "AmountHigh":
        data.sort((a, b) => b.amountPaid - a.amountPaid);
        break;
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
    }

    setFilteredPayments(data);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [searchQuery, sortBy, payments]);

  const TOTAL_ENTRIES = filteredPayments.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const currentItems = filteredPayments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  const getNestedValue = (obj, path, defaultValue = "N/A") => {
    const keys = path.split(".");
    let result = obj;
    for (const key of keys) {
      if (!result || typeof result !== "object") return defaultValue;
      result = result[key];
    }
    return result ?? defaultValue;
  };

  const getStatusColor = (status) => {
    return STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.default;
  };

  if (loading) return <Container>Loading payments...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (payments.length === 0) return <Container>No payment data available</Container>;

  return (
    <Container>
      {/* Header with Search and Sort */}
      <HeaderRow style={{ justifyContent: "space-between", alignItems: "center" }}>


        <Title>
          All Payments{" "}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
            ({currentItems.length}/{TOTAL_ENTRIES})
          </span>
        </Title>
        <SortByContainer>
          <SortByContainer style={{ marginLeft: "1rem" }}>
            <SortLabel>Filter by Course:</SortLabel>
            <SortSelect value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
              <option value="all">All</option>
              {Object.entries(coursesMap).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </SortSelect>
          </SortByContainer>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Time">Time (Latest)</option>
              <option value="Student">Student Name</option>
              <option value="AmountLow">Amount (Low → High)</option>
              <option value="AmountHigh">Amount (High → Low)</option>
            </SortSelect>
          </SortByContainer>
        </SortByContainer>

      </HeaderRow>
      <SearchWrapper>
        {/* <SearchIcon>
                   <CiSearch size={18} />
                 </SearchIcon> */}
        <SearchInput
          type="text"
          placeholder="Search by student name or course name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "20%" }}
        />
      </SearchWrapper>

      {/* Table */}
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Course Name</TableHeader>
              <TableHeader>Student Name</TableHeader>
              <TableHeader>Payment ID</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Mode</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => {
              const statusColor = getStatusColor(item.status);
              return (
                <TableRow key={item._id}>
                  <TableCell>{getNestedValue(item, 'courseRef.courseName')}</TableCell>
                  <TableCell>{getNestedValue(item, 'userRef.displayName')}</TableCell>
                  <TableCell>{item.transactionId || item.razorpay_payment_id || "N/A"}</TableCell>
                  <TableCell>₹{item.amountPaid ?? "N/A"}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>{item.paymentType || "N/A"}</TableCell>
                  <StatusCell>
                    <StatusWrapper style={{ color: statusColor }}>
                      <PaymentstatusDot status={item.status} style={{ backgroundColor: statusColor }} />
                      {item.status}
                    </StatusWrapper>
                  </StatusCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={TOTAL_ENTRIES}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Container>
  );
}
