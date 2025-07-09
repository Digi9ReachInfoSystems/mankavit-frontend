import React, { useState, useEffect } from "react";
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
    SearchWrapper,
    SearchIcon,
    SearchInput,
} from "./ViewUserAttempts.styles";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { getAttemptedUserListByMocktestId, getMocktestAttempts, getUserAnswerByMocktestIdandSubjectId } from "../../../../../api/mocktestApi";
import { getUserByUserId } from "../../../../../api/authApi";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteUserAttempt } from "../../../../../api/mocktestApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

export default function ViewUserAttempts() {
    const { mockTestId, userId } = useParams();
    const [userName, setUserName] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("Name");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAttemptId, setSelectedAttemptId] = useState(null);
    const navigate = useNavigate();
    const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
    useEffect(() => {
        const apiCaller = async () => {
            const response = await getAuth();
            response.Permissions;
            if (response.isSuperAdmin === true) {
                setReadOnlyPermissions(false);
            } else {
                setReadOnlyPermissions(response.Permissions["mockTestManagement"].readOnly);
            }
        }
        apiCaller();
    }, []);

    useEffect(() => {
        const fetchUserAnswers = async () => {
            try {
                if (!mockTestId || !userId) {
                    console.error("Missing mockTestId or subjectId");
                    return;
                }
                const response = await getMocktestAttempts(
                    userId,
                    mockTestId,
                );
                const user = await getUserByUserId(userId);
                setUserName(user.user.displayName);
                if (response.success) {
                    setData(response.data);
                } else {
                    throw new Error(response.message || "Failed to fetch user answers");
                }
            } catch (error) {
                console.error("Error fetching mock tests:", error);
                toast.error("Failed to fetch attempts. Please try again.");
            }
        };

        fetchUserAnswers();
    }, [mockTestId, userId]);

    const filtered = data.filter((item) =>
        item.attemptNumber.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.mcqScore.toLowerCase().includes(searchText.toLowerCase())
    );
    const totalEntries = filtered.length;
    const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleView = (attempt) => {
        navigate(`/admin/mock-test/user-result/view-result/${attempt}`);
    };

    const handleDeleteClick = (attemptId) => {
        setSelectedAttemptId(attemptId);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteUserAttempt(selectedAttemptId);
            setData(data.filter(attempt => attempt._id !== selectedAttemptId));
            setDeleteModalOpen(false);
            toast.success("Attempt deleted successfully");
        } catch (error) {
            console.error("Error deleting attempt:", error);
            toast.error("Failed to delete attempt. Please try again.");
        }
    };

    return (
        <Container>
            <HeaderRow>
                <Title>
                    List of Attempts of {userName || ""} <small>({pageItems.length}/{totalEntries})</small>
                </Title>
            </HeaderRow>

            <TableWrapper>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Attempt Number</TableHeader>
                            <TableHeader>MCQ Score</TableHeader>
                            <TableHeader>Subjective Score</TableHeader>
                            <TableHeader>Total Score</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>View</TableHeader>
                            <TableHeader>Submitted At</TableHeader>
                            {
                                !readOnlyPermissions && (
                                    <TableHeader>Action</TableHeader>
                                )
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageItems.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.attemptNumber}</TableCell>
                                <TableCell>{item.mcqScore || "0"}</TableCell>
                                <TableCell>{item.subjectiveScore || "0"}</TableCell>
                                <TableCell>{item.totalMarks || "0"}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <button
                                        style={{ border: "none", background: "none", cursor: "pointer" }}
                                        onClick={() => handleView(item._id)}
                                    >
                                        <IoEyeOutline
                                            title="View Details"
                                            size={20}
                                        />
                                    </button>
                                </TableCell>
                                <TableCell>{new Date(item.submittedAt).toLocaleString()}</TableCell>
                                {
                                    !readOnlyPermissions && (
                                        <TableCell>
                                            <button
                                                style={{ border: "none", background: "none", cursor: "pointer" }}
                                                onClick={() => handleDeleteClick(item._id)}
                                            >
                                                <RiDeleteBin6Line
                                                    title="Delete Attempt"
                                                    size={20}
                                                    color="#ff4444"
                                                />
                                            </button>
                                        </TableCell>
                                    )
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableWrapper>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalEntries}
                itemsPerPage={ITEMS_PER_PAGE}
            />

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteConfirm}
            />

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
        </Container>
    );
}