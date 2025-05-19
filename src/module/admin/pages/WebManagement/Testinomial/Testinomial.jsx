import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  TableWrapper,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableCelldiscription,
  ViewLink,
  ActionsWrapper,
  BtnTitle,
  AddTestButton,
  TableHead,
} from "./Testinomial.styles";
import Pagination from "../../../component/Pagination/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import {
  getAlltestimonials,
  deleteTestimonalById,
} from "../../../../../api/testimonialApi"; // Update path as needed
import { format } from 'date-fns'; // Import date-fns for formatting
import { IoEyeOutline } from "react-icons/io5";


const ITEMS_PER_PAGE = 10;

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await getAlltestimonials();
      setData(res);
      console.log("Fetched testimonials:", res); // Log the response to see the data structure
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteTestimonalById(deleteId);
      const updatedData = data.filter((item) => item._id !== deleteId);
      const newTotalPages = Math.ceil(updatedData.length / ITEMS_PER_PAGE);
      const newCurrentPage =
        currentPage > newTotalPages ? newTotalPages : currentPage;
      setData(updatedData);
      setCurrentPage(newCurrentPage);
    } catch (error) {
      console.error("Failed to delete testimonial", error);
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  const handleAddButton = () => {
    navigate("/admin/web-management/testinomial/create");
  };

  const handleViewClick = (id) => {
    navigate(`/admin/web-management/testinomial/view/${id}`);
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <BtnTitle>
        <AddTestButton onClick={handleAddButton}>Add Testimonial</AddTestButton>
      </BtnTitle>
      <Container>
        <Title>Testimonial</Title>

        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Details</TableHeader>
                <TableHeader>Testimonial</TableHeader>
                <TableHeader>Student</TableHeader>
                <TableHeader>View Image/Video</TableHeader>
                <TableHeader>Date Updated</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {currentItems.map((item, index) => (
                <TableRow key={item._id || index}>
                  <TableCell>{item.rank}</TableCell>
                  <TableCelldiscription>{item.description}</TableCelldiscription>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <ViewLink href={item.testimonial_image} target="_blank">
                      View
                    </ViewLink>
                  </TableCell>
                  {/* Display the date if item.updatedAt exists */}
                  <TableCell>
                    {item.updatedAt ? format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm:ss') : '—'}
                  </TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IoEyeOutline
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                                                 onClick={() => handleViewClick(item._id)}
                        
                      />
                      <BiEditAlt
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(
                            `/admin/web-management/testinomial/edit/${item._id}`
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {Modal && (
        <DeleteModal
          isOpen={Modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
    </>
  );
};

export default Testimonial;