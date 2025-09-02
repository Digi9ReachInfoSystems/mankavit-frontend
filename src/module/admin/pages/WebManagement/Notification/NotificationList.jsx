// src/components/Notification/NotificationsList.jsx
import React, { useEffect, useState } from "react";
import { getAllNotifications } from "../../../../../api/notificationApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../component/Pagination/Pagination";
import { getAuth } from "../../../../../utils/authService";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // show 5 notifications per page
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

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const resp = await getAllNotifications();
      setNotifications(resp.data || resp || []);
    } catch (err) {
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
  const currentNotifications = notifications.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <Container>
      <Header>
        <h2>All Notifications</h2>
        {!readOnlyPermissions && (
          <CreateButton
            onClick={() =>
              navigate("/admin/web-management/notification/create")
            }
          >
            + Create Notification
          </CreateButton>
        )}

      </Header>

      <Table>
        <thead>
          <tr>
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
                <td>{n.title}</td>
                <td>{n.description}</td>
                <td>{n.time ? new Date(n.time).toLocaleString() : "-"}</td>
                <td>{n.notificationType}</td>
                <td>{new Date(n.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
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
    background: black;       /* header background black */
    color: white;            /* header text white */
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }
`;
