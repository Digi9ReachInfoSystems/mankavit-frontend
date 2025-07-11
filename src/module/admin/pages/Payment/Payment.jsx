// src/components/Payment/Payment.jsx
import React, { useEffect, useState } from "react";
// instead of `import jsPDF from "jspdf";`
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


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
  PaymentstatusDot,
  Backdrop,
  Modal,
  Detail,
  CloseBtn
} from "../Payment/Payment.style";
import Pagination from "../../component/Pagination/Pagination";
import { getAllPayments, getPaymentByCourseId } from "../../../../api/paymentApi";
import { getAllCourses } from "../../../../api/courseApi";
import styled from "styled-components";
import { SearchWrapper } from "../StudentManagement/StudentManagement.style";
import { CiSearch } from "react-icons/ci";
import { getAuth } from "../../../../utils/authService";

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

// Styled export button
const ExportButton = styled.button`
  padding: 6px 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;
  &:hover { background: #1976D2; }
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
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["paymentManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponDataToShow, setCouponDataToShow] = useState(null);

  // Fetch payments + courses on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [paymentsRes, coursesRes] = await Promise.all([
          getAllPayments(),
          getAllCourses(),
        ]);
        // build course map
        const map = {};
        (coursesRes.data || []).forEach(c => {
          map[c._id] = c.courseName;
        });
        setCoursesMap(map);

        if (paymentsRes?.success && paymentsRes.payments) {
          setPayments(paymentsRes.payments);
          setFilteredPayments(paymentsRes.payments);
        } else {
          setError("No payment data received from server");
        }
      } catch (err) {
        console.error("Error fetching payments or courses:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Refetch when course filter changes
  useEffect(() => {
    const fetchByCourse = async () => {
      setLoading(true);
      try {
        if (selectedCourseId !== "all") {
          const res = await getPaymentByCourseId(selectedCourseId);
          setPayments(res.payments);
          setFilteredPayments(res.payments);
        } else {
          const res = await getAllPayments();
          setPayments(res.payments);
          setFilteredPayments(res.payments);
        }
      } catch (err) {
        console.error("Error fetching by course:", err);
        setError(err.message || "Failed to fetch by course");
      } finally {
        setLoading(false);
      }
    };
    fetchByCourse();
  }, [selectedCourseId]);

  // Search + sort effect
  useEffect(() => {
    let data = [...payments];

    if (searchQuery) {
      data = data.filter(item => {
        const student = getNestedValue(item, 'userRef.displayName').toLowerCase();
        const course = getNestedValue(item, 'courseRef.courseName').toLowerCase();
        return (
          student.includes(searchQuery.toLowerCase()) ||
          course.includes(searchQuery.toLowerCase())
        );
      });
    }

    switch (sortBy) {
      case "Student":
        data.sort((a, b) =>
          getNestedValue(a, 'userRef.displayName')
            .localeCompare(getNestedValue(b, 'userRef.displayName'))
        );
        break;
      case "AmountLow":
        data.sort((a, b) => a.amountPaid - b.amountPaid);
        break;
      case "AmountHigh":
        data.sort((a, b) => b.amountPaid - a.amountPaid);
        break;
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPayments(data);
    setCurrentPage(1);
  }, [searchQuery, sortBy, payments]);

  // Helpers
  const formatDate = iso => {
    const d = new Date(iso);
    return isNaN(d) ? "Invalid Date" : d.toLocaleString("en-GB");
  };
  const getNestedValue = (obj, path, def = "N/A") =>
    path.split(".").reduce((o, k) => (o || {})[k], obj) ?? def;
  const getStatusColor = status =>
    STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.default;

  // PDF export of ALL filteredPayments
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Payments", 14, 22);

    const columns = [
      "Course",
      "Student",
      "Payment ID",
      "Amount",
      "Date",
      "Mode",
      "Status",
    ];

    const rows = filteredPayments.map(item => [
      getNestedValue(item, 'courseRef.courseName'),
      getNestedValue(item, 'userRef.displayName'),
      item.transactionId || item.razorpay_payment_id || "N/A",
      `₹${item.amountPaid ?? "N/A"}`,
      formatDate(item.createdAt),
      item.paymentType || "N/A",
      item.status,
    ]);

    // <— note: calling the imported function directly
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    doc.save("payments.pdf");
  };


  if (loading) return <Container>Loading payments...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (!payments.length) return <Container>No payment data available</Container>;

  const TOTAL_ENTRIES = filteredPayments.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const currentItems = filteredPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCouponDetailsClick = (item) => {
    console.log(item);
    setCouponDataToShow({
      couponName: item?.couponRef?.coupon_name,
      discountAmount: item?.couponDiscount,
      actualPrice: item?.amountPaid,
      coursePrice:item.courseRef.discountActive? item.courseRef.price:item.courseRef.discountPrice

    });
    setShowCouponModal(true);
  };

  return (
    <Container>
      <HeaderRow style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Title>
          All Payments{" "}
          <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
            ({currentItems.length}/{TOTAL_ENTRIES})
          </span>
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <SortByContainer>
            <SortLabel>Filter by Course:</SortLabel>
            <SortSelect
              value={selectedCourseId}
              onChange={e => setSelectedCourseId(e.target.value)}
            >
              <option value="all">All</option>
              {Object.entries(coursesMap).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </SortSelect>
          </SortByContainer>

          <SortByContainer style={{ marginLeft: 16 }}>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="Time">Time (Latest)</option>
              <option value="Student">Student Name</option>
              <option value="AmountLow">Amount (Low → High)</option>
              <option value="AmountHigh">Amount (High → Low)</option>
            </SortSelect>
          </SortByContainer>
          {
            !readOnlyPermissions && (
              <ExportButton onClick={exportPDF}>
                Export PDF
              </ExportButton>
            )
          }

        </div>
      </HeaderRow>

      <SearchWrapper>
        <CiSearch size={18} style={{ marginRight: 8 }} />
        <SearchInput
          type="text"
          placeholder="Search by student or course"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: "20%" }}
        />
      </SearchWrapper>

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
              <TableHeader>Coupon Details</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentItems.map(item => {
              const color = getStatusColor(item.status);
              // console.log("item", item);
              return (
                <TableRow key={item._id}>
                  <TableCell>{getNestedValue(item, 'courseRef.courseName')}</TableCell>
                  <TableCell>{getNestedValue(item, 'userRef.displayName')}</TableCell>
                  <TableCell>{item.transactionId || item.razorpay_payment_id || "N/A"}</TableCell>
                  <TableCell>₹{item.amountPaid ?? "N/A"}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>{item.paymentType || "N/A"}</TableCell>
                  <StatusCell>
                    <StatusWrapper style={{ color }}>
                      <PaymentstatusDot status={item.status} style={{ backgroundColor: color }} />
                      {item.status}
                    </StatusWrapper>
                  </StatusCell>
                  <TableCell>{item.couponApplied ? (<button 
                  style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                  onClick={() => handleCouponDetailsClick(item)}>View</button>) : "Not Applied"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={TOTAL_ENTRIES}
        itemsPerPage={ITEMS_PER_PAGE}
      />
      {
        showCouponModal && (
          // <CouponDetailsModal
          //   couponData={couponDataToShow}
          //   onClose={() => setShowCouponModal(false)}
          // />
          <Backdrop onClick={() => setShowCouponModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <CloseBtn onClick={() => setShowCouponModal(false)}>×</CloseBtn>
              <Title>Coupon Details</Title>
              <Detail><strong>Name:</strong> {couponDataToShow?.couponName || "N/A"}</Detail>
                <Detail><strong>Course Amount:</strong> ₹{couponDataToShow?.coursePrice || 0}</Detail>
              <Detail><strong>Discount Amount:</strong> ₹{couponDataToShow?.discountAmount || 0}</Detail>
              <Detail><strong>Amount Paid:</strong> ₹{couponDataToShow?.actualPrice || "N/A"}</Detail>
            </Modal>
          </Backdrop>
        )
      }
    </Container>

  );
}
