/* EditStudent.jsx — complete component */
import React, { useEffect, useState, useRef } from "react";
import {
  FormContainer,
  Title,
  InputGroup,
  Label,
  InputField,
  SubmitButton,
  FlexRow,
  ErrorMessage,
  LoadingSpinner,
  LogoutButton,
  CourseSelection,
  CourseCheckbox,
  CourseLabel,
  CourseList,
  CourseItem,
  AttemptsTable,
  TableHead,
  TableRow,
  TableCell,
  PaymentModal,
  ModalOverlay,
  CloseButton,
  ToggleSwitch,
  ToggleSlider,
  ToggleLabel,
} from "./EditStudent.style";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCourses } from "../../../../../api/courseApi";
import {
  addCourseToStudent,
  removeCourseFromStudent,
  forceUserLogout,
  deleteStudentById,
  blockAndUnblockUser,
  enableDisableMasterOTP,
} from "../../../../../api/userApi";
import { getUserByUserId, updateUserById } from "../../../../../api/authApi";
import { getAllUserAttemptByUserId } from "../../../../../api/mocktestApi";

import DeleteModal from "../../DeleteModal/DeleteModal";
// import api from "../../../../../config/axiosConfig";
import { getAuth } from "../../../../../utils/authService";
const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RGX = /^\+?\d{7,15}$/;

