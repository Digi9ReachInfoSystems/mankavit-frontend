import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Input,
  TextArea,
  SubmitButton,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  ToggleSwitch
} from "../AddMeeting/AddMeeting.styles";
import { useNavigate } from "react-router-dom";
import { DatePicker, Select } from "antd";
import { getAllCourses } from "../../../../api/courseApi";
import { createMeeting } from "../../../../api/meetingApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { getMeetingHostAdmins } from "../../../../api/userApi";

export default function AddMeeting() {
  const navigate = useNavigate();

  // Form state
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDateTime, setMeetingDateTime] = useState(null);
  const [meetingDuration, setMeetingDuration] = useState("");
  const [meetingAgenda, setMeetingAgenda] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [meetingType, setMeetingType] = useState("me");
  const [hostId, setHostId] = useState("");
  const [autoRecord, setAutoRecord] = useState(false);

  // Data lists
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hostsList, setHostsList] = useState([]);

  // Search
  const [courseSearch, setCourseSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const coursesResponse = await getAllCourses();
        const meetingHostsResponse = await getMeetingHostAdmins();
        console.log("Meeting Hosts:", meetingHostsResponse);
        setHostsList(meetingHostsResponse.hosts || []);
        setCoursesList(coursesResponse.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!meetingTitle) return toast.error("Please enter meeting title");
      if (!meetingDateTime) return toast.error("Please select meeting date and time");
      if (!meetingDuration) return toast.error("Please enter meeting duration");
      if (selectedCourses.length === 0) return toast.error("Please select at least one course");
      if (!meetingPassword) return toast.error("Please enter meeting password");
      if (meetingType === "other_host" && !hostId) return toast.error("Please select host");

      const meetingData = {
        topic: meetingTitle,
        startTime: meetingDateTime.toISOString(),
        duration: meetingDuration,
        agenda: meetingAgenda,
        password: meetingPassword,
        courseIds: selectedCourses,
        meeting_type: meetingType,
        hostId: meetingType === "other_host" ? hostId : "me",
        autoRecord: autoRecord,

      };
      //       {
      // "topic": "Physics Workshop - Quantum Mechanics",
      //   "agenda": "Advanced quantum mechanics concepts discussion",
      //   "password": "physics456",
      //   "meeting_type": "other_host",
      //   "courseIds": ["685ce3a364f059247600867d", "685cf7b7f811d08dd9739180"],
      //   "startTime": "2025-09-09T10:00:00Z",
      //   "duration": 60,
      //    "hostId": "naven1897@gmail.com" // Zoom user ID or email of the alternate host
      // }

      const response = await createMeeting(meetingData);
      if (response) {
        toast.success("Meeting created successfully!");
        setTimeout(() => navigate("/admin/meeting-management"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter courses by search
  const filteredCourses = coursesList.filter((course) =>
    (course.title || course.courseName)
      ?.toLowerCase()
      .includes(courseSearch.toLowerCase())
  );

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />

      <Title>Add New Meeting</Title>

      <FormWrapper onSubmit={handleSubmit}>
        {/* Meeting Title */}
        <FormRow>
          <FieldWrapper>
            <Label htmlFor="meetingTitle">Meeting Title*</Label>
            <Input
              id="meetingTitle"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Enter meeting title"
              disabled={loading}
            />
          </FieldWrapper>
        </FormRow>
        <FormRow>
          {/* <Column> */}
            <FieldWrapper className="toggle-wrapper">
              <Label>Auto Record</Label>
              <ToggleSwitch
                type="checkbox"
                checked={autoRecord}
                onChange={(e) => setAutoRecord(e.target.checked)}
              />
            </FieldWrapper>
          {/* </Column> */}
        </FormRow>

        {/* Password + DateTime */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="meetingPassword">Meeting Password*</Label>
              <Input
                id="meetingPassword"
                value={meetingPassword}
                onChange={(e) => setMeetingPassword(e.target.value)}
                placeholder="Enter meeting password"
                disabled={loading}
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Date & Time*</Label>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                value={meetingDateTime}
                onChange={(date) => setMeetingDateTime(date)}
                style={{ width: "100%" }}
                disabled={loading}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Duration */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="meetingDuration">Duration (minutes)*</Label>
              <Input
                id="meetingDuration"
                type="number"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 60"
                disabled={loading}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Course Selection with Search */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Courses*</CheckboxSectionTitle>
              <Input
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search courses..."
                style={{ marginBottom: "8px" }}
                disabled={loading}
              />
              <CheckboxList>
                {filteredCourses.map((course) => (
                  <CheckboxLabel key={course._id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedCourses.includes(course._id)}
                      onChange={() => handleCourseToggle(course._id)}
                      disabled={loading}
                    />
                    {course.title || course.courseName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Agenda */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="meetingAgenda">Agenda</Label>
              <TextArea
                id="meetingAgenda"
                rows={3}
                value={meetingAgenda}
                onChange={(e) => setMeetingAgenda(e.target.value)}
                placeholder="Enter meeting agenda"
                disabled={loading}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Host Selection */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Meeting Host*</Label>
              <Select
                style={{ width: "100%" }}
                value={meetingType}
                onChange={setMeetingType}
                options={[
                  { value: "me", label: "Me" },
                  { value: "other_host", label: "Other Host" },
                ]}
                disabled={loading}
              />
            </FieldWrapper>
          </Column>
          {meetingType === "other_host" && (
            <Column>
              <FieldWrapper>
                <Label htmlFor="hostId">Host*</Label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  value={hostId}
                  onChange={setHostId}
                  options={hostsList.map((host) => ({
                    value: host.email,
                    label: host.displayName || host.email,
                  }))}
                  optionFilterProp="children"
                  placeholder="Search & select host"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={loading}
                />
              </FieldWrapper>
            </Column>
          )}
        </FormRow>

        {/* Submit */}
        <FormRow>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Meeting"}
          </SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
