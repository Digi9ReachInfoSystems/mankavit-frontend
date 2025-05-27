import React, { useEffect, useState, useMemo } from 'react';
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
  ImageModalOverlay,
  ImageModalContent,
  ModalImage,
  CloseButton,
  ModalVideo
} from "./Lecturer.style";
import { getAllLectures, deleteLectureById } from '../../../../api/lecturesApi';
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { Select } from "antd";

const ITEMS_PER_PAGE = 8;

export default function Lecturer() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [modalOpenImage, setModalOpenImage] = useState(false);
  const [modalOpenVideo, setModalOpenVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sortOption, setSortOption] = useState('Name');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchLectures = async () => {
    try {
      const response = await getAllLectures();
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const sortedLectures = useMemo(() => {
    const sortableItems = [...data];
    if (sortOption === 'Name') {
      sortableItems.sort((a, b) => {
        const nameA = a.lectureName?.toLowerCase() || '';
        const nameB = b.lectureName?.toLowerCase() || '';
        return sortDirection === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (sortOption === 'Duration') {
      sortableItems.sort((a, b) => {
        const durationA = parseInt(a.duration) || 0;
        const durationB = parseInt(b.duration) || 0;
        return sortDirection === 'asc' 
          ? durationA - durationB
          : durationB - durationA;
      });
    }
    return sortableItems;
  }, [data, sortOption, sortDirection]);

  const filteredLectures = sortedLectures.filter((lecture) =>
    lecture?.lectureName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredLectures.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredLectures.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSortChange = (value) => {
    if (value === sortOption) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(value);
      setSortDirection('asc');
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedLecture(id);
    setDeleteModalOpen(true);
  };

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setModalOpenImage(true);
  };

  const handleViewVideo = (url) => {
    setSelectedVideo(url);
    setModalOpenVideo(true);
  };

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
        <CreateButton onClick={() => navigate("/admin/lecturer-management/create")}>
          Add Lecturer
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Lecturers <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>({currentItems.length}/{TOTAL_ENTRIES})</span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              value={sortOption}
              style={{ width: 120 }}
              onChange={handleSortChange}
              options={[
                { value: 'Name', label: `Name ${sortOption === 'Name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}` },
                { value: 'Duration', label: `Duration ${sortOption === 'Duration' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}` },
              ]}
            />
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
                    {item.videoUrl ? (
                      <a href="#" onClick={(e) => { e.preventDefault(); handleViewVideo(item.videoUrl); }}>
                        View Video
                      </a>
                    ) : "No video"}
                  </TableCell>
                  <TableCell>
                    {item.thumbnail ? (
                      <a href="#" onClick={(e) => { e.preventDefault(); handleViewImage(item.thumbnail); }}>
                        View Image
                      </a>
                    ) : "No image"}
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline title="View" size={20} onClick={() => handleViewClick(item)} />
                      <BiEditAlt title="Edit" size={20} onClick={() => handleEdit(item._id)} />
                      <RiDeleteBin6Line title="Delete" size={20} color="#FB4F4F" onClick={() => handleDeleteClick(item._id)} />
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

      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

      {modalOpenImage && selectedImage && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpenImage(false)}>X</CloseButton>
            <ModalImage src={selectedImage} alt="Selected" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}

      {modalOpenVideo && selectedVideo && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpenVideo(false)}>X</CloseButton>
            <ModalVideo controls autoPlay>
              <source src={selectedVideo} type="video/mp4" width={"500px"} height={"500px"}/>
              Your browser does not support the video tag.
            </ModalVideo>
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </>
  );
}