// src/components/Notification/NotificationsList.jsx
import React, { useEffect, useState } from "react";
import { getAllNotifications, bulknotificationdeletion } from "../../../../../api/notificationApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../component/Pagination/Pagination";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import { getAuth } from "../../../../../utils/authService";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const navigate = useNavigate();

  // bulk delete state
  const [selectedIds, setSelectedIds] = useState([]); // selected notification _ids
  const [selectAll, setSelectAll] = useState(false);  // page-level select all
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    };
    apiCaller();
  }, []);

  const fetchNotifications = async () => {
    try {
      const resp = await getAllNotifications();
      const list = resp?.data ?? resp ?? [];
      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // pagination
  const totalItems = notifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentNotifications = notifications.slice(startIdx, startIdx + itemsPerPage);

  // keep page-level selectAll in sync
  useEffect(() => {
    const allSelected =
      currentNotifications.length > 0 &&
      currentNotifications.every((n) => selectedIds.includes(n._id));
    setSelectAll(allSelected);
  }, [currentNotifications, selectedIds]);

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentNotifications.some((n) => n._id === id))
      );
    } else {
      setSelectedIds((prev) => {
        const pageIds = currentNotifications.map((n) => n._id);
        const add = pageIds.filter((id) => !prev.includes(id));
        return [...prev, ...add];
      });
    }
    setSelectAll(!selectAll);
  };

  const openBulkDelete = () => setBulkModalOpen(true);

  const handleBulkDelete = async () => {
    try {
      if (selectedIds.length === 0) {
        setBulkModalOpen(false);
        return;
      }
      setBulkLoading(true);
      await bulknotificationdeletion(selectedIds);

      // Remove locally
      setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n._id)));
      setSelectedIds([]);
      setSelectAll(false);
      setBulkModalOpen(false);
      toast.success("Selected notifications deleted successfully");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Bulk delete failed:", err);
      toast.error(
        err?.response?.data?.error || "Failed to delete selected notifications"
      );
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <Container>
      <HeaderRow>
        <Title>
          All Notifications{" "}
          <small>({currentNotifications.length}/{notifications.length})</small>
        </Title>

        <Controls>
          {!readOnlyPermissions && selectedIds.length > 0 && (
            <PrimaryButton $danger onClick={openBulkDelete}>
              Delete Selected ({selectedIds.length})
            </PrimaryButton>
          )}

          {!readOnlyPermissions && (
            <PrimaryButton onClick={() => navigate("/admin/web-management/notification/create")}>
              + Create Notification
            </PrimaryButton>
          )}
        </Controls>
      </HeaderRow>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {!readOnlyPermissions && (
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
              )}
              <th>Title</th>
              <th>Description</th>
              <th>Scheduled Time</th>
              <th>Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentNotifications.length > 0 ? (
              currentNotifications.map((n, idx) => (
                <tr key={n._id} className={idx === 0 ? "first-row" : ""}>
                  {!readOnlyPermissions && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(n._id)}
                        onChange={() => toggleRow(n._id)}
                      />
                    </td>
                  )}
                  <td className="truncate">{n.title}</td>
                  <td className="truncate desc">{n.description}</td>
                  <td>{n.time ? new Date(n.time).toLocaleString() : "-"}</td>
                  <td>{n.notificationType}</td>
                  <td>{n.createdAt ? new Date(n.createdAt).toLocaleString() : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={readOnlyPermissions ? 5 : 6} style={{ textAlign: "center" }}>
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Bulk delete confirmation modal */}
      <DeleteModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onDelete={handleBulkDelete}
        loading={bulkLoading}
      />

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </Container>
  );
};

export default NotificationsList;

/* ---------------------- Styles ---------------------- */
const Container = styled.div`
  margin: 20px 40px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    margin: 10px;
    padding: 16px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;

  small {
    font-weight: 400;
    color: #6d6e75;
    font-size: 12px;
    margin-left: 6px;
  }
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    & > * {
      width: 100%;
    }
  }
`;

const PrimaryButton = styled.button`
  background: ${({ $danger }) => ($danger ? "#ef4444" : "linear-gradient(to right, #0dcaf0, #007bff)")};
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: transform .06s ease, box-shadow .2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;        /* Horizontal scroll on small screens */
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e5e7eb;
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px;        /* Keep columns readable; wrapper will scroll on phones */
  border-collapse: collapse;
  font-size: 0.92rem;

  thead th,
  tbody td {
    padding: 12px 14px;
    border-bottom: 1px solid #eee;
    text-align: left;
    vertical-align: middle;
  }

  thead th {
    background: #0f172a;   /* black-ish header */
    color: #fff;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr:nth-child(even) {
    background: #fafafa;
  }

  /* Nice truncation on long text cells */
  .truncate {
    max-width: 340px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    max-width: 480px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    .truncate { max-width: 220px; }
    .desc { max-width: 260px; }
  }

  @media (max-width: 480px) {
    .truncate { max-width: 160px; }
    .desc { max-width: 200px; }
  }
`;
