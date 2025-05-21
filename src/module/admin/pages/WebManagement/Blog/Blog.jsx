// src/pages/Admin/WebManagement/Blog/Blog.jsx

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

const BlogData = [
  {
    _id: "1",
    title: "Blog 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, temporibus aperiam in blanditiis tempora tempore incidunt eius est quibusdam quas. Dolore obcaecati repellendus assumenda sunt distinctio corrupti mollitia dicta temporibus. Consequuntur possimus, quis inventore facere, ipsa error deserunt at amet temporibus unde animi ut nam reiciendis. Fuga voluptates tenetur modi veniam dicta sequi temporibus repudiandae et numquam vero quibusdam saepe soluta sint aspernatur voluptatum, omnis id deleniti veritatis quo corporis. Labore, nobis, cum perspiciatis asperiores illum voluptatem, vero dolore facere a ut enim quidem sit quos esse autem? Quaerat fugiat fugit rerum impedit reprehenderit delectus eveniet deleniti neque aut?",
    image: "https://th.bing.com/th/id/R.478dfc41e1100a0ee3eef95559d208d6?rik=6gy0Ok9JyDUxFA&pid=ImgRaw&r=0",
  },
  {
    _id: "2",
    title: "Blog 2",
    description: "Description 2",
    image: "https://th.bing.com/th/id/OIP.iprMXLyybI8FZvpvA0PuWAHaFL?cb=iwp2&rs=1&pid=ImgDetMain",
  },
  {
    _id: "3",
    title: "Blog 3",
    description: "Description 3",
    image: "https://th.bing.com/th/id/OIP.T-w6kU2gIs0h0SXzkFkKlwHaGX?cb=iwp2&w=562&h=483&rs=1&pid=ImgDetMain",
  },
  {
    _id: "4",
    title: "Blog 4",
    description: "Description 4",
    image: "https://th.bing.com/th/id/OIP.iprMXLyybI8FZvpvA0PuWAHaFL?cb=iwp2&rs=1&pid=ImgDetMain",
  },
  {
    _id: "5",
    title: "Blog 5",
    description: "Description 5",
    image: "https://th.bing.com/th/id/OIP.T-w6kU2gIs0h0SXzkFkKlwHaGX?cb=iwp2&w=562&h=483&rs=1&pid=ImgDetMain",
  },
];

const ITEMS_PER_PAGE = 10;

const Blog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(BlogData);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleDeleteConfirm = () => {
    setBlog(blog.filter((item) => item._id !== selectedId));
    setDeleteModalOpen(false);
  };
  

return(
    <>
    <BtnAchieve>
      <AddButton onClick={() => navigate("/admin/web-management/blog/create")}>
        Add Blog
      </AddButton>
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
            {currentPageData.map((item) => (
              <tr key={item._id}>
                <Td>{item.title}</Td>
                <Td>{item.description}</Td>
                <Td>
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
                </Td>
                <Td>
                  <IoEyeOutline
                    size={20}
                    style={{ cursor: "pointer", marginRight: 10 }}
                    onClick={() =>
                        navigate(`/admin/web-management/blog/view/${item._id}`, { state: item })
                    }
                  />
                  <BiEditAlt
                    size={20}
                    style={{ cursor: "pointer", marginRight: 10 }}
                    onClick={() =>
                        navigate(`/admin/web-management/blog/edit/${item._id}`, { state: item })
                    }
                  />
                  <RiDeleteBin6Line
                    size={20}
                    color="#FB4F4F"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(item._id)}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
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
  </>
);

};

export default Blog;