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
import { getSubjects, deleteSubjectByid} from "../../../../api/subjectApi";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const mockData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  subjectName: "CLAT Coaching",
  internalName: "Anuja Admin",
  mockTest: ["Mock Test 1", "Mock Test 2", "Mock Test 3", "Mock Test 4", "Mock Test 5", "Mock Test 6", "Mock Test 7", "Mock Test 8", "Mock Test 9"],
  activeCourses: ["Course A", "Course B", "Course C", "Course D", "Course E", "Course F", "Course G", "Course H", "Course I"],
  dateandtime: "2023-06-01 10:00 AM",
}));


// const TOTAL_ENTRIES = 100;       // e.g. total number of subjects
const ITEMS_PER_PAGE = 10;
export default function Subjects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(mockData);
  const [searchText, setSearchText] = useState("");
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [sortOption, setSortOption] = useState('Name');
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    const appiCaller = async () => {
      try {
        const subjectResponse = await getSubjects();
        const subjectsData = subjectResponse.data.map((item) => ({
          id: item._id,
          subjectName: item.subjectDisplayName,
          internalName: item.subjectName,
          mockTest: item.mockTests.map((mockTest) => mockTest.courseName),
          activeCourses: item.courses.map((course) => course.courseName),
          dateandtime: item.updatedAt,
        }))
        console.log(subjectsData);
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
        console.log("error",error);
      }

    }
    appiCaller();
  }, [])

useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const subjectResponse = await getSubjects();
      const subjectsData = subjectResponse.data.map((item) => ({
        id: item._id,
        subjectName: item.subjectDisplayName,
        internalName: item.subjectName,
        mockTest: item.mockTests.map((mockTest) => mockTest.courseName),
        activeCourses: item.courses.map((course) => course.courseName),
        dateandtime: item.updatedAt,
      }));
      setData(subjectsData);
    } catch (error) {
      console.log("error", error);
    }
  };
  fetchSubjects();
}, []);


// ✅ Second useEffect for filtering, sorting and pagination (runs when data, search, sort, or page change)
useEffect(() => {
  let processedData = [...data];

  // Filter by search
  if (searchText) {
    processedData = processedData.filter((item) =>
      item.subjectName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Sort based on option
  if (sortOption === "Name") {
    processedData.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
    } else if (sortOption === 'Date') {
      processedData.sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
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
}, [data, searchText, sortOption, currentPage]);



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
              defaultValue={sortOption}
              style={{ width: 120 }}
              onChange={(value) => setSortOption(value)}
              options={[
                { value: 'Name', label: 'Name' },
                { value: 'Date', label: 'Date' },
                // { value: 'Active', label: 'Active' },
              ]}
            />
           
          </SortByContainer>
        </HeaderRow>

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
                <TableHeader>Subject Name</TableHeader>
                <TableHeader>Internal Name</TableHeader>
                <TableHeader>No. of Mock Test</TableHeader>
                <TableHeader>Active Courses</TableHeader>
                <TableHeader>Date and Time IST</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.subjectName}</TableCell>
                  <TableCell>{item.internalName}</TableCell>

                  <TableCell>
                    {item.mockTest?.length || 0}{" "}
                    <a href="#view" onClick={() => handleOpenModal("mockTests", item.mockTest)}>View</a>

                  </TableCell>

                  <TableCell>
                    {item.activeCourses?.length || 0}{" "}
                    <a href="#view" onClick={() => handleOpenModal("activeCourses", item.activeCourses)}>View</a>
                  </TableCell>

                  <TableCell>{formatToIST(item.dateandtime)}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        size={20}
                        color="#000000"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewClick(item)}
                      />
                      <BiEditAlt size={20} color="#000000" style={{ cursor: "pointer" }}  onClick ={() => handleEdit(item.id)}/>
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsContainer>
                  </TableCell>
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
