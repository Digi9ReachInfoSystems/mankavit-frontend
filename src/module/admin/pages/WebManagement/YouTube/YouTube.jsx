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
  ImageModalOverlay,
  ImageModalContent,
  ModalImage,
  CloseButton,
} from "./YouTube.styles";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔽 Import APIs
import { getAllYoutube, deleteYoutube } from "../../../../../api/youtuubeApi";

const ITEMS_PER_PAGE = 10;

const YouTube = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Load data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllYoutube(); // Fetch from API
        const fetchedData = response.data || [];

        // If navigating back with new item in state, prepend it
        if (location.state?.link) {
          setData([location.state.link, ...fetchedData]);
        } else {
          setData(fetchedData);
        }
      } catch (err) {
        console.error("Error fetching YouTube links", err);
        toast.error("Failed to load YouTube links");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleAdd = () => navigate("/admin/web-management/youtubelinks/create");

  const handleEdit = (id) => {
    const selected = data.find((item) => item._id === id);
    navigate(`/admin/web-management/youtubelinks/edit/${id}`, { state: selected });
  };

  const handleDeleteClick = (id) => {
    const selected = data.find((item) => item._id === id);
    setItemToDelete(selected);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete?._id) return;

    try {
      const deleted = await deleteYoutube(itemToDelete._id);
      console.log("Deleted successfully:", deleted);

      // Remove from local state
      setData((prev) => prev.filter((item) => item._id !== itemToDelete._id));
      toast.success("YouTube link deleted successfully");
    } catch (err) {
      console.error("Error deleting YouTube link", err);
      toast.error("Failed to delete the link");
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setModal(true);
  };

  const handleView = (id) => {
    const selected = data.find((item) => item._id === id);
    navigate(`/admin/web-management/youtubelinks/view/${id}`, { state: selected });
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return <div>Loading YouTube links...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <BtnAchieve>
        <AddButton onClick={handleAdd}>Add Link</AddButton>
      </BtnAchieve>

      <Container>
        <Title>YouTube Links</Title>

        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <Th>Thumbnail</Th>
                <Th>Link</Th>
                <Th>Actions</Th>
              </tr>
            </TableHead>
            <tbody>
              {currentPageData.length === 0 ? (
                <tr>
                  <Td colSpan={3} style={{ textAlign: "center" }}>
                    No videos found.
                  </Td>
                </tr>
              ) : (
                currentPageData.map((item) => (
                  <tr key={item._id}>
                    <Td>
                      <span
                        style={{
                          color: "#3b82f6",
                          cursor: "pointer",
                          textDecoration: "underline"
                        }}
                        onClick={() => handleViewImage(item.thumbnailImage)}
                      >
                        View Thumbnail
                      </span>
                    </Td>
                    <Td>
                      <a href={item.video_link} target="_blank" rel="noreferrer">
                        {item.video_link}
                      </a>
                    </Td>
                    <Td>
                      {/* <IoEyeOutline
                        size={20}
                        title="View"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={() => handleView(item._id)}
                      />
                      <BiEditAlt
                        size={20}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={() => handleEdit(item._id)}
                      /> */}
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
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        itemName={`"${itemToDelete?.video_link || "YouTube Video"}`}
      />

      {/* Thumbnail Viewer Modal */}
      {modal && selectedImage && (
        <ImageModalOverlay onClick={setModal}>
          <ImageModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setModal(false)}>×</CloseButton>
            <ModalImage src={selectedImage} alt="Thumbnail Preview" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </>
  );
};

export default YouTube;