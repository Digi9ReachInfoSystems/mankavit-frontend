import React, { useState, useEffect, useMemo } from "react";
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  PdfLink,
  ActionsWrapper,
  CreateButton,
  ButtonContainer,
  Container,
  HeaderRow,
  Title,
} from "../QuestionPaper/QuestionPaper.style";
import Pagination from "../../../component/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import {
  getAllQuestionPapers,
  deleteQuestionPaper,
  bulkquestionpaperdeletion,
} from "../../../../../api/questionPaperApi";
import { notification } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getAuth } from "../../../../../utils/authService";

const ITEMS_PER_PAGE = 10;

// helper to compare paper selections
const keyOf = (t, y) => `${t}::${String(y)}`;

const QuestionPaper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // single delete modal
  const [modal, setModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState(null);
  const [deleteYear, setDeleteYear] = useState(null);

  // read-only
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  // title filter
  const [titleFilter, setTitleFilter] = useState("ALL");

  // bulk select/delete
  const [selectedPapers, setSelectedPapers] = useState([]); // array of {title, year}
  const [selectAll, setSelectAll] = useState(false);
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

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

  // helper timestamp for sorting
  const ts = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) {
      return parseInt(item._id.substring(0, 8), 16) * 1000;
    }
    return 0;
  };

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestionPapers();
        const sorted = (response.data ?? response).sort((a, b) => ts(b) - ts(a));
        setData(sorted);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching question papers:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch question papers",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPapers();
  }, []);

  // Unique titles for filter dropdown
  const uniqueTitles = useMemo(() => {
    const titles = Array.from(
      new Set((data || []).map((d) => d.title).filter(Boolean))
    );
    titles.sort((a, b) => a.localeCompare(b));
    return titles;
  }, [data]);

  // Apply filter by title (still row-based)
  const filteredData = useMemo(() => {
    if (titleFilter === "ALL") return data;
    return data.filter((d) => d.title === titleFilter);
  }, [data, titleFilter]);

  // ===== Flatten papers into an array of individual paper entries =====
  // each flat item: { title, year, question_url, rowId, originalRow }
  const flatPapers = useMemo(() => {
    const arr = [];
    (filteredData || []).forEach((row) => {
      (row.papers || []).forEach((p) => {
        arr.push({
          title: row.title,
          year: p.year,
          question_url: p.question_url,
          rowId: row._id,
          originalRow: row,
        });
      });
    });
    return arr;
  }, [filteredData]);

  // Pagination based on flatPapers
  const totalPapers = flatPapers.length;
  const totalPages = Math.max(1, Math.ceil(totalPapers / ITEMS_PER_PAGE));
  // ensure currentPage is within bounds when data changes
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const currentPagePapers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return flatPapers.slice(start, start + ITEMS_PER_PAGE);
  }, [flatPapers, currentPage]);

  // keys for the current page's papers (used by select-all and selection logic)
  const pagePaperKeys = useMemo(() => {
    return currentPagePapers.map((p) => keyOf(p.title, p.year));
  }, [currentPagePapers]);

  const isSelected = (title, year) =>
    selectedPapers.some((s) => s.title === title && String(s.year) === String(year));

  const togglePaper = (title, year) => {
    setSelectedPapers((prev) => {
      const exists = prev.some(
        (s) => s.title === title && String(s.year) === String(year)
      );
      if (exists) {
        return prev.filter(
          (s) => !(s.title === title && String(s.year) === String(year))
        );
      }
      return [...prev, { title, year }];
    });
  };

  const handleSelectAllChange = () => {
    setSelectedPapers((prev) => {
      if (selectAll) {
        // unselect all papers on this page
        return prev.filter((s) => !pagePaperKeys.includes(keyOf(s.title, s.year)));
      }
      // select all papers on this page (merge unique)
      const toAdd = [];
      currentPagePapers.forEach((p) => {
        const k = keyOf(p.title, p.year);
        const already = prev.some((s) => keyOf(s.title, s.year) === k);
        if (!already) toAdd.push({ title: p.title, year: p.year });
      });
      return [...prev, ...toAdd];
    });
    setSelectAll((prev) => !prev);
  };

  // keep page selectAll in sync when page/data/selection changes
  useEffect(() => {
    const allSelected =
      pagePaperKeys.length > 0 &&
      pagePaperKeys.every((k) =>
        selectedPapers.some((s) => keyOf(s.title, s.year) === k)
      );
    setSelectAll(allSelected);
  }, [pagePaperKeys, selectedPapers]);

  const handleDelete = (title, year) => {
    setDeleteTitle(title);
    setDeleteYear(year);
    setModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteQuestionPaper(deleteTitle, deleteYear);
      // update data: remove that paper from the corresponding row and drop empty rows
      setData((prev) =>
        prev
          .map((item) => {
            if (item.title !== deleteTitle) return item;
            return {
              ...item,
              papers: (item.papers || []).filter(
                (p) => String(p.year) !== String(deleteYear)
              ),
            };
          })
          .filter((item) => (item.papers || []).length > 0)
          .sort((a, b) => ts(b) - ts(a))
      );
      // also remove from selection if present
      setSelectedPapers((prev) =>
        prev.filter(
          (s) => !(s.title === deleteTitle && String(s.year) === String(deleteYear))
        )
      );
      toast.success("Data deleted successfully");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting question paper:", error);
      toast.error("Failed to delete. Please try again");
    } finally {
      setModal(false);
      setDeleteTitle(null);
      setDeleteYear(null);
      setLoading(false);
    }
  };

  const openBulkDelete = () => setBulkModal(true);

  const handleBulkDelete = async () => {
    try {
      setBulkLoading(true);

      // Group selectedPapers -> [{ title, years: [...] }]
      const grouped = selectedPapers.reduce((acc, { title, year }) => {
        const key = title.trim();
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(String(year)); // keep as string; backend can match string/number
        return acc;
      }, {});

      const papperInfo = Object.entries(grouped).map(([title, yearsSet]) => ({
        title,
        years: Array.from(yearsSet),
      }));

      await bulkquestionpaperdeletion(papperInfo); // 👈 send grouped payload

      // Update UI: remove all selected rows locally
      setData((prev) =>
        prev
          .map((item) => {
            const removeForTitle = new Set(
              (papperInfo.find((p) => p.title === item.title)?.years || []).map(String)
            );
            const remaining = (item.papers || []).filter(
              (p) => !removeForTitle.has(String(p.year))
            );
            return { ...item, papers: remaining };
          })
          .filter((item) => (item.papers || []).length > 0)
          .sort((a, b) => ts(b) - ts(a))
      );

      toast.success("Selected question papers deleted successfully");
      setSelectedPapers([]);
      setSelectAll(false);
      setBulkModal(false);
      // reset to first page if current page is beyond last after deletion
      setCurrentPage(1);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error(error.response?.data?.error || "Failed to delete selected question papers");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleViewClick = (rowId) => {
    navigate(`/admin/web-management/question-paper/view/${rowId}`);
  };

  return (
    <>
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
        theme="colored"
      />

      {/* Top-right: Filter + Add */}
      <ButtonContainer style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <select
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #dcdcdc",
            background: "#fff",
            cursor: "pointer",
            minWidth: 220,
          }}
          title="Filter by Exam name"
        >
          <option value="ALL">Search by exam name</option>
          {uniqueTitles.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {!readOnlyPermissions && (
          <CreateButton
            onClick={() => navigate("/admin/web-management/question-paper/create")}
          >
            Add Question Paper
          </CreateButton>
        )}
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            All Question Papers{" "}
            <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
              ({currentPagePapers.length}/{totalPapers})
            </span>
          </Title>

          {/* Bulk Delete CTA when there are selections */}
          {!readOnlyPermissions && selectedPapers.length > 0 && (
            <div>
              <CreateButton onClick={openBulkDelete}>
                Delete Selected ({selectedPapers.length})
              </CreateButton>
            </div>
          )}
        </HeaderRow>

        <TableWrapper>
          <StyledTable>
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
                <TableHeader>Exam name</TableHeader>
                <TableHeader>Year</TableHeader>
                <TableHeader>View PDF</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {currentPagePapers.map((paper) => {
                const selected = isSelected(paper.title, paper.year);
                return (
                  <TableRow key={`${paper.title}-${paper.year}`}>
                    {!readOnlyPermissions && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={!!selected}
                          onChange={() => togglePaper(paper.title, paper.year)}
                        />
                      </TableCell>
                    )}

                    <TableCell title="View details">{paper.title}</TableCell>

                    <TableCell>{paper.year}</TableCell>

                    <TableCell>
                      <PdfLink
                        href={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${paper.question_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </PdfLink>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPapers === 0 ? 1 : Math.ceil(totalPapers / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
          totalItems={totalPapers}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {/* Single delete */}
      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleConfirmDelete}
          loading={loading}
        />
      )}

      {/* Bulk delete */}
      {bulkModal && (
        <DeleteModal
          isOpen={bulkModal}
          onClose={() => setBulkModal(false)}
          onDelete={handleBulkDelete}
          loading={bulkLoading}
        />
      )}
    </>
  );
};

export default QuestionPaper;
