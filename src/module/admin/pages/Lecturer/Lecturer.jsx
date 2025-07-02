// Lecturer.js
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  Container, HeaderRow, Title, SortByContainer, SortLabel,
  TableWrapper, StyledTable, TableHead, TableHeader, TableBody,
  TableRow, TableCell, ActionsContainer, ButtonContainer, CreateButton,
  SearchWrapper, SearchIcon, SearchInput, ImageModalOverlay,
  ImageModalContent, ModalImage, CloseButton, ModalVideo
} from './Lecturer.style';
import { getAllLectures, deleteLectureById, bulkDeleteLectures } from '../../../../api/lecturesApi';
import DeleteModal from '../../component/DeleteModal/DeleteModal';
import Pagination from '../../component/Pagination/Pagination';
import { IoEyeOutline } from 'react-icons/io5';
import { Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns';

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
  const [selectAll, setSelectAll] = useState(false);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  // NEW: default sort = Latest ↓
  const [sortOption, setSortOption] = useState('Latest');
  const [sortDirection, setSortDirection] = useState('desc');

  const fetchLectures = async () => {
    try {
      const response = await getAllLectures();
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      toast.error('Failed to fetch lectures');
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  /** ----------------------------------------------------------------
   *  Sorting
   * ----------------------------------------------------------------*/
  const sortedLectures = useMemo(() => {
    const items = [...data];
    if (sortOption === 'Name') {
      items.sort((a, b) => {
        const nameA = a.lectureName?.toLowerCase() || '';
        const nameB = b.lectureName?.toLowerCase() || '';
        return sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (sortOption === 'Duration') {
      items.sort((a, b) => {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return sortDirection === 'asc' ? durA - durB : durB - durA;
      });
    } else if (sortOption === 'Latest') {
      // Sort by createdAt (if available) else fallback to ObjectId timestamp
      items.sort((a, b) => {
        const timeA = new Date(a.createdAt || a._id);
        const timeB = new Date(b.createdAt || b._id);
        return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      });
    }
    return items;
  }, [data, sortOption, sortDirection]);

  /** ----------------------------------------------------------------
   *  Filtering + Pagination
   * ----------------------------------------------------------------*/
  const filteredLectures = sortedLectures.filter(l =>
    l?.lectureName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredLectures.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredLectures.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /** ----------------------------------------------------------------
   *  Handlers
   * ----------------------------------------------------------------*/
  const handleSortChange = value => {
    if (value === sortOption) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOption(value);
      setSortDirection('asc');
    }
  };

  const handleDeleteClick = id => {
    setSelectedLecture(id);
    setDeleteModalOpen(true);
  };

  const handleViewImage = url => {
    setSelectedImage(url);
    setModalOpenImage(true);
  };

  const handleViewVideo = url => {
    setSelectedVideo(url);
    setModalOpenVideo(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteLectureById(selectedLecture);
      toast.success('Lecturer deleted successfully');
      await fetchLectures();
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      toast.error('Failed to delete lecturer');
    } finally {
      setDeleteModalOpen(false);
      setSelectedLecture(null);
    }
  };

  const handleViewClick = lecture => {
    navigate(`/admin/lecturer-management/view/${lecture._id}`, {
      state: { lecture },
    });
  };

  const handleEdit = id => {
    const lecture = data.find(l => l._id === id);
    if (lecture) {
      navigate(`/admin/lecturer-management/edit/${id}`, {
        state: { lecture },
      });
    }
  };
  const handleBulkDeleteClick = () => {
    setBulkDeleteModalOpen(true);
  }
  const handleCheckboxChange = (lectureId) => {
    setSelectedLectures((prev) =>
      prev.includes(lectureId)
        ? prev.filter((id) => id !== lectureId)
        : [...prev, lectureId]
    );
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedLectures([]);
    } else {
      setSelectedLectures(currentItems.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  };
  const handleBulkDelete = async () => {
    try {
      // setLoading(true);
      await bulkDeleteLectures(selectedLectures);
      toast.success("Selected Lectures deleted successfully", {
        autoClose: 3000, // Ensure this matches your toast duration
        // onClose: () => {

        //   window.location.reload();
        // }
      });
      setSelectedLectures([]);
      setSelectAll(false);
      // await fetchCourses();
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error("Failed to delete selected courses");
    } finally {
      // setLoading(false);
      setBulkDeleteModalOpen(false);
    }
  };

  /** ----------------------------------------------------------------
   *  Render
   * ----------------------------------------------------------------*/
  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate('/admin/lecturer-management/create')}>
          Add Lecturer
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Lecturers{' '}
            <span style={{ color: '#6d6e75', fontSize: '12px', fontWeight: '400' }}>
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              value={sortOption}
              style={{ width: 140 }}
              onChange={handleSortChange}
              options={[
                { value: 'Latest', label: `Latest ${sortDirection === 'asc' && sortOption === 'Latest' ? '↑' : sortOption === 'Latest' ? '↓' : ''}` },
                { value: 'Name', label: `Name ${sortDirection === 'asc' && sortOption === 'Name' ? '↑' : sortOption === 'Name' ? '↓' : ''}` },
                { value: 'Duration', label: `Duration ${sortDirection === 'asc' && sortOption === 'Duration' ? '↑' : sortOption === 'Duration' ? '↓' : ''}` },
              ]}
            />
          </SortByContainer>
        </HeaderRow>
        <ButtonContainer>
          {/* <CreateButton onClick={() => navigate("/admin/course-management/create")}>
            Add Course
          </CreateButton> */}
          {selectedLectures.length > 0 && (
            <CreateButton onClick={handleBulkDeleteClick} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete Selected ({selectedLectures.length})
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
            onChange={e => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                {/* <TableHeader>#</TableHeader> */}
                <TableHeader>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </TableHeader>
                <TableHeader>Lecture Name</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Video</TableHeader>
                <TableHeader>Image</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item._id}>
                  {/* <TableCell>{startIndex + index + 1}</TableCell> */}
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedLectures.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={() =>
                        navigate(`/admin/lecturer-management/edit/${item._id}`, {
                          state: { item },
                        })
                      }
                    >
                      {item.lectureName}
                    </a>
                  </TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
                  <TableCell>{item.duration || '-'}</TableCell>
                  <TableCell>
                    {item.videoUrl ? (
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          handleViewVideo(item.videoUrl);
                        }}
                      >
                        View Video
                      </a>
                    ) : (
                      'No video'
                    )}
                  </TableCell>
                  <TableCell>
                    {item.thumbnail ? (
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          handleViewImage(item.thumbnail);
                        }}
                      >
                        View Image
                      </a>
                    ) : (
                      'No image'
                    )}
                  </TableCell>
                  {/* <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        title="View"
                        size={20}
                        onClick={() => handleViewClick(item)}
                      />
                      <BiEditAlt
                        title="Edit"
                        size={20}
                        onClick={() => handleEdit(item._id)}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDeleteClick(item._id)}
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
      </Container >

      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )
      }
      {bulkDeleteModalOpen && (
        <DeleteModal
          isOpen={bulkDeleteModalOpen}
          onClose={() => setBulkDeleteModalOpen(false)}
          onDelete={handleBulkDelete}
        />
      )
      }

      {
        modalOpenImage && selectedImage && (
          <ImageModalOverlay>
            <ImageModalContent>
              <CloseButton onClick={() => setModalOpenImage(false)}>X</CloseButton>
              <ModalImage src={selectedImage} alt="Selected" />
            </ImageModalContent>
          </ImageModalOverlay>
        )
      }

      {
        modalOpenVideo && selectedVideo && (
          <ImageModalOverlay>
            <ImageModalContent>
              <CloseButton onClick={() => setModalOpenVideo(false)}>X</CloseButton>
              <ModalVideo controls autoPlay>
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </ModalVideo>
            </ImageModalContent>
          </ImageModalOverlay>
        )
      }

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
        theme="colored"
      />
    </>
  );
}
