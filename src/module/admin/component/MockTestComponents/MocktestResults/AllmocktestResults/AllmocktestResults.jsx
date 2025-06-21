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
  ActionsContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "./AllmocktestResults.styles";
import { getAllUserAttempts } from "../../../../../../api/mocktestApi";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../Pagination/Pagination";
import DeleteModal from "../../../DeleteModal/DeleteModal";

const ITEMS_PER_PAGE = 10;


export default function AllmocktestResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Select");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserAttempts();
console.log("All mocktest user response", response);
        // 🔁 Map the data to expected format
        const mappedData = (response.data || []).map(item => ({
          _id: item._id,
          testName: item.mockTestId?.title || "Untitled Test",
          studentName: item.userId?.displayName || "Anonymous",
          email: item.userId?.email || "-",
          marks: `${item.totalMarks || 0}`,
          mcqScore: item.mcqScore || 0,
          subjectiveScore: item.subjectiveScore || 0,
          timeToComplete: formatTime(item.submittedAt, item.startedAt),
          submissionDate: formatDate(item.submittedAt),
          status: item.status,
          userId: item.userId?._id

        }));

        setData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user attempts", err);
        setError("Failed to load mock test results");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show success toast if redirected with updated result
  useEffect(() => {
    if (!loading && location.state?.updatedResult) {
      const updated = location.state.updatedResult;
      setData(prev =>
        prev.map(item => (item._id === updated._id ? updated : item))
      );
      toast.success("Mock test result updated!");
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [loading, location.state, navigate]);

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
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

    return `${minutes} minute(s) and ${seconds} second(s)`;
  };

  // Sorting helpers
  const getPercentage = marks => ((marks / 20) * 100).toFixed(2) + "%"; // Example: based on max marks
  const getTimeSec = str => {
    const m = str.match(/(\d+)\s*minute.*?(\d+)\s*second/);
    return m ? +m[1] * 60 + +m[2] : 0;
  };

  // Sorting logic
  const sortData = list => {
    const arr = [...list];
    switch (sortOption) {
      case "Quiz Name":
        arr.sort((a, b) => a.testName.localeCompare(b.testName));
        break;
      case "Percentage":
        arr.sort((a, b) => b.totalMarks - a.totalMarks);
        break;
      case "Time Taken":
        arr.sort((a, b) => getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete));
        break;
      default:
        break;
    }
    return arr;
  };

  // Filter by search text
  const filtered = data.filter(d =>
    (d.testName || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const sorted = sortData(filtered);
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageSlice = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Delete handlers
  const handleDeleteClick = id => {
    setItemToDelete(data.find(d => d._id === id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setData(prev => prev.filter(d => d._id !== itemToDelete._id));
    toast.success("Deleted successfully");
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  if (loading) return <div>Loading mock tests…</div>;
  if (error)
    return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Container>
        <HeaderRow>
          <Title>
            Mock Tests Results&nbsp;
            <small>({pageSlice.length}/{totalItems})</small>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect
              value={sortOption}
              onChange={e => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Select</option>
              <option>Quiz Name</option>
              <option>Percentage</option>
              <option>Time Taken</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
          <SearchInput
            value={searchText}
            placeholder="Search by quiz name..."
            onChange={e => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Test Name</TableHeader>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Marks</TableHeader>
                <TableHeader>MCQ Score</TableHeader>
                <TableHeader>Subjective Score</TableHeader>
                <TableHeader>Time to complete</TableHeader>
                <TableHeader>Submission Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageSlice.map(item =>(
                <TableRow key={item._id}>
                  <TableCell>{item.testName}</TableCell>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.marks}</TableCell>
                  <TableCell>{item.mcqScore}</TableCell>
                  <TableCell>{item.subjectiveScore}</TableCell>
                  <TableCell>{item.timeToComplete}</TableCell>
                  <TableCell>{item.submissionDate}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        size={20}
                        title="View"
                        onClick={() => navigate(`/admin/results/studentName/${item.userId}`,  { state: { studentName: item.studentName } })}
                      />
                      <BiEditAlt
                        size={20}
                        title="Edit"
                        onClick={() => navigate(`/admin/results/edit/${item._id}`, { state: data,
                            currentResult: item
                         })}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        title="Delete"
                        onClick={() => handleDeleteClick(item._id)}
                      />
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

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
}