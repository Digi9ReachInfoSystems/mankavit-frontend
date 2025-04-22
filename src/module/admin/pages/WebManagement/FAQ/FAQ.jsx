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
  PageButton
} from "./FAQ.styles";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getAllfaqs,
  updateFaqById,
  deleteFaqById
} from "../../../../../api/faqApi"; // adjust path as needed

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + faqsPerPage);

  // fetch all FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllfaqs(); // expected to return an array
        setFaqs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // delete handler
  const handleDelete = async (faq) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await deleteFaqById(faq._id);
      setFaqs((prev) => prev.filter((f) => f._id !== faq._id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete FAQ");
    }
  };

  // update handler (simple prompts)
  const handleEdit = async (faq) => {
    const newQuestion = window.prompt("Edit question:", faq.question);
    if (newQuestion == null) return;
    const newAnswer = window.prompt("Edit answer:", faq.answer);
    if (newAnswer == null) return;
    try {
      const updated = await updateFaqById(faq._id, {
        question: newQuestion,
        answer: newAnswer
      });
      setFaqs((prev) =>
        prev.map((f) => (f._id === faq._id ? updated : f))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update FAQ");
    }
  };

  return (
    <FAQContainer>
      <ButtonContainer>
        <Link to="/admin/web-management/faq/create">
          <CreateButton>
            <FaPlus size={12} /> Add FAQ
          </CreateButton>
        </Link>
      </ButtonContainer>

      <Header>
        <h3>FAQs</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TableWrapper>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Question</TableHeader>
                  <TableHeader>Answer</TableHeader>
                  <TableHeader>Uploaded Time</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentFaqs.map((faq) => (
                  <TableRow key={faq._id}>
                    <TableCell>{faq.question}</TableCell>
                    <TableCell>{faq.answer}</TableCell>
                    <TableCell>
                      {new Date(faq.createdAt).toLocaleDateString()}{" "}
                      {new Date(faq.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </TableCell>
                    <TableCell>
                      <FaEdit
                        style={{ cursor: "pointer", marginRight: 12 }}
                        onClick={() => handleEdit(faq)}
                      />
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(faq)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
    </FAQContainer>
  );
};

export default FAQ;
