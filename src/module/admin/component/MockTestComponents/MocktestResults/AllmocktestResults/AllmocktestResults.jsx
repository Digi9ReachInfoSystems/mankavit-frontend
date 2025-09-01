import React, { useState, useEffect, useMemo } from "react";
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
  ActionsContainer,
  ButtonContainer,
  FilterByContainer,
  CreateButton,
} from "./AllmocktestResults.styles";
import {
  getAllUserAttempts,
  getAllMocktest,
  bulkdeleteUserAttempts,
  getRankingByMockTestSubject,
} from "../../../../../../api/mocktestApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../Pagination/Pagination";
import DeleteModal from "../../../DeleteModal/DeleteModal";
import { getAuth } from "../../../../../../utils/authService";
import { Select } from "antd";

const ITEMS_PER_PAGE = 10;

export default function AllmocktestResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [allMockTests, setAllMockTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Select");
  const [filterOption, setFilterOption] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const [selectedAttempts, setSelectedAttempts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
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

  const ts = (item) =>
    item.submittedAt
      ? new Date(item.submittedAt).getTime()
      : item.createdAt
      ? new Date(item.createdAt).getTime()
      : item._id?.length >= 8
      ? parseInt(item._id.substring(0, 8), 16) * 1000
      : 0;

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attemptsResponse, mockTestsResponse] = await Promise.all([
          getAllUserAttempts(),
          getAllMocktest(),
        ]);
        console.log("attemptsResponse", attemptsResponse);

        console.log("Results response", attemptsResponse);
        const mapped = (attemptsResponse.data || []).map((item) => ({
          _id: item._id,
          testName: item.mockTestId?.title || "Untitled Test",
          testId: item.mockTestId?._id,
          subjectId: item.mockTestId?.subjectId,
          studentName: item.userId?.displayName || "Anonymous",
          email: item.userId?.email || "-",
          marks: item.totalMarks || 0,
          maxMarks: item.mockTestId?.totalMarks || 100,
          marksPercentage: calculatePercentage(
            item.totalMarks,
            item.mockTestId?.totalMarks
          ),
          mcqScore: item.mcqScore || 0,
          subjectiveScore: item.subjectiveScore || 0,
          timeToComplete: formatTime(item.submittedAt, item.startedAt),
          submissionDate: formatDate(item.submittedAt),
          status: item.status,
          userId: item.userId?._id,
          submittedAt: item.submittedAt,
          rank: item.ranking?.rank,
        }));

        setData(mapped.sort((a, b) => ts(b) - ts(a)));
        setAllMockTests(mockTestsResponse.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to load mock test results");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (obtained, total) => {
    if (!total || total === 0) return "0%";
    return `${((obtained / total) * 100).toFixed(2)}%`;
  };

  // Show success toast if redirected with updated result
  useEffect(() => {
    if (!loading && location.state?.updatedResult) {
      const updated = location.state.updatedResult;
      setData((prev) =>
        prev.map((item) => (item._id === updated._id ? updated : item))
      );
      toast.success("Mock test result updated!");
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [loading, location.state, navigate]);

  // Format date helper
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time taken
  const formatTime = (submittedAt, startedAt) => {
    if (!submittedAt || !startedAt) return "N/A";

    const start = new Date(startedAt);
    const submit = new Date(submittedAt);
    const diffSeconds = Math.round((submit - start) / 1000);
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} & ${seconds} ${
      seconds > 1 ? "seconds" : "second"
    }`;
  };

  // Sorting helpers
  const getTimeSec = (str) => {
    const m = str.match(/(\d+)\s*minute.*?(\d+)\s*second/);
    return m ? +m[1] * 60 + +m[2] : 0;
  };

  // Prepare filter options
  const filterOptions = useMemo(() => {
    const options = [
      { value: "all", label: "All Tests" },
      ...(allMockTests.map((test) => ({
        value: test._id,
        label: test.title || "Untitled Test",
      })) || []),
    ];
    return options;
  }, [allMockTests]);

  // Filter and sort data
  const filteredAndSorted = useMemo(() => {
    let result = [...data];

    // Apply test filter
    if (filterOption !== "all") {
      result = result.filter((item) => item.testId === filterOption);
    }

    // Apply search filter
    if (searchText.trim()) {
      const term = searchText.toLowerCase();
      result = result.filter((item) =>
        item.testName.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "Quiz Name":
        result.sort((a, b) => a.testName.localeCompare(b.testName));
        break;
      case "Percentage":
        result.sort((a, b) => b.marks - a.marks);
        break;
      case "Time Taken":
        result.sort(
          (a, b) => getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete)
        );
        break;
      default:
        // Default sort by submission date (newest first)
        result.sort(
          (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
        );
        break;
    }

    return result;
  }, [data, filterOption, searchText, sortOption]);

  const totalItems = filteredAndSorted.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageSlice = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Delete handlers
  const handleDeleteClick = (id) => {
    setItemToDelete(data.find((d) => d._id === id));
    setDeleteModalOpen(true);
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedAttempts([]);
    } else {
      setSelectedAttempts(filteredAndSorted.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };
  const handleBulkDeleteClick = () => {
    setBulkDeleteModalOpen(true);
  };
  const handleCheckboxChange = (attemptId) => {
    setSelectedAttempts((prev) =>
      prev.includes(attemptId)
        ? prev.filter((id) => id !== attemptId)
        : [...prev, attemptId]
    );
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      const response = await bulkdeleteUserAttempts(selectedAttempts);

      if (response.success) {
        toast.success(
          response.message || "Selected attempts deleted successfully"
        );
        setData((prev) =>
          prev.filter((item) => !selectedAttempts.includes(item._id))
        );
        setSelectedAttempts([]);
        setSelectAll(false);
      } else {
        throw new Error(response.message || "Failed to delete attempts");
      }
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error(error.message || "Failed to delete selected attempts");
    } finally {
      setBulkDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setData(
      (prev) =>
        prev
          .filter((d) => d._id !== itemToDelete._id)
          .sort((a, b) => ts(b) - ts(a)) // ensure newest-first after delete
    );
    toast.success("Deleted successfully");
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  if (loading)
    return (
      <div
        style={{
          marginLeft: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        Loading mock test results…
      </div>
    );
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Container>
        <HeaderRow>
          <Title>
            Mock Tests Results&nbsp;
            <small>
              ({pageSlice.length}/{totalItems})
            </small>
          </Title>
          <div style={{ display: "flex", gap: "20px" }}>
            <FilterByContainer>
              <SortLabel>Filter by:</SortLabel>
              <Select
                style={{ width: 200 }}
                value={filterOption}
                onChange={setFilterOption}
                options={filterOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                placeholder="Select a test"
              />
            </FilterByContainer>
            <SortByContainer>
              <SortLabel>Sort by:</SortLabel>
              <Select
                style={{ width: 150 }}
                value={sortOption}
                onChange={(value) => {
                  setSortOption(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "Select", label: "Submission Date" },
                  { value: "Quiz Name", label: "Quiz Name" },
                  { value: "Percentage", label: "Percentage" },
                  { value: "Time Taken", label: "Time Taken" },
                ]}
              />
            </SortByContainer>
          </div>
        </HeaderRow>

        {/* Add bulk delete button */}
        <ButtonContainer>
          {selectedAttempts.length > 0 && !readOnlyPermissions && (
            <CreateButton
              onClick={handleBulkDeleteClick}
              style={{ backgroundColor: "red" }}
            >
              Delete Selected ({selectedAttempts.length})
            </CreateButton>
          )}
        </ButtonContainer>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            value={searchText}
            placeholder="Search by quiz name..."
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            style={{ color: "black" }}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                {/* Add checkbox column header */}
                {!readOnlyPermissions && (
                  <TableHeader>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </TableHeader>
                )}
                <TableHeader>Test Name</TableHeader>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Marks</TableHeader>
                <TableHeader>Time to complete</TableHeader>
                <TableHeader>Submission Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageSlice.map((item) => (
                <TableRow key={item._id}>
                  {/* Add checkbox column */}
                  {!readOnlyPermissions && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedAttempts.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </TableCell>
                  )}

                  <TableCell
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => {
                      navigate(
                        `/admin/mock-test/user-result/${item.testId}/${item._id}`,
                        {
                          state: { studentName: item.studentName },
                        }
                      );
                    }}
                  >
                    {item.testName}
                  </TableCell>

                  <TableCell>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#1890ff",
                        textDecoration: "none",
                      }}
                      onClick={() =>
                        navigate(`/admin/results/studentName/${item.userId}`, {
                          state: { studentName: item.studentName },
                        })
                      }
                    >
                      {item.studentName}
                    </span>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>
                    <a
                      navigate
                      style={{
                        cursor: "pointer",
                        color: "#1890ff",
                        textDecoration: "none",
                      }}
                      onClick={() =>
                        navigate(
                          `/admin/results/user-attempts/attempt/${item._id}`
                        )
                      }
                    >
                      {item.marks}/{item.maxMarks} [ {item.marksPercentage} ]{" "}
                    </a>
                  </TableCell>
                  <TableCell>{item.timeToComplete}</TableCell>
                  <TableCell>{item.submissionDate}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      {!readOnlyPermissions && (
                        <RiDeleteBin6Line
                          size={20}
                          color="#FB4F4F"
                          title="Delete"
                          onClick={() => handleDeleteClick(item._id)}
                        />
                      )}
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
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
      </Container>

      {/* Single delete modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />

      {/* Bulk delete modal */}
      <DeleteModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onDelete={handleBulkDelete}
      />
    </>
  );
}

// <TableCell>
//                   <a
//                   navigate
//                   style={{
//                     cursor: "pointer",
//                     color: "#1890ff",
//                     textDecoration: "none",
//                   }}
//                   onClick={() =>
//                     navigate(
//                       `/admin/results/user-attempts/attempt/${item._id}`
//                     )
//                   }
//                   >

//                   {item.marks}/{item.maxMarks} [ {item.marksPercentage} ]  </a>
//                 </TableCell>
