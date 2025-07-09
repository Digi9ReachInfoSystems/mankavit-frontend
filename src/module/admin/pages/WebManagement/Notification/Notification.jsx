// src/components/Notification/Notification.jsx
import React, { useState } from "react";
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

const Notification = ({
  scheduleTime: defaultSchedule = new Date().toISOString().slice(0,16),
}) => {
  // scheduleTime in "YYYY-MM-DDTHH:mm" format for datetime-local
  const [scheduleTime, setScheduleTime] = useState(defaultSchedule);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // reset schedule to now + 1 hour (optional)
      setScheduleTime(new Date().toISOString().slice(0,16));
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule notification. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Schedule Notification</h2>
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
    </Container>
  );
};

export default Notification;
