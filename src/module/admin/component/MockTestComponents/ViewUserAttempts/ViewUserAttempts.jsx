// ViewUser.jsx
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

const ITEMS_PER_PAGE = 10;

export default function ViewUserAttempts() {
    const { mockTestId, userId } = useParams();
    const[ userName, setUserName] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("Name");
    const navigate = useNavigate();
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
                console.log("user", user);
                setUserName(user.user.displayName);
                console.log("Fetching user answers for mockTestId:", response);
                // console.log("subjectId", subjectId);
                console.log("mockTestId", mockTestId);
                console.log("View user answers response", response);
                if (response.success) {
                    setData(response.data);
                } else {
                    throw new Error(response.message || "Failed to fetch user answers");
                }
            } catch (error) {
                console.error("Error fetching mock tests:", error);
                // You might want to set some error state here to show to the user
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
        console.log("attempt", attempt);
        navigate(`/admin/mock-test/user-result/view-result/${attempt}`);
        // console.log("View attempt with ID:", attemptId);
    };

    return (
        <Container>
            <HeaderRow>
                <Title>
                    List of Attempts of {userName||""} <small>({pageItems.length}/{totalEntries})</small>
                </Title>
                {/* <SortByContainer>
                    <SortLabel>Sort by:</SortLabel>
                    <SortSelect value={sortBy} onChange={handleSortChange}>
                        <option value="Name">Name</option>
                        <option value="LastActive">Last Active</option>
                        <option value="Active">Active</option>
                    </SortSelect>
                </SortByContainer> */}
            </HeaderRow>

            <SearchWrapper>
                {/* <SearchIcon><CiSearch size={18} /></SearchIcon>
                <SearchInput
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                /> */}
            </SearchWrapper>

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
                                    <button  style={{ border: "none", background: "none" }} onClick={() => handleView(item._id)}> <IoEyeOutline
                                                          title="View Details"
                                                          size={20}
                                                          // onClick={() => goToViewDetail(item.id)}
                                                        /></button>
                                </TableCell>
                                <TableCell>{new Date(item.submittedAt).toLocaleString()}</TableCell>
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
        </Container>
    );
}
