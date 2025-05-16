// AddCourse.jsx
import React, { useState, useRef, useEffect } from "react";
import uplaod from "../../../../../assets/upload.png";
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
  PriceInput,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
  ToggleSwitch,
} from "../AddCourse/AddCourse.style"; // Adjust the path if needed
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../../../api/subjectApi";
import { Select } from "antd";
import { getCategories } from "../../../../../api/categoryApi";
import { createCourse } from "../../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";

export default function AddCourse() {
  // State for form fields (existing)
  const [courseTitle, setCourseTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [isKYCRequired, setIsKYCRequired] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");

  // New state fields (from backend model)
  const [duration, setDuration] = useState("");
  const [noOfVideos, setNoOfVideos] = useState("");
  const [noOfSubjects, setNoOfSubjects] = useState("");
  const [noOfNotes, setNoOfNotes] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [courseIncludes, setCourseIncludes] = useState(""); // comma‑separated list
  const [rating, setRating] = useState("");
  const [liveClass, setLiveClass] = useState(false);
  const [recordedClass, setRecordedClass] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [status, setStatus] = useState("active");

  const navigate = useNavigate();

  // Checkbox selections for Add Subject and Add Mock Test
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);

  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: false, id: "mock1" },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false, id: "mock2" },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false, id: "mock3" },
  ]);

  // File upload state
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

