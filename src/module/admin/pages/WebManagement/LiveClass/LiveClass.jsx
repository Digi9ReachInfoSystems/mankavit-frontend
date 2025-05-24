import React, { useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  ButtonContainer,
  CreateButton,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  // ViewLink,
  ActionsWrapper,
  ModalOverlay,
  ModalContent,
  ModalImage,
  CloseIcon
} from "../LiveClass/LiveClass.style";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../../component/Pagination/Pagination";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";

// sample data – replace with your real fetch
const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    bannerUrl: "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
    schedule: "2024-07-24T10:30:00Z",
  },
  {
      
    id: 2,
    title: "CLAT",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    bannerUrl: "https://mankavit.blob.core.windows.net/upload/1747304038358-Class%209%20Mathematics.jpg",
    schedule: "2024-07-29T10:39:00Z",
  },
  // …add as many items as you like
];

const LiveClass = () => {
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [data, setData] = useState(sampleData);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const navigate = useNavigate();

  // helper to format to IST
  const formatIST = (iso) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" });
    const time = d.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = () => {
    const updatedData = data.filter((item) => item.id !== deleteId);
    const newTotalPages = Math.ceil(updatedData.length / rowsPerPage);
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;

    setData(updatedData);
    setCurrentPage(newCurrentPage);
    setModal(false);
    setDeleteId(null);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton
          onClick={() => {
            navigate("/admin/web-management/live-classes/create");
          }}
        >
          Schedule live class
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>Live Class</Title>
        </HeaderRow>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>View Banner</TableHeader>
                <TableHeader>Schedule IST time</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {currentItems.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.bannerUrl ? (
                      <span
                        onClick={() => {
                          setSelectedImage(row.bannerUrl);
                          setImageModalOpen(true);
                        }}
                        style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }}
                      >
                        View Image
                      </span>
                    ) : (
                      "No Image"
                    )}
                  </TableCell>

                  <TableCell>{formatIST(row.schedule)}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <BiEditAlt
                        size={20}
                        color="#000"
                        onClick={() => navigate(`/admin/web-management/live-classes/edit/${row.id}`, { state: { row } })}
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(row.id)}
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
          itemsPerPage={rowsPerPage}
        />
      </Container>

      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}

      {imageModalOpen && selectedImage && (
        <ModalOverlay
          onClick={() => {
            setImageModalOpen(false);
            setSelectedImage(null);
          }}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon
              onClick={() => {
                setImageModalOpen(false);
                setSelectedImage(null);
              }}
            >
              &times;
            </CloseIcon>
            <ModalImage src={selectedImage} alt="Achiever" />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default LiveClass;
