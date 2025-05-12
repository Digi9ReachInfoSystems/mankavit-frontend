import React from 'react';
import { Container, 
    Title, 
    NotificationContainer,
    NotificationBox, 
    NotificationText, 
    Time 
} from './UserNotifications.styles';
import { FaBell } from "react-icons/fa";

const notifications = [
  {
    title: '"Time To Study!"',
    message: '"Your Daily CLAT Practice Quiz Is Ready. Test Yourself Now!"',
    time: '3 Mins ago',
  },
  {
    title: '"Time To Study!"',
    message: '"Your Daily CLAT Practice Quiz Is Ready. Test Yourself Now!"',
    time: '3 Mins ago',
  },
  {
    title: '"Time To Study!"',
    message: '"Your Daily CLAT Practice Quiz Is Ready. Test Yourself Now!"',
    time: '3 Mins ago',
  },
];

const UserNotifications = () => (
  <Container>
    <Title>Notification</Title>
    {notifications.map((note, index) => (
        <NotificationContainer>
      <NotificationBox key={index}>
        <NotificationText>
          <strong> <FaBell color='#FFC107'/> {note.title}</strong>
          <p>{note.message}</p>
        </NotificationText>
      </NotificationBox>
      <Time>{note.time}</Time>
      </NotificationContainer>
    ))}
  </Container>
);

export default UserNotifications;
