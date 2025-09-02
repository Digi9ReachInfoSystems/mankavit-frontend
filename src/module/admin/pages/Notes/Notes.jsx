import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
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
} from "../Notes/Notes.style";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { getAllNotes, deleteNotesById, bulkDeleteNotes } from "../../../../api/notesApi";
import { Select } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from "date-fns";
import { getAuth } from "../../../../utils/authService";

const ITEMS_PER_PAGE = 15;

export default function NotesManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [sortOption, setSortOption] = useState("Date");
  const [currentItems, setCurrentItems] = useState([]);
  const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  // Fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        const dataPrepared = response.data.map((item) => ({
          id: item._id,
          noteTitle: item.noteDisplayName,
          noteDescription: item.noteName,
          subjects: item.subjects.map((subj) => subj.subjectName),
          lastActive: item.updatedAt,
          createdAt: item.createdAt, // Add createdAt field
          fileURL: item.fileUrl,
        }));
        setData(dataPrepared);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch notes");
      }
    };
    fetchNotes();
  }, []);

  // Process data: search, sort, paginate
  useEffect(() => {
    let processedData = [...data];

    if (searchText) {
      // Filter data based on search text
      processedData = processedData.filter((item) =>
        item.noteTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortOption === "Name") {
      processedData.sort((a, b) => a.noteTitle.localeCompare(b.noteTitle));
    } else if (sortOption === "Date") {
      // Sort by creation date in ascending order (oldest first)
      processedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = processedData.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentSlice = processedData.slice(start, start + ITEMS_PER_PAGE);

    setTotalEntries(total);
    setTotalPages(pages);
    setCurrentItems(currentSlice);
  }, [data, searchText, sortOption, currentPage]);

  const handleDeleteClick = (id) => {
    setSelectedNoteId(id);
    setDeleteModalOpen(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteNotesById(selectedNoteId);
      setData((prev) => prev.filter((item) => item.id !== selectedNoteId));
      toast.success("Notes deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete notes");
    } finally {
      setDeleteModalOpen(false);
      setSelectedNoteId(null);
    }
  };

  const formatToIST = (isoString, options = {}) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        ...options,
      }).format(date);
    } catch {
      return "Invalid date";
    }
  };

  const handleOpenModal = (type, data) => {
    setViewModalOpen(true);
    setViewStudent({ type, data });
  };

  const handleViewClick = (item) => {
    navigate(`/admin/notes-management/view/${item.id}`, { state: { item } });
  };

  const handleEdit = (id) => {
    const item = data.find((note) => note.id === id);
    if (item) {
      navigate(`/admin/notes-management/edit/${id}`, { state: { item } });
    }
  };
  const handleDeleteClickModal = () => {
    setBulkDeleteModalOpen(true);
  }

  const handleCheckboxChange = (noteId) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(currentItems.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteNotes(selectedNotes);
      toast.success("Selected Notes deleted successfully", {
        autoClose: 3000, // Ensure this matches your toast duration
        onClose: () => {
          window.location.reload();
        }
      });
      setSelectedNotes([]);
      setSelectAll(false);
      setBulkDeleteModalOpen(false);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error("Failed to delete selected courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer>
        {
          !readOnlyPermissions && (
            <CreateButton onClick={() => navigate("/admin/notes-management/create")}>
              Add Notes
            </CreateButton>
          )
        }

      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Notes{" "}
            <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              defaultValue={sortOption}
              style={{ width: 120 }}
              onChange={(value) => setSortOption(value)}
              options={[
                { value: "Name", label: "Name" },
                { value: "Date", label: "Date" },
              ]}
            />
          </SortByContainer>
        </HeaderRow>
        <ButtonContainer>
          {selectedNotes.length > 0 && (
            <CreateButton onClick={handleDeleteClickModal} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete Selected ({selectedNotes.length})
            </CreateButton>
          )}
        </ButtonContainer>
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ color: "black" }}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                {!readOnlyPermissions && (
                  <TableHeader>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </TableHeader>
                )}

                <TableHeader>Note Title</TableHeader>
                <TableHeader>Internal Name</TableHeader>
                <TableHeader>No. of Subjects</TableHeader>
                <TableHeader>View Pdf</TableHeader>
                <TableHeader>Date Uploaded</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  {
                    !readOnlyPermissions && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedNotes.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </TableCell>
                    )
                  }

                  <TableCell>
                    <a
                      href="#"
                      onClick={() => {
                        navigate(`/admin/notes-management/edit/${item.id}`, { state: { item } });
                      }
                      }
                    >
                      {item.noteTitle}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={() => {
                        navigate(`/admin/notes-management/edit/${item.id}`, { state: { item } });
                      }
                      }
                    >
                      {item.noteDescription}
                    </a>
                  </TableCell>
                  <TableCell>
                    {item.subjects.length}{" "}
                    <a href="#view-subjects" onClick={() => handleOpenModal("subjects", item.subjects)}>
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={item.fileURL} target="_blank" rel="noreferrer">View</a>
                  </TableCell>
                  <TableCell>{formatToIST(item.lastActive)}</TableCell>
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
        <DeleteModal
          isOpen={bulkDeleteModalOpen}
          onClose={() => setBulkDeleteModalOpen(false)}
          onDelete={handleBulkDelete}
        />

        {viewModalOpen && viewStudent?.type === "subjects" && (
          <CustomModal
            title="Subjects Enrolled"
            type="subjects"
            data={viewStudent.data}
            onClose={() => setViewModalOpen(false)}
          />
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </>
  );
}