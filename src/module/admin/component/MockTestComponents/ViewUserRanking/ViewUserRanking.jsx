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
} from "./ViewUserRanking.styles";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { getAttemptedUserListByMocktestId, getMocktestAttempts, getRankingByMockTestSubject, getUserAnswerByMocktestIdandSubjectId } from "../../../../../api/mocktestApi";
import { getUserByUserId } from "../../../../../api/authApi";

const ITEMS_PER_PAGE = 10;

export default function ViewUserRanking() {
    const { mockTestId, subjectId } = useParams();
    const [userName, setUserName] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("Rank");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserAnswers = async () => {
            try {
                if (!mockTestId || !subjectId) {
                    console.error("Missing mockTestId or subjectId");
                    return;
                }
                const response = await getRankingByMockTestSubject(
                    mockTestId,
                    subjectId

                );
                console.log("Fetching user answers for mockTestId:", response);

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
    }, [mockTestId, subjectId]);
    useEffect(() => {
        const apiCaller = async () => {
            try {
                if (!mockTestId || !subjectId) {
                    console.error("Missing mockTestId or subjectId");
                    return;
                }
                const response = await getRankingByMockTestSubject(
                    mockTestId,
                    subjectId

                );
                console.log("Fetching user answers for mockTestId:", response);

                console.log("Fetching user answers for mockTestId:", response);
                // console.log("subjectId", subjectId);
                console.log("mockTestId", mockTestId);
                console.log("View user answers response", response);
                if (response.success) {
                    if (sortBy === "Name") {
                        setData(response.data.sort((a, b) => a.userId.displayName.localeCompare(b.userId.displayName)));
                    } else if (sortBy === "SubmittedAt") {
                        setData(response.data.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)));
                    } else {
                        setData(response.data);
                    }

                } else {
                    throw new Error(response.message || "Failed to fetch user answers");
                }
            } catch (error) {
                console.error("Error fetching mock tests:", error);
                // You might want to set some error state here to show to the user
            }
        }
        apiCaller();
    }, [sortBy]);


    const filtered = data.filter((item) =>
        item.userId.displayName.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.userEmail.toLowerCase().includes(searchText.toLowerCase())
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
                    List of Students  <small>({pageItems.length}/{totalEntries})</small>
                </Title>
                <SortByContainer>
                    <SortLabel>Sort by:</SortLabel>
                    <SortSelect value={sortBy} onChange={handleSortChange}>
                        <option value="Rank">Rank</option>
                        <option value="Name">Name</option>
                        <option value="SubmittedAt">Submited At</option>
                        {/* <option value="Active">Active</option> */}
                    </SortSelect>
                </SortByContainer>
            </HeaderRow>

            <SearchWrapper>
                <SearchIcon><CiSearch size={18} /></SearchIcon>
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
                            <TableHeader>Rank</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Best Score</TableHeader>
                            <TableHeader>Total Attempts</TableHeader>

                            <TableHeader>Submitted At</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageItems.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.rank}</TableCell>
                                <TableCell>{item.userId.displayName || " "}</TableCell>
                                <TableCell>{item.userEmail || "0"}</TableCell>
                                <TableCell>{item.bestScore || "0"}</TableCell>
                                <TableCell>{item.attemptsCount}</TableCell>
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
