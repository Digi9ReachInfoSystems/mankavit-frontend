// NotesTable.jsx
import React, { useEffect, useState, useMemo, use } from "react";
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
} from "../Notes/Notes.style";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { getAllNotes } from "../../../../api/notesApi";
import { Select, Space } from "antd";
import { IoEyeOutline } from "react-icons/io5";



const ITEMS_PER_PAGE = 10;

export default function NotesManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [sortOption, setSortOption] = useState('Name');
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {

    const apiCaller = async () => {
      try {
        const response = await getAllNotes();
        const dataPrepared = response.data.map((item) => ({
          id: item._id,
          noteTitle: item.noteDisplayName,
          noteDescription: item.noteName,
          subjects: item.subjects.map((item) => item.subjectName),
          lastActive: item.updatedAt,
          fileURL: item.fileUrl,
          active: true,
        }))
        setData(dataPrepared);
        const filteredValue = dataPrepared.filter((item) =>
          item.noteTitle.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredData(filteredValue);
        const TOTAL_ENTRIESValues = filteredValue.length;
        setTotalEntries(TOTAL_ENTRIESValues);
        const totalPagesValues = Math.ceil(TOTAL_ENTRIESValues / ITEMS_PER_PAGE);
        setTotalPages(totalPagesValues);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentValue = filteredValue.slice(startIndex, endIndex);
        setCurrentItems(currentValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    apiCaller();
  }, [])
  // useEffect(() => {
  //   const apiCaller = async () => {
  //     const response = await getAllNotes();
  //     console.log("respose", response);
  //     const dataPrepared = response.data.map((item) => ({
  //       id: item._id,
  //       noteTitle: item.noteDisplayName,
  //       noteDescription: item.noteName,
  //       subjects: item.subjects.map((item) => item.subjectName),
  //       lastActive: item.updatedAt,
  //       fileURL: item.fileUrl,
  //       active: true,
  //     }))
  //     setData(dataPrepared);

  //     const sampleData = dataPrepared.sort((a, b) => {
  //       if (sortOption === 'Name') {
  //         return a.noteTitle.localeCompare(b.noteTitle);
  //       } else if (sortOption === 'Last Active') {
  //         return new Date(b.lastActive) - new Date(a.lastActive);
  //       }
  //     })

  //     let filteredValue = sampleData;
  //     if (searchText !== "") {
  //       filteredValue = sampleData.filter((item) =>
  //         item.noteTitle.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     } else {


  //     }

  //     setFilteredData(filteredValue);
  //     const TOTAL_ENTRIESValues = filteredValue.length;
  //     setTotalEntries(TOTAL_ENTRIESValues);
  //     const totalPagesValues = Math.ceil(TOTAL_ENTRIESValues / ITEMS_PER_PAGE);
  //     setTotalPages(totalPagesValues);
  //     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //     const endIndex = startIndex + ITEMS_PER_PAGE;
  //     const currentValue = filteredValue.slice(startIndex, endIndex);
  //     setCurrentItems(currentValue);
  //   };
  //   apiCaller();

  //   // currentItems = sampleData;
  // }, [sortOption, searchText])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        const dataPrepared = response.data.map((item) => ({
          id: item._id,
          noteTitle: item.noteDisplayName,
          noteDescription: item.noteName,
          subjects: item.subjects.map((item) => item.subjectName),
          lastActive: item.updatedAt,
          fileURL: item.fileUrl,
          active: true,
        }))
        setData(dataPrepared);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    let processedData = [...data];

    if(searchText) {
      processedData = processedData.filter((item) =>
        item.noteTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (sortOption === 'Name') {
      processedData.sort((a, b) => a.noteTitle.localeCompare(b.noteTitle));
    } else if (sortOption === 'Last Active') {
      processedData.sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
    }
    const TOTAL_ENTRIESValues = processedData.length;
    setTotalEntries(TOTAL_ENTRIESValues);
    const totalPagesValues = Math.ceil(TOTAL_ENTRIESValues / ITEMS_PER_PAGE);
    setTotalPages(totalPagesValues);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentValue = processedData.slice(startIndex, endIndex);
    setCurrentItems(currentValue);
  }, [data, searchText, sortOption, currentPage]);

  const formatToIST = (isoString, options = {}) => {
    try {
      const date = new Date(isoString);

      const defaultOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        ...options
      };

      return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
    } catch (error) {
      console.error('Invalid date format:', isoString);
      return 'Invalid date';
    }
  };

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

  const handleViewClick = (item) => {
    navigate(`/admin/notes-management/view/${item.id}`, {
      state: { item }
    });
  }

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      navigate(`/admin/notes-management/edit/${id}`, {
        state: { item }
      });
    }
  }




  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/notes-management/create")}>
          Add Notes
        </CreateButton>
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
                { value: 'Name', label: 'Name' },
                { value: 'Last Active', label: 'Last Active' },
                // { value: 'Active', label: 'Active' },
              ]}
            />


            {/* <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="LastActive">Last Active</option>
              <option value="Active">Active</option>
            </SortSelect> */}
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
                <TableHeader>Note Title</TableHeader>
                <TableHeader>Internal Name</TableHeader>
                <TableHeader>No. of Subjects</TableHeader>
                <TableHeader>View Pdf</TableHeader>
                <TableHeader>Date Uploaded</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.noteTitle}</TableCell>
                  <TableCell><span className="internaldescription">{item.noteDescription}</span></TableCell>
                  <TableCell>
                    {item.subjects?.length || 0}{" "}
                    <a href="#view-subjects" onClick={() => handleOpenModal("subjects", item.subjects)}>
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={item.fileURL} target="_blank">View</a>
                  </TableCell>
                  <TableCell>{formatToIST(item.lastActive)}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        title="View"
                        color="#000000"
                        size={20}
                        onClick={() => handleViewClick(item)}
                      />
                      <BiEditAlt title="Edit" color="#000000" size={20} onClick={() => handleEdit(item.id)} />
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
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleClickDelete}
        />

        {viewModalOpen && viewStudent && viewStudent.type === "subjects" && (
          <CustomModal
            title="Subjects Enrolled"
            type="subjects"
            data={viewStudent.data}
            onClose={() => setViewModalOpen(false)}
          />
        )}


      </Container>
    </>
  );
}
