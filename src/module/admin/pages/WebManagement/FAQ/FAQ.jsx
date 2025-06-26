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

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { getAllfaqs, deleteFaqById } from "../../../../../api/faqApi";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

        // ✅ Use `data` directly instead of `data.body`
        if (Array.isArray(data)) {
  const sortedFaqs = data.sort((a, b) => {
    const dateA = new Date(a.createdAt || parseInt(a._id?.substring(0, 8), 16) * 1000);
    const dateB = new Date(b.createdAt || parseInt(b._id?.substring(0, 8), 16) * 1000);
    return dateB - dateA; // Descending order: latest first
  });
  setFaqs(sortedFaqs);
} else {
  console.error("Unexpected FAQ format:", data);
  setFaqs([]);
  setError("Unexpected response format");
  toast.error("Unexpected response format from server");
}
      }
       catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQs");
        toast.error("Failed to load FAQs");
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
      toast.success("Data deleted successfully.");
    } catch {
      // alert("Failed to delete FAQ");
      toast.error("Failed to delete data. Please try again.");
    } finally {
      setIsDeleteOpen(false);
      setFaqToDelete(null);
    }
  };

  return (
    <FAQContainer>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/web-management/faq/create")}>
         Add FAQ
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
                      <TableCell>
                        {/* {faq.question || faq.questionText || "No Question"} */}
{/* i want to limit the question character to 30 then i have to put ..  */}
                    {faq.question.length > 30 ? faq.question.substring(0, 30) + "..." : faq.question}

                        </TableCell>
                      <TableCell>{faq.answer.length > 30 ? faq.answer.substring(0, 30) + "..." : faq.answer  || faq.answerText || "No Answer"}</TableCell>
                      <TableCell>
                        {(() => {
                          let dateObj;

                          // Try using createdAt first
                          if (faq.createdAt) {
                            dateObj = new Date(faq.createdAt);
                          }
                          // Otherwise extract timestamp from MongoDB ObjectId
                          else if (faq._id && faq._id.length >= 8) {
                            const timestamp = parseInt(faq._id.substring(0, 8), 16) * 1000;
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
       <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={faqs.length}
          itemsPerPage={faqsPerPage}
        />
      </Header>

      {/* Delete confirmation modal */}
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
    </FAQContainer>
  );
};

export default FAQ;
