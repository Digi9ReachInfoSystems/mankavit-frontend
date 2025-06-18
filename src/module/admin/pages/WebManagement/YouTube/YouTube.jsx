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
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { IoEyeOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 10;

const staticData = [
    {
        _id: "1",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
        _id: "2",
        thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    },
];

const YouTube = () => {
    const navigate = useNavigate();
    const location = useLocation(); // receives the new entry
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemToDelete, setItemToDelete] = useState(null);


    useEffect(() => {
        const sessionItem = location.state ? [location.state] : [];
        setData([...sessionItem, ...staticData]);
    }, [location.state]);

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem("youtubeLinks") || "[]");
        setData([...localItems, ...staticData]);
    }, []);


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

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            const updatedData = data.filter((item) => item._id !== itemToDelete._id);
            setData(updatedData);

            // Update localStorage
            const localItems = JSON.parse(localStorage.getItem("youtubeLinks") || "[]");
            const updatedLocal = localItems.filter((item) => item._id !== itemToDelete._id);
            localStorage.setItem("youtubeLinks", JSON.stringify(updatedLocal));

            toast.success("Deleted successfully");
            setItemToDelete(null);
            setDeleteModalOpen(false);
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
                                <Th>YouTube Thumbnail</Th>
                                <Th>YouTube Link</Th>
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
                                                    textDecoration: "none",
                                                }}
                                                onClick={() => handleViewImage(item.thumbnail)}
                                            >
                                                View Image
                                            </span>
                                        </Td>
                                        <Td>
                                            <a href={item.link} target="_blank" rel="noreferrer">
                                                {item.link}
                                            </a>
                                        </Td>
                                        <Td>
                                            <IoEyeOutline
                                                size={20}
                                                title="View"
                                                style={{ marginRight: "10px", cursor: "pointer" }}
                                                onClick={() => handleView(item._id)}
                                            />
                                            <BiEditAlt
                                                size={20}
                                                style={{ marginRight: "10px", cursor: "pointer" }}
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
                </TableWrapper>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            </Container>

            {/* Delete confirmation modal */}
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleConfirmDelete}
            />

            {/* Thumbnail viewer modal */}
            {modal && selectedImage && (
                <ImageModalOverlay>
                    <ImageModalContent>
                        <CloseButton onClick={() => setModal(false)}>×</CloseButton>
                        <ModalImage src={selectedImage} alt="Thumbnail Preview" />
                    </ImageModalContent>
                </ImageModalOverlay>
            )}
        </>
    );
};

export default YouTube;
