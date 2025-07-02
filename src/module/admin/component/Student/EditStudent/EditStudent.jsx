/* EditStudent.jsx — full component */
import React, { useEffect, useState } from "react";
import {
  FormContainer, Title, InputGroup, Label, InputField, SubmitButton, FlexRow,
  ReadOnlyField, CourseSelection, CourseCheckbox, CourseLabel,
  CourseList, CourseItem, ErrorMessage, LoadingSpinner
} from "./EditStudent.style";

import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllCourses }              from "../../../../../api/courseApi";
import { addCourseToStudent,
         removeCourseFromStudent     } from "../../../../../api/userApi";
import { getUserByUserId,
         updateUserById              } from "../../../../../api/authApi";

const EMAIL_RGX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RGX  = /^\+?\d{7,15}$/;   // simple international check

/* ==================================================================== */
const EditStudent = () => {
  const { userId } = useParams();                  // route param :userId
  const navigate   = useNavigate();

  /* ─── local state ─────────────────────────────────────────────────── */
  const [student,        setStudent]        = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);

  const [courses,        setCourses]        = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [form,           setForm]           = useState({ displayName: "", email: "", phone: "" });
  const [selected,       setSelected]       = useState([]);    // course ids (checked)

  const [processing,     setProcessing]     = useState(false);
  const [formErrors,     setFormErrors]     = useState({});

  /* ─── fetch student ───────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        setLoadingStudent(true);
        const res = await getUserByUserId(userId);
        if (!res.success || !res.user) throw new Error("Student not found");
        const stu = res.user;

        /* derive current course ids */
        const currentIds =
          stu.courseIds?.length
            ? stu.courseIds
            : (stu.subscription || []).map(s => s.course_enrolled?._id || s.course_enrolled);

        setStudent(stu);
        setSelected(currentIds);
        setForm({ displayName: stu.displayName || "", email: stu.email || "", phone: stu.phone || "" });
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load student");
        navigate("/admin/student-management");
      } finally {
        setLoadingStudent(false);
      }
    })();
  }, [userId, navigate]);

  /* ─── fetch courses ──────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        setLoadingCourses(true);
        const res  = await getAllCourses();
        const list = res?.data || res || [];
        setCourses(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    })();
  }, []);

  const currentIds = student?.courseIds?.length
    ? student.courseIds
    : (student?.subscription || []).map(s => s.course_enrolled?._id || s.course_enrolled);

  const available = courses.filter(c => !currentIds.includes(c._id));
  const enrolled  = courses.filter(c =>  currentIds.includes(c._id));

  const toggleCourse = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const onFormChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.displayName.trim()) errs.displayName = "Name required";
    if (!EMAIL_RGX.test(form.email)) errs.email = "Invalid email";
    if (!PHONE_RGX.test(form.phone)) errs.phone = "Invalid phone";
    if (selected.length === 0) errs.courseIds = "Select at least one course";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!student || !validate()) return;
    setProcessing(true);

    try {
      await updateUserById(student._id, {
        displayName: form.displayName.trim(),
        email:       form.email.trim(),
        phone:       form.phone.trim()
      });

      /* 2️⃣ update courses */
      const toAdd    = selected.filter(id => !currentIds.includes(id));
      const toRemove = currentIds.filter(id => !selected.includes(id));

      if (toAdd.length)    await addCourseToStudent   ({ userId: student._id, courseIds: toAdd });
      if (toRemove.length) await removeCourseFromStudent({ userId: student._id, courseIds: toRemove });

      toast.success("Student updated");
      navigate("/admin/student-management");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setProcessing(false);
    }
  };

  /* ─── guards ─────────────────────────────────────────────────────── */
  if (loadingStudent)
    return (
      <FormContainer>
        <LoadingSpinner />
        <p>Loading student data…</p>
      </FormContainer>
    );
  if (!student) return null;

  /* ─── render ─────────────────────────────────────────────────────── */
  return (
    <FormContainer>
      <Title>Edit Student</Title>

      {/* BASIC DETAILS */}
      <InputGroup>
        <Label>Name*</Label>
        <InputField
          name="displayName"
          value={form.displayName}
          onChange={onFormChange}
          disabled={processing}
        />
        {formErrors.displayName && <ErrorMessage>{formErrors.displayName}</ErrorMessage>}
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email*</Label>
          <InputField
            name="email"
            value={form.email}
            onChange={onFormChange}
            disabled={processing}
          />
          {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label>Phone*</Label>
          <InputField
            name="phone"
            value={form.phone}
            onChange={onFormChange}
            disabled={processing}
          />
          {formErrors.phone && <ErrorMessage>{formErrors.phone}</ErrorMessage>}
        </InputGroup>
      </FlexRow>

      {/* COURSE LISTS */}
      <CourseSelection 
     
      >
        <Label style={{backgroundColor:"lightgrey",
          padding:"5px",
          borderRadius:"5px",
          width:"50%",
        }}>Enrolled Courses (uncheck to remove)</Label>
        {loadingCourses ? (
          <p>Loading…</p>
        ) : enrolled.length === 0 ? (
          <p>No courses enrolled</p>
        ) : (
          <CourseList>
            {enrolled.map(c => (
              <CourseItem key={c._id}>
                <CourseCheckbox
                  id={`en-${c._id}`}
                  type="checkbox"
                  checked={selected.includes(c._id)}
                  onChange={() => toggleCourse(c._id)}
                  disabled={processing}
                />
                <CourseLabel htmlFor={`en-${c._id}`}>
                  {c.courseDisplayName || c.course_name}
                </CourseLabel>
              </CourseItem>
            ))}
          </CourseList>
        )}
      </CourseSelection>

      <CourseSelection $hasError={!!formErrors.courseIds}>
       <Label style={{backgroundColor:"lightgrey",
          padding:"5px",
          borderRadius:"5px",
          width:"50%",
        }}>Available Courses (check to add)*</Label>
        {loadingCourses ? (
          <p>Loading…</p>
        ) : available.length === 0 ? (
          <p>All courses already enrolled</p>
        ) : (
          <>
            <CourseList>
              {available.map(c => (
                <CourseItem key={c._id}>
                  <CourseCheckbox
                    id={`av-${c._id}`}
                    type="checkbox"
                    checked={selected.includes(c._id)}
                    onChange={() => toggleCourse(c._id)}
                    disabled={processing}
                  />
                  <CourseLabel htmlFor={`av-${c._id}`}>
                    {c.courseDisplayName || c.course_name}
                  </CourseLabel>
                </CourseItem>
              ))}
            </CourseList>
            {formErrors.courseIds && <ErrorMessage>{formErrors.courseIds}</ErrorMessage>}
          </>
        )}
      </CourseSelection>

      {/* ACTION */}
      <FlexRow>
        <SubmitButton type="button" disabled={processing} onClick={handleSave}>
          {processing ? "Saving…" : "Save Changes"}
        </SubmitButton>
      </FlexRow>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </FormContainer>
  );
};

export default EditStudent;
