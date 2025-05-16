import React, { useState } from "react";
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

// sample data — replace with real fetch
const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    coursesEnrolled: 7,
    bannerUrl: "/path/to/banner1.jpg",
    schedule: "2024-07-24T10:30:00Z",
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    coursesEnrolled: 7,
    bannerUrl: "/path/to/banner2.jpg",
    schedule: "2024-07-24T10:30:00Z",
  },
  // …more rows
];

const ITEMS_PER_PAGE = 10;

const RecordedClass = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(sampleData);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = () => {
    const updatedData = data.filter((item) => item.id !== deleteId);
    const newTotalPages = Math.ceil(updatedData.length / ITEMS_PER_PAGE);
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;

    setData(updatedData);
    setCurrentPage(newCurrentPage);
    setModal(false);
    setDeleteId(null);
  };

  // format ISO → IST dd-mm-yyyy HH:MM
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

  return (
    <>
      <ButtonContainer>
          <CreateButton onClick={() => navigate("/admin/web-management/recorded-classes/create")}>Uplaod recorded class</CreateButton>
      </ButtonContainer>
      <Container>
        <HeaderRow>
          <Title>Recorded Class</Title>
        </HeaderRow>
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Courses Enrolled</TableHeader>
                <TableHeader>Uploaded Time</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.coursesEnrolled}{" "}
                    <ViewLink href={`#view/${row.id}`}>View</ViewLink>
                  </TableCell>
                  <TableCell>{formatIST(row.schedule)}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <BiEditAlt
                        size={20}
                        color="#000"
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
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>
      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
    </>
  );
};

export default RecordedClass;
