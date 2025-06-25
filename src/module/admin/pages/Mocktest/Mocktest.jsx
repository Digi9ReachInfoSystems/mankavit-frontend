// MockTestsTable.jsx
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
  ButtonContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  CreateButton,
  ToggleSwitch,
  ToggleSlider,
  ToggleLabel
} from "./Mocktest.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { getAllMocktest, deleteMocktestById, publishMocktestById } from "../../../../api/mocktestApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 10;

export default function MockTestsTable() {
  const navigate = useNavigate();

  // --- state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const ts = (item) =>
  item.createdAt        ? new Date(item.createdAt).getTime()
: item.updatedAt        ? new Date(item.updatedAt).getTime()
: item.id?.length >= 8  ? parseInt(item.id.substring(0, 8), 16) * 1000 // fallback: ObjectId time
: 0;

  useEffect(() => {
    fetchMockTests();
  }, []);


 const fetchMockTests = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await getAllMocktest();
    if (!res.success) throw new Error("Failed to load mock tests");

    /** build row objects, then sort newest-first */
    const rows = res.data
      .map((test) => ({
        id          : test._id,
        mockTitle   : test.title,
        students    : test.students || [],
        subjectName : test.subject?.subjectDisplayName ||
                      test.subject?.subjectName ||
                      "—",
        subjectId   : test.subject?._id || null,
        questionTypes: Array.isArray(test.questions)
          ? [...new Set(test.questions.map((q) => q.type))].join(", ")
          : "—",
        totalMarks  : test.totalMarks,
        createdOn   : new Date(test.createdAt).toLocaleString(),
        lastModified: new Date(test.updatedAt).toLocaleString(),
        isPublished : test.isPublished || false,
        createdAt   : test.createdAt,          // keep raw date for sort
      }))
      .sort((a, b) => ts(b) - ts(a));           // ← NEWEST FIRST

    setData(rows);
  } catch (err) {
    console.error(err);
    setError(err.message || "Unknown error");
    toast.error(err.message || "Failed to load mock tests");
  } finally {
    setLoading(false);
  }
};

  // --- filters & pagination
  const filtered = data.filter((item) =>
    item.mockTitle.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // --- handlers
  const handleDeleteClick = (id) => {
    setSelectedToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMocktestById(selectedToDelete);
      // setData((d) => d.filter((row) => row.id !== selectedToDelete));
      // // adjust page if needed
      // if ((filtered.length - 1) <= startIdx && currentPage > 1) {
      //   setCurrentPage(currentPage - 1);
      // }
      await fetchMockTests();
      toast.success("Mock test deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete mock test");
      toast.error("Failed to delete mock test");
    } finally {
      setDeleteModalOpen(false);
      setSelectedToDelete(null);
    }
  };
  const handleViewResults = (mockTestId, subjectId) => {
    if (!subjectId) {
      toast.error("Subject ID is missing");
      return;
    }
    navigate(`/admin/mock-test/user-result/${mockTestId}/${subjectId}`);
  };


  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;

    // Optimistic update
    setData(data.map(item =>
      item.id === id ? { ...item, isPublished: newStatus } : item
    ));

    try {
      const response = await publishMocktestById(id, newStatus);
      console.log("Publish toggle response:", response);

      if (!response.success) {
        // Revert on failure
        setData(data.map(item =>
          item.id === id ? { ...item, isPublished: currentStatus } : item
        ));
        setError("Failed to update publish status");
      }
    } catch (error) {
      // Revert on error
      setData(data.map(item =>
        item.id === id ? { ...item, isPublished: currentStatus } : item
      ));
      console.error("Publish toggle failed:", error);
      setError("Failed to update publish status");
    }
  };

  const handleView = (students) => {
    setViewData(students);
    setViewModalOpen(true);
  };

  // const goToCreate = () => navigate("/admin/mock-test/create-mock-test");
  const goToViewDetail = (id) => navigate(`/admin/mock-test/view/${id}`);

  if (loading) return <div>Loading mock tests…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <>
      {/* <ButtonContainer>
        <CreateButton onClick={goToCreate}>Results</CreateButton>
        <CreateButton onClick={goToCreate}>Create Mock Test</CreateButton>
      </ButtonContainer> */}

      <Container>
        <HeaderRow>
          <Title>
            Mock Tests <small>({pageItems.length}/{totalEntries})</small>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="LastActive">Last Active</option>
              <option value="Active">Active</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
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
                <TableHeader>Mock Test Name</TableHeader>
                {/* <TableHeader>Subject</TableHeader> */}
                <TableHeader>Created on</TableHeader>
                <TableHeader>Question type</TableHeader>
                <TableHeader>Total marks</TableHeader>
                <TableHeader>Published</TableHeader>
                <TableHeader>Actions</TableHeader>
                <TableHeader>View Submission</TableHeader>
                {/* <TableHeader>View Ranking</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.mockTitle}</TableCell>
                  {/* <TableCell>{item.subjectName}</TableCell> */}
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.questionTypes}</TableCell>
                  <TableCell>{item.totalMarks}</TableCell>
                  <TableCell>
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={item.isPublished}
                        onChange={() => handlePublishToggle(item.id, item.isPublished)}
                      />
                      <ToggleSlider $isPublished={item.isPublished} />
                      <ToggleLabel $isPublished={item.isPublished}>
                        {item.isPublished ? "Yes" : "No"}
                      </ToggleLabel>
                    </ToggleSwitch>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        title="View Details"
                        size={20}
                        onClick={() => goToViewDetail(item.id)}
                      />
                      <BiEditAlt
                        title="Edit"
                        size={20}
                        onClick={() => navigate(`/admin/mock-test/edit/${item.id}`)}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDeleteClick(item.id)}
                      />
                    </ActionsContainer>
                  </TableCell>
                  <TableCell style={{textAlign:"center!important"}}>
                    <button
                      style={{ display: item.subjectId ? "block" : "none", border: "none", background: "none" ,textAlign:"center", cursor:"pointer" }}
                      onClick={() => handleViewResults(item.id, item.subjectId)}
                      disabled={!item.subjectId}
                    >
                      <IoEyeOutline
                        title="View Details"
                        size={20}
                        onClick={() => goToViewDetail(item.id)}
                      />

                    </button>
                  </TableCell>
                  {/* <TableCell>
                    <button
                      style={{ display: item.subjectId ? "block" : "none", border: "none", background: "none" }}
                      onClick={() => { navigate(`/admin/mock-test/user-ranking/${item.id}/${item.subjectId}`) }}
                      disabled={!item.subjectId}
                    >
                      <IoEyeOutline
                        title="View Details"
                        size={20}
                        onClick={() => goToViewDetail(item.id)}
                      />
                    </button>
                  </TableCell> */}
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

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />

        {viewModalOpen && (
          <CustomModal
            title="Enrolled Students"
            type="enrolled"
            data={viewData}
            onClose={() => setViewModalOpen(false)}
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
      </Container>
    </>
  );
}