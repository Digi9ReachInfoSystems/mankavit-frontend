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
  ToggleSwitch,
} from "./YouTube.styles";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAllYoutube,
  deleteYoutube,
updateSocialMediaLinks 
} from "../../../../../api/youtuubeApi";

const ITEMS_PER_PAGE = 10;

const YouTube = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData]               = useState([]);
  const [modal, setModal]             = useState(false);
  const [selectedImage, setSelected]  = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemDel]    = useState(null);
  const [loading, setLoading]         = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getTimestamp = (item) => {
  // 1) use createdAt if present
  if (item.createdAt) return new Date(item.createdAt).getTime();

  // 2) use updatedAt if present
  if (item.updatedAt) return new Date(item.updatedAt).getTime();

  // 3) extract from MongoDB ObjectId
  if (item._id && typeof item._id === "string" && item._id.length >= 8) {
    const seconds = parseInt(item._id.substring(0, 8), 16);
    return seconds * 1000;             // convert to ms
  }

  return 0;                            // unknown date → oldest
};

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllYoutube();
      console.log("res", res);
      let fetched = res.data || [];

      // merge new link (avoid duplicate)
      if (location.state?.link) {
        const exists = fetched.find((v) => v._id === location.state.link._id);
        if (!exists) fetched.unshift(location.state.link);
      }

      // *** latest first ***
      const getTimestamp = (it) => {
        if (it.createdAt) return new Date(it.createdAt).getTime();
        if (it.updatedAt) return new Date(it.updatedAt).getTime();
        if (it._id && it._id.length >= 8) {
          return parseInt(it._id.slice(0, 8), 16) * 1000;
        }
        return 0;
      };
      fetched.sort((a, b) => getTimestamp(b) - getTimestamp(a));

      setData(fetched);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load YouTube links");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [location.state]);



  const handleAdd = () =>
    navigate("/admin/web-management/youtubelinks/create");

  const handleDeleteClick = (id) => {
    setItemDel(data.find((d) => d._id === id));
    setDeleteModalOpen(true);
  };


const handleConfirmDelete = async () => {
  if (!itemToDelete?._id) return;

  try {
    await deleteYoutube(itemToDelete._id);

    const updated = data.filter((d) => d._id !== itemToDelete._id);
    setData(updated);
    await updateSocialMediaLinks({ youtube_videoLink: updated });

    toast.success("YouTube link deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete");
  } finally {
    setDeleteModalOpen(false);
    setItemDel(null);
  }
};



/* ----- TOGGLE ----- */
const handleToggleHome = async (id) => {
  const clickedItem = data.find((d) => d._id === id);
  const isTurningOn = !clickedItem.homepage;

  // If turning ON, ensure all others are false
  const updatedArray = data.map((d) => ({
    ...d,
    homepage: isTurningOn ? d._id === id : false,
  }));

  setData(updatedArray); // Optimistic UI update

  try {
    await updateSocialMediaLinks({ youtube_videoLink: updatedArray });
    toast.success("Home page status updated");
  } catch {
    toast.error("Failed to update status");
    setData(data); // revert
  }
};

  const handleViewImage = (img) => {
    setSelected(img);
    setModal(true);
  };




  /* ─ Pagination ─ */
  const totalItems     = data.length;
  const totalPages     = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex     = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <div>Loading YouTube links...</div>;

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
                <Th>Home page</Th>
              </tr>
            </TableHead>
            <tbody>
              {currentPageData.length === 0 ? (
                <tr>
                  <Td colSpan={4} style={{ textAlign: "center" }}>
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
                          textDecoration: "none",
                        }}
                        onClick={() => handleViewImage(item.thumbnailImage)}
                      >
                        View Thumbnail
                      </span>
                    </Td>
                    <Td>
                      <a
                        href={item.video_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.video_link}
                      </a>
                    </Td>
                    <Td>
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(item._id)}
                      />
                    </Td>
                    <Td>
                      <ToggleSwitch
                        checked={!!item.homepage}
                        onChange={() => handleToggleHome(item._id)}
                        title="Toggle on Home page"
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        itemName={`"${itemToDelete?.video_link || "YouTube Video"}"`}
      />

      {/* Image viewer */}
      {modal && selectedImage && (
        <ImageModalOverlay onClick={() => setModal(false)}>
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