useEffect(() => {
  const apiCaller = async () => {
    try {
      const responseSubjects = await getSubjects();
      const subjectsData = responseSubjects.data.map((item) => ({
        label: item.subjectName,
        id: item._id,
        checked: false,
      }));
      setSubjectCheckboxes(subjectsData);

      const responseCategories = await getCategories();
      console.log("responseCategories", responseCategories);

      const categoryArray = Array.isArray(responseCategories?.data)
        ? responseCategories.data
        : Array.isArray(responseCategories)
          ? responseCategories
          : [];

      const dataCategories = categoryArray.map((item) => ({
        label: item.title,
        value: item._id,
      }));
      setCategory(dataCategories);
      setSelectedCategory(dataCategories[0]?.value || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  apiCaller();
}, []);


  // Handlers for toggles & checkboxes
  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };
  const handleToggleChange = () => setIsKYCRequired(!isKYCRequired);
  const handleLiveClassToggle = () => setLiveClass(!liveClass);
  const handleRecordedClassToggle = () => setRecordedClass(!recordedClass);
  const handlePublishedToggle = () => setIsPublished(!isPublished);

  // File upload helpers
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setThumbnailFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Utility: comma‑separated includes → array
  const parseIncludes = (str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  // Static student feedback (as requested)
  const staticStudentFeedback = [
    { student_ref: null, review: "Great course!" },
  ];

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic required validations (keeping original & minimal additional)
      if (!courseTitle) return toast.error("Please enter course title.");
      if (!internalTitle) return toast.error("Please enter internal course title.");
      if (!discountedPrice || isNaN(discountedPrice))
        return toast.error("Discounted price should be a number.");
      if (!actualPrice || isNaN(actualPrice))
        return toast.error("Actual price should be a number.");
      if (!thumbnailFile) return toast.error("Please upload thumbnail file.");
      if (!selectedCategory) return toast.error("Please select category.");

      // Upload image
      const fileData = await uploadFileToAzureStorage(thumbnailFile, "course");
      const fileURL = fileData.blobUrl;

      // Subjects & mock tests
      const subjects = subjectCheckboxes.filter((i) => i.checked).map((i) => i.id);
      const mockTests = mockTestCheckboxes.filter((i) => i.checked).map((i) => i.id);

      // Prepare request body
      const payload = {
        courseName: internalTitle,
        courseDisplayName: courseTitle,
        shortDescription,
        description,
        category: selectedCategory,
        price: Number(actualPrice),
        discountPrice: Number(discountedPrice),
        discountActive: isKYCRequired,
        duration,
        no_of_videos: Number(noOfVideos) || 0,
        // no_of_subjects: Number(noOfSubjects) || 0,
        // no_of_notes: Number(noOfNotes) || 0,
        successRate: Number(successRate) || 0,
        course_includes: parseIncludes(courseIncludes),
        student_feedback: staticStudentFeedback,
        live_class: liveClass,
        recorded_class: recordedClass,
        // rating: Number(rating) || 0,
        isPublished,
        status,
        subjects,
        mockTests,
        image: fileURL,
      };

      const createCourseResponse = await createCourse(payload);
      if (createCourseResponse) {
        toast.success("Course created successfully.");
        // reset form
        setInternalTitle("");
        setCourseTitle("");
        setShortDescription("");
        setDescription("");
        setDuration("");
        setNoOfVideos("");
        setNoOfSubjects("");
        setNoOfNotes("");
        setSuccessRate("");
        setCourseIncludes("");
        setRating("");
        setIsPublished(false);
        setLiveClass(false);
        setRecordedClass(false);
        setStatus("active");
        setSelectedCategory(category[0]?.value || null);
        setActualPrice("");
        setDiscountedPrice("");
        setIsKYCRequired(false);
        setSubjectCheckboxes((prev) => prev.map((i) => ({ ...i, checked: false })));
        setMockTestCheckboxes((prev) => prev.map((i) => ({ ...i, checked: false })));
        setThumbnailFile(null);
        setPreviewUrl(null);
        setTimeout(() => navigate("/admin/course-management"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Course creation failed.");
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Add Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Course Title & Course Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter Course Title"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="internalTitle">Course Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                onChange={(e) => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2: Course Short Description */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Course Short Description</Label>
              <TextArea
                id="shortDescription"
                rows="3"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter short description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3: Discounted Price & Actual Price */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="discountedPrice">Discounted Price</Label>
              <PriceInput
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                placeholder="Enter Discounted Price in ₹ (eg: 2999)"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="actualPrice">Actual Price</Label>
              <PriceInput
                id="actualPrice"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                placeholder="Enter Actual Price in ₹ (eg: 3999)"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* NEW Row: Duration & Number of Videos */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Course Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Months"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noOfVideos">Number of Videos</Label>
              <Input
                id="noOfVideos"
                type="number"
                value={noOfVideos}
                onChange={(e) => setNoOfVideos(e.target.value)}
                placeholder="e.g. 120"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* NEW Row: Subjects & Notes count */}
        {/* <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noOfSubjects">Number of Subjects</Label>
              <Input
                id="noOfSubjects"
                type="number"
                value={noOfSubjects}
                onChange={(e) => setNoOfSubjects(e.target.value)}
                placeholder="e.g. 8"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noOfNotes">Number of Notes</Label>
              <Input
                id="noOfNotes"
                type="number"
                value={noOfNotes}
                onChange={(e) => setNoOfNotes(e.target.value)}
                placeholder="e.g. 25"
              />
            </FieldWrapper>
          </Column>
        </FormRow> */}

        {/* NEW Row: Success Rate & Rating */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="successRate">Success Rate (%)</Label>
              <Input
                id="successRate"
                type="number"
                value={successRate}
                onChange={(e) => setSuccessRate(e.target.value)}
                placeholder="e.g. 95"
              />
            </FieldWrapper>
          </Column>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g. 4.5"
              />
            </FieldWrapper>
          </Column> */}
        </FormRow>

     {/* Category Select */}
<FormRow>
  <FieldWrapper>
    <Label htmlFor="category">Category</Label>
    {selectedCategory && (
      <Select
        id="category"
        style={{ width: 200 }}
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
        options={category}
      />
    )}
  </FieldWrapper>
</FormRow>


        {/* Row: Add Subject + Add Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Subject</CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id || index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setSubjectCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Mock Test</CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setMockTestCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* NEW Row: Course Includes */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseIncludes">Course Includes (comma‑separated)</Label>
              <TextArea
                id="courseIncludes"
                rows="3"
                value={courseIncludes}
                onChange={(e) => setCourseIncludes(e.target.value)}
                placeholder="e.g. Notes, Live Doubt Sessions, Practice Tests"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row: Upload Thumbnail & Discount toggle */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile ? (
                previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%" }} />
                    <p>{thumbnailFile.name}</p>
                  </>
                ) : (
                  <>
                    <UploadPlaceholder>
                      <img src={uplaod} alt="Upload" />
                    </UploadPlaceholder>
                    <p>Drag and drop image here</p>
                    <p>
                      or <strong>Add Image</strong>
                    </p>
                  </>
                )
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uplaod} className="upload-icon" alt="" />
                  </UploadPlaceholder>
                  <p>Drag and drop image here</p>
                  <p>
                    or <strong>Add Image</strong>
                  </p>
                </>
              )}
              <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </UploadArea>
          </Column>

          <Column className="toggle-column">
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Is Discount Active?</Label>
              <ToggleSwitch type="checkbox" checked={isKYCRequired} onChange={handleToggleChange} />
            </FieldWrapper>
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Is Published?</Label>
              <ToggleSwitch type="checkbox" checked={isPublished} onChange={handlePublishedToggle} />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* NEW Row: Live & Recorded class toggles */}
        <FormRow>
          <Column className="toggle-column">
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Live Class</Label>
              <ToggleSwitch type="checkbox" checked={liveClass} onChange={handleLiveClassToggle} />
            </FieldWrapper>
          </Column>
          <Column className="toggle-column">
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Recorded Class</Label>
              <ToggleSwitch type="checkbox" checked={recordedClass} onChange={handleRecordedClassToggle} />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* NEW Row: Course Status */}
        <FormRow>
          <FieldWrapper>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              style={{ width: 200 }}
              value={status}
              onChange={(value) => setStatus(value)}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </FieldWrapper>
        </FormRow>

        {/* Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Course</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
