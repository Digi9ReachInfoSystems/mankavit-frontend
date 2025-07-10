import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import {
    Container,
    HeaderRow,
    Title,
    SortByContainer,
    SortLabel,
    SortSelect,
    SearchWrapper,
    SearchIcon,
    SearchInput,
    TableWrapper,
    StyledTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    ActionsContainer,
    TableCell,
} from "./StudentResult.styles";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import {
    getusersAllmocktestsAttempts,

} from "../../../../../../../api/mocktestApi";
import { getUserByUserId } from "../../../../../../../api/authApi";
import { Tab } from "../../../../CourseList/CoursesList.styles";
export default function StudentResults() {
    const { userId } = useParams(); // Get userId from URL
    const { state } = useLocation(); // Optional: get studentName from navigation state
    const [studentResults, setStudentResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Select");
    const [studentInfo, setStudentInfo] = useState({
        displayName: "Anonymous",
        email: "-"
    });
    const navigate = useNavigate();
    // Format helpers
    const formatTime = (submittedAt, startedAt) => {
        if (!submittedAt || !startedAt) return "N/A";
        const start = new Date(startedAt);
        const submit = new Date(submittedAt);
        const diffSeconds = Math.round((submit - start) / 1000);
        const minutes = Math.floor(diffSeconds / 60);
        const seconds = diffSeconds % 60;
        return `${minutes} minute(s) and ${seconds} second(s)`;
    };

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    // Load mock test results + student info
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1️⃣ Get student info
                const userResponse = await getUserByUserId(userId);
                const user = userResponse.user;

                setStudentInfo({
                    displayName: user?.displayName || "Anonymous",
                    email: user?.email || "-"
                });

                // 2️⃣ Get all attempts by student
                const res = await getusersAllmocktestsAttempts(userId);
                const formatted = res.data.map(item => ({
                    _id: item._id,
                    testName: item.mockTestId?.title || "Untitled Test",
                    marks: item.totalMarks ?? 0,
                    timeToComplete: formatTime(item.submittedAt, item.startedAt),
                    submissionDate: formatDate(item.submissionDate || item.submittedAt),
                    attemptId: item._id
                }));

                setStudentResults(formatted);
            } catch (err) {
                console.error("Error loading student results:", err);
                setError("Failed to load student results");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Sorting logic
    const getTimeSec = str => {
        const m = str.match(/(\d+)\s*minute.*?(\d+)\s*second/);
        return m ? +m[1] * 60 + +m[2] : 0;
    };

    const sortedAndFiltered = useMemo(() => {
        let list = [...studentResults];

        // Filter by search text
        if (searchText.trim()) {
            const term = searchText.toLowerCase();
            list = list.filter(r => r.testName.toLowerCase().includes(term));
        }

        // Sort
        switch (sortOption) {
            case "Quiz Name":
                list.sort((a, b) => a.testName.localeCompare(b.testName));
                break;
            case "Percentage":
                list.sort((a, b) => b.marks - a.marks);
                break;
            case "Time Taken":
                list.sort((a, b) => getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete));
                break;
            default:
                break;
        }

        return list;
    }, [studentResults, searchText, sortOption]);

    const totalItems = sortedAndFiltered.length;
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentPage = 1;
    const pageSlice = sortedAndFiltered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) return <Container>Loading...</Container>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <Container>
            <HeaderRow>
                <Title>
                    <strong>{studentInfo.displayName}'s Results</strong>&nbsp;
                    <small>({totalItems})</small>
                </Title>
                <SortByContainer>
                    <SortLabel>Sort by:</SortLabel>
                    <SortSelect
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option>Select</option>
                        <option>Quiz Name</option>
                        <option>Percentage</option>
                        <option>Time Taken</option>
                    </SortSelect>
                </SortByContainer>
            </HeaderRow>

            <SearchWrapper>
                <SearchIcon><CiSearch size={18} /></SearchIcon>
                <SearchInput
                    value={searchText}
                    placeholder="Search Test Name"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </SearchWrapper>

            <TableWrapper>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Test Name</TableHeader>
                            <TableHeader>Student</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Marks</TableHeader>
                            <TableHeader>Time to complete</TableHeader>
                            <TableHeader>Submission Date</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageSlice.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.testName}</TableCell>
                                <TableCell>{studentInfo.displayName}</TableCell>
                                <TableCell>{studentInfo.email}</TableCell>
                                <TableCell>{item.marks}</TableCell>
                                <TableCell>{item.timeToComplete}</TableCell>
                                <TableCell>{item.submissionDate}</TableCell>
                                <TableCell>
                                    <ActionsContainer>
                                        <IoEyeOutline
                                            size={20}
                                            title="View"
                                            onClick={() => navigate(`/admin/results/user-attempts/attempt/${item.attemptId}`)}
                                        />
                                    </ActionsContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableWrapper>
        </Container>
    );
}