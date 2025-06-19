import React, { useState, useMemo } from "react";
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
    TableCell,
} from "./StudentResult.styles";

export default function StudentResults() {
    const { studentName: name } = useParams();
    const { state } = useLocation();

    // Fallback if user refreshes
    const allResults =
        state?.allResults ||
        JSON.parse(sessionStorage.getItem("allResults") || "[]");

    if (state?.allResults) {
        sessionStorage.setItem("allResults", JSON.stringify(state.allResults));
    }

    const studentResults = allResults.filter(
        (r) =>
            r.studentName.toLowerCase() === decodeURIComponent(name).toLowerCase()
    );

    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Select");

    const getPercentage = (marks) =>
        parseFloat(marks.match(/\(([\d.]+)%\)/)?.[1] || 0);

    const getTimeSec = (str) => {
        const m = str.match(/(\d+)\s*minutes? and\s*(\d+)\s*seconds/);
        return m ? +m[1] * 60 + +m[2] : 0;
    };

    const filteredResults = useMemo(() => {
        const filtered = studentResults.filter((result) =>
            result.testName.toLowerCase().includes(searchText.toLowerCase())
        );

        switch (sortOption) {
            case "Quiz Name":
                return filtered.sort((a, b) =>
                    a.testName.localeCompare(b.testName)
                );
            case "Percentage":
                return filtered.sort(
                    (a, b) => getPercentage(b.marks) - getPercentage(a.marks)
                );
            case "Time Taken":
                return filtered.sort(
                    (a, b) =>
                        getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete)
                );
            default:
                return filtered;
        }
    }, [studentResults, searchText, sortOption]);

    return (
        <Container>
            <HeaderRow>
                <Title>
                    <strong>{decodeURIComponent(name)}'s Result</strong>&nbsp;
                    <small>({filteredResults.length})</small>
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
                <SearchIcon>
                    <CiSearch size={18} />
                </SearchIcon>
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
                            <TableHeader>Student Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Marks</TableHeader>
                            <TableHeader>Time to complete</TableHeader>
                            <TableHeader>Submission Date</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResults.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.testName}</TableCell>
                                <TableCell>{item.studentName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.marks}</TableCell>
                                <TableCell>{item.timeToComplete}</TableCell>
                                <TableCell>{item.submissionDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableWrapper>
        </Container>
    );
}
