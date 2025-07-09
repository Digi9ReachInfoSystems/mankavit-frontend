import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./Blog.styles";
import { IoEyeOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";
import { getAllBlogs, deleteBlogById } from "../../../../../api/blogApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

const Blog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllBlogs();

        if (response && response.success && Array.isArray(response.blogs)) {
          // 🔥 newest first
          const sortedBlogs = response.blogs.sort((a, b) => {
            // prefer createdAt / updatedAt; fall back to ObjectId timestamp
            const tsA = new Date(
              a.createdAt ||
              a.updatedAt ||
              parseInt(a._id.substring(0, 8), 16) * 1000
            );
            const tsB = new Date(
              b.createdAt ||
              b.updatedAt ||
              parseInt(b._id.substring(0, 8), 16) * 1000
            );
            return tsB - tsA;
          });

          setBlog(sortedBlogs);
        } else {
          setBlog([]);
          toast.warning("No blogs found");
        }
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
        console.error("Error loading blogs:", err);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = blog.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = blog.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlogById(selectedId);
      setBlog(blog.filter((item) => item._id !== selectedId));
      toast.success("Data deleted successfully");
    } catch (err) {
      toast.error("Failed to delete data");
      console.error("Error deleting blog:", err);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Blog</Title>
        <div>Loading blogs...</div>
        <ToastContainer />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Blog</Title>
        <div style={{ color: "red" }}>{error}</div>
        <ToastContainer />
      </Container>
    );
  }

  return (
    <>
      <BtnAchieve>
        {
          !readOnlyPermissions && (
            <AddButton onClick={() => navigate("/admin/web-management/blog/create")}>
              Add Blog
            </AddButton>
          )
        }

      </BtnAchieve>

      <Container>
        <Title>Blog</Title>

        <TableWrapper>
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
              {currentPageData.length > 0 ? (
                currentPageData.map((item) => (
                  <tr key={item._id}>
                    <Td>{item.title || "No title"}</Td>
                    <Td>
                      {item.description
                        ? `${item.description.substring(0, 50)}...`
                        : "No description"}
                    </Td>
                    <Td>
                      {item.image ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewImage(item.image);
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          View Image
                        </a>
                      ) : (
                        "No image"
                      )}
                    </Td>
                    <Td>
                      <IoEyeOutline
                        size={20}
                        style={{ cursor: "pointer", marginRight: 10 }}
                        onClick={() =>
                          navigate(`/admin/web-management/blog/view/${item._id}`, {
                            state: item,
                          })
                        }
                      />{
                        !readOnlyPermissions && (
                          <>
                            <BiEditAlt
                              size={20}
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() =>
                                navigate(`/admin/web-management/blog/edit/${item._id}`, {
                                  state: item,
                                })
                              }
                            />
                            <RiDeleteBin6Line
                              size={20}
                              color="#FB4F4F"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteClick(item._id)}
                            />
                          </>
                        )
                      }

                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="4" style={{ textAlign: "center" }}>
                    No blogs found
                  </Td>
                </tr>
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

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />

      {modalOpen && selectedImage && (
        <ImageModalOverlay>
          <ImageModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
            <ModalImage src={selectedImage} alt="Selected" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Blog;
