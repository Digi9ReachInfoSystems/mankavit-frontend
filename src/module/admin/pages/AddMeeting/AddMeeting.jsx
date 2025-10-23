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
import { DatePicker } from "antd";
import { getAllCourses } from "../../../../api/courseApi";
import { createMeeting } from "../../../../api/meetingApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { getMeetingHostAdmins } from "../../../../api/userApi";
import { getCookiesData } from "../../../../utils/cookiesService";

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
  const [altHostEmail, setAltHostEmail] = useState("mankavit.classes11@gmail.com");
  const [autoRecord, setAutoRecord] = useState(false);
  const [recordingLocation, setRecordingLocation] = useState("cloud");
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
        console.log("coursesResponse", coursesResponse.data);
        const meetingHostsResponse = await getMeetingHostAdmins();
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
      const cookieData = await getCookiesData();
      if (!meetingTitle) return toast.error("Please enter meeting title");
      if (!meetingDateTime) return toast.error("Please select meeting date and time");
      if (!meetingDuration) return toast.error("Please enter meeting duration");
      if (selectedCourses.length === 0) return toast.error("Please select at least one course");
      if (!meetingPassword) return toast.error("Please enter meeting password");
      if(!meetingAgenda) return toast.error("Please enter meeting agenda");

      if (meetingType === "both") {
        if (!hostId) return toast.error("Please select a host");
        if (!altHostEmail) return toast.error("Please enter alternative host email");
      }
      let hostIds = [];
      if (meetingType === "both") {
        hostIds = [hostId]
        hostIds.push(cookieData.userId);
      } else if (meetingType === "me") {
        hostIds.push(cookieData.userId);
      }

      const meetingData = {
        topic: meetingTitle,
        startTime: meetingDateTime.toISOString(),
        duration: meetingDuration,
        agenda: meetingAgenda,
        password: meetingPassword,
        courseIds: selectedCourses,
        meeting_type: meetingType,
        hostId: meetingType === "both" ? "mankavit.classes11@gmail.com" : "me",
        alternativeHost: meetingType === "both" ? altHostEmail : null,
        autoRecord,
        record_location: recordingLocation,
        hostIds: hostIds  
      };
      console.log("meetingData", meetingData);
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

        {/* Auto Record */}
        <FormRow>
          <Column>
            <FieldWrapper className="toggle-wrapper">
              <Label>Auto Record</Label>
              <ToggleSwitch
                type="checkbox"
                checked={autoRecord}
                onChange={(e) => setAutoRecord(e.target.checked)}
                disabled={loading}
              />
            </FieldWrapper>
          </Column>
          <Column>
            {autoRecord && (
              <FieldWrapper>
                <Label>Recording Location</Label>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <label>
                    <input
                      type="radio"
                      value="cloud"
                      checked={recordingLocation === "cloud"}
                      onChange={(e) => setRecordingLocation(e.target.value)}
                      disabled={loading}
                    />
                    Cloud
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="local"
                      checked={recordingLocation === "local"}
                      onChange={(e) => setRecordingLocation(e.target.value)}
                      disabled={loading}
                    />
                    Local
                  </label>
                </div>
              </FieldWrapper>
            )}
          </Column>
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
                    { course.courseDisplayName ||course.courseName }
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
              <div style={{ display: "flex", gap: "1rem" }}>
                <label>
                  <input
                    type="radio"
                    value="me"
                    checked={meetingType === "me"}
                    onChange={(e) => setMeetingType(e.target.value)}
                    disabled={loading}
                  />
                  Me
                </label>
                <label>
                  <input
                    type="radio"
                    value="both"
                    checked={meetingType === "both"}
                    onChange={(e) => setMeetingType(e.target.value)}
                    disabled={loading}
                  />
                  Me + Alternative Host
                </label>
              </div>
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          {meetingType === "both" && (
            <Column>
              <FieldWrapper>
                <Label htmlFor="hostSelect">Select Teacher</Label>
                <select
                  id="hostSelect"
                  value={hostId}
                  onChange={(e) => setHostId(e.target.value)}
                  disabled={loading}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="">-- Select a Teacher --</option>
                  {hostsList.map((host) => (
                    <option key={host.email} value={host._id}>
                      {host.displayName || host.email}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="altHostEmail">Alternative Host Email</Label>
                <Input
                  id="altHostEmail"
                  type="email"
                  placeholder="Enter Zoom host email"
                  value={altHostEmail}
                  onChange={(e) => setAltHostEmail(e.target.value)}
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
