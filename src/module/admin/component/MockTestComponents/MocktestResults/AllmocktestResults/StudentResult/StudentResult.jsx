import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Select } from "antd";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  FilterByContainer,
  ActionsContainer
} from "./StudentResult.styles";

import { getusersAllmocktestsAttempts, getAllMocktest, bulkdeleteUserAttempts } from "../../../../../../../api/mocktestApi";
import { getUserByUserId } from "../../../../../../../api/authApi";

import DeleteModal from "../../../../../component/DeleteModal/DeleteModal"; // modal import

export default function StudentResults() {
  const { userId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [studentResults, setStudentResults] = useState([]);
  const [allMockTests, setAllMockTests] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    displayName: state?.studentName || "Anonymous",
    email: "-"
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Select");
  const [filterOption, setFilterOption] = useState("all");

  // bulk delete states
  const [selectedAttempts, setSelectedAttempts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const formatTime = (submittedAt, startedAt) => {
    if (!submittedAt || !startedAt) return "N/A";

    const start = new Date(startedAt);
    const submit = new Date(submittedAt);
    const diffSeconds = Math.round((submit - start) / 1000);

    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    return `${minutes} minute(s) and ${seconds} second(s)`;
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse = await getUserByUserId(userId);
        const user = userResponse.user;

        setStudentInfo({
          displayName: user?.displayName || state?.studentName || "Anonymous",
          email: user?.email || "-"
        });

        const res = await getusersAllmocktestsAttempts(userId);

        const formatted = res.data.map((item) => ({
          _id: item._id,
          testName: item.mockTestId?.title || "Untitled Test",
          testId: item.mockTestId?._id,
          marks: item.totalMarks ?? 0,
          maxMarks: item.mockTestId?.totalMarks || 100,
          marksPercentage: (item.totalMarks / (item.mockTestId?.totalMarks || 100)) * 100,
          timeToComplete: formatTime(item.submittedAt, item.startedAt),
          submissionDate: formatDate(item.submittedAt),
          attemptId: item._id
        }));

        setStudentResults(formatted);

        const mockTestsResponse = await getAllMocktest();
        setAllMockTests(mockTestsResponse.data || []);

      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load student results");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, state?.studentName]);

  // Filter list for dropdown
  const filterOptions = useMemo(() => {
    return [
      { value: "all", label: "All Tests" },
      ...(allMockTests.map((test) => ({
        value: test._id,
        label: test.title || "Untitled Test"
      })) || [])
    ];
  }, [allMockTests]);

  // sorting helper
  const getTimeSec = (str) => {
    const m = str.match(/(\d+)\s*minute.*?(\d+)\s*second/);
    return m ? +m[1] * 60 + +m[2] : 0;
  };

  // filtering + sorting
  const sortedAndFiltered = useMemo(() => {
    let list = [...studentResults];

    if (filterOption !== "all") {
      list = list.filter((r) => r.testId === filterOption);
    }

    if (searchText.trim()) {
      const term = searchText.toLowerCase();
      list = list.filter((r) => r.testName.toLowerCase().includes(term));
    }

    switch (sortOption) {
      case "Quiz Name":
        list.sort((a, b) => a.testName.localeCompare(b.testName));
        break;
      case "Percentage":
        list.sort((a, b) => b.marksPercentage - a.marksPercentage);
        break;
      case "Time Taken":
        list.sort((a, b) => getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete));
        break;
      default:
        list.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    }

    return list;
  }, [studentResults, searchText, sortOption, filterOption]);

  const ITEMS_PER_PAGE = 10;
  const totalItems = sortedAndFiltered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = 1;

  const pageSlice = sortedAndFiltered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // checkbox actions
  const handleCheckboxChange = (id) => {
    setSelectedAttempts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAttempts([]);
    } else {
      setSelectedAttempts(pageSlice.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };

  // bulk delete call
  const handleBulkDelete = async () => {
    try {
      if (selectedAttempts.length === 0) return;

      await bulkdeleteUserAttempts(selectedAttempts);

      setStudentResults((prev) =>
        prev.filter((item) => !selectedAttempts.includes(item._id))
      );

      setSelectedAttempts([]);
      setSelectAll(false);
      setBulkDeleteOpen(false);
    } catch (error) {
      console.error("Bulk delete failed", error);
      alert("Failed to delete attempts");
    }
  };

  // PDF Download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${studentInfo.displayName}'s Mock Test Results`, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Test Name", "Marks", "Percentage", "Time Taken", "Submitted On"]],
      body: sortedAndFiltered.map((item) => [
        item.testName,
        `${item.marks}/${item.maxMarks}`,
        `${item.marksPercentage.toFixed(2)}%`,
        item.timeToComplete,
        item.submissionDate
      ]),
      styles: { fontSize: 9 }
    });

    doc.save(`${studentInfo.displayName}_MockTestResults.pdf`);
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container style={{ color: "red" }}>{error}</Container>;

  return (
    <Container>
      <HeaderRow>
        <Title>
          <strong>{studentInfo.displayName}'s Results</strong>
          &nbsp; <small>({totalItems} attempts)</small>
        </Title>

        {selectedAttempts.length > 0 && (
          <button
            onClick={() => setBulkDeleteOpen(true)}
            style={{
              background: "#007bfe",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            Delete Selected ({selectedAttempts.length})
          </button>
        )}

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <FilterByContainer>
            <SortLabel>Filter by:</SortLabel>
            <Select
              style={{ width: 200 }}
              value={filterOption}
              onChange={setFilterOption}
              options={filterOptions}
              showSearch
            />
          </FilterByContainer>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              style={{ width: 150 }}
              value={sortOption}
              onChange={setSortOption}
              options={[
                { value: "Select", label: "Submission Date" },
                { value: "Quiz Name", label: "Quiz Name" },
                { value: "Percentage", label: "Percentage" },
                { value: "Time Taken", label: "Time Taken" }
              ]}
            />
          </SortByContainer>

          <button
            onClick={handleDownloadPDF}
            style={{
              padding: "6px 12px",
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Download PDF
          </button>
        </div>
      </HeaderRow>

      <SearchWrapper>
        <SearchIcon><CiSearch size={18} /></SearchIcon>
        <SearchInput
          placeholder="Search test names..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </SearchWrapper>

      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </TableHeader>
              <TableHeader>Test Name</TableHeader>
              <TableHeader>Marks</TableHeader>
              <TableHeader>Percentage</TableHeader>
              <TableHeader>Time Taken</TableHeader>
              <TableHeader>Submitted On</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageSlice.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedAttempts.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                </TableCell>

                <TableCell
                  style={{
                    cursor: "pointer",
                    color: "#1890ff"
                  }}
                  onClick={() =>
                    navigate(`/admin/results/user-attempts/attempt/${item.attemptId}`)
                  }
                >
                  {item.testName}
                </TableCell>

                <TableCell>{item.marks}/{item.maxMarks}</TableCell>
                <TableCell>{item.marksPercentage.toFixed(2)}%</TableCell>
                <TableCell>{item.timeToComplete}</TableCell>
                <TableCell>{item.submissionDate}</TableCell>

                <TableCell>
                  <ActionsContainer>
                    <IoEyeOutline
                      size={20}
                      title="View details"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/results/user-attempts/attempt/${item.attemptId}`)
                      }
                    />
                  </ActionsContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {/* BULK DELETE MODAL */}
      <DeleteModal
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onDelete={handleBulkDelete}
      />
    </Container>
  );
}
