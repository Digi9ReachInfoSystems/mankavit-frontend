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
  PaginationContainer,
  PageButton,
  Title,
  HeaderRow,
  ActionsWrapper,
} from "./FAQ.styles";

import { FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { getAllfaqs, deleteFaqById } from "../../../../../api/faqApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + faqsPerPage);

  
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const data = await getAllfaqs();
        console.log("Fetched FAQ data:", data);
  
        if (Array.isArray(data.body)) {
          setFaqs(data.body);
        } else {
          console.error("Unexpected FAQ format:", data);
          setFaqs([]);
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };
  
    fetchFaqs();
  }, []);
  

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
    } catch {
      alert("Failed to delete FAQ");
    } finally {
      setIsDeleteOpen(false);
      setFaqToDelete(null);
    }
  };

  return (
    <FAQContainer>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/web-management/faq/create")}>
          <FaPlus size={12} /> Add FAQ
        </CreateButton>
      </ButtonContainer>

      <Header>
        <HeaderRow>
          <Title>FAQs</Title>
        </HeaderRow>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Question</TableHeader>
                  <TableHeader>Answer</TableHeader>
                  <TableHeader>Uploaded Time</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {currentFaqs.length === 0 ? (
                  <tr>
                    <TableCell colSpan="4" style={{ textAlign: "center" }}>
                      No FAQs found.
                    </TableCell>
                  </tr>
                ) : (
                  currentFaqs.map((faq) => (
                    <TableRow key={faq._id}>
                      {console.log("FAQ item:", faq)}
                      <TableCell>{faq.question || faq.questionText || "No Question"}</TableCell>
                      <TableCell>{faq.answer || faq.answerText || "No Answer"}</TableCell>
                      <TableCell>
                        {faq.createdAt ? (
                          <>
                            {new Date(faq.createdAt).toLocaleDateString()}{" "}
                            {new Date(faq.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </>
                        ) : (
                          "No Date"
                        )}
                      </TableCell>
                      <TableCell>
                        <ActionsWrapper>
                          <BiEditAlt
                            size={20}
                            color="#000"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(faq)}
                          />
                          <RiDeleteBin6Line
                            size={20}
                            color="#FB4F4F"
                            style={{ cursor: "pointer" }}
                            onClick={() => confirmDelete(faq)}
                          />
                        </ActionsWrapper>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableWrapper>

        {totalPages > 1 && (
          <PaginationContainer>
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PageButton>
            ))}
          </PaginationContainer>
        )}
      </Header>

      {/* Delete confirmation modal */}
      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </FAQContainer>
  );
};

export default FAQ;
