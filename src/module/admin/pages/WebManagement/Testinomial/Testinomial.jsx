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
  ModalOverlay,
  ModalContent,
  ModalImage,
  CloseIcon
} from "./Testinomial.styles";
import Pagination from "../../../component/Pagination/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import {
  getAlltestimonials,
  deleteTestimonalById,
} from "../../../../../api/testimonialApi";
import { format } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 10;

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // NEW: media modal state
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(''); // 'image' or 'video'

  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await getAlltestimonials();
      const sorted = res.sort((a, b) =>
        new Date(b.createdAt || b.updatedAt || b._id) -
        new Date(a.createdAt || a.updatedAt || a._id)
      );
      setData(sorted);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
      toast.error("Failed to fetch testimonials");
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTestimonalById(deleteId);
      setData(d => d.filter(item => item._id !== deleteId));
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Failed to delete testimonial", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteModalOpen(false);
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
                <TableHeader>Student</TableHeader>
                <TableHeader>Testimonial</TableHeader>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Media</TableHeader>
                <TableHeader>Date Updated</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {currentItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCelldiscription>{item.description}</TableCelldiscription>
                  <TableCell>{item.rank}</TableCell>

                  {/* MEDIA CELL */}
                  <TableCell>
                    {item.testimonial_image ? (
                      <span
                        onClick={() => {
                          setSelectedMedia(item.testimonial_image);
                          setMediaType('image');
                          setMediaModalOpen(true);
                        }}
                        style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }}
                      >
                        View Image
                      </span>
                    ) : item.testimonial_video ? (
                      <span
                        onClick={() => {
                          setSelectedMedia(item.testimonial_video);
                          setMediaType('video');
                          setMediaModalOpen(true);
                        }}
                        style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }}
                      >
                        View Video
                      </span>
                    ) : (
                      "No Media"
                    )}
                  </TableCell>

                  <TableCell>
                    {item.updatedAt
                      ? format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm:ss')
                      : '—'}
                  </TableCell>

                  <TableCell>
                    <ActionsWrapper>
                      {/* <IoEyeOutline
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewClick(item._id)}
                      /> */}
                      <BiEditAlt
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/admin/web-management/testinomial/edit/${item._id}`)
                        }
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item._id)}
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

      {/* DELETE CONFIRMATION */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
      )}

      {/* MEDIA MODAL */}
      {mediaModalOpen && selectedMedia && (
        <ModalOverlay
          onClick={() => {
            setMediaModalOpen(false);
            setSelectedMedia(null);
          }}
        >
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseIcon
              onClick={() => {
                setMediaModalOpen(false);
                setSelectedMedia(null);
              }}
            >
              &times;
            </CloseIcon>

            {mediaType === 'image' ? (
              <ModalImage src={selectedMedia} alt="Testimonial" />
            ) : (
              <video controls style={{ maxWidth: '100%', maxHeight: '80vh' }}>
                <source src={selectedMedia} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

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
};

export default Testimonial;
