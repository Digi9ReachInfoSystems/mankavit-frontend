// src/components/Entrance/Entrance.jsx
import React, { useState, useEffect } from "react";
import {
  EntranceContainer,
  Header,
  ButtonContainer,
  CreateButton,
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Title,
  HeaderRow,
  ActionsWrapper,
} from "./Entrance.style";

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getAllEntrances, deleteEntranceById } from "../../../../../api/entranceApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "../../../../../utils/authService";

const Entrance = () => {
  const [entrances, setEntrances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [entranceToDelete, setEntranceToDelete] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entrancesPerPage = 10;
  const totalPages = Math.ceil(entrances.length / entrancesPerPage);
  const startIndex = (currentPage - 1) * entrancesPerPage;
  const currentEntrances = entrances.slice(startIndex, startIndex + entrancesPerPage);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchEntrances = async () => {
      setLoading(true);
      try {
        const data = await getAllEntrances();
        // // console.log("Fetched Entrance data:", data);

        if (Array.isArray(data)) {
          const sortedEntrances = data.sort((a, b) => {
            const dateA = new Date(a.createdAt || parseInt(a._id?.substring(0, 8), 16) * 1000);
            const dateB = new Date(b.createdAt || parseInt(b._id?.substring(0, 8), 16) * 1000);
            return dateB - dateA; // Descending order: latest first
          });
          setEntrances(sortedEntrances);
        } else {
          // // console.error("Unexpected Entrance format:", data);
          setEntrances([]);
          setError("Unexpected response format");
          toast.error("Unexpected response format from server");
        }
      } catch (err) {
        // console.error("Error fetching Entrances:", err);
        setError("Failed to load Entrances");
        toast.error("Failed to load Entrances");
      } finally {
        setLoading(false);
      }
    };

    fetchEntrances();
  }, []);

  const handleEdit = (entrance) => {
    navigate(`/admin/web-management/entrance/edit/${entrance._id}`);
  };

  const confirmDelete = (entrance) => {
    setEntranceToDelete(entrance);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!entranceToDelete) return;
    try {
      await deleteEntranceById(entranceToDelete._id);
      setEntrances((prev) => prev.filter((e) => e._id !== entranceToDelete._id));
      toast.success("Entrance deleted successfully.");
    } catch {
      toast.error("Failed to delete entrance. Please try again.");
    } finally {
      setIsDeleteOpen(false);
      setEntranceToDelete(null);
    }
  };

  return (
    <EntranceContainer>
      <ButtonContainer>
        {!readOnlyPermissions && (
          <CreateButton onClick={() => navigate("/admin/web-management/entrance/add")}>
            Add Entrance
          </CreateButton>
        )}
      </ButtonContainer>

      <Header>
        <HeaderRow>
          <Title>Entrances</Title>
        </HeaderRow>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading entrances…</p>
          ) : (
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Uploaded Time</TableHeader>
                  {!readOnlyPermissions && <TableHeader>Actions</TableHeader>}
                </tr>
              </TableHead>
              <TableBody>
                {currentEntrances.length === 0 ? (
                  <tr>
                    <TableCell colSpan={readOnlyPermissions ? 3 : 4} style={{ textAlign: "center" }}>
                      No Entrances found.
                    </TableCell>
                  </tr>
                ) : (
                  currentEntrances.map((entrance) => (
                    <TableRow key={entrance._id}>
                      <TableCell>
                          <a
                          href="#"
                          onClick={() =>
                            navigate(`/admin/web-management/entrance/edit/${entrance._id}`)
                          }
                        >
                        {entrance.title?.length > 30 ? entrance.title.substring(0, 30) + "..." : entrance.title || "No Name"}
                   </a>
                      </TableCell>
                      {/* <TableCell>
                        {entrance.description?.length > 30 ? entrance.description.substring(0, 30) + "..." : entrance.description || "No Description"}
                      </TableCell> */}
                      <TableCell dangerouslySetInnerHTML={{ __html: entrance.description.slice(0,60) || "No Description" }} />
                      <TableCell>
                        {(() => {
                          let dateObj;

                          if (entrance.createdAt) {
                            dateObj = new Date(entrance.createdAt);
                          } else if (entrance._id && entrance._id.length >= 8) {
                            const timestamp = parseInt(entrance._id.substring(0, 8), 16) * 1000;
                            dateObj = new Date(timestamp);
                          } else {
                            return "No Date";
                          }

                          return (
                            <>
                              {dateObj.toLocaleDateString()}{" "}
                              {dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </>
                          );
                        })()}
                      </TableCell>
                      {!readOnlyPermissions && (
                        <TableCell>
                          <ActionsWrapper>
                            {/* <BiEditAlt
                              size={20}
                              color="#000"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(entrance)}
                            /> */}
                            <RiDeleteBin6Line
                              size={20}
                              color="#FB4F4F"
                              style={{ cursor: "pointer" }}
                              onClick={() => confirmDelete(entrance)}
                            />
                          </ActionsWrapper>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={entrances.length}
          itemsPerPage={entrancesPerPage}
        />
      </Header>

      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </EntranceContainer>
  );
};

export default Entrance;