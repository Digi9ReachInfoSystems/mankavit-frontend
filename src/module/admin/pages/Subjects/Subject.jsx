// SubjectsTable.jsx
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
  ActionsContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  CreateButton,
  ButtonContainer,
} from "../Subjects/Subject.style";
import Pagination from "../../component/Pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../admin/component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import { Select, Space } from "antd";
import { getSubjects, deleteSubjectByid, bulkDeleteSubjects } from "../../../../api/subjectApi";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";




const ITEMS_PER_PAGE = 10;
export default function Subjects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [BulkDelete, setBulkDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const appiCaller = async () => {
      try {
        const subjectResponse = await getSubjects();
        console.log("Jayanth respone", subjectResponse);
        const subjectsData = subjectResponse.data.map((item) => ({
          id: item._id,
          subjectName: item.subjectDisplayName,
          internalName: item.subjectName,
          mockTest: item.mockTests.map((mockTest) => mockTest.title),
          activeCourses: item.courses.map((course) => course.courseName),
          dateandtime: item.updatedAt,
        }))
        console.log(subjectsData);
        console.log("subjectsData", subjectsData);
        setData(subjectsData);
        const filteredValue = subjectsData.filter((item) =>
          item.subjectName.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredData(filteredValue);
        const TOTAL_ENTRIESValues = filteredValue.length;
        setTotalEntries(TOTAL_ENTRIESValues);
        const totalPagesValues = Math.ceil(TOTAL_ENTRIESValues / ITEMS_PER_PAGE);
        setTotalPages(totalPagesValues);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentValue = filteredValue.slice(startIndex, endIndex);
        setCurrentItems(currentValue);
      } catch (error) {
        console.log("error", error);
      }

    }
    appiCaller();
  }, [setBulkDelete]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectResponse = await getSubjects();
        const subjectsData = subjectResponse.data.map((item) => ({
          id: item._id,
          subjectName: item.subjectDisplayName,
          internalName: item.subjectName,
          mockTest: item.mockTests.map((mockTest) => mockTest.title),
          activeCourses: item.courses.map((course) => course.courseName),
          dateandtime: item.updatedAt,
        }));
        console.log("roshni", subjectsData);
        setData(subjectsData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchSubjects();
  }, [setBulkDelete]);


  // ✅ Second useEffect for filtering, sorting and pagination (runs when data, search, sort, or page change)
  useEffect(() => {
    let processedData = [...data];

    // Filter by search
    if (searchText) {
      processedData = processedData.filter((item) =>
        item.subjectName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortOption === "Latest") {
      processedData.sort((a, b) => new Date(b.dateandtime) - new Date(a.dateandtime)); // latest first
    } else if (sortOption === "Name") {
      processedData.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
    }

    // Update filteredData state
    setFilteredData(processedData);

    // Update pagination
    const TOTAL_ENTRIES_VALUES = processedData.length;
    setTotalEntries(TOTAL_ENTRIES_VALUES);
    const TOTAL_PAGES_VALUES = Math.ceil(TOTAL_ENTRIES_VALUES / ITEMS_PER_PAGE);
    setTotalPages(TOTAL_PAGES_VALUES);

    // Reset to page 1 if currentPage exceeds total pages
    const safePage = currentPage > TOTAL_PAGES_VALUES ? 1 : currentPage;
    setCurrentPage(safePage);

    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentValue = processedData.slice(startIndex, endIndex);
    setCurrentItems(currentValue);
  }, [data, searchText, sortOption, currentPage, setBulkDelete]);



  const formatToIST = (isoString, options = {}) => {
    try {
      const date = new Date(isoString);

      const defaultOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        ...options
      };

      return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
    } catch (error) {
      console.error('Invalid date format:', isoString);
      return 'Invalid date';
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteSubjectByid(deleteId);
      setData(prevData => {
        const newData = prevData.filter(item => item.id !== deleteId);
        return newData;
      });
      toast.success("Data deleted successfully");
    } catch (error) {
      console.error("Failed to delete subject:", error);
      toast.error("Failed to delete data. Please try again.");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  const handleViewClick = (subject) => {
    navigate(`/admin/subject-management/view/${subject.id}`, {
      state: { subject }
    });
    console.log("View subject with ID:", subject.id);
    console.log("Subject data:", subject);
  };

  const handleOpenModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const subject = data.find((item) => item.id === id);
    if (subject) {
      navigate(`/admin/subject-management/edit/${id}`, { state: { subject } });
    }

    console.log("Edit subject with ID:", id);
    console.log("Subject data:", subject);
  }
  const handleDeleteClick = () => {
    setBulkDelete(true);
  }

  const handleCheckboxChange = (subId) => {
    setSelectedSubject((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedSubject([]);
    } else {
      setSelectedSubject(currentItems.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteSubjects(selectedSubject);
      toast.success("Selected Subject deleted successfully", {
        autoClose: 3000, // Ensure this matches your toast duration
        onClose: () => {

          window.location.reload();
        }
      });
      setSelectedSubject([]);
      setSelectAll(false);
      // await fetchCourses();
      // window.location.reload(); // Reload the page to reflect changes
      setBulkDelete(false);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error("Failed to delete selected courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />

      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/subject-management/create")}>
          Add Subject
        </CreateButton>
      </ButtonContainer>

      <Container>
        {/* Header */}
        <HeaderRow>
          <Title>
            See All Subjects{" "}
            <span
              style={{
                color: "#6d6e75",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              value={sortOption}
              onChange={(value) => setSortOption(value)}
              style={{ width: 120 }}
              options={[
                { value: 'Latest', label: 'Latest' },
                { value: 'Name', label: 'Name' },
              ]}
            />

          </SortByContainer>
        </HeaderRow>
        <ButtonContainer>
          {/* <CreateButton onClick={() => navigate("/admin/course-management/create")}>
                    Add Course
                  </CreateButton> */}
          {selectedSubject.length > 0 && (
            <CreateButton onClick={handleDeleteClick} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete Selected ({selectedSubject.length})
            </CreateButton>
          )}
        </ButtonContainer>

        {/* Search Bar */}
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </SearchWrapper>

        {/* Table */}
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </TableHeader>
                <TableHeader>Subject Name</TableHeader>
                <TableHeader>Internal Name</TableHeader>
                <TableHeader>No. of Mock Test</TableHeader>
                <TableHeader>Active Courses</TableHeader>
                <TableHeader>Date and Time IST</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedSubject.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={() => {
                        navigate(`/admin/subject-management/edit/${item.id}`, { state: { item } });
                      }

                      }
                    >
                      {item.subjectName}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={() => {
                        navigate(`/admin/subject-management/edit/${item.id}`, { state: { item } });
                      }

                      }
                    >
                      {item.internalName}
                    </a>
                  </TableCell>

                  <TableCell>
                    {item.mockTest?.length || 0}{" "}
                    <a href="#view" onClick={() => {

                      const mockTest = item.mockTest.map((mockTest) => { return ({ title: mockTest }) });
                      console.log("mockTestwew", mockTest);
                      handleOpenModal("mockTests", mockTest)
                    }}>View</a>

                  </TableCell>

                  <TableCell>
                    {item.activeCourses?.length || 0}{" "}
                    <a href="#view" onClick={() => handleOpenModal("activeCourses", item.activeCourses)}>View</a>
                  </TableCell>

                  <TableCell>{formatToIST(item.dateandtime)}</TableCell>
                  {/* <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        size={20}
                        color="#000000"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewClick(item)}
                      />
                      <BiEditAlt size={20} color="#000000" style={{ cursor: "pointer" }} onClick={() => handleEdit(item.id)} />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsContainer>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {Modal && (
        <DeleteModal
          isOpen={Modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
      {BulkDelete && (
        <DeleteModal
          isOpen={BulkDelete}
          onClose={() => setBulkDelete(false)}
          onDelete={handleBulkDelete}
        />
      )}

      {modalOpen && (
        <CustomModal
          title={modalType === "mockTests" ? "Mock Test Details" : "Active Courses"}
          type={modalType}
          data={modalData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
