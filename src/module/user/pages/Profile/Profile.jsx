// src/pages/Admin/WebManagement/WhyStudyWithUs/Profile.jsx

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormContainer,
  UpdatedGif,
  Form,
  FormWrapper,
  ProfileImage,
  CameraImage,
  InputGroup,
  InputField,
  MobileInputContainer,
  FixedCode,
  MobileNumberInput,
  Label,
  UploadSection,
  UploadButton,
  BrowseButton,
  SubmitButton,
  FlexRow,
  FlexUpload,
  UploadedFileName,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ErrorMessage,
  GreyButton,
  TermsContainer,
  TermsLink,
  PasswordModal
} from "./Profile.styles";

import { MdOutlineFileUpload } from "react-icons/md";
import profilePlaceholder from "../../../../assets/profile.png";
import cameraIcon from "../../../../assets/Camera.png";
import profileUpdatedGif from "../../../../assets/profileUpdated.gif";

import {
  changePasswordOtpSend,
  getUserByUserId,
  resendChangePasswordOtp,
  updateUserById,
  verifyChangePasswordOtp,
} from "../../../../api/authApi";
import { createKycApi, getKYCbyUserId } from "../../../../api/kycApi"; // <-- make sure these paths are correct
import { uploadFileToAzureStorage } from "../../../../utils/azureStorageService";
import { getCookiesData } from "../../../../utils/cookiesService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DISABLE_WHEN = ["pending", "approved"]; // read-only in these states

