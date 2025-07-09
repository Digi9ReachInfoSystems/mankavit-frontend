// src/components/UserNotifications/UserNotifications.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  NotificationContainer,
  NotificationBox,
  NotificationText,
  Time,
  ClearButton,
} from "./UserNotifications.styles";
import { FaBell } from "react-icons/fa";
import { getUserNotifications, clearNotification } from "../../../../api/notificationApi";
import { getCookiesData } from "../../../../utils/cookiesService";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  // load userId from cookies
  useEffect(() => {
    (async () => {
      const { userId: id } = await getCookiesData();
      setUserId(id);
    })();
  }, []);

  // fetch notifications when we have a userId
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await getUserNotifications(userId);
        const list = Array.isArray(data)
          ? data
          : data.notifications || data.body?.notifications || [];
        setNotifications(list);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    })();
  }, [userId]);

  // handler to clear a single notification
  const handleClear = async (id) => {
    try {
      await clearNotification(id);
      // remove it locally
      setNotifications((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to clear notification:", err);
    }
  };

  return (
    <Container>
      <Title>Your Notifications</Title>

      {notifications.length === 0 ? (
        <p>No notifications to display.</p>
      ) : (
        notifications.map((note) => (
          <NotificationContainer key={note._id}>
            <NotificationBox>
              <NotificationText>
                <FaBell color="#FFC107" />{" "}
                <strong>{note.title}</strong>
                <p>{note.description}</p>
              </NotificationText>
              {/* Clear button in top-right corner */}
              <ClearButton onClick={() => handleClear(note._id)}>×</ClearButton>
            </NotificationBox>
            <Time>
              {new Date(note.time).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Time>
          </NotificationContainer>
        ))
      )}
    </Container>
  );
};

export default UserNotifications;
