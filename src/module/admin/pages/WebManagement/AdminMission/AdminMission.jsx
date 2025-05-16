import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableHead,
  Th,
  Td,
  BtnAchieve,
  AddButton,
} from "./AdminMission.styles";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { deleteAchieverById } from "../../../../../api/achieverApi"; // Keep if you want real API delete, else mock below

const ITEMS_PER_PAGE = 10;


const AdminMission = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const dummyMissions = [
        { _id: "1", rank: 1, exam_name: "Exam 1", name: "John Doe", image: "http://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png", createdAt: "2023-10-01T12:00:00Z" },
        { _id: "2", rank: 2, exam_name: "Exam 2", name: "Jane Smith", image: "http://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png", createdAt: "2023-10-02T12:00:00Z" },
        { _id: "3", rank: 3, exam_name: "Exam 3", name: "Alice Johnson", image: "http://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png", createdAt: "2023-10-03T12:00:00Z" },
        { _id: "4", rank: 4, exam_name: "Exam 4", name: "Bob Brown", image: "http://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png", createdAt: "2023-10-04T12:00:00Z" }
      ];
    setMissions(dummyMissions);
    setLoading(false);
  }, []);

  const handleAdd = () => {
    navigate("/admin/web-management/mission/create");
  };

  const handleEdit = (id) => {
    navigate(`/admin/web-management/mission/edit/${id}`);
  };

  // same delete handlers etc, but modify missions state

  // Delete confirm function
  const handleConfirmDelete = () => {
    setMissions((prev) => prev.filter((item) => item._id !== selectedId));
    setDeleteModalOpen(false);
    setSelectedId(null);
  };

  const totalPages = Math.ceil(missions.length / ITEMS_PER_PAGE);
  const currentPageData = missions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <BtnAchieve>
        <AddButton onClick={handleAdd}>Add Mission</AddButton>
      </BtnAchieve>

      <Container>
        <Title>Missions</Title>

        <TableWrapper>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHead>
                <tr>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Image</Th>
                  <Th>Actions</Th>
                </tr>
              </TableHead>
              <tbody>
                {currentPageData.length === 0 ? (
                  <tr>
                    <Td colSpan="4" style={{ textAlign: "center" }}>
                      No missions found.
                    </Td>
                  </tr>
                ) : (
                  currentPageData.map((item) => (
                    <tr key={item._id}>
                      <Td>AIR {item.rank}</Td>
                      <Td>{item.exam_name}</Td>
                     <Td>
                                            {item.image ? (
                                              <img src={item.image} alt="Achiever" style={{ width: "60px", height: "auto" }} />
                                            ) : (
                                              "No Image"
                                            )}
                                          </Td>

                      <Td>
                        <BiEditAlt
                          size={20}
                          color="#000"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleEdit(item._id)}
                        />
                        <RiDeleteBin6Line
                          size={20}
                          color="#FB4F4F"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(item._id)}
                        />
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </TableWrapper>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={missions.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </Container>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default AdminMission;
