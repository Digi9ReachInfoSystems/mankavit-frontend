import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  ButtonContainer, CreateButton, Container, Title,
  SearchWrapper, SearchIcon, SearchInput,
  TableWrapper, StyledTable, TableBody, TableCell,
  TableHeader, TableHead, TableRow, ActionsContainer
} from "./Category.styles";
import Pagination  from '../../component/Pagination/Pagination';
import DeleteModal from '../../component/DeleteModal/DeleteModal';


const ITEMS_PER_PAGE = 5; // You can adjust this
const initialData = [
  { id: 1, categoryName: 'Science' },
  { id: 2, categoryName: 'Math' },
  { id: 3, categoryName: 'History' },
  { id: 4, categoryName: 'Geography' },
  { id: 5, categoryName: 'Computer' },
  { id: 6, categoryName: 'Art' },
];

const Category = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredData = data.filter(item =>
    item.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteClick = (id) => {
    setSelectedCategory(id);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/category-management/create")}>
          Add Category
        </CreateButton>
      </ButtonContainer>

      <Container>
        <Title>
          See All Categories{' '}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
            ({currentItems.length}/{TOTAL_ENTRIES})
          </span>
        </Title>

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
                <TableHeader>Category Name</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <BiEditAlt
                        title="Edit"
                        color="#000000"
                        size={20}
                        onClick={() => navigate("/admin/category-management/create")}
                      />
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
          items={filteredData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            setData(prevData => prevData.filter(item => item.id !== selectedCategory));
            setDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
        />
      </Container>
    </>
  );
};

export default Category;
