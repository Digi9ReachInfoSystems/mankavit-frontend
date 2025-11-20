import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  Header,
  Title,
  BackLink,
  BackIcon,
  Highlight,
  Form,
  FormWrapper,
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
} from "./KYC.styles";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadFileToAzureStorage } from "../../utils/azureStorageService";
import { getCookiesData } from "../../utils/cookiesService";
import { createKycApi } from "../../api/kycApi";
import { toast, ToastContainer } from "react-toastify";

const KYC = () => {
  const navigate = useNavigate();

  // File inputs
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalFile, setModalFile] = useState(null);
  // Updated: terms and conditions acceptance (required by backend)
  const [terms_and_conditions, setTermsAndConditions] = useState(false);

  // Form state
  const [form, setForm] = useState({
    date_of_birth: "",
    fathers_name: "",
    fathers_occupation: "",
    present_address: "",
    // occupation radio + text
    occupationChoice: "", // "LLB" | "Other"
    occupationText: "", // used for both LLB and Other
    // awareness radio + optional text
    heardFromChoice: "", // "friends" | "instagram" | "telegram" | "youtube" | "other"
    heardFromOtherText: "",
  });

  // Files
  const [passportPhoto, setPassportPhoto] = useState(null); // { name, type, file, url }
  const [uploadedIDProof, setUploadedIDProof] = useState(null); // { name, type, file, url }

  // ---- Handlers: file pickers ----
  const handlePassportPhotoUploadClick = () =>
    passportPhotoInputRef.current?.click();
  const handleIDProofUploadClick = () => idProofInputRef.current?.click();

  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image for Passport Photo.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPassportPhoto({ name: file.name, file, type: file.type, url });
  };

  const handleIDProofFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedIDProof({ name: file.name, file, type: file.type, url });
  };

  // ---- Handlers: modal preview ----
  const handleFileClick = (fileObj) => setModalFile(fileObj);
  const closeModal = () => setModalFile(null);

  // ---- Handlers: form fields ----
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (passportPhoto?.url) URL.revokeObjectURL(passportPhoto.url);
      if (uploadedIDProof?.url) URL.revokeObjectURL(uploadedIDProof.url);
    };
  }, [passportPhoto, uploadedIDProof]);

  // ---- Submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Required client-side validations aligned with backend required fields
      if (!passportPhoto) throw new Error("Passport photo is required");
      if (!uploadedIDProof) throw new Error("ID proof is required");
      if (!form.date_of_birth) throw new Error("Date of birth is required");
      if (!form.fathers_name) throw new Error("Father's name is required");
      if (!form.fathers_occupation)
        throw new Error("Father's occupation is required");
      if (!form.present_address) throw new Error("Present address is required");
      if (!form.occupationChoice)
        throw new Error("Please select your current occupation");

      // Text required for BOTH choices
      if (
        (form.occupationChoice === "LLB" ||
          form.occupationChoice === "Other") &&
        !form.occupationText.trim()
      ) {
        throw new Error("Please specify your current occupation");
      }

      if (!form.heardFromChoice)
        throw new Error("Please tell us how you got to know about us");
      if (form.heardFromChoice === "other" && !form.heardFromOtherText.trim())
        throw new Error("Please specify how you got to know about us");

      // NEW: Validate terms and conditions acceptance (required by backend)
      if (!terms_and_conditions) {
        throw new Error("You must accept the Terms and Conditions to proceed");
      }

      // Resolve final strings expected by backend
      const current_occupation = form.occupationText.trim();

      const how_did_you_get_to_know_us =
        form.heardFromChoice === "other"
          ? form.heardFromOtherText.trim()
          : form.heardFromChoice;

      // Upload files to Azure and grab blob URLs
      const idProofUpload = await uploadFileToAzureStorage(
        uploadedIDProof.file,
        "id-proof"
      );
      const passportPhotoUpload = await uploadFileToAzureStorage(
        passportPhoto.file,
        "photo-url"
      );

      if (!idProofUpload?.blobUrl) throw new Error("Failed to upload ID proof");
      if (!passportPhotoUpload?.blobUrl)
        throw new Error("Failed to upload passport photo");

      const cookies = await getCookiesData();

      // Updated payload with terms_and_conditions field
      const payload = {
        id_proof: idProofUpload.blobUrl,
        passport_photo: passportPhotoUpload.blobUrl,
        userref: cookies.userId,
        date_of_birth: form.date_of_birth,
        fathers_name: form.fathers_name,
        fathers_occupation: form.fathers_occupation,
        present_address: form.present_address,
        current_occupation,
        how_did_you_get_to_know_us,
        terms_and_conditions: true, // Required boolean field for backend
      };

      await createKycApi(payload);
      toast.success("KYC submitted successfully.");
      navigate("/user");
    } catch (err) {
      const msg = err?.message || "Failed to submit KYC. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <ToastContainer theme="colored" />

      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon>
            <FaArrowLeft />
          </BackIcon>
        </BackLink>
        <Title>KYC form</Title>
      </Header>

      <Form as="form" onSubmit={handleSubmit}>
        <FormWrapper>
          {/* Date of birth */}
          <InputGroup>
            <Label>Birthday</Label>
            <InputField
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={onChange}
              style={{
                width: "50%",
              }}
            />
          </InputGroup>

          {/* Father details */}
          <FlexRow>
            <InputGroup>
              <Label>Father's Name</Label>
              <InputField
                name="fathers_name"
                placeholder="Enter father's name"
                value={form.fathers_name}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Father's Occupation</Label>
              <InputField
                name="fathers_occupation"
                placeholder="Enter father's occupation"
                value={form.fathers_occupation}
                onChange={onChange}
              />
            </InputGroup>
          </FlexRow>

          {/* Present address */}
          <InputGroup>
            <Label>Present Address</Label>
            <InputField
              as="textarea"
              rows={4}
              name="present_address"
              placeholder="House/Street, City, State, PIN"
              value={form.present_address}
              onChange={onChange}
            />
          </InputGroup>

          {/* Current occupation (radio) */}
          <InputGroup>
            <Label>Current Occupation</Label>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="occupationChoice"
                  value="LLB"
                  checked={form.occupationChoice === "LLB"}
                  onChange={onChange}
                />
                LL.B
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="occupationChoice"
                  value="Other"
                  checked={form.occupationChoice === "Other"}
                  onChange={onChange}
                />
                Others
              </label>
            </div>

            {(form.occupationChoice === "LLB" ||
              form.occupationChoice === "Other") && (
              <div style={{ marginTop: 8 }}>
                <InputField
                  as="textarea"
                  rows={2}
                  name="occupationText"
                  placeholder={
                    form.occupationChoice === "LLB"
                      ? "Specify College Name, Year"
                      : "Please specify your occupation"
                  }
                  value={form.occupationText}
                  onChange={onChange}
                />
              </div>
            )}
          </InputGroup>

          {/* How did you get to know us (radio) */}
          <InputGroup>
            <Label>How did you get to know about Mankavit Law Academy?</Label>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="heardFromChoice"
                  value="friends"
                  checked={form.heardFromChoice === "friends"}
                  onChange={onChange}
                />
                Friends / Colleagues
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="heardFromChoice"
                  value="instagram"
                  checked={form.heardFromChoice === "instagram"}
                  onChange={onChange}
                />
                Instagram
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="heardFromChoice"
                  value="telegram"
                  checked={form.heardFromChoice === "telegram"}
                  onChange={onChange}
                />
                Telegram
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="heardFromChoice"
                  value="youtube"
                  checked={form.heardFromChoice === "youtube"}
                  onChange={onChange}
                />
                YouTube
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="heardFromChoice"
                  value="other"
                  checked={form.heardFromChoice === "other"}
                  onChange={onChange}
                />
                Others
              </label>
            </div>

            {form.heardFromChoice === "other" && (
              <div style={{ marginTop: 8 }}>
                <InputField
                  name="heardFromOtherText"
                  placeholder="Please specify"
                  value={form.heardFromOtherText}
                  onChange={onChange}
                />
              </div>
            )}
          </InputGroup>

          {/* Uploads */}
          <FlexRow>
            <UploadSection>
              <Label>Passport Photo</Label>
              <FlexUpload>
                <UploadButton
                  onClick={handlePassportPhotoUploadClick}
                  type="button"
                >
                  <MdOutlineFileUpload /> Upload
                </UploadButton>
                <BrowseButton
                  onClick={handlePassportPhotoUploadClick}
                  type="button"
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
              />
              {passportPhoto && (
                <UploadedFileName
                  onClick={() => handleFileClick(passportPhoto)}
                >
                  {passportPhoto.name}
                </UploadedFileName>
              )}
            </UploadSection>

            <UploadSection>
              <Label>ID Proof (Image/PDF)</Label>
              <FlexUpload>
                <UploadButton onClick={handleIDProofUploadClick} type="button">
                  <MdOutlineFileUpload /> Upload
                </UploadButton>
                <BrowseButton onClick={handleIDProofUploadClick} type="button">
                  Browse
                </BrowseButton>
              </FlexUpload>
              <input
                type="file"
                ref={idProofInputRef}
                style={{ display: "none" }}
                accept="image/*,application/pdf"
                onChange={handleIDProofFileChange}
              />
              {uploadedIDProof && (
                <UploadedFileName
                  onClick={() => handleFileClick(uploadedIDProof)}
                >
                  {uploadedIDProof.name}
                </UploadedFileName>
              )}
            </UploadSection>
          </FlexRow>

          {/* Terms and Conditions Declaration - Updated to match backend requirement */}
          <InputGroup>
            <label
              style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
            >
              <input
                type="checkbox"
                checked={terms_and_conditions}
                onChange={(e) => setTermsAndConditions(e.target.checked)}
              />
              <span style={{ lineHeight: 1.5 }}>
                I declare that the{" "}
                <span
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/user/tandc")}
                >
                  Terms and Conditions
                </span>{" "}
                have been carefully read by me and I have fully understood the
                terms and conditions of the institute. I have no objection to
                any of the terms and conditions and I will abide by all the
                terms and conditions of the institute.
              </span>
            </label>
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={isLoading || !terms_and_conditions}
          >
            {isLoading ? "Submitting..." : "Submit KYC"}
          </SubmitButton>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormWrapper>

        {/* Preview modal */}
        {modalFile && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>×</CloseButton>
              {modalFile.type?.startsWith("image/") ? (
                <img
                  src={modalFile.url}
                  alt="Preview"
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              ) : (
                <iframe
                  title="Document Preview"
                  src={modalFile.url}
                  width="100%"
                  height="500"
                  frameBorder="0"
                />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </Form>
    </FormContainer>
  );
};

export default KYC;