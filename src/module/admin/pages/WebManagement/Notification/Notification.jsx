// src/components/Notification/NotificationCreate.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  FormGroup,
  Label,
  ReadOnlyInput,
  TextInput,
  TextArea,
  SubmitButton,
} from "../Notification/Notification.style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNotification } from "../../../../../api/notificationApi";
import { getAuth } from "../../../../../utils/authService";

const localInputDatetime = (date = new Date()) => {
  const d = new Date(date);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const Notification = ({
  scheduleTime: defaultSchedule = localInputDatetime(),
}) => {
  const [scheduleTime, setScheduleTime] = useState(defaultSchedule);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnlyPermissions) {
      toast.error("You don't have permission to schedule notifications.");
      return;
    }
    try {
      await createNotification({
        title,
        description,
        time: new Date(scheduleTime).toISOString(),
        notificationType: "In-App",
      });
      toast.success("Notification scheduled successfully.");
      setTitle("");
      setDescription("");
      setScheduleTime(localInputDatetime());
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule notification. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Send At</Label>
          <ReadOnlyInput
            as="input"
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Title</Label>
          <TextInput
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            rows={6}
            placeholder="Enter description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Send Notification</SubmitButton>
      </form>

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </Container>
  );
};

export default Notification;