const EditStudent = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [form, setForm] = useState({ 
    displayName: "", 
    email: "", 
    phone: "",
    fathers_name: "",
    fathers_occupation: "",
    current_occupation: "",
    present_address: "",
    passing_year: "",
    college_name: "",
    date_of_birth: ""
  });
  const [selected, setSelected] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [hasBeenForcedLoggedOut, setHasBeenForcedLoggedOut] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedChange, setBlockedChange] = useState(false);
  const [masterOtpEnabled, setMasterOtpEnabled] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(
          response.Permissions["studentManagement"].readOnly
        );
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const apiCaller = async () => {
      const res = await getUserByUserId(userId);
      console.log("Student data:", res);
      if (!res.success || !res.user) throw new Error("Student not found");
      const stu = res.user;
      console.log("isBlocked", stu);
      setIsBlocked(stu.isBlocked);
      setMasterOtpEnabled(stu.isMasterOtpEnabled);
    };
    apiCaller();
  }, [blockedChange]);

 useEffect(() => {
  (async () => {
    try {
      setLoadingStudent(true);
      const res = await getUserByUserId(userId);
      console.log("Student data:", res);
      if (!res.success || !res.user) throw new Error("Student not found");

      const stu = res.user;
      const currentIds = stu.courseIds?.length
        ? stu.courseIds
        : (stu.subscription || []).map(
            (s) => s.course_enrolled?._id || s.course_enrolled
          );

      setStudent(stu);
      setSelected(currentIds);
      
      // Format date_of_birth for the input field
      const formattedDate = stu.date_of_birth 
        ? new Date(stu.date_of_birth).toISOString().split('T')[0]
        : '';

      setForm({
        displayName: stu.displayName || "",
        email: stu.email || "",
        phone: stu.phone || "",
        masterOtp: stu.masterOtp,
        fathers_name: stu.fathers_name || "",
        fathers_occupation: stu.fathers_occupation || "",
        current_occupation: stu.current_occupation || "",
        present_address: stu.present_address || "",
        passing_year: stu.passing_year || "",
        college_name: stu.college_name || "",
        date_of_birth: formattedDate
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
    : (student?.subscription || []).map(
        (s) => s.course_enrolled?._id || s.course_enrolled
      );

  const available = courses.filter((c) => !currentIds.includes(c._id));
  const enrolled = courses.filter((c) => currentIds.includes(c._id));

  /* ─────────────────────────── handlers ────────────────────────────────────── */
  const toggleCourse = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    console.log("form validation", form);
    const errs = {};
    if (!form.displayName.trim()) errs.displayName = "Name required";
    if (!EMAIL_RGX.test(form.email)) errs.email = "Invalid email";
    if (!PHONE_RGX.test(form.phone)) errs.phone = "Invalid phone";
    // if (selected.length === 0) errs.courseIds = "Select at least one course";

    if (form.masterOtp && (form.masterOtp.length !== 6 || isNaN(form.masterOtp))) {
      errs.masterOtp = "OTP must be 6 digits";
    }

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
      phone: form.phone.trim(),
      masterOtp: form.masterOtp,
      fathers_name: form.fathers_name.trim(),
      fathers_occupation: form.fathers_occupation.trim(),
      current_occupation: form.current_occupation.trim(),
      present_address: form.present_address.trim(),
      passing_year: form.passing_year.trim(),
      college_name: form.college_name.trim(),
      date_of_birth: form.date_of_birth ? new Date(form.date_of_birth) : null
    });

      /* 2️⃣ Sync course enrolments */
      const toAdd = selected.filter((id) => !currentIds.includes(id));
      const toRemove = currentIds.filter((id) => !selected.includes(id));
      if (toAdd.length)
        await addCourseToStudent({ userId: student._id, courseIds: toAdd });
      if (toRemove.length)
        await removeCourseFromStudent({
          userId: student._id,
          courseIds: toRemove,
        });

      toast.success("Student updated successfully");
      setTimeout(() => navigate("/admin/student-management"), 1000);
      // navigate("/admin/student-management");
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
  const handleBlockAndUnblock = async (userId) => {
    try {
      if (readOnlyPermissions) {
        toast.error("You don't have permission to change Block status");
        return;
      }
      setProcessing(true);
      const response = await blockAndUnblockUser({ userId });
      console.log("response", response.data);
      if (response.data.success) {
        toast.success(response.data.message || "User Block Status Updated");
        setBlockedChange(!blockedChange);
        setTimeout(1000);
      } else {
        toast.error(response.message || "Failed to Block or Unblock User");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to publish");
    } finally {
      setProcessing(false);
    }
  };

  const handleMasterOtp = async (userId) => {
    try {
      console.log("userId", userId, "readOnlyPermissions", readOnlyPermissions);
      if (readOnlyPermissions) {
        toast.error("You don't have permission to change master otp");
        return;
      }
      setProcessing(true);
      const response = await enableDisableMasterOTP({ userId });
      console.log("response", response.data);
      if (response.data.success) {
        toast.success(response.data.message || "User Block Status Updated");
        setBlockedChange(!blockedChange);
      } else {
        toast.error(
          response.message || "Failed to Enable or Disable Master OTP"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to Change Master OTP Status"
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <FormContainer>
      {/* ============== FORM ============== */}

      <Title>Edit Student</Title>

      {!readOnlyPermissions && (
        <FlexRow
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <FlexRow>
            <InputGroup>
              <Label style={{ marginBottom: "7px" }}>User blocked?</Label>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={isBlocked}
                  style={{ display: "none" }}
                  onChange={() => handleBlockAndUnblock(student._id)}
                />
                <ToggleSlider $isPublished={isBlocked} />
                <ToggleLabel $isPublished={isBlocked}>
                  {isBlocked ? "Yes" : "No"}
                </ToggleLabel>
              </ToggleSwitch>
            </InputGroup>
          </FlexRow>

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
      )}

      <InputGroup>
        <Label>Name*</Label>
        <InputField
          name="displayName"
          value={form.displayName}
          onChange={onFormChange}
          disabled={processing}
        />
        {formErrors.displayName && (
          <ErrorMessage>{formErrors.displayName}</ErrorMessage>
        )}
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

      {/* Added new fields */}
      <FlexRow>
        <InputGroup>
          <Label>Father's Name</Label>
          <InputField
            name="fathers_name"
            value={form.fathers_name}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
        <InputGroup>
          <Label>Father's Occupation</Label>
          <InputField
            name="fathers_occupation"
            value={form.fathers_occupation}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <InputGroup>
          <Label>Current Occupation</Label>
          <InputField
            name="current_occupation"
            value={form.current_occupation}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
        <InputGroup>
          <Label>Date of Birth</Label>
          <InputField
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
      </FlexRow>

      <InputGroup>
        <Label>Present Address</Label>
        <InputField
          as="textarea"
          rows={3}
          name="present_address"
          value={form.present_address}
          onChange={onFormChange}
          disabled={processing}
        />
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Passing Year</Label>
          <InputField
            name="passing_year"
            value={form.passing_year}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
        <InputGroup>
          <Label>College Name</Label>
          <InputField
            name="college_name"
            value={form.college_name}
            onChange={onFormChange}
            disabled={processing}
          />
        </InputGroup>
      </FlexRow>

      {/* ============== COURSES ============== */}
      <CourseSelection>
        <Label
          style={{
            backgroundColor: "lightgrey",
            padding: 5,
            borderRadius: 5,
            width: "50%",
          }}
        >
          Enrolled Courses (uncheck to remove)
        </Label>
        {loadingCourses ? (
          <p>Loading…</p>
        ) : enrolled.length === 0 ? (
          <p>No courses enrolled</p>
        ) : (
          <CourseList>
            {enrolled.map((c) => (
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
        <Label
          style={{
            backgroundColor: "lightgrey",
            padding: 5,
            borderRadius: 5,
            width: "50%",
          }}
        >
          Available Courses (check to add)*
        </Label>
        {loadingCourses ? (
          <p>Loading…</p>
        ) : available.length === 0 ? (
          <p>All courses already enrolled</p>
        ) : (
          <>
            <CourseList>
              {available.map((c) => (
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
            {formErrors.courseIds && (
              <ErrorMessage>{formErrors.courseIds}</ErrorMessage>
            )}
          </>
        )}
      </CourseSelection>

      <FlexRow style={{ marginTop: 24 }}>
        <LogoutButton
          type="button"
          disabled={processing}
          onClick={() =>
            navigate(`/admin/student-management/update-kyc/${student._id}`)
          }
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
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <TableHead>Mock Test</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Submitted At</TableHead>
          </thead>
          <tbody>
            {attempts.map((at) => (
              <TableRow
                key={at._id}
                onClick={() =>
                  navigate(`/admin/results/user-attempts/attempt/${at._id}`)
                }
                style={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{at.mockTestId?.title ?? "—"}</TableCell>
                <TableCell>{at.attemptNumber}</TableCell>
                <TableCell>{at.totalMarks}</TableCell>
                <TableCell>{at.status}</TableCell>
                <TableCell>{new Date(at.startedAt).toLocaleString()}</TableCell>
                <TableCell>
                  {at.submittedAt
                    ? new Date(at.submittedAt).toLocaleString()
                    : "—"}
                </TableCell>
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
                <div key={sub._id} style={{ marginBottom: "20px" }}>
                  <p>
                    <strong>Course:</strong>{" "}
                    {sub.course_enrolled?.courseName || "N/A"}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {sub.payment_Status || "N/A"}
                  </p>
                  <p>
                    <strong>Payment Date:</strong>{" "}
                    {new Date(sub.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Subscription Active:</strong>{" "}
                    {sub.is_subscription_active ? "Yes" : "No"}
                  </p>
                  {/* <p><strong>Payment ID:</strong> {sub.payment_id || 'N/A'}</p> */}
                  {index < student.subscription.length - 1 && (
                    <hr style={{ margin: "15px 0" }} />
                  )}
                </div>
              ))
            ) : (
              <p>No payment records found</p>
            )}
          </PaymentModal>
        </>
      )}
      <FlexRow style={{ marginTop: 24 }}>
        {!readOnlyPermissions && (
          <SubmitButton
            type="button"
            disabled={processing}
            onClick={handleSave}
          >
            {processing ? "Saving…" : "Save changes"}
          </SubmitButton>
        )}

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