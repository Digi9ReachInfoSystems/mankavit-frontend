// MockTestsTable.jsx
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
  ButtonContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  CreateButton,
} from "./ViewUser.styles";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";

// Constants
const ITEMS_PER_PAGE = 10;

// Dummy data
const dummyMockTests = [
  { id: 1, username: "john_doe", email: "john@example.com"  },
  { id: 2, username: "jane_smith", email: "jane@example.com"},
  // Add more mock entries as needed
];

export default function ViewUser() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Name");

  useEffect(() => {
    setData(dummyMockTests);
  }, []);
const filtered = data.filter((item) =>
  item.username.toLowerCase().includes(searchText.toLowerCase()) ||
  item.email.toLowerCase().includes(searchText.toLowerCase())
);
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToCreate = () => navigate("/admin/mock-test/create");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // Add actual sorting logic here if needed
  };

  return (
    <>

      <Container>
        <HeaderRow>
          <Title>
            List of Students <small>({pageItems.length}/{totalEntries})</small>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortBy} onChange={handleSortChange}>
              <option value="Name">Name</option>
              <option value="LastActive">Last Active</option>
              <option value="Active">Active</option>
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
                <TableHeader>Username</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>View</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <a href="/admin/mock-test/user-result/view-result">View</a> {/* Replace with navigate or Link if needed */}
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
          totalItems={totalEntries}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>
    </>
  );
}
