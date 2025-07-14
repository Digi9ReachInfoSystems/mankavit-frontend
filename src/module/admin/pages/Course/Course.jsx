// src/components/CoursesTable/CoursesTable.jsx
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
  ButtonContainer,
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  CloseButtonContainer
} from "./Course.style";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { Select, Switch } from "antd";
import {
  getAllCourses,
  deleteCourseById,
  updateCourseById,
  bulkDeleteCourse,
  getAllCourseAdmin
} from "../../../../api/courseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

export default function CoursesTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);

  // derived state
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [TOTAL_ENTRIES, setTOTAL_ENTRIES] = useState(0);

  // delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // detail modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [subjectsModalOpen, setSubjectsModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // const payload = await getAllCourses();
      const payload = await getAllCourseAdmin();
      console.log("payload", payload);
      const coursesArray = payload.data || [];
      const courseData = coursesArray.map((item) => ({
        id: item._id,
        courseName: item.courseDisplayName,
        internalName: item.courseName,
        subjects: Array.isArray(item.subjects) ? item.subjects : [],
        mockTests: Array.isArray(item.mockTests) ? item.mockTests : [],
        students: Array.isArray(item.student_enrolled)
          ? item.student_enrolled
          : [],
        dateAndTime: item.updatedAt || new Date().toISOString(),
        isPublished: !!item.isPublished,
      }));
      console.log("courseData", courseData);
      setData(courseData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // sort / search / paginate
  useEffect(() => {
    let processed = [...data];
    if (sortOption === "Latest") {
      processed.sort(
        (a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime)
      );
    } else {
      processed.sort((a, b) => a.courseName.localeCompare(b.courseName));
    }
    if (searchText) {
      processed = processed.filter((c) =>
        c.courseName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const total = processed.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const items = processed.slice(start, start + ITEMS_PER_PAGE);

    setFilteredData(processed);
    setTOTAL_ENTRIES(total);
    setTotalPages(pages);
    setCurrentItems(items);
  }, [data, sortOption, searchText, currentPage]);

  const handleDeleteClick = (id) => {
    setSelectedCourse(id);
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteCourseById(selectedCourse);
      toast.success("Deleted successfully");
      await fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCourse(null);
    }
  };

  const handlePublishToggle = async (id, checked) => {
    if (readOnlyPermissions) {
      toast.error("You don't have permission to change publish status");
      return;
    }
    setData((d) =>
      d.map((c) => (c.id === id ? { ...c, isPublished: checked } : c))
    );
    try {
      await updateCourseById(id, { isPublished: checked });
      toast.success(
        `Course ${checked ? "published" : "unpublished"} successfully`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update publication status");
      // rollback
      setData((d) =>
        d.map((c) =>
          c.id === id ? { ...c, isPublished: !checked } : c
        )
      );
    }
  };

  const openModal = (type, data) => {
    setModalType(type);
    console.log(data);
    setModalData(Array.isArray(data) ? data : []);
    setModalOpen(true);
  };
  const returnMockTestCount = (subjects) => {

    let mockTestData = [];
    subjects.map((s) => {
      mockTestData = mockTestData.concat(s.mockTests);
    });
    return mockTestData.length
  }

  const formatToIST = (iso) =>
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(iso));
  const handleBulkDeleteClick = () => {
    setBulkDeleteModalOpen(true);
  }

  const handleCheckboxChange = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(currentItems.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteCourse(selectedCourses);
      toast.success("Selected courses deleted successfully");
      setSelectedCourses([]);
      setSelectAll(false);
      await fetchCourses();
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error("Failed to delete selected courses");
    } finally {
      setBulkDeleteModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <ButtonContainer>
        {
          !readOnlyPermissions && (
            <CreateButton
              onClick={() => navigate("/admin/course-management/create")}
            >
              Add Course
            </CreateButton>
          )
        }
        {/* <CreateButton
          onClick={() => navigate("/admin/course-management/create")}
        >
          Add Course
        </CreateButton> */}
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Courses <span>({currentItems.length}/{TOTAL_ENTRIES})</span>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              value={sortOption}
              onChange={(v) => { setSortOption(v); setCurrentPage(1); }}
              options={[
                { value: "Latest", label: "Latest" },
                { value: "Name", label: "Name" },
              ]}
              style={{ width: 120 }}
            />
          </SortByContainer>
        </HeaderRow>
        <ButtonContainer>
          {/* <CreateButton onClick={() => navigate("/admin/course-management/create")}>
            Add Course
          </CreateButton> */}
          {selectedCourses.length > 0 && (
            <CreateButton onClick={handleBulkDeleteClick} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete Selected ({selectedCourses.length})
            </CreateButton>
          )}
        </ButtonContainer>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
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
                    {!readOnlyPermissions && (
                      <TableHeader>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </TableHeader>
                    )}
                    <TableHeader>Course Name</TableHeader>
                    <TableHeader>Internal Name</TableHeader>
                    <TableHeader>Subjects</TableHeader>
                    <TableHeader>Mock Tests</TableHeader>
                    <TableHeader>Enrolled</TableHeader>
                    <TableHeader>Date & Time (IST)</TableHeader>
                    <TableHeader>Published</TableHeader>
                    {/* <TableHeader>Actions</TableHeader> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((c) => (
                    <TableRow key={c.id}>
                      {!readOnlyPermissions && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(c.id)}
                            onChange={() => handleCheckboxChange(c.id)}
                          />
                        </TableCell>
                      )}

                      <TableCell

                      >
                        <a
                          href="#"
                          onClick={() =>
                            navigate(
                              `/admin/course-management/edit/${c.id}`
                            )
                          }
                        >
                          {c.courseName}
                        </a>

                      </TableCell>
                      <TableCell>
                        <a
                          href="#"
                          onClick={() =>
                            navigate(
                              `/admin/course-management/edit/${c.id}`
                            )
                          }
                        >
                          {c.internalName}
                        </a>
                      </TableCell>
                      <TableCell>
                        {c.subjects?.length}{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("c.subjects", c.subjects);
                            openModal("subjects", c.subjects);
                          }}
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell>
                        {returnMockTestCount(c.subjects)}{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("c.mockTests", c.subjects);
                            let mockTestData = [];
                            c.subjects.map((s) => {
                              mockTestData = mockTestData.concat(s.mockTests);
                            });
                            openModal("mockTests", mockTestData);
                          }}
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell>
                        {c.students.length}{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openModal("students", c.students);
                          }}
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell>{formatToIST(c.dateAndTime)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={c.isPublished}
                          onChange={(ch) =>
                            handlePublishToggle(c.id, ch)
                          }
                        />
                      </TableCell>
                      {/* <TableCell>
                        <ActionsContainer>
                          <IoEyeOutline
                            size={20}
                            onClick={() =>
                              navigate(
                                `/admin/course-management/view/${c.id}`
                              )
                            }
                          />
                          <BiEditAlt
                            size={20}
                            onClick={() =>
                              navigate(
                                `/admin/course-management/edit/${c.id}`
                              )
                            }
                          />
                          <RiDeleteBin6Line
                            size={20}
                            color="#fb4f4f"
                            onClick={() => handleDeleteClick(c.id)}
                          />
                        </ActionsContainer>
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
              totalItems={TOTAL_ENTRIES}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
        <DeleteModal
          isOpen={bulkDeleteModalOpen}
          onClose={() => setBulkDeleteModalOpen(false)}
          onDelete={handleBulkDelete}
        />

        {modalOpen && (
          <CustomModal
            title={modalType}
            data={modalData}
            type={modalType}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Container>
      {subjectsModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ margin: "0rem", backgroundColor: "#f1f1f1", padding: "1rem" }}>All Courses</h2>
            {coursesList.length === 0 ? (
              <p>No courses enrolled.</p>
            ) : (
              <CourseList>
                {coursesList.map((course, index) => (
                  <CourseItem key={index}>{course}</CourseItem>
                ))}
              </CourseList>
            )}
            <CloseButtonContainer>
              <CloseButton onClick={() => setCoursesModalOpen(false)}>Close</CloseButton>
            </CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
