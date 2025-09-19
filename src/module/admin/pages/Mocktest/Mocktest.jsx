import React, { useState, useEffect } from "react";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
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
  ToggleLabel,
  ButtonContainer,
  CreateButton,
} from "./Mocktest.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import styled from "styled-components";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import {
  getAllMocktest,
  deleteMocktestById,
  publishMocktestById,
  getMocktestBySubjectname,
  bulkdeleteMocktest,
} from "../../../../api/mocktestApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

const ScrollableDropdown = styled(Select)`
  .ant-select-dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
  }
`;

const ts = (item) =>
  item.createdAt
    ? new Date(item.createdAt).getTime()
    : item.updatedAt
    ? new Date(item.updatedAt).getTime()
    : item.id?.length >= 8
    ? parseInt(item.id.substring(0, 8), 16) * 1000
    : 0;

export default function MockTestsTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [subjectsModalOpen, setSubjectsModalOpen] = useState(false);
  const [currentSubjects, setCurrentSubjects] = useState([]);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const [selectedMockTests, setSelectedMockTests] = useState([]);
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

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  useEffect(() => {
    fetchMockTests(selectedSubject);
  }, [selectedSubject]);

  const fetchMockTests = async (subjectName = "all") => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (subjectName && subjectName !== "all") {
        res = await getMocktestBySubjectname(subjectName);
      } else {
        res = await getAllMocktest();
      }
      
      if (!res.success) throw new Error("Failed to load mock tests");

      const rows = res.data
        .map((test) => ({
          id: test._id,
          mockTitle: test.title,
          createdOn: new Date(test.createdAt).toLocaleString(),
          updatedOn: new Date(test.updatedAt).toLocaleString(),
          isPublished: test.isPublished || false,
          createdAtRaw: test.createdAt,
          subjects: test.subject || [],
          subjectId: test.subject?.[0]?.subjectName || "",
          students: test.students || [],
          questionTypes: Array.isArray(test.questions)
            ? [...new Set(test.questions.map((q) => q.type))].join(", ")
            : "—",
          totalMarks: test.totalMarks,
        }))
        .sort((a, b) => ts(b) - ts(a));

      setData(rows);
    } catch (err) {
      // // // console.error(err);
      setError(err.message || "Unknown error");
      toast.error(err.message || "Failed to load mock tests");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSubjects = async () => {
    try {
      const res = await getAllMocktest();
      if (res.success) {
        const allSubjects = new Set();
        res.data.forEach((test) => {
          if (test.subject && Array.isArray(test.subject)) {
            test.subject.forEach((sub) => {
              if (sub.subjectName) {
                allSubjects.add(sub.subjectName);
              }
            });
          }
        });

        const formattedSubjects = Array.from(allSubjects).map((s) => ({
          value: s,
          label: s,
        }));
        setSubjects([
          { value: "all", label: "All Subjects" },
          ...formattedSubjects,
        ]);
      }
    } catch (err) {
      // // // console.error("Failed to fetch subjects:", err);
    }
  };

  const handleSubjectChange = async (subjectName) => {
    setSelectedSubject(subjectName);
    setCurrentPage(1);
  };

  const handleDeleteClick = (id) => {
    setSelectedToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting mock test...");
    try {
      const res = await deleteMocktestById(selectedToDelete);
      if (!res.success)
        throw new Error(res.message || "Deletion failed on server");
      toast.success(res.message || "Mock test deleted successfully", {
        id: toastId,
      });
      await fetchMockTests(selectedSubject);
    } catch (err) {
      toast.error(err.message || "Could not delete mock test", { id: toastId });
    } finally {
      setDeleteModalOpen(false);
      setSelectedToDelete(null);
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    if (readOnlyPermissions) {
      toast.error("You don't have permission to change publish status");
      return;
    }
    const newStatus = !currentStatus;
    setData(
      data.map((item) =>
        item.id === id ? { ...item, isPublished: newStatus } : item
      )
    );
    try {
      const response = await publishMocktestById(id, newStatus);
      if (!response.success) throw new Error("Publish update failed");
    } catch (error) {
      setData(
        data.map((item) =>
          item.id === id ? { ...item, isPublished: currentStatus } : item
        )
      );
      toast.error("Failed to update publish status");
    }
  };

  const handleViewSubjects = (subjects) => {
    setCurrentSubjects(subjects);
    setSubjectsModalOpen(true);
  };

  const handleCheckboxChange = (mocktestId) => {
    setSelectedMockTests((prev) =>
      prev.includes(mocktestId)
        ? prev.filter((id) => id !== mocktestId)
        : [...prev, mocktestId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedMockTests([]);
    } else {
      setSelectedMockTests(filtered.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDeleteClick = () => {
    setBulkDeleteModalOpen(true);
  };

  const handleBulkDelete = async () => {
    
    try {
      
      setLoading(true);
      await bulkdeleteMocktest(selectedMockTests);
      
      // // // console.log("selectedMockTests", selectedMockTests);
      toast.success("Selected mock tests deleted successfully");
      setSelectedMockTests([]);
      setSelectAll(false);
      await fetchMockTests(selectedSubject);
    } catch (error) {
      // // // console.error("Bulk delete failed:", error);
      toast.error("Failed to delete selected mock tests");
    } finally {
      setBulkDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const filtered = data
    .filter((item) =>
      item.mockTitle.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Latest") {
        return ts(b) - ts(a); // latest first
      } else if (sortOption === "Name") {
        return a.mockTitle.localeCompare(b.mockTitle); // A-Z
      }
      return 0;
    });

  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // if (loading)
    // return <div style={{ marginLeft: "60px" }}>Loading mock tests…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        {!readOnlyPermissions && (
          <>
            <CreateButton onClick={() => navigate("/admin/results")}>
              View Submissions
            </CreateButton>
            <CreateButton
              onClick={() => navigate("/admin/mock-test/create-mock-test")}
            >
              Add Mocktest
            </CreateButton>
          </>
        )}
      </div>

      <Container>
        <HeaderRow>
          <Title>
            Mock Tests{" "}
            <small>
              ({pageItems.length}/{totalEntries})
            </small>
          </Title>
          <SortByContainer>
            <SortLabel>Filter by:</SortLabel>
            <ScrollableDropdown
              value={selectedSubject}
              onChange={handleSubjectChange}
              options={subjects}
              style={{ width: 180, marginRight: "10px" }}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              dropdownStyle={{ maxHeight: 300, overflowY: "auto" }}
              dropdownRender={(menu) => (
                <div style={{ maxHeight: 300, overflowY: "auto" }}>{menu}</div>
              )}
            />
            <SortLabel>Sort by:</SortLabel>

            <Select
              value={sortOption}
              onChange={(value) => {
                setSortOption(value);
                setCurrentPage(1);
              }}
              options={[
                { value: "Latest", label: "Latest" },
                { value: "Name", label: "Name" },
              ]}
              style={{ width: 120 }}
            />
          </SortByContainer>
        </HeaderRow>

        <ButtonContainer>
          {selectedMockTests.length > 0 && (
            <CreateButton
              onClick={handleBulkDeleteClick}
              style={{ backgroundColor: "red", marginLeft: "10px" }}
            >
              Delete Selected ({selectedMockTests.length})
            </CreateButton>
          )}
        </ButtonContainer>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ color: "black" }}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                {!readOnlyPermissions && (
                  <TableHeader>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </TableHeader>
                )}
                <TableHeader>Mock Test Name</TableHeader>
                <TableHeader>Created on</TableHeader>
                <TableHeader>Updated at</TableHeader>
                <TableHeader>Subjects</TableHeader>
                <TableHeader>Question type</TableHeader>
                <TableHeader>Total marks</TableHeader>
                <TableHeader>Published</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
                <TableHeader>View Submission</TableHeader>
                <TableHeader>View Ranking</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageItems.map((item) => (
                <TableRow key={item.id}>
                  {!readOnlyPermissions && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedMockTests.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell><a href={`/admin/mock-test/edit/${item.id}`}>{item.mockTitle}</a></TableCell>
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.updatedOn}</TableCell>
                  <TableCell>
                    {item.subjects?.length || 0}{" "}
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1890ff",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleViewSubjects(item.subjects)}
                      disabled={!item.subjects?.length}
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell>{item.questionTypes}</TableCell>
                  <TableCell>{item.totalMarks}</TableCell>
                  <TableCell>
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={item.isPublished}
                        style={{ display: "none" }}
                        onChange={() =>
                          handlePublishToggle(item.id, item.isPublished)
                        }
                      />
                      <ToggleSlider $isPublished={item.isPublished} />
                      <ToggleLabel $isPublished={item.isPublished}>
                        {item.isPublished ? "Yes" : "No"}
                      </ToggleLabel>
                    </ToggleSwitch>
                  </TableCell>
                  {/* <TableCell>
                    <ActionsContainer>
                      {!readOnlyPermissions && (
                        <>
                          <BiEditAlt
                            title="Edit"
                            size={20}
                            onClick={() =>
                              navigate(`/admin/mock-test/edit/${item.id}`)
                            }
                          />
                          <RiDeleteBin6Line
                            title="Delete"
                            size={20}
                            color="#FB4F4F"
                            onClick={() => handleDeleteClick(item.id)}
                          />
                        </>
                      )}
                    </ActionsContainer>
                  </TableCell> */}
                  <TableCell style={{ textAlign: "center" }}>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        cursor: item.subjectId ? "pointer" : "not-allowed",
                      }}
                      onClick={() =>
                        item.subjectId &&
                        navigate(
                          `/admin/mock-test/user-result/${item.id}/${item.subjectId}`
                        )
                      }
                      disabled={!item.subjectId}
                    >
                      <IoEyeOutline size={20} />
                    </button>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        cursor: item.subjectId ? "pointer" : "not-allowed",
                      }}
                      onClick={() =>{
                        // // console.log("item.subjectId", item);
                        item.subjectId &&
                        navigate(
                          `/admin/mock-test/user-ranking/${item.id}/${item.subjectId}`
                        )
                      }
                      }
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

      {/* Bulk Delete Modal */}
      <DeleteModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onDelete={handleBulkDelete}
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

      {/* Subjects modal */}
      {subjectsModalOpen && (
        <CustomModal
          title="Subjects"
          type="subjects"
          data={currentSubjects}
          onClose={() => setSubjectsModalOpen(false)}
        />
      )}
    </>
  );
}