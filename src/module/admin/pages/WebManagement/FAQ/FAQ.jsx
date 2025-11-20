// src/components/FAQ/FAQ.jsx
import React, { useState, useEffect } from "react";
import {
  FAQContainer,
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
} from "./FAQ.styles";

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  getAllfaqs,
  deleteFaqById,
  bulkfaqdeletion,
} from "../../../../../api/faqApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // single delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // bulk delete
  const [selectedIds, setSelectedIds] = useState([]); // array of faq._id
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + faqsPerPage);

  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const data = await getAllfaqs();

        if (Array.isArray(data)) {
          const sortedFaqs = data.sort((a, b) => {
            const dateA = new Date(
              a.createdAt ||
                (a._id && a._id.length >= 8
                  ? parseInt(a._id.substring(0, 8), 16) * 1000
                  : 0)
            );
            const dateB = new Date(
              b.createdAt ||
                (b._id && b._id.length >= 8
                  ? parseInt(b._id.substring(0, 8), 16) * 1000
                  : 0)
            );
            return dateB - dateA; // latest first
          });
          setFaqs(sortedFaqs);
        } else {
          setFaqs([]);
          setError("Unexpected response format");
          toast.error("Unexpected response format from server");
        }
      } catch (err) {
        setError("Failed to load FAQs");
        toast.error("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // ===== single delete =====
  const handleEdit = (faq) => {
    navigate(`/admin/web-management/faq/edit/${faq._id}`);
  };

  const confirmDelete = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;
    try {
      await deleteFaqById(faqToDelete._id);
      setFaqs((prev) => prev.filter((f) => f._id !== faqToDelete._id));
      setSelectedIds((prev) => prev.filter((id) => id !== faqToDelete._id)); // also unselect if selected
      toast.success("Data deleted successfully.");
    } catch {
      toast.error("Failed to delete data. Please try again.");
    } finally {
      setIsDeleteOpen(false);
      setFaqToDelete(null);
    }
  };

  // ===== bulk selection =====
  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      // unselect all items on this page
      setSelectedIds((prev) =>
        prev.filter((id) => !currentFaqs.some((f) => f._id === id))
      );
    } else {
      // select all items on this page (merge)
      setSelectedIds((prev) => {
        const pageIds = currentFaqs.map((f) => f._id);
        const add = pageIds.filter((id) => !prev.includes(id));
        return [...prev, ...add];
      });
    }
    setSelectAll(!selectAll);
  };

  // keep selectAll in sync with page/selection changes
  useEffect(() => {
    const allSelected =
      currentFaqs.length > 0 &&
      currentFaqs.every((f) => selectedIds.includes(f._id));
    setSelectAll(allSelected);
  }, [currentFaqs, selectedIds]);

  const openBulkDelete = () => setBulkDeleteOpen(true);

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      setBulkDeleteOpen(false);
      return;
    }
    try {
      setBulkLoading(true);
      await bulkfaqdeletion(selectedIds); // API expects { ids }

      setFaqs((prev) => prev.filter((f) => !selectedIds.includes(f._id)));
      setSelectedIds([]);
      setSelectAll(false);
      toast.success("Selected FAQs deleted successfully");
      setBulkDeleteOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Bulk delete failed:", error);
      toast.error(
        error?.response?.data?.error || "Failed to delete selected FAQs"
      );
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <FAQContainer>
      <ButtonContainer>
        {!readOnlyPermissions && (
          <CreateButton onClick={() => navigate("/admin/web-management/faq/create")}>
            Add FAQ
          </CreateButton>
        )}
      </ButtonContainer>

      <Header>
        <HeaderRow>
          <Title>
            FAQs{" "}
            <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
              ({currentFaqs.length}/{faqs.length})
            </span>
          </Title>

          {/* Bulk Delete CTA when there are selections */}
          {!readOnlyPermissions && selectedIds.length > 0 && (
            <div>
              <CreateButton
                onClick={openBulkDelete}
                style={{ backgroundColor: "red" }}
              >
                Delete Selected ({selectedIds.length})
              </CreateButton>
            </div>
          )}
        </HeaderRow>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading Faq…</p>
          ) : (
            <Table>
              <TableHead>
                <tr>
                  {!readOnlyPermissions && (
                    <TableHeader style={{ width: 40 }}>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    </TableHeader>
                  )}
                  <TableHeader>Question</TableHeader>
                  <TableHeader>Answer</TableHeader>
                  <TableHeader>Uploaded Time</TableHeader>
                  {!readOnlyPermissions && <TableHeader>Actions</TableHeader>}
                </tr>
              </TableHead>
              <TableBody>
                {currentFaqs.length === 0 ? (
                  <tr>
                    <TableCell colSpan={readOnlyPermissions ? 3 : 4} style={{ textAlign: "center" }}>
                      No FAQs found.
                    </TableCell>
                  </tr>
                ) : (
                  currentFaqs.map((faq) => (
                    <TableRow key={faq._id}>
                      {!readOnlyPermissions && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(faq._id)}
                            onChange={() => toggleRow(faq._id)}
                          />
                        </TableCell>
                      )}

                      <TableCell
                        dangerouslySetInnerHTML={{
                          __html:
                            faq.question.length > 60
                              ? faq.question.substring(0, 60) + "..."
                              : faq.question || faq.questionText || "No Question",
                        }}
                      />
                      <TableCell
                        dangerouslySetInnerHTML={{
                          __html:
                            faq.answer.length > 60
                              ? faq.answer.substring(0, 60) + "..."
                              : faq.answer || faq.answerText || "No Answer",
                        }}
                      />

                      <TableCell>
                        {(() => {
                          let dateObj;
                          if (faq.createdAt) {
                            dateObj = new Date(faq.createdAt);
                          } else if (faq._id && faq._id.length >= 8) {
                            const ts = parseInt(faq._id.substring(0, 8), 16) * 1000;
                            dateObj = new Date(ts);
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
                            <BiEditAlt
                              size={20}
                              color="#000"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(faq)}
                            />
                            {/* <RiDeleteBin6Line
                              size={20}
                              color="#FB4F4F"
                              style={{ cursor: "pointer" }}
                              onClick={() => confirmDelete(faq)}
                            /> */}
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
          totalItems={faqs.length}
          itemsPerPage={faqsPerPage}
        />
      </Header>

      {/* Single delete confirmation modal */}
      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
        />
      )}

      {/* Bulk delete confirmation modal */}
      {bulkDeleteOpen && (
        <DeleteModal
          isOpen={bulkDeleteOpen}
          onClose={() => setBulkDeleteOpen(false)}
          onDelete={handleBulkDelete}
          loading={bulkLoading}
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
    </FAQContainer>
  );
};

export default FAQ;