const Profile = () => {
  const { id } = useParams(); // user id from route
  const navigate = useNavigate();

  const profilePhotoInputRef = useRef(null);
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  // read-only profile info coming from User service
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // KYC form state
  const [kycData, setKycData] = useState({
    fathers_name: "",
    fathers_occupation: "",
    current_occupation: "", // either "LLB" or free text via Other
    present_address: "",
    date_of_birth: "",
    how_did_you_get_to_know_us: "",
  });

  const [currentOccupationType, setCurrentOccupationType] = useState("LLB"); // "LLB" | "Other"

  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const [passportPhoto, setPassportPhoto] = useState(null); // {name,url,type}
  const [uploadedIDProof, setUploadedIDProof] = useState(null); // {name,url,type}

  const [modalFile, setModalFile] = useState(null);
  const [showSuccessGif, setShowSuccessGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // KYC status and editability
  const [kycStatus, setKycStatus] = useState("not-applied");
  const [isKycReadOnly, setIsKycReadOnly] = useState(false);

  // Password modal state (unchanged)
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordModalError, setPasswordModalError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const resendTimerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);


  // put this near the top, after other imports/state
  const HOW_OPTIONS = [
    "Instagram",
    "Telegram",
    "Facebook",
    "WhatsApp",
    "YouTube",
    "Website",
    "Friend",
    "Other",
  ];

  // NEW: local state for the source select + the 'Other' text
  const [howSource, setHowSource] = useState("Instagram");
  const [howOther, setHowOther] = useState("");

  // restore resend OTP countdown if needed
  useEffect(() => {
    const savedTime = localStorage.getItem("otp_expiry");
    if (savedTime) {
      const remaining = Math.floor((parseInt(savedTime) - Date.now()) / 1000);
      if (remaining > 0) {
        setResendTimer(remaining);
        startCountdown(remaining);
      }
    }
  }, []);
  useEffect(() => () => clearInterval(resendTimerRef.current), []);

  const startCountdown = (initial) => {
    setResendTimer(initial);
    resendTimerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimerRef.current);
          localStorage.removeItem("otp_expiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // bootstrap: load user basics + existing KYC (if any)
  useEffect(() => {
    if (!id) {
      navigate("/error");
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        // 1) Load User for read-only header fields
        const userResp = await getUserByUserId(id);
        if (!userResp.success || !userResp.user)
          throw new Error("User not found");
        const u = userResp.user;
        setProfileData({
          name: u.displayName || "",
          email: u.email || "",
          mobile: u.phone?.startsWith("+91") ? u.phone.slice(3) : u.phone || "",
        });
        setProfileImage(u.photo_url || profilePlaceholder);

        // 2) Try fetch KYC for this user
        let userIdForKyc = id;
        try {
          const cookies = await getCookiesData();
          if (cookies?.userId) userIdForKyc = cookies.userId;
        } catch {
          // ignore
        }

        try {
          const kycResp = await getKYCbyUserId(userIdForKyc);
          console.log("kycResp", kycResp);
          // If exists, show values and set editability per status
          if (kycResp?.success && kycResp?.data) {
            const k = kycResp.data;
            setKycStatus(k.status || "pending");
            setIsKycReadOnly(DISABLE_WHEN.includes(k.status));

            setKycData({
              fathers_name: k.fathers_name || "",
              fathers_occupation: k.fathers_occupation || "",
              current_occupation: k.current_occupation || "",
              present_address: k.present_address || "",
              date_of_birth: k.date_of_birth
                ? new Date(k.date_of_birth).toISOString().slice(0, 10)
                : "",
              how_did_you_get_to_know_us: k.how_did_you_get_to_know_us || "",
            });

            // files
            if (k.passport_photo) {
              setPassportPhoto({
                name: "Passport Photo",
                url: k.passport_photo,
                type: "image/*",
              });
            }
            if (k.id_proof) {
              setUploadedIDProof({
                name: "ID Proof",
                url: k.id_proof,
                type: k.id_proof.endsWith(".pdf")
                  ? "application/pdf"
                  : "image/*",
              });
            }

            // occupation type prefill
            setCurrentOccupationType(
              k.current_occupation &&
                k.current_occupation.toLowerCase() !== "llb"
                ? "Other"
                : "LLB"
            );
            // Seed "How did you get to know us?" using the fetched KYC record
            const rawSrc = (k.how_did_you_get_to_know_us || "").trim();
            const matched = HOW_OPTIONS.find(
              (opt) => opt.toLowerCase() === rawSrc.toLowerCase()
            );
            if (matched) {
              setHowSource(matched);
              setHowOther("");
            } else if (rawSrc) {
              setHowSource("Other");
              setHowOther(rawSrc);
            } else {
              setHowSource("Instagram");
              setHowOther("");
            }
          }
        } catch (e) {
          // No KYC yet (404) -> keep as not-applied, editable
          setKycStatus("not-applied");
          setIsKycReadOnly(false);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, navigate]);

  // file pickers
  const handleProfilePhotoUploadClick = () =>
    profilePhotoInputRef.current?.click();
  const handlePassportPhotoUploadClick = () =>
    passportPhotoInputRef.current?.click();
  const handleIDProofUploadClick = () => idProofInputRef.current?.click();

  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/"))
      return toast.error("Select a valid image");
    setIsLoading(true);
    try {
      const { blobUrl, url } = await uploadFileToAzureStorage(file, "users");
      setPassportPhoto({
        name: file.name,
        url: blobUrl || url,
        type: file.type,
      });
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIDProofFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const { blobUrl, url } = await uploadFileToAzureStorage(file, "users");
      setUploadedIDProof({
        name: file.name,
        url: blobUrl || url,
        type: file.type,
      });
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // only KYC fields are editable here
    if (name === "date_of_birth") {
      setKycData((p) => ({ ...p, [name]: value }));
      return;
    }
    setKycData((p) => ({ ...p, [name]: value }));
  };

  const handleFileClick = (file) => setModalFile(file);
  const closeModal = () => setModalFile(null);

  // Upload avatar (optional; still updates user photo_url)
  const handleProfilePhotoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/"))
      return toast.error("Please select an image");
    setIsLoading(true);
    try {
      const data = await uploadFileToAzureStorage(file, "profile");
      setProfileImage(data.blobUrl);
    } catch (error) {
      toast.error("Profile photo upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save avatar to user (optional and separate from KYC)
  // Save avatar to user (optional and separate from KYC)
  const handleSaveUserAvatar = async () => {
    try {
      const payload = {
        photo_url: profileImage !== profilePlaceholder ? profileImage : "",
      };
      const resp = await updateUserById(id, payload);
      if (!resp.success)
        throw new Error(resp.message || "Failed to update profile photo");

      toast.success("Profile photo updated");

      // reload the page to reflect everywhere
      setTimeout(() => {
        window.location.reload();
      }, 500); // small delay to show toast
    } catch (err) {
      toast.error(err.message || "Could not update profile photo");
    }
  };

  const validateKyc = () => {
    if (!uploadedIDProof?.url) return "ID Proof is required";
    if (!passportPhoto?.url) return "Passport photo is required";
    if (!kycData.date_of_birth) return "Date of birth is required";
    if (!kycData.fathers_name?.trim()) return "Father's name is required";
    if (!kycData.fathers_occupation?.trim())
      return "Father's occupation is required";
    if (!kycData.present_address?.trim()) return "Present address is required";
    const occ =
      currentOccupationType === "LLB"
        ? "LLB"
        : kycData.current_occupation?.trim();
    if (!occ) return "Current occupation is required";

    const src = howSource === "Other" ? howOther.trim() : howSource;
    if (!src) return "Please tell us how you got to know us";

    return null;
  };

  // Treat anything ending in .pdf or with application/pdf as a PDF
  const isPdfFile = (file) =>
    !!file &&
    (file.type === "application/pdf" ||
      (typeof file.url === "string" &&
        file.url.toLowerCase().endsWith(".pdf")));

  // Submit KYC: create or update via createKycApi (backend upserts)
  const handleSubmitKyc = async (e) => {
    e.preventDefault();

    // lock form if read-only and not rejected
    if (isKycReadOnly && kycStatus !== "rejected") {
      toast.info("KYC is already submitted");
      return;
    }

    const validationError = validateKyc();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      // let userIdForKyc = id;
      // const cookies = await getCookiesData().catch(() => null);
      // if (cookies?.userId) userIdForKyc = cookies.userId;
      let userIdForKyc = id;
      try {
        const cookies = await getCookiesData(); // or just getCookiesData() if it’s sync
        if (cookies?.userId) userIdForKyc = cookies.userId;
      } catch {
        // ignore, keep fallback id
      }
      const src = howSource === "Other" ? howOther.trim() : howSource;

      const payload = {
        id_proof: uploadedIDProof.url,
        passport_photo: passportPhoto.url,
        userref: userIdForKyc,
        date_of_birth: new Date(kycData.date_of_birth).toISOString(),
        fathers_name: kycData.fathers_name.trim(),
        fathers_occupation: kycData.fathers_occupation.trim(),
        present_address: kycData.present_address.trim(),
        current_occupation:
          currentOccupationType === "LLB"
            ? "LLB"
            : (kycData.current_occupation || "").trim(),
        how_did_you_get_to_know_us: src, // <— HERE
      };

      const resp = await createKycApi(payload);

      if (!resp?.success)
        throw new Error(resp?.message || "Failed to submit KYC");

      setShowSuccessGif(true);
      setTimeout(() => setShowSuccessGif(false), 1200);

      // After submit, lock the form (pending)
      setKycStatus(resp?.data?.status || "pending");
      setIsKycReadOnly(true);
      toast.success(resp.message || "KYC submitted successfully");
    } catch (err) {
      console.error("KYC submit error:", err);
      setError(err.message || "Failed to submit KYC. Please try again.");
      toast.error(err.message || "Failed to submit KYC");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !showSuccessGif) return <div>Loading…</div>;
  if (error && !showSuccessGif) return <div>Error: {error}</div>;

  const handleResendOtp = async () => {
    try {
      const cookiesData = await getCookiesData();
      const response = await resendChangePasswordOtp({
        userId: cookiesData.userId,
      });
      if (response.success) {
        toast.success("OTP has been sent to your phone number successfully");
        const expiryTime = Date.now() + 60 * 1000; // 1 minute
        localStorage.setItem("otp_expiry", expiryTime.toString());
        setIsOtpSent(true);
        setResendTimer(60);
        clearInterval(resendTimerRef.current);
        startCountdown(60);
      }
    } catch (err) {
      setPasswordModalError("Failed to send OTP. Try again.");
      toast.error("Failed to send OTP. Try again.");
    }
  };

  const handleSavePassword = async () => {
    setPasswordModalError("");
    if (!otp || !currentPassword || !newPassword || !confirmPassword)
      return setPasswordModalError("All fields are required");
    if (newPassword !== confirmPassword)
      return setPasswordModalError("Passwords do not match");
    if (otp.length !== 6 || isNaN(otp))
      return setPasswordModalError("OTP must be 6 digits");
    if (newPassword.length < 6)
      return setPasswordModalError("Password must be at least 6 characters");

    try {
      const cookiesData = await getCookiesData();
      await verifyChangePasswordOtp({
        userId: cookiesData.userId,
        Otp: otp,
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setShowPasswordModal(false);
      setOtp("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsOtpSent(false);
      toast.success("Password has been updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.data?.message || "Failed to update password"
      );
      setPasswordModalError("Failed to update password");
    }
  };

  const handleChangePasswordClick = async () => {
    try {
      const coookiesData = await getCookiesData();
      const response = await changePasswordOtpSend({
        userId: coookiesData.userId,
      });
      if (response.success) {
        toast.success("OTP has been sent to your phone number successfully ");
        setIsOtpSent(true);
        const expiryTime = Date.now() + 60 * 1000; // 1 minute
        localStorage.setItem("otp_expiry", expiryTime.toString());
        setResendTimer(60);
        clearInterval(resendTimerRef.current);
        startCountdown(60);
      }
    } catch (err) {
      toast.error("Failed to Change Password");
    } finally {
      setIsOtpSent(true);
    }
  };

  // Show T&C only for the first submission flow
  const showTerms = kycStatus === "not-applied" || kycStatus === "pending" || kycStatus === "rejected";


  return (
    <FormContainer>
      {showSuccessGif ? (
        <UpdatedGif>
          <img src={profileUpdatedGif} alt="Updated" />
          <p>{kycStatus === "not-applied" ? "KYC Submitted" : "Updated"}</p>
        </UpdatedGif>
      ) : (
        <Form onSubmit={handleSubmitKyc}>
          {/* Header: Profile Photo + Save Avatar (optional) */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <ProfileImage src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${profileImage}`} alt="Profile" />
            <CameraImage
              src={cameraIcon}
              alt="Change"
              onClick={handleProfilePhotoUploadClick}
            />
            <input
              type="file"
              ref={profilePhotoInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfilePhotoFileChange}
            />
            <div style={{ marginTop: 8 }}>
              <SubmitButton
                type="button"
                disabled={isLoading}
                onClick={handleSaveUserAvatar}
              >
                Save Avatar
              </SubmitButton>
            </div>
          </div>

          <FormWrapper>
            {/* Read-only user basics */}
            <InputGroup>
              <Label>Full Name</Label>
              <InputField name="name" value={profileData.name} disabled />
            </InputGroup>

            <FlexRow>
              <InputGroup>
                <Label>Email</Label>
                <InputField
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                />
              </InputGroup>

              <InputGroup>
                <Label>Mobile</Label>
                <MobileInputContainer>
                  <FixedCode>+91</FixedCode>
                  <MobileNumberInput
                    name="mobile"
                    value={profileData.mobile}
                    disabled
                  />
                </MobileInputContainer>
              </InputGroup>
            </FlexRow>

            {/* KYC fields */}
            <FlexRow>
              <InputGroup>
                <Label>Father's name</Label>
                <InputField
                  name="fathers_name"
                  value={kycData.fathers_name}
                  onChange={handleInputChange}
                  disabled={isKycReadOnly}
                />
              </InputGroup>
              <InputGroup>
                <Label>Father's occupation</Label>
                <InputField
                  name="fathers_occupation"
                  value={kycData.fathers_occupation}
                  onChange={handleInputChange}
                  disabled={isKycReadOnly}
                />
              </InputGroup>
            </FlexRow>

            <FlexRow>
              <InputGroup>
                <Label>Current occupation</Label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select
                    value={currentOccupationType}
                    onChange={(e) => setCurrentOccupationType(e.target.value)}
                    disabled={isKycReadOnly}
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  >
                    <option value="LLB">LLB</option>
                    <option value="Other">Other</option>
                  </select>
                  {currentOccupationType === "Other" && (
                    <InputField
                      name="current_occupation"
                      placeholder="Enter occupation"
                      value={kycData.current_occupation}
                      onChange={handleInputChange}
                      disabled={isKycReadOnly}
                    />
                  )}
                </div>
              </InputGroup>

              <InputGroup>
                <Label>Present address</Label>
                <InputField
                  name="present_address"
                  value={kycData.present_address}
                  onChange={handleInputChange}
                  disabled={isKycReadOnly}
                />
              </InputGroup>
            </FlexRow>

            <FlexRow>
              <InputGroup>
                <Label>Date of birth</Label>
                <InputField
                  type="date"
                  name="date_of_birth"
                  value={kycData.date_of_birth}
                  onChange={handleInputChange}
                  disabled={isKycReadOnly}
                />
              </InputGroup>
              <InputGroup>
                <Label>How did you get to know us?</Label>
                <div
                  style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
                >
                  <select
                    value={howSource}
                    onChange={(e) => setHowSource(e.target.value)}
                    disabled={isKycReadOnly}
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      minWidth: 220,
                    }}
                  >
                    {HOW_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {howSource === "Other" && (
                    <InputField
                      as="textarea"
                      rows={3}
                      placeholder="Please specify…"
                      value={howOther}
                      onChange={(e) => setHowOther(e.target.value)}
                      disabled={isKycReadOnly}
                      style={{ flex: 1 }}
                    />
                  )}
                </div>
              </InputGroup>
            </FlexRow>

            {/* File uploads for KYC */}
            {/* File uploads for KYC */}
            <FlexRow>
              {/* Passport Photo */}
              <UploadSection>
                <Label>Passport Photo</Label>

                {isKycReadOnly ? (
                  // READ-ONLY: show small preview only
                  passportPhoto ? (
                    <div
                      onClick={() => handleFileClick(passportPhoto)}
                      style={{
                        width: 140,
                        border: "1px solid #eee",
                        borderRadius: 8,
                        padding: 8,
                        cursor: "pointer",
                        display: "inline-block",
                        background: "#fafafa",
                      }}
                    >
                      <img
                        src={passportPhoto.url}
                        alt="Passport Photo"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 6,
                        }}
                      />
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        Passport Photo
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: "#888" }}>
                      No passport photo
                    </div>
                  )
                ) : (
                  // EDITABLE: show upload controls
                  <>
                    <FlexUpload>
                      <UploadButton
                        onClick={handlePassportPhotoUploadClick}
                        disabled={isKycReadOnly}
                      >
                        <MdOutlineFileUpload /> Upload
                      </UploadButton>
                      <BrowseButton
                        onClick={handlePassportPhotoUploadClick}
                        disabled={isKycReadOnly}
                      >
                        Browse
                      </BrowseButton>
                    </FlexUpload>

                    <input
                      type="file"
                      ref={passportPhotoInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handlePassportPhotoFileChange}
                      disabled={isKycReadOnly}
                    />

                    {passportPhoto && (
                      <UploadedFileName
                        onClick={() => handleFileClick(passportPhoto)}
                      >
                        {passportPhoto.name}
                      </UploadedFileName>
                    )}
                  </>
                )}
              </UploadSection>

              {/* ID Proof */}
              <UploadSection>
                <Label>ID Proof {isKycReadOnly ? "" : "(image/pdf)"}</Label>

                {isKycReadOnly ? (
                  // READ-ONLY: show small preview only
                  uploadedIDProof ? (
                    <div
                      onClick={() => handleFileClick(uploadedIDProof)}
                      style={{
                        width: 140,
                        border: "1px solid #eee",
                        borderRadius: 8,
                        padding: 8,
                        cursor: "pointer",
                        display: "inline-block",
                        background: "#fafafa",
                      }}
                    >
                      {isPdfFile(uploadedIDProof) ? (
                        <div
                          style={{
                            height: 90,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                            border: "1px dashed #ddd",
                            fontSize: 12,
                          }}
                        >
                          PDF
                        </div>
                      ) : (
                        <img
                          src={uploadedIDProof.url}
                          alt="ID Proof"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 6,
                          }}
                        />
                      )}
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        ID Proof
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: "#888" }}>
                      No ID proof
                    </div>
                  )
                ) : (
                  // EDITABLE: show upload controls
                  <>
                    <FlexUpload>
                      <UploadButton
                        onClick={handleIDProofUploadClick}
                        disabled={isKycReadOnly}
                      >
                        <MdOutlineFileUpload /> Upload
                      </UploadButton>
                      <BrowseButton
                        onClick={handleIDProofUploadClick}
                        disabled={isKycReadOnly}
                      >
                        Browse
                      </BrowseButton>
                    </FlexUpload>

                    <input
                      type="file"
                      ref={idProofInputRef}
                      style={{ display: "none" }}
                      accept="image/*,application/pdf"
                      onChange={handleIDProofFileChange}
                      disabled={isKycReadOnly}
                    />

                    {uploadedIDProof && (
                      <UploadedFileName
                        onClick={() => handleFileClick(uploadedIDProof)}
                      >
                        {uploadedIDProof.name}
                      </UploadedFileName>
                    )}
                  </>
                )}
              </UploadSection>
            </FlexRow>

            {/* KYC status badge */}
            <div style={{ margin: "10px 0" }}>
              <strong>KYC Status:</strong> {kycStatus}
              {isKycReadOnly && kycStatus === "approved" && (
                <span style={{ marginLeft: 8, color: "green" }}>
                  (Read-only)
                </span>
              )}
              {isKycReadOnly && kycStatus === "pending" && (
                <span style={{ marginLeft: 8, color: "#e69100" }}>
                  (Submitted, Under review)
                </span>
              )}
              {!isKycReadOnly && kycStatus === "rejected" && (
                <span style={{ marginLeft: 8, color: "#c00" }}>
                  (Rejected — Please correct and resubmit)
                </span>
              )}
            </div>
            {showTerms && (
              <TermsContainer>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={isKycReadOnly && kycStatus !== "rejected"}
                />
                <span>
                  I accept the{" "}
                  <TermsLink onClick={() => navigate("/user/tandc")}>
                    Terms and Conditions
                  </TermsLink>
                </span>
              </TermsContainer>
            )}


            {/* CTAs */}
            <div
              style={{ display: "flex", justifyContent: "flex-start", gap: 20 }}
            >
              {/* <SubmitButton
                as="button" // <-- ensures a real <button>
                type="submit"
                onClick={handleSubmitKyc} // <-- safety net: click will call handler
                disabled={
                  isLoading || (isKycReadOnly && kycStatus !== "rejected")
                }
              >
                {isLoading
                  ? "Saving..."
                  : kycStatus === "not-applied"
                  ? "Submit KYC"
                  : kycStatus === "rejected"
                  ? "Resubmit KYC"
                  : "Submitted"}
              </SubmitButton> */}

              {kycStatus === "not-applied" || kycStatus === "rejected" ? (
                <SubmitButton
                  as="button"
                  type="submit"
                  onClick={handleSubmitKyc}
                disabled={
  isLoading
  || (isKycReadOnly && kycStatus !== "rejected")
  || !acceptedTerms
  || !!validateKyc()
}

                >
                  {isLoading
                    ? "Saving..."
                    : kycStatus === "not-applied"
                      ? "Submit KYC"
                      : "Resubmit KYC"}
                </SubmitButton>
              ) : (
                <GreyButton disabled>Submitted</GreyButton>
              )}

              <SubmitButton
                type="button"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPasswordModal(true);
                }}
              >
                {isLoading ? "Processing..." : "Change Password"}
              </SubmitButton>
            </div>
          </FormWrapper>

          {modalFile && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>×</CloseButton>
                {modalFile.type?.startsWith("image/") ? (
                  <img
                    src={modalFile.url}
                    alt="Preview"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <iframe
                    src={modalFile.url}
                    title="Document"
                    width="100%"
                    height="500"
                  />
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </Form>
      )}

      {showPasswordModal && (
        <ModalOverlay
          onClick={() => {
            setOtp("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setIsOtpSent(false);
            clearInterval(resendTimerRef.current);
            setShowPasswordModal(false);
          }}
        >
          <PasswordModal onClick={(e) => e.stopPropagation()}>

            <CloseButton
              onClick={() => {
                setOtp("");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setIsOtpSent(false);
                clearInterval(resendTimerRef.current);
                setShowPasswordModal(false);
              }}
            >
              ×
            </CloseButton>
            <h3 style={{ marginBottom: "1rem" }}>Change Password</h3>

            <InputGroup>
              <Label>OTP</Label>
              <InputField
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              {isOtpSent ? (
                resendTimer > 0 ? (
                  <SubmitButton disabled style={{ width: "100%", height: 40 }}>
                    Resend OTP in {resendTimer}s
                  </SubmitButton>
                ) : (
                  <SubmitButton
                    style={{ width: "100%", height: 40 }}
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </SubmitButton>
                )
              ) : (
                <SubmitButton
                  style={{ width: "100%", height: 40 }}
                  onClick={handleChangePasswordClick}
                >
                  Send OTP
                </SubmitButton>
              )}
            </InputGroup>

            <InputGroup>
              <Label>Current Password</Label>
              <div style={{ position: "relative" }}>
                <InputField
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  style={{ paddingRight: 40 }}
                />
                <span
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </InputGroup>

            <InputGroup>
              <Label>New Password</Label>
              <div style={{ position: "relative" }}>
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{ paddingRight: 40 }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </InputGroup>

            <InputGroup>
              <Label>Confirm Password</Label>
              <div style={{ position: "relative" }}>
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  style={{ paddingRight: 40 }}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </InputGroup>

            {passwordModalError && (
              <ErrorMessage>{passwordModalError}</ErrorMessage>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <SubmitButton onClick={handleSavePassword}>Save</SubmitButton>
              <SubmitButton
                onClick={() => {
                  setOtp("");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  clearInterval(resendTimerRef.current);
                  setShowPasswordModal(false);
                }}
              >
                Cancel
              </SubmitButton>
            </div>
          </PasswordModal>
        </ModalOverlay>
      )}
    </FormContainer>
  );
};

export default Profile;
