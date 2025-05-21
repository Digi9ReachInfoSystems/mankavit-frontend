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
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { getAllRecordedClasses, deleteRecordedClassById } from "../../../../../api/recordedAPi";

const ITEMS_PER_PAGE = 10;

const RecordedClass = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
                    {row.courses?.length || 0}{" "}
                    <ViewLink href={`#view/${row._id}`}>View</ViewLink>
                  </TableCell>
                  <TableCell>
                    <ActionsWrapper>
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
    </>
  );
};

export default RecordedClass;