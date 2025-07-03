import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  HeaderRow,
  Title,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ViewLink,
  CreateButton,
  ButtonContainer,
  ActionsWrapper
} from "../RecordedClass/RecordedClass.style";
import Pagination from "../../../component/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import CustomModal from "../../../component/CustomModal/CustomModal";
import { getAllRecordedClasses, deleteRecordedClassById, bulkDeleteRecordedClasses } from "../../../../../api/recordedAPi";

const ITEMS_PER_PAGE = 10;

export default function RecordedClass() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [coursesModalData, setCoursesModalData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [BulkDelete, setBulkDelete] = useState(false);
  const [selectedRecordedClasses, setSelectedRecordedClasses] = useState([]);
  useEffect(() => {
    const fetchRecordedClasses = async () => {
      setLoading(true);
      try {
        const response = await getAllRecordedClasses();
        if (response && response.data) {
          const responseData = Array.isArray(response.data)
            ? response.data
            : response.data.data || [];
          setData(responseData);

        } else {
          setData([]);
          toast.warn('No recorded classes found', { autoClose: 3000 });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recorded classes");
        toast.error('Failed to fetch recorded classes', { autoClose: 4000 });
      } finally {
        setLoading(false);
      }
    };

    fetchRecordedClasses();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const confirmDelete = id => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteRecordedClassById(deleteId);
      setData(d => d.filter(item => item._id !== deleteId));
      setShowDeleteModal(false);
      toast.success('Recorded class deleted successfully!', { autoClose: 3000 });
    } catch (err) {
      console.error(err);
      setError("Failed to delete");
      toast.error('Failed to delete recorded class', { autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const openCoursesModal = course_ref => {
    const courses = Array.isArray(course_ref)
      ? course_ref
      : course_ref
        ? [course_ref]
        : [];
    setCoursesModalData(courses);
    setShowCoursesModal(true);
  };

  const handleView = (row) => {
    navigate(
      `/admin/recorded-classes/view/${row._id}`,
      { state: { row } }
    );
  };

  const handleEdit = (row) => {
    navigate(
      `/admin/recorded-classes/edit/${row._id}`,
      { state: { row } }
    );
  };

  const handleCreate = () => {
    navigate("/admin/recorded-classes/create");
  };
  const handleBulkDeleteClick = () => {
    setBulkDelete(true);

  };
  const handleCheckboxChange = (itemId) => {
    setSelectedRecordedClasses((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRecordedClasses([]);
    } else {
      setSelectedRecordedClasses(currentItems.map((c) => c._id));
    }
    setSelectAll(!selectAll);
  };
  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteRecordedClasses(selectedRecordedClasses);
      toast.success("Selected Recorded Class deleted successfully", {
        autoClose: 3000, // Ensure this matches your toast duration
        onClose: () => {

          window.location.reload();
        }
      });
      setSelectedRecordedClasses([]);
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
        theme="colored"
      />

      <ButtonContainer>
        <CreateButton onClick={handleCreate}>
          Upload recorded class
        </CreateButton>
      </ButtonContainer>
      <ButtonContainer>
        {/* <CreateButton onClick={() => navigate("/admin/course-management/create")}>
                          Add Course
                        </CreateButton> */}
        {selectedRecordedClasses.length > 0 && (
          <CreateButton onClick={handleBulkDeleteClick} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
            Delete Selected ({selectedRecordedClasses.length})
          </CreateButton>
        )}
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>Recorded Classes</Title>
        </HeaderRow>

        {error && <div style={{ color: "red", margin: "1em 0" }}>{error}</div>}
        {loading && <div>Loading…</div>}

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </TableHeader>
                <TableHeader>Title</TableHeader>
                {/* <TableHeader>Description</TableHeader> */}
                <TableHeader>Courses</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
              </tr>
            </TableHead>
            <TableBody>
              {currentItems.map(row => {
                const courses = Array.isArray(row.course_ref)
                  ? row.course_ref
                  : row.course_ref
                    ? [row.course_ref]
                    : [];



                return (
                  <TableRow key={row._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRecordedClasses.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        href="#"
                        onClick={() => {
                          navigate(`/admin/recorded-classes/edit/${row._id}`, { state: { row } });
                        }

                        }
                        style={{ textDecoration: "none", }}
                      >
                        {row.title}
                      </a>
                    </TableCell>
                    {/* <TableCell>{row.description}</TableCell> */}
                    <TableCell>
                      {courses.length}{" "}
                      {courses.length > 0 && (
                        <ViewLink onClick={() => openCoursesModal(row.course_ref)}>
                          View
                        </ViewLink>
                      )}
                    </TableCell>
                    {/* <TableCell>
                      <ActionsWrapper>
                        <IoEyeOutline
                          size={20}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleView(row)}
                        />
                        <BiEditAlt
                          size={20}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(row)}
                        />
                        <RiDeleteBin6Line
                          size={20}
                          color="#FB4F4F"
                          style={{ cursor: "pointer" }}
                          onClick={() => confirmDelete(row._id)}
                        />
                      </ActionsWrapper>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            toast.info('Deletion cancelled', { autoClose: 2000 });
          }}
          onDelete={handleDelete}
          isLoading={loading}
        />
      )}
      <DeleteModal
        isOpen={BulkDelete}
        onClose={() => {
          setBulkDelete(false);
          toast.info('Deletion cancelled', { autoClose: 2000 });
        }}
        onDelete={handleBulkDelete}
        isLoading={loading}
      />

      {showCoursesModal && (
        <CustomModal
          title="Courses"
          type="courses"
          data={coursesModalData}
          onClose={() => {
            setShowCoursesModal(false);
          }}
        />
      )}
    </>
  );
}