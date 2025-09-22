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
      // If API returns { data: [...] } or array directly:
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

  // pagination calculations
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

  // toggle single row
  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // select all on current page
  const handleSelectAllChange = () => {
    if (selectAll) {
      // unselect all current page items
      setSelectedIds((prev) =>
        prev.filter((id) => !currentNotifications.some((n) => n._id === id))
      );
    } else {
      // select all current page items
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
      await bulknotificationdeletion(selectedIds); // API expects { ids }

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
      <Header>
        <h2>
          All Notifications{" "}
          <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
            ({currentNotifications.length}/{notifications.length})
          </span>
        </h2>

        <div style={{ display: "flex", gap: 12 }}>
          {/* Bulk Delete CTA when selections present */}
          {!readOnlyPermissions && selectedIds.length > 0 && (
            <CreateButton
              style={{ background: "red" }}
              onClick={openBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </CreateButton>
          )}

          {!readOnlyPermissions && (
            <CreateButton
              onClick={() => navigate("/admin/web-management/notification/create")}
            >
              + Create Notification
            </CreateButton>
          )}
        </div>
      </Header>

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
                <td>{n.title}</td>
                <td>{n.description}</td>
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
  background: white;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  border-radius: 6px;
  font-size: 0.9rem;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: black; /* header background black */
    color: white;      /* header text white */
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }
`;
