import React, { useEffect, useState } from 'react';
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
  SearchInput,
} from "../StudentManagement/StudentManagement.style";
import { getAllLectures, deleteLectureById } from '../../../../api/lecturesApi';
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import Pagination from "../../component/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 8;

export default function Lecturer() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewLecture, setViewLecture] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  // ⬇ Fetch Lectures moved outside for reuse ⬇
  const fetchLectures = async () => {
    try {
      const response = await getAllLectures();
      console.log('Fetched lectures:', response);
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const filteredLectures = data.filter((lecture) =>
    lecture?.lectureName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredLectures.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredLectures.slice(startIndex, endIndex);

  const handleDeleteClick = (id) => {
    setSelectedLecture(id);
    setDeleteModalOpen(true);
  };

  // ✅ Made async
  const handleDeleteConfirm = async () => {
    try {
      await deleteLectureById(selectedLecture);
      toast.success("Lecturer deleted successfully");
      await fetchLectures();
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      toast.error("Failed to delete lecturer");
    } finally {
      setDeleteModalOpen(false);
      setSelectedLecture(null);
    }
  };

  const handleViewClick = (lecture) => {
    navigate(`/admin/lecturer-management/view/${lecture._id}`, {
      state: { lecture }
    });
  };

  const handleEdit = (id) => {
    const lecture = data.find((lecture) => lecture._id === id);
    if (lecture) {
      navigate(`/admin/lecturer-management/edit/${id}`, {
        state: { lecture }
      });
    }
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/lecturer-management/create")}>Add Lecturer</CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Lecturers <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>({TOTAL_ENTRIES})</span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="Status">Status</option>
              <option value="KYCStatus">KYC Status</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
          <SearchInput placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader>Lecture Name</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Video</TableHeader>
                <TableHeader>Image</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
           <TableRow key={item._id}>
  <TableCell>{startIndex + index + 1}</TableCell>
  <TableCell>{item.lectureName}</TableCell>
  <TableCell>{item.description || '-'}</TableCell>
  <TableCell>{item.duration || '-'}</TableCell>
  <TableCell>
    <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">View</a>
  </TableCell>
  <TableCell> 
    <a href={item.thumbnail} target="_blank" rel="noopener noreferrer">View</a>
  </TableCell>
  <TableCell>
    <ActionsContainer>
      <IoEyeOutline title="View" color="#000000" size={20} onClick={() => handleViewClick(item)} />
      <BiEditAlt title="Edit" color="#000000" size={20} onClick={() => handleEdit(item._id)} />
      <RiDeleteBin6Line size={20} color="#FB4F4F" title="Delete" onClick={() => handleDeleteClick(item._id)} />
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
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {viewModalOpen && (
        <CustomModal onClose={() => setViewModalOpen(false)}>
          <h3>Lecture Details</h3>
          {viewLecture && (
            <div>
              <p><strong>Name:</strong> {viewLecture.lectureName}</p>
              <p><strong>Description:</strong> {viewLecture.description}</p>
              <p><strong>Course:</strong> {viewLecture.courseRef?.courseName || 'N/A'}</p>
              <p><strong>Subject:</strong> {viewLecture.subjectRef?.subjectName || 'N/A'}</p>
              <p><strong>Video URL:</strong> <a href={viewLecture.videoUrl} target="_blank" rel="noopener noreferrer">{viewLecture.videoUrl}</a></p>
            </div>
          )}
        </CustomModal>
      )}

      {deleteModalOpen && (
        <DeleteModal
        isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}
    </>
  );
}
