import React, { useEffect, useState } from "react";
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
import { getAllRecordedClasses, deleteRecordedClassById } from "../../../../../api/recordedAPi";
import CustomModal from "../../../component/CustomModal/CustomModal";

const ITEMS_PER_PAGE = 10;

const RecordedClass = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalData, setModalData] = useState([]);

    console.log("modalOpen", modalOpen);
    console.log("modalType", modalType);
    console.log("modalData", modalData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllRecordedClasses();
        console.log("API Response:", response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch recorded classes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await deleteRecordedClassById(deleteId);
      
      // Update local state after successful deletion
      const updatedData = data.filter((item) => item._id !== deleteId);
      const newTotalPages = Math.ceil(updatedData.length / ITEMS_PER_PAGE);
      const newCurrentPage =
        currentPage > newTotalPages ? newTotalPages : currentPage;

      setData(updatedData);
      setCurrentPage(newCurrentPage);
      setModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting recorded class:", error);
      setError("Failed to delete recorded class");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type, data) => {

    console.log(type, data);
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/web-management/recorded-classes/create")}>
          Upload recorded class
        </CreateButton>
      </ButtonContainer>
      <Container>
        <HeaderRow>
          <Title>Recorded Class</Title>
        </HeaderRow>
        
        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
        {loading && <div>Loading...</div>}

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Courses</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {currentItems.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.course_ref.length || 0}{" "}
                    <ViewLink href={`#view`} 
                      onClick={() => handleOpenModal("courses", row.course_ref)}
                    >View</ViewLink>
                  </TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IoEyeOutline 
                        size={20}
                        color="#000"
                        onClick={() => navigate(
                          `/admin/web-management/recorded-classes/view/${row._id}`,
                          { state: { row } }
                        )}
                        style={{ cursor: "pointer" }}
                      />
                      <BiEditAlt
                        size={20}
                        color="#000"
                        onClick={() => navigate(
                          `/admin/web-management/recorded-classes/edit/${row._id}`,
                          { state: { row } }
                        )}
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(row._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsWrapper>
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
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>
      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
          isLoading={loading}
        />
      )}

            {modalOpen && (
              <CustomModal
                title={modalType ===  "courses" ? "Courses" : ""}
                type={modalType}
                data={modalData}
                onClose={() => setModalOpen(false)}
              />
            )}
    </>
  );
};

export default RecordedClass;