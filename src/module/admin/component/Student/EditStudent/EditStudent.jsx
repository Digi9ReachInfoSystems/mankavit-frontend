/* EditStudent.jsx — complete component */
import React, { useEffect, useState, useRef } from "react";
import {
  FormContainer, Title, InputGroup, Label, InputField, SubmitButton,
  FlexRow, ErrorMessage, LoadingSpinner, LogoutButton,
  CourseSelection, CourseCheckbox, CourseLabel,
  CourseList, CourseItem, AttemptsTable, TableHead,
  TableRow, TableCell, PaymentModal, ModalOverlay, CloseButton
} from "./EditStudent.style";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCourses } from "../../../../../api/courseApi";
import {
  addCourseToStudent,
  removeCourseFromStudent,
  forceUserLogout,
  deleteStudentById
} from "../../../../../api/userApi";
import {
  getUserByUserId,
  updateUserById
} from "../../../../../api/authApi";
import { getAllUserAttemptByUserId } from "../../../../../api/mocktestApi";

import DeleteModal from "../../DeleteModal/DeleteModal";
const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RGX = /^\+?\d{7,15}$/;

const EditStudent = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [form, setForm] = useState({ displayName: "", email: "", phone: "" });
  const [selected, setSelected] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [hasBeenForcedLoggedOut, setHasBeenForcedLoggedOut] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoadingStudent(true);
        const res = await getUserByUserId(userId);
        console.log("Student data:", res);
        if (!res.success || !res.user) throw new Error("Student not found");

        const stu = res.user;
        const currentIds =
          stu.courseIds?.length
            ? stu.courseIds
            : (stu.subscription || []).map(s => s.course_enrolled?._id || s.course_enrolled);

        setStudent(stu);
        setSelected(currentIds);
        setForm({
          displayName: stu.displayName || "",
          email: stu.email || "",
          phone: stu.phone || ""
        });
        setHasBeenForcedLoggedOut(false);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load student");
        setTimeout(() => navigate("/admin/student-management"), 1000);
      } finally {
        setLoadingStudent(false);
      }
    })();
  }, [userId, navigate]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingCourses(true);
        const res = await getAllCourses();
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

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoadingAttempts(true);
        const res = await getAllUserAttemptByUserId(userId);

        console.log("User's mocktest attempts and results:", res);
        if (res.success) {
          setAttempts(res.data ?? []);
        } else {
          toast.error("Failed to load mock-test attempts");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load mock-test attempts");
      } finally {
        setLoadingAttempts(false);
      }
    })();
  }, [userId]);

  const currentIds = student?.courseIds?.length
    ? student.courseIds
    : (student?.subscription || []).map(s => s.course_enrolled?._id || s.course_enrolled);

  const available = courses.filter(c => !currentIds.includes(c._id));
  const enrolled = courses.filter(c => currentIds.includes(c._id));

  /* ─────────────────────────── handlers ────────────────────────────────────── */
  const toggleCourse = (id) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

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
      /* 1️⃣ Update profile */
      await updateUserById(student._id, {
        displayName: form.displayName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      });

      /* 2️⃣ Sync course enrolments */
      const toAdd = selected.filter(id => !currentIds.includes(id));
      const toRemove = currentIds.filter(id => !selected.includes(id));
      if (toAdd.length) await addCourseToStudent({ userId: student._id, courseIds: toAdd });
      if (toRemove.length) await removeCourseFromStudent({ userId: student._id, courseIds: toRemove });

      toast.success("Student updated successfully");
      navigate("/admin/student-management");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleForceLogout = async () => {
    if (!student?.email) {
      toast.error("No student email available");
      return;
    }
    try {
      setProcessing(true);
      const response = await forceUserLogout({ email: student.email });
      if (response.success) {
        toast.success(response.message || "User has been forcibly logged out");
        setHasBeenForcedLoggedOut(true);
      } else {
        toast.error(response.message || "Failed to force logout");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to force logout");
    } finally {
      setProcessing(false);
    }
  };

  /* ───────────── NEW: delete flow ───────────── */
  const confirmDelete = () => setIsDeleteOpen(true);
  const cancelDelete = () => setIsDeleteOpen(false);

  const handleDelete = async () => {
    try {
      setProcessing(true);
      await deleteStudentById(student._id);
      toast.success("Student deleted");
      navigate("/admin/student-management");
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Deletion failed");
    } finally {
      setProcessing(false);
      setIsDeleteOpen(false);
    }
  };

  const handleViewPayments = () => {
    setIsPaymentModalOpen(true);
  };

  /* ─────────────────────────── render ─────────────────────────────────────── */
  if (loadingStudent) {
    return (
      <FormContainer>
        <LoadingSpinner />
        <p>Loading student data…</p>
      </FormContainer>
    );
  }
  if (!student) return null;

  return (
    <FormContainer>
      {/* ============== FORM ============== */}

      <Title>Edit Student</Title>
      <FlexRow style={{
        display: "flex",
        justifyContent: "flex-end",
        // alignItems: "center",
        width: "100%"
      }}>
        <LogoutButton
          type="button"
          disabled={processing || hasBeenForcedLoggedOut || !student.isActive}
          onClick={handleForceLogout}
          style={{ width: "10%" }}
        >
          {hasBeenForcedLoggedOut ? "Logged Out" : "Force logout"}
        </LogoutButton>

        <LogoutButton
          type="button"
          disabled={processing}
          onClick={confirmDelete}
          style={{ background: "#d32f2f", color: "white", width: "10%" }}
        >
          Delete student
        </LogoutButton>

      </FlexRow>

      
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

      {/* ============== COURSES ============== */}
      <CourseSelection>
        <Label style={{ backgroundColor: "lightgrey", padding: 5, borderRadius: 5, width: "50%" }}>
          Enrolled Courses (uncheck to remove)
        </Label>
        {loadingCourses ? (
          <p>Loading…</p>
        ) : enrolled.length === 0 ? (
          <p>No courses enrolled</p>
        ) : (
          <CourseList>
            {enrolled.map(c => (
              <CourseItem key={c._id}>
                <CourseCheckbox
                  id={`en-${c._id}`} type="checkbox"
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
        <Label style={{ backgroundColor: "lightgrey", padding: 5, borderRadius: 5, width: "50%" }}>
          Available Courses (check to add)*
        </Label>
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
                    id={`av-${c._id}`} type="checkbox"
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

      <FlexRow style={{ marginTop: 24 }}>
      

        <LogoutButton
          type="button"
          disabled={processing}
          onClick={() => navigate(`/admin/student-management/update-kyc/${student._id}`)}
          style={{ background: "#4CAF50", color: "white" }}
        >
          View KYC
        </LogoutButton>

        <LogoutButton
          type="button"
          disabled={processing || !student.subscription?.length}
          onClick={handleViewPayments}
          style={{ background: "#D4B200", color: "white" }}
        >
          View Payments
        </LogoutButton>







      </FlexRow>

      <Title style={{ marginTop: 40 }}>Mock-test attempts</Title>
      {loadingAttempts ? (
        <p>Loading attempts…</p>
      ) : attempts.length === 0 ? (
        <p>No attempts found</p>
      ) : (
        <AttemptsTable>
          <thead style={{ backgroundColor: 'black', color: 'white' }}>
            <TableHead>Mock Test</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Submitted At</TableHead>
          </thead>
          <tbody>
            {attempts.map(at => (
              <TableRow
                key={at._id}
                onClick={() => navigate(`/admin/results/user-attempts/attempt/${at._id}`)}
                style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                <TableCell>{at.mockTestId?.title ?? "—"}</TableCell>
                <TableCell>{at.attemptNumber}</TableCell>
                <TableCell>{at.totalMarks}</TableCell>
                <TableCell>{at.status}</TableCell>
                <TableCell>{new Date(at.startedAt).toLocaleString()}</TableCell>
                <TableCell>{at.submittedAt ? new Date(at.submittedAt).toLocaleString() : "—"}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </AttemptsTable>
      )}


      {isPaymentModalOpen && (
        <>
          <ModalOverlay onClick={() => setIsPaymentModalOpen(false)} />
          <PaymentModal>
            <CloseButton onClick={() => setIsPaymentModalOpen(false)}>
              &times;
            </CloseButton>
            <h3>Payment Details</h3>
            {student.subscription?.length ? (
              student.subscription.map((sub, index) => (
                <div key={sub._id} style={{ marginBottom: '20px' }}>
                  <p><strong>Course:</strong> {sub.course_enrolled?.courseName || 'N/A'}</p>
                  <p><strong>Payment Status:</strong> {sub.payment_Status || 'N/A'}</p>
                  <p><strong>Payment Date:</strong> {new Date(sub.created_at).toLocaleString()}</p>
                  <p><strong>Subscription Active:</strong> {sub.is_subscription_active ? 'Yes' : 'No'}</p>
                  {/* <p><strong>Payment ID:</strong> {sub.payment_id || 'N/A'}</p> */}
                  {index < student.subscription.length - 1 && <hr style={{ margin: '15px 0' }} />}
                </div>
              ))
            ) : (
              <p>No payment records found</p>
            )}
          </PaymentModal>
        </>
      )}
 <FlexRow style={{ marginTop: 24 }}>
   <SubmitButton
          type="button"
          disabled={processing}
          onClick={handleSave}
        >
          {processing ? "Saving…" : "Save changes"}
        </SubmitButton>
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={cancelDelete}
        onDelete={handleDelete}
      />


      </FlexRow>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </FormContainer>
  );
};

export default EditStudent;
