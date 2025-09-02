import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import {
  ButtonContainer, CreateButton, Container, Title,
  SearchWrapper, SearchIcon, SearchInput,
  TableWrapper, StyledTable, TableBody, TableCell,
  TableHeader, TableHead, TableRow, ActionsContainer,

} from "./Category.styles";

import Pagination from '../../component/Pagination/Pagination';
import DeleteModal from '../../component/DeleteModal/DeleteModal';
import { bulkDeleteCategory, deleteCategory, getCategories } from '../../../../api/categoryApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns';
import { getAuth } from '../../../../utils/authService';

const ITEMS_PER_PAGE = 10;

const Category = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [BulkDelete, setBulkDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // Check if res is an array or wrapped inside an object
        const categories = Array.isArray(res) ? res : res.categories || [];
        setData(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');

      }
    };

    fetchCategories();
  }, []);

  // const filteredData = data.filter(item =>
  //   item.categoryName.toLowerCase().includes(searchText.toLowerCase())
  // );
  const handleBulkDeleteClick = () => {
    setBulkDelete(true);
  };



  const filteredData = data.filter(item =>
    item.title && item.title.toLowerCase().includes(searchText.toLowerCase())
  );


  const TOTAL_ENTRIES = filteredData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteClick = (id) => {
    setSelectedCategory(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(selectedCategory);
      setData(prev => prev.filter(cat => cat._id !== selectedCategory));
      toast.success("Category deleted successfully");

    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/category-management/edit/${id}`, {
      state: { categoryId: id }
    });
  };

  const handleCheckboxChange = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(currentItems.map((c) => c._id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteCategory(selectedCategories);
      toast.success("Selected Categories deleted successfully", {
        autoClose: 3000, // Ensure this matches your toast duration
        onClose: () => {

          window.location.reload();
        }
      });
      setSelectedCategories([]);
      setSelectAll(false);
      // await fetchCourses();
      // window.location.reload(); // Reload the page to reflect changes
      setBulkDelete(false);
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
        {!readOnlyPermissions && (
          <CreateButton onClick={() => navigate("/admin/category-management/create")}>
            Add Category
          </CreateButton>
        )}

      </ButtonContainer>

      <Container>
        <Title>
          See All Categories{' '}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
            ({currentItems.length}/{TOTAL_ENTRIES})
          </span>
        </Title>
        <ButtonContainer>
          {/* <CreateButton onClick={() => navigate("/admin/course-management/create")}>
                    Add Course
                  </CreateButton> */}
          {selectedCategories.length > 0 && (
            <CreateButton onClick={handleBulkDeleteClick} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete Selected ({selectedCategories.length})
            </CreateButton>
          )}
        </ButtonContainer>
        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
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
                {
                  !readOnlyPermissions && (
                    <TableHeader>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    </TableHeader>
                  )
                }

                <TableHeader>Category Name</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item._id}>
                  {
                    !readOnlyPermissions && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                      </TableCell>
                    )
                  }

                  <TableCell>
                    <a
                      href="#"
                      onClick={() => {
                        // console.log("Edit category with ID:", item._id);
                        navigate(`/admin/category-management/edit/${item._id}`, { state: { categoryId: item._id } });
                      }

                      }
                    >
                      {item.title}
                    </a>
                  </TableCell>
                  {/* <TableCell>
                    <ActionsContainer>
                      <BiEditAlt
                        title="Edit"
                        color="#000000"
                        size={20}
                        onClick={() => handleEditClick(item._id)}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDeleteClick(item._id)}
                      />
                    </ActionsContainer>
                  </TableCell> */}
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
          onDelete={handleConfirmDelete}
        />

        <DeleteModal
          isOpen={BulkDelete}
          onClose={() => setBulkDelete(false)}
          onDelete={handleBulkDelete}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </Container>
    </>
  );
};

export default Category;
