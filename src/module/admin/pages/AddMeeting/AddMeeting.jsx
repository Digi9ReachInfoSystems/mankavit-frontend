import React, { useState, useRef, useEffect } from "react";
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
    CheckboxSection,
    CheckboxSectionTitle,
    CheckboxList,
    CheckboxLabel,
    CheckboxInput,
    SubmitButton,
} from "../AddMeeting/AddMeeting.styles";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../../api/subjectApi";
import { Select, DatePicker, TimePicker } from "antd";
import { getCategories } from "../../../../api/categoryApi";
import { createMeeting } from "../../../../api/meetingApi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { getAllCourses } from "../../../../api/courseApi";
import { set } from "date-fns";

export default function AddMeeting() {
    const navigate = useNavigate();

    // Form state
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDateTime, setMeetingDateTime] = useState(null);
    const [meetingDuration, setMeetingDuration] = useState("");
    const [meetingAgenda, setMeetingAgenda] = useState("");
    const [meetingPasword, setMeetingPasword] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // Data lists
    const [coursesList, setCoursesList] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch courses for dropdown
                const coursesResponse = await getAllCourses();
                console.log("coursesResponse", coursesResponse);
                setCoursesList(coursesResponse.data || []);

                // Fetch students for checkbox list


                // For now, using mock data
                setStudentsList([

                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load required data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (!selectedCourse) return;
        console.log("selectedCourse", selectedCourse);
        const selectedCourseData = coursesList.find((course) => course._id === selectedCourse);
        console.log("selectedCourseData", selectedCourseData);
        const enrolledStudents = selectedCourseData.student_enrolled.map((student) => {
            return ({
                id: student._id,
                name: student.displayName
            })

        })
        setStudentsList(enrolledStudents);
    }, [selectedCourse])

    const handleStudentToggle = (studentId) => {
        setStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Validation
            if (!meetingTitle) return toast.error("Please enter meeting title");
            if (!meetingDateTime) return toast.error("Please select meeting date and time");
            if (!meetingDuration) return toast.error("Please enter meeting duration");
            if (!selectedCourse) return toast.error("Please select a course");
            if (!meetingPasword) return toast.error("Please enter meeting password");
            if (students.length === 0) return toast.error("Please select at least one student");

            const meetingData = {
                topic: meetingTitle,
                startTime: meetingDateTime.toISOString(),
                duration: meetingDuration,
                meeting_agenda: meetingAgenda,
                hostId:"me",
                courseId: selectedCourse,
                studentIds: students,
                password: meetingPasword,
                settings:{},

            };

            const response = await createMeeting(meetingData);
            if (response) {
                toast.success("Meeting created successfully!");
                setTimeout(() => navigate("/admin/meeting-management"), 2000);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create meeting. Please try again.");
        }finally{
            setLoading(false);
        }
    };

    return (
        <Container>
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
                theme='colored'
            />

            <Title>Add New Meeting</Title>

            <FormWrapper onSubmit={handleSubmit}>
                {/* Meeting Title and DateTime */}
                <FormRow>
                    <FieldWrapper >
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
                    <Column>
                        <FieldWrapper>
                            <Label htmlFor="meetingPasword">Meeting Password*</Label>
                            <Input
                                id="meetingPasword"
                                value={meetingPasword}
                                onChange={(e) => setMeetingPasword(e.target.value)}
                                placeholder="Enter meeting Passwrd"
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
                                style={{ width: '100%' }}
                                disabled={loading}
                                disabledDate={(current) => {
                                    return current && current < dayjs().startOf('day');
                                }}
                            />
                        </FieldWrapper>
                    </Column>
                </FormRow>

                {/* Duration and Course Selection */}
                <FormRow>
                    <Column>
                        <FieldWrapper>
                            <Label htmlFor="meetingDuration">Duration (minutes)*</Label>
                            <Input
                                id="meetingDuration"
                                type="number"
                                value={meetingDuration}
                                onChange={(e) => setMeetingDuration(e.target.value.replace(/\D/g, ''))}
                                placeholder="e.g. 60"
                                disabled={loading}
                            />
                        </FieldWrapper>
                    </Column>
                    <Column>
                        <FieldWrapper>
                            <Label>Course*</Label>
                            <Select
                                style={{ width: '100%' }}
                                value={selectedCourse}
                                onChange={setSelectedCourse}
                                options={coursesList.map(course => ({
                                    value: course._id,
                                    label: course.title || course.courseName,
                                }))}
                                disabled={loading}
                                placeholder="Select course"
                            />
                        </FieldWrapper>
                    </Column>
                </FormRow>

                {/* Meeting Agenda */}
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

                {/* Students Selection */}
                <FormRow>
                    <Column>
                        <CheckboxSection>
                            <CheckboxSectionTitle>Select Students*</CheckboxSectionTitle>
                            <CheckboxList>
                                {studentsList.map(student => (
                                    <CheckboxLabel key={student.id}>
                                        <CheckboxInput
                                            type="checkbox"
                                            checked={students.includes(student.id)}
                                            onChange={() => handleStudentToggle(student.id)}
                                            disabled={loading}
                                        />
                                        {student.name}
                                    </CheckboxLabel>
                                ))}
                            </CheckboxList>
                        </CheckboxSection>
                    </Column>
                </FormRow>

                {/* Submit Button */}
                <FormRow>
                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Meeting"}
                    </SubmitButton>
                </FormRow>
            </FormWrapper>
        </Container>
    );
}