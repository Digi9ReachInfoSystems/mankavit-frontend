// NotesTable.jsx
import React, { useState } from "react";
import {
    Container,
    HeaderRow,
    Title,
    SortByContainer,
    SortLabel,
    SortSelect,
    TableWrapper,
    StyledTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    ActionsContainer,
    ButtonContainer,
    SearchWrapper,
    SearchIcon,
    SearchInput,
    CreateButton
} from "./Mocktest.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";


const initialData = Array.from({ length: 22 }, (_, index) => ({
    id: index + 1,
    mockTitle: "Mankavit Mock test - CLAT 2025",
    students: [ 
        { name: "Student A"},
        { name: "Student B"},
        { name: "Student C"},
    ],
    createdOn: "24-07-2024 16:22",
    lastModified: "24-07-2024 16:22",
    active: true,
}));


const ITEMS_PER_PAGE = 10;

export default function NotesManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewStudent, setViewStudent] = useState(null);

    const filteredData = data.filter((item) =>
        item.mockTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    const TOTAL_ENTRIES = filteredData.length;
    const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handleDeleteClick = (id) => {
        setSelectedStudent(id);
        setDeleteModalOpen(true);
    };

    const handleClickDelete = () => {
        setData((prevData) => {
            const newData = prevData.filter((item) => item.id !== selectedStudent);
            const newTotalPages = Math.ceil(newData.length / ITEMS_PER_PAGE);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages || 1);
            }
            return newData;
        });
        setDeleteModalOpen(false);
        setSelectedStudent(null);
    };

    const handleOpenModal = (type, data) => {
        setViewModalOpen(true);
        setViewStudent({ type, data });
    };




    return (
        <>
            <ButtonContainer>
                <CreateButton onClick={() => navigate("/admin/notes-management/create")}>
                    Add Mock Test
                </CreateButton>
            </ButtonContainer>

            <Container>
                <HeaderRow>
                    <Title>
                        See Mock Test{" "}
                        <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
                            ({currentItems.length}/{TOTAL_ENTRIES})
                        </span>
                    </Title>
                    <SortByContainer>
                        <SortLabel>Sort by:</SortLabel>
                        <SortSelect value="Name" onChange={() => { }}>
                            <option value="Name">Name</option>
                            <option value="LastActive">Last Active</option>
                            <option value="Active">Active</option>
                        </SortSelect>
                    </SortByContainer>
                </HeaderRow>

                <SearchWrapper>
                    <SearchIcon>
                        <CiSearch size={18} />
                    </SearchIcon>
                    <SearchInput
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </SearchWrapper>

                <TableWrapper>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Title</TableHeader>
                                <TableHeader>Participants</TableHeader>
                                <TableHeader>Created on</TableHeader>
                                <TableHeader>Last Modified</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.mockTitle}</TableCell>
                                    <TableCell>
                                        {item.students.length}{" "}
                                        <a href="#view" onClick={() => handleOpenModal("enrolled", item.students)}>
                                            View
                                        </a>
                                    </TableCell>

                                    <TableCell>{item.createdOn}</TableCell>
                                    <TableCell>{item.lastModified}</TableCell>
                                    <TableCell>
                                        <ActionsContainer>
                                            <BiEditAlt title="Edit" color="#000000" size={20} />
                                            <RiDeleteBin6Line
                                                title="Delete"
                                                size={20}
                                                color="#FB4F4F"
                                                onClick={() => handleDeleteClick(item.id)}
                                            />
                                        </ActionsContainer>
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
                    totalItems={TOTAL_ENTRIES}
                    itemsPerPage={ITEMS_PER_PAGE}
                />

                <DeleteModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={handleClickDelete}
                />

                {viewModalOpen && viewStudent && (
                    <CustomModal
                        title={
                            viewStudent.type === "enrolled"
                                ? "enrolled"
                                : "Details"
                        }
                        type={viewStudent.type}
                        data={viewStudent.data}
                        onClose={() => setViewModalOpen(false)}
                    />
                )}



            </Container>
        </>
    );
}
