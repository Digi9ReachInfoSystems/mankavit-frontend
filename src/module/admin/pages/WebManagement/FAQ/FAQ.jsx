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
import { Link, useNavigate } from "react-router-dom";
import {
  getAllfaqs,
  deleteFaqById
} from "../../../../../api/faqApi";
import DeleteModal from "../../../../admin/component/DeleteModal/DeleteModal"; // <-- adjust the path

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const navigate = useNavigate();

  // pagination
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
        setFaqs(Array.isArray(data) ? data : []);
      } catch {
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

  // when trash icon is clicked:
  const confirmDelete = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteOpen(true);
  };

  // actually delete after confirmation
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
                        onClick={() => confirmDelete(faq)}
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

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setFaqToDelete(null);
        }}
        onDelete={handleDelete}
      />
    </FAQContainer>
  );
};

export default FAQ;
