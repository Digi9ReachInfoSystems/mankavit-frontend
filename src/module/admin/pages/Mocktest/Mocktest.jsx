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
  SearchInput,
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
import { getAuth } from "../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

// helper to sort by creation/update timestamp
const ts = (item) =>
  item.createdAt ? new Date(item.createdAt).getTime()
    : item.updatedAt ? new Date(item.updatedAt).getTime()
      : item.id?.length >= 8 ? parseInt(item.id.substring(0, 8), 16) * 1000
        : 0;

export default function MockTestsTable() {
  const navigate = useNavigate();

  // state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // DeleteModal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  // View modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["mockTestManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  // fetch & sort
  useEffect(() => {
    fetchMockTests();
  }, []);

  const fetchMockTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllMocktest();
      if (!res.success) throw new Error("Failed to load mock tests");
      const rows = res.data
        .map(test => ({
          id: test._id,
          mockTitle: test.title,
          createdOn: new Date(test.createdAt).toLocaleString(),
          updatedOn: new Date(test.updatedAt).toLocaleString(),
          isPublished: test.isPublished || false,
          createdAtRaw: test.createdAt,
          subjectId: test.subject?._id,
          students: test.students || [],
          questionTypes: Array.isArray(test.questions)
            ? [...new Set(test.questions.map(q => q.type))].join(", ")
            : "—",
          totalMarks: test.totalMarks
        }))
        .sort((a, b) => ts(b) - ts(a));
      setData(rows);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unknown error");
      toast.error(err.message || "Failed to load mock tests");
    } finally {
      setLoading(false);
    }
  };

  // handle delete click -> open modal
  const handleDeleteClick = (id) => {
    setSelectedToDelete(id);
    setDeleteModalOpen(true);
  };

  // confirm delete from DeleteModal
  const confirmDelete = async () => {
    try {
      
     const response = await deleteMocktestById(selectedToDelete);
     console.log("Mocktst delete resonse",response);
      toast.success("Mock test deleted successfully");
      await fetchMockTests();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete mock test");
    } finally {
      setDeleteModalOpen(false);
      setSelectedToDelete(null);
    }
  };

  // handle publish toggle unchanged...
  const handlePublishToggle = async (id, currentStatus) => {
    if(readOnlyPermissions) {
      toast.error("You don't have permission to change publish status");
      return;
    }
    const newStatus = !currentStatus;
    setData(data.map(item =>
      item.id === id ? { ...item, isPublished: newStatus } : item
    ));
    try {
      const response = await publishMocktestById(id, newStatus);
      if (!response.success) throw new Error("Publish update failed");
    } catch (error) {
      // revert
      setData(data.map(item =>
        item.id === id ? { ...item, isPublished: currentStatus } : item
      ));
      console.error("Publish toggle failed:", error);
      toast.error("Failed to update publish status");
    }
  };

  // handle view enrolled
  const handleView = (students) => {
    setViewData(students);
    setViewModalOpen(true);
  };

  // filters & pagination
  const filtered = data.filter(item =>
    item.mockTitle.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  if (loading) return <div>Loading mock tests…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <>
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
            onChange={e => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Mock Test Name</TableHeader>
                <TableHeader>Created on</TableHeader>
                <TableHeader>Question type</TableHeader>
                <TableHeader>Total marks</TableHeader>
                <TableHeader>Published</TableHeader>
                <TableHeader>Actions</TableHeader>
                <TableHeader>View Submission</TableHeader>
                <TableHeader>View Ranking</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.mockTitle}</TableCell>
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.questionTypes}</TableCell>
                  <TableCell>{item.totalMarks}</TableCell>
                  <TableCell>
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={item.isPublished}
                        style={{ display: "none" }}
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
                      {/* <IoEyeOutline
                        title="View Details"
                        size={20}
                        onClick={() => navigate(`/admin/mock-test/view/${item.id}`)}
                      /> */}
                      {
                        !readOnlyPermissions && (
                          <>
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
                          </>
                        )
                      }

                    </ActionsContainer>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <button
                      style={{ border: "none", background: "none", cursor: item.subjectId ? "pointer" : "not-allowed" }}
                      onClick={() => item.subjectId && navigate(`/admin/mock-test/user-result/${item.id}/${item.subjectId}`)}
                      disabled={!item.subjectId}
                    >
                      <IoEyeOutline size={20} />
                    </button>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <button
                      style={{ border: "none", background: "none", cursor: item.subjectId ? "pointer" : "not-allowed" }}
                      onClick={() => item.subjectId && navigate(`/admin/mock-test/user-ranking/${item.id}/${item.subjectId}`)}
                      disabled={!item.subjectId}
                    >
                      <IoEyeOutline size={20} />
                    </button>
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

      {/* DeleteModal for single deletion */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />

      {/* View enrolled students modal */}
      {viewModalOpen && (
        <CustomModal
          title="Enrolled Students"
          type="enrolled"
          data={viewData}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </>
  );
}
