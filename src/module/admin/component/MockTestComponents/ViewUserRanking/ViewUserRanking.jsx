// ViewUser.jsx
import React, { useState, useEffect } from "react";
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
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from "./ViewUserRanking.styles";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import {
  getAttemptedUserListByMocktestId,
  getMocktestAttempts,
  getMocktestById,
  getRankingByMockTestSubject,
  getUserAnswerByMocktestIdandSubjectId,
} from "../../../../../api/mocktestApi";
import { getUserByUserId } from "../../../../../api/authApi";
import styled from "styled-components";
import { getAuth } from "../../../../../utils/authService";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE = 10;
const ExportButton = styled.button`
  padding: 6px 12px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;
  &:hover {
    background: #1976d2;
  }
`;

export default function ViewUserRanking() {
  const { mockTestId, subjectId } = useParams();
  const [userName, setUserName] = useState("");
  const [totalMarks, setTotalMarks] = useState(null);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Rank");
  const navigate = useNavigate();
  const [mockTestName, setMockTestName] = useState("");
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(
          response.Permissions["mockTestManagement"].readOnly
        );
      }
    };
    apiCaller();
  }, []);

 useEffect(() => {
  const loadMockName = async () => {
    if (!mockTestId || !/^[a-f\d]{24}$/i.test(mockTestId)) {
      console.error("Invalid mockTestId");
      return;
    }
    const res = await getMocktestById(mockTestId);
    if (res?.success && res.data) {
      // Title
      setMockTestName(res.data.mockTitle || res.data.title || res.data.name || "");

      // Total marks:
      // 1) top-level totalMarks if present
      // 2) maxMarks alternative
      // 3) find inside subjects array by matching the route subjectId against id/subjectId
      let marks =
        res.data.totalMarks ??
        res.data.maxMarks ??
        (Array.isArray(res.data.subjects)
          ? (() => {
              const match = res.data.subjects.find(s =>
                s?.id === subjectId || s?.subjectId === subjectId
              );
              return match?.totalMarks;
            })()
          : null);

      setTotalMarks(marks ?? null);
    }
  };
  loadMockName();
}, [mockTestId, subjectId]);


  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        if (!mockTestId || !subjectId) {
          console.error("Missing mockTestId or subjectId");
          return;
        }

        // Validate ONLY mockTestId as ObjectId:
        if (!/^[a-f\d]{24}$/i.test(mockTestId)) {
          console.error("Invalid mockTestId format");
          return;
        }

        // (No subjectId ObjectId check here — allow strings like "mocktestSubject")

        const response = await getRankingByMockTestSubject(
          mockTestId,
          subjectId
        );
        if (response.success) {
          let sorted = response.data;
          if (sortBy === "Name") {
            sorted = [...sorted].sort((a, b) =>
              a.userId.displayName.localeCompare(b.userId.displayName)
            );
          } else if (sortBy === "SubmittedAt") {
            sorted = [...sorted].sort(
              (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)
            );
          }
          setData(sorted);
        } else {
          throw new Error(response.message || "Failed to fetch user answers");
        }
      } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    };

    fetchUserAnswers();
  }, [mockTestId, subjectId, sortBy]);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        if (!mockTestId || !subjectId) {
          console.error("Missing mockTestId or subjectId");
          return;
        }

        const response = await getRankingByMockTestSubject(
          mockTestId,
          subjectId
        );
        // console.log("Fetching user answers for mockTestId:", response);

        // console.log("Fetching user answers for mockTestId:", response);
        // console.log("subjectId", subjectId);
        console.log("mockTestId", mockTestId);
        console.log("View user answers response", response);
        if (response.success) {
          if (sortBy === "Name") {
            setData(
              response.data.sort((a, b) =>
                a.userId.displayName.localeCompare(b.userId.displayName)
              )
            );
          } else if (sortBy === "SubmittedAt") {
            setData(
              response.data.sort(
                (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)
              )
            );
          } else {
            setData(response.data);
          }
        } else {
          throw new Error(response.message || "Failed to fetch user answers");
        }
      } catch (error) {
        console.error("Error fetching mock tests:", error);
        // You might want to set some error state here to show to the user
      }
    };
    apiCaller();
  }, [sortBy]);

  const filtered = data.filter(
    (item) =>
      item.userId.displayName
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleView = (attempt) => {
    console.log("attempt", attempt);
    navigate(`/admin/mock-test/user-result/view-result/${attempt}`);
    // console.log("View attempt with ID:", attemptId);
  };
const exportPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const rightX = pageWidth - margin;

  const title = "Mankavit Law Academy";
  const subTitle = mockTestName || "Untitled Mock Test";
  const totalMarksText = `Total Marks: ${totalMarks ?? "-"}`;

  // Titles in red
  doc.setTextColor(255, 0, 0);
  doc.setFontSize(18);
  doc.text(title, margin, 22);      // Academy title
  doc.setFontSize(14);
  doc.text(subTitle, margin, 32);   // Mock test name

  // Reset color for rest
  doc.setTextColor(255, 0, 0);

  // Total marks on the right, below titles
  doc.setFontSize(12);
  doc.text(totalMarksText, rightX, 40, { align: "right" });

  // Table
  const columns = ["Rank", "Name", "Marks"];
  const rows = filtered.map(item => [
    item.rank,
    item.userId.displayName || "N/A",
    item.bestScore ?? "N/A",
  ]);
  doc.setTextColor(0, 0, 0); // before autoTable(...)


autoTable(doc, {
  head: [columns],
  body: rows,
  startY: 48,
  theme: "grid", // adds borders around all cells
  styles: {
    fontSize: 10,
    cellPadding: 3,
    textColor: [0, 0, 0],
    lineWidth: 0.1,        // border width
    lineColor: [0, 0, 0],  // border color
  },
  headStyles: {
    fillColor: [255, 255, 255], // white header background
    textColor: [0, 0, 0],
    fontStyle: "bold",
  },
  didParseCell: (data) => {
    if (data.section === "body") {
      // First body row has index 0 -> treat as "odd" -> grey
      const isOddRow = data.row.index % 2 === 0;
      data.cell.styles.fillColor = isOddRow ? [245, 245, 245] : [255, 255, 255];
    }
  },
});




  doc.save(`MockTestRanking-${subTitle}-${new Date().toLocaleString()}.pdf`);
};


  return (
    <Container>
      <HeaderRow>
        <Title>
          List of Students{" "}
          <small>
            ({pageItems.length}/{totalEntries})
          </small>
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortBy} onChange={handleSortChange}>
              <option value="Rank">Rank</option>
              <option value="Name">Name</option>
              <option value="SubmittedAt">Submited At</option>
              {/* <option value="Active">Active</option> */}
            </SortSelect>
          </SortByContainer>
          {!readOnlyPermissions && (
            <ExportButton onClick={exportPDF}>Export PDF</ExportButton>
          )}
        </div>
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
              <TableHeader>Rank</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Best Score</TableHeader>
              <TableHeader>Total Attempts</TableHeader>

              <TableHeader>Submitted At</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.rank}</TableCell>
                <TableCell>{item.userId.displayName || " "}</TableCell>
                <TableCell>{item.userEmail || "0"}</TableCell>
                <TableCell>{item.bestScore || "0"}</TableCell>
                <TableCell>{item.attemptsCount}</TableCell>
                <TableCell>
                  {new Date(item.submittedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalEntries}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Container>
  );
}
