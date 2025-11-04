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
  ControlsRow
} from "./ViewUser.styles";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination";
import { getAttemptedUserListByMocktestId, getUserAnswerByMocktestIdandSubjectId } from "../../../../../api/mocktestApi";
import { IoEyeOutline } from "react-icons/io5";
const ITEMS_PER_PAGE = 10;

export default function             ViewUser() {
  const { mockTestId, subjectId } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        if (!mockTestId || !subjectId) {
          // // console.error("Missing mockTestId or subjectId");
          return;
        }
        const response = await getAttemptedUserListByMocktestId(
          mockTestId,

        );
        
        if (response.success) {
          setData(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch user answers");
        }
      } catch (error) {
       }
    };

    fetchUserAnswers();
  }, [mockTestId, subjectId]);

  const filtered = data.filter((item) =>
    item.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  const handleView = (userId, mocktestId) => {
    // // console.log("attempt", userId);
    navigate(`/admin/mock-test/user-attempts/${mocktestId}/${userId}`);
    // // // console.log("View attempt with ID:", attemptId);
  };

  return (
    <Container>
      <HeaderRow>
   <Title>
     List of Students <small>({pageItems.length}/{totalEntries})</small>
   </Title>

  <ControlsRow>
    <SortByContainer>
      <SortLabel>Sort by:</SortLabel>
      <SortSelect value={sortBy} onChange={handleSortChange}>
        <option value="Name">Name</option>
        <option value="LastActive">Last Active</option>
        <option value="Active">Active</option>
      </SortSelect>
    </SortByContainer>
  </ControlsRow>
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
              <TableHeader>View Attempts</TableHeader>
              {/* <TableHeader>Submitted At</TableHeader> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.displayName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <button
                    style={{ border: "none", background: "none", cursor: "pointer" }}
                    onClick={() => handleView(item._id, mockTestId)}>
                    <IoEyeOutline
                      title="View Details"
                      size={20}
                      // onClick={() => goToViewDetail(item.id)}
                    />
                  </button>
                </TableCell>
                {/* <TableCell>{new Date(item.submittedAt).toLocaleString()}</TableCell> */}
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
