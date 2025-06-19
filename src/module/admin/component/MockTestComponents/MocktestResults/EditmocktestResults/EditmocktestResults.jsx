import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Label,
  Input,
  Button
} from "./EditmocktestResults.styles";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toDateTimeLocal = (date) => {
  // returns YYYY‑MM‑DDTHH:mm for <input type="datetime-local">
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );          // <-- keep minutes only; seconds aren't needed for the picker
};

const formatForDisplay = (inputValue) => {
  let iso = inputValue;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inputValue)) {
    iso += ":00";
  }

  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "medium"
  }).format(date);
};


export default function EditMockTestResult() {
  const { state: originalData } = useLocation();
  const navigate = useNavigate();

  // set initial state and pre‑fill datetime‑local input
  const [formData, setFormData] = useState(() => {
    if (!originalData) return {};
    const clone = { ...originalData };

    if (originalData.submissionDate) {
      const parsed = new Date(originalData.submissionDate);
      if (!isNaN(parsed)) clone.submissionDate = toDateTimeLocal(parsed);
    }
    return clone;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      submissionDate: formatForDisplay(formData.submissionDate)
    };

    console.log("updated data", formattedData);
    toast.success("Updated successfully");

    navigate("/admin/results", { state: { updatedResult: formattedData } });
  };

  if (!originalData) {
    return (
      <Container>
        <p>
          No data to edit. <button onClick={() => navigate(-1)}>Go back</button>
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Title>Edit Mock Test Result</Title>

      <form onSubmit={handleSubmit}>
        <Label>Test Name</Label>
        <Input
          name="testName"
          value={formData.testName || ""}
          onChange={handleChange}
        />

        <Label>Student Name</Label>
        <Input
          name="studentName"
          value={formData.studentName || ""}
          onChange={handleChange}
        />

        <Label>Email</Label>
        <Input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <Label>Marks</Label>
        <Input
          name="marks"
          value={formData.marks || ""}
          onChange={handleChange}
        />

        <Label>Time to Complete</Label>
        <Input
          name="timeToComplete"
          value={formData.timeToComplete || ""}
          onChange={handleChange}
        />

        <Label>Submission Date</Label>
        <Input
          type="datetime-local"
          name="submissionDate"
          value={formData.submissionDate || ""}
          onChange={handleChange}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
}
