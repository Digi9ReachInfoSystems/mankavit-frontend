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

// sample data — replace with real fetch
// const sampleData = [
//   {
//     id: 1,
//     title: "CLAT Coaching",
//     description:
//       "Loremmmm Ipsum is simply dummy text of the printing and typesetting industry.",
//     coursesEnrolled: 7,
//     bannerUrl: "https://www.google.com/search?sca_esv=69251213fe4ae3f6&q=java+class+linking&udm=7&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBkzPWUS0OtApxR2914vrjk4ZqZZ4I2IkJifuoUeV0iQtlsVaSqiwnznvC1owt2z2tTdc23Auc6X4y2i7IIF0f-d_O-E9yXafSm5foej9KNb5dB5UNNsgm78dv2qEeljVjLTUov5wWn4x9of_4BNb8vF_2a_9-AxwH0UJGyfTMDuJ_sz_gg&sa=X&ved=2ahUKEwjKpYDLvqeNAxU1UGwGHS9HNAkQtKgLegQIFBAB&biw=1920&bih=945&dpr=1#fpstate=ive&vld=cid:c15e3d6e,vid:XNWvF-xsCoY,st:0",
//     schedule: "2024-07-24T10:30:00Z",
//   },
//   {
//     id: 2,
//     title: "CLAT Coaching",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     coursesEnrolled: 7,
//     bannerUrl: "/path/to/banner2.jpg",
//     schedule: "2024-07-24T10:30:00Z",
//   },
//   // …more rows
// ];
import { getAllRecordedClasses } from "../../../../../api/recordedAPi";
const ITEMS_PER_PAGE = 10;

const RecordedClass = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRecordedClasses();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  })

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
                      onClick={() => navigate(`/admin/web-management/recorded-classes/edit/${row.id}`, { state: { row} })}
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
