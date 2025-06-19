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
  ActionsContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "./AllmocktestResults.styles";

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pagination from "../../../Pagination/Pagination";
import DeleteModal from "../../../DeleteModal/DeleteModal";

const ITEMS_PER_PAGE = 10;

export default function AllmocktestResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("Select");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        {
          id: 1,
          testName: "React Fundaaaaamentals",
          studentName: "Alice Johnson",
          email: "alice@example.com",
          marks: "0 / 20 - correct(0.00%)",
          timeToComplete: "0 minutes and 6 seconds",
          submissionDate: "April 9, 2025, 16:37:30 IST",
          subjectId: "react101"
        },
        {
          id: 2,
          testName: "JavaScript Basics",
          studentName: "Bob Smith",
          email: "bob@example.com",
          marks: "15 / 20 - correct(75.00%)",
          timeToComplete: "12 minutes and 30 seconds",
          submissionDate: "April 10, 2025, 10:22:11 IST",
          subjectId: "js101"
        },
        {
          id: 3,
          testName: "CSS Flexbox & Grid",
          studentName: "Alice Johnson",
          email: "carol@example.com",
          marks: "18 / 20 - correct(90.00%)",
          timeToComplete: "8 minutes and 45 seconds",
          submissionDate: "April 11, 2025, 11:15:45 IST",
          subjectId: "css201"
        },
        {
          id: 4,
          testName: "Node.js Fundamentals",
          studentName: "Bob Smith",
          email: "david@example.com",
          marks: "12 / 20 - correct(60.00%)",
          timeToComplete: "15 minutes and 10 seconds",
          submissionDate: "April 12, 2025, 13:30:00 IST",
          subjectId: "node101"
        },
        {
          id: 5,
          testName: "React Fundaaaaamentals",
          studentName: "John",
          email: "alice@example.com",
          marks: "0 / 20 - correct(0.00%)",
          timeToComplete: "0 minutes and 6 seconds",
          submissionDate: "April 9, 2025, 16:37:30 IST",
          subjectId: "react101"
        },

      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && location.state?.updatedResult) {
      const updated = location.state.updatedResult;

      setData(prev =>
        prev.map(item => (item.id === updated.id ? updated : item))
      );

      toast.success("Mock test result updated!");
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [loading, location.state, navigate]);

  const getPercentage = marks =>
    parseFloat(marks.match(/\(([\d.]+)%\)/)?.[1] || 0);

  const getTimeSec = str => {
    const m = str.match(/(\d+)\s*minutes? and\s*(\d+)\s*seconds/);
    return m ? +m[1] * 60 + +m[2] : 0;
  };

  const sortData = list => {
    const arr = [...list];
    switch (sortOption) {
      case "Quiz Name":
        arr.sort((a, b) => a.testName.localeCompare(b.testName));
        break;
      case "Percentage":
        arr.sort((a, b) => getPercentage(b.marks) - getPercentage(a.marks));
        break;
      case "Time Taken":
        arr.sort((a, b) => getTimeSec(a.timeToComplete) - getTimeSec(b.timeToComplete));
        break;
      default:
        break;
    }
    return arr;
  };

  const filtered = data.filter(d =>
    d.testName.toLowerCase().includes(searchText.toLowerCase())
  );

  const sorted = sortData(filtered);
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageSlice = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteClick = id => {
    setItemToDelete(data.find(d => d.id === id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setData(prev => prev.filter(d => d.id !== itemToDelete.id));
    toast.success("Deleted successfully");
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  if (loading) return <div>Loading mock tests…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Container>
        <HeaderRow>
          <Title>
            Mock Tests Results&nbsp;
            <small>({pageSlice.length}/{totalItems})</small>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect
              value={sortOption}
              onChange={e => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
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
            placeholder="Search"
            onChange={e => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
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
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageSlice.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.testName}</TableCell>
                  <TableCell>
                    {item.studentName}
                    <br />
                    <div
                      style={{
                        marginTop: "8px",
                        cursor: "pointer",
                        color: "#1d72e8",
                        fontSize: "0.95rem",
                        textDecoration: "none"
                      }}
                      onClick={() =>
                        navigate(`/admin/results/studentName/${encodeURIComponent(item.studentName)}`, {
                          state: { studentName: item.studentName, allResults: data }
                        })
                      }
                    >
                      Results by name
                    </div>

                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.marks}</TableCell>
                  <TableCell>{item.timeToComplete}</TableCell>
                  <TableCell>{item.submissionDate}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        size={20}
                        title="View"
                        onClick={() =>
                          navigate(`/admin/results/view/${item.id}`, {
                            state: item
                          })
                        }
                      />
                      <BiEditAlt
                        size={20}
                        title="Edit"
                        onClick={() => {
                          // Convert the human-readable date string to an ISO string
                          const rawDate = item.submissionDate;
                          const parsedDate = new Date(rawDate.replace(" IST", " GMT+0530")); // Fix for Indian time
                          const isoDate = parsedDate.toISOString().slice(0, 16); // format: "YYYY-MM-DDTHH:mm"

                          navigate(`/admin/results/edit/${item.id}`, {
                            state: {
                              ...item,
                              submissionDate: isoDate
                            }
                          });
                        }}
                      />

                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        title="Delete"
                        onClick={() => handleDeleteClick(item.id)}
                      />
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
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
        onDelete={handleConfirmDelete}
      />
    </>
  );
}
