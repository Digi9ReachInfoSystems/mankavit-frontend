// CoursesTable.jsx
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
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "./Course.style";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "antd";
import { getAllCourses } from "../../../../api/courseApi";


// Mock data representing table rows
const mockData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  courseName: "CLAT Coaching",
  internalName: "Anuja Admin",
  subjects: ["English", "Math", "Reasoning", "Legal Aptitude", "GK"],
  mockTests: ["Test 1", "Test 2", "Test 3"],
  enrolled: ["Alice", "Bob", "Charlie", "Siri", "Rahul", "Alexa", "Akshay", "Robin"],
  dateAndTime: "24-08-2023 16:00 IST",
  students: [
    { name: "Student A" },
    { name: "Student B" },
    { name: "Student C" },
  ],
}));


// const TOTAL_ENTRIES = 100;
const ITEMS_PER_PAGE = 10;

export default function CoursesTable() {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);
  const [sortOption, setSortOption] = useState('Name');
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);



  // const filteredStudents = data.filter((student) =>
  //   student.courseName.toLowerCase().includes(searchText.toLowerCase())
  // );

  // // Pagination states
  // const [currentPage, setCurrentPage] = useState(1);

  // const TOTAL_ENTRIES = filteredStudents.length;
  // const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  // // Slicing data for current page (if you actually had 100 items, you'd slice them accordingly)
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const currentItems = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    const appiCaller = async () => {
      try {
        const courseResponse = await getAllCourses();
        const courseData = courseResponse.data.map((item) => ({
        
          id: item._id,
          courseName: item.courseDisplayName,
          internalName:item.courseName,
          subjects: item.subjects.map((subject) => subject.subjectName),
          mockTests: ["Test 1", "Test 2", "Test 3"],
          enrolled:item.student_enrolled.length>0? item.student_enrolled.map((student) => student.displayName):[],
          dateAndTime: item.updatedAt,
          students: item.student_enrolled.map((student) => ({
            name: student.displayName,
          })),
        }))
        setData(courseData);
        const filteredValue = courseData.filter((item) =>
          item.courseName.toLowerCase().includes(searchText.toLowerCase())
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
  }, [])
  useEffect(() => {
    const apiCaller = async () => {
      const courseResponse = await getAllCourses();
        const courseData = courseResponse.data.map((item) => ({
        
          id: item._id,
          courseName: item.courseDisplayName,
          internalName:item.courseName,
          subjects: item.subjects.map((subject) => subject.subjectName),
          mockTests: ["Test 1", "Test 2", "Test 3"],
          enrolled:item.student_enrolled.length>0? item.student_enrolled.map((student) => student.displayName):[],
          dateAndTime: item.updatedAt,
          students: item.student_enrolled.map((student) => ({
            name: student.displayName,
          })),
        }))
        setData(courseData);

      const sampleData = courseData.sort((a, b) => {
        if (sortOption === 'Name') {
          return a.courseName.localeCompare(b.courseName);
        } else if (sortOption === 'Date') {
          return new Date(b.dateAndTime) - new Date(a.dateAndTime)
        }
      })

      let filteredValue = sampleData;
      if (searchText !== "") {
        filteredValue = sampleData.filter((item) =>
          item.courseName.toLowerCase().includes(searchText.toLowerCase())
        )
      } else {


      }

      setFilteredData(filteredValue);
      const TOTAL_ENTRIESValues = filteredValue.length;
      setTotalEntries(TOTAL_ENTRIESValues);
      const totalPagesValues = Math.ceil(TOTAL_ENTRIESValues / ITEMS_PER_PAGE);
      setTotalPages(totalPagesValues);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentValue = filteredValue.slice(startIndex, endIndex);
      setCurrentItems(currentValue);
    };
    apiCaller();

    // currentItems = sampleData;
  }, [sortOption, searchText])

  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };

  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

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


  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => { navigate("/admin/course-management/create") }}>Add Course</CreateButton>
      </ButtonContainer>
      <Container>

        <HeaderRow>
          <Title>See All Course <span style={{
            color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400"
          }}>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              defaultValue={sortOption}
              style={{ width: 120 }}
              onChange={(value) => setSortOption(value)}
              options={[
                { value: 'Name', label: 'Name' },
                { value: 'Date', label: 'Date' },
                // { value: 'Price', label: 'Price' },
                // { value: 'Enrolled', label: 'Enrolled' },
              ]}
            />
            {/* <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="Price">Date and Time IST</option>
              <option value="Enrolled">Enrolled</option>
            </SortSelect> */}
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput placeholder="Search" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
        </SearchWrapper>

        {/* Table */}
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Course Name</TableHeader>
                <TableHeader>Internal Name</TableHeader>
                <TableHeader>No. of Subjects</TableHeader>
                <TableHeader>No. of Mock Test</TableHeader>
                <TableHeader>No. of Student Enrolled</TableHeader>
                <TableHeader>Date and Time IST</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.courseName}</TableCell>
                  <TableCell>{item.internalName}</TableCell>
                  <TableCell>
                    {item.subjects.length}
                    <a href="#view" onClick={() => openModal("subjects", item.subjects)}> View</a>
                  </TableCell>
                  <TableCell>
                    {item.mockTests.length}
                    <a href="#view" onClick={() => openModal("mockTests", item.mockTests)}> View</a>
                  </TableCell>
                  <TableCell>
                    {item.students.length}
                    <a href="#view" onClick={() => openModal("enrolled", item.students)}> View</a>
                  </TableCell>
                  <TableCell>{formatToIST(item.dateAndTime)}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <BiEditAlt title="Edit" color="#000000" size={20} onClick={() => { navigate("/admin/courses/create") }} />
                      <RiDeleteBin6Line title="Delete" size={20} color="#FB4F4F" onClick={() => handleDeleteClick(item.id)} />
                    </ActionsContainer>
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
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            setData(prevData => prevData.filter(item => item.id !== selectedStudent));
            setDeleteModalOpen(false);
            setSelectedStudent(null);
          }}
        />

        {modalOpen && (
          <CustomModal
            title={
              modalType === "subjects"
                ? "Subjects"
                : modalType === "mockTests"
                  ? "Mock Tests"
                  : modalType === "enrolled"
                    ? "Students"
                    : "Details"
            }
            type={modalType}
            data={modalData}
            onClose={() => setModalOpen(false)}
          />
        )}


      </Container>
    </>
  );
}
