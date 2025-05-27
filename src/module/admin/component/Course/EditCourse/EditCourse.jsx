import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import uplaod from "../../../../../assets/upload.png";
import {
  Container, Title, FormWrapper, FormRow, Column, FieldWrapper, Label,
  Input, TextArea, PriceInput, CheckboxSection, CheckboxSectionTitle,
  CheckboxList, CheckboxLabel, CheckboxInput, UploadArea, FileInput,
  UploadPlaceholder, SubmitButton, ToggleSwitch,
} from "../AddCourse/AddCourse.style";
import { getSubjects } from "../../../../../api/subjectApi";
import { getCategories } from "../../../../../api/categoryApi";
import { updateCourseById, getCourseById } from "../../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [isKYCRequired, setIsKYCRequired] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [noOfVideos, setNoOfVideos] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [courseIncludes, setCourseIncludes] = useState("");
  const [liveClass, setLiveClass] = useState(false);
  const [recordedClass, setRecordedClass] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [status, setStatus] = useState("active");
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mock Test 1", checked: false, id: "mock1" },
    { label: "Mock Test 2", checked: false, id: "mock2" },
  ]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch course data
        const response = await getCourseById(id);
        const data = response.data;
        
        // Set basic fields
        setCourseTitle(data.courseDisplayName || "");
        setInternalTitle(data.courseName || "");
        setShortDescription(data.shortDescription || "");
        setActualPrice(data.price?.toString() || "");
        setDiscountedPrice(data.discountPrice?.toString() || "");
        setIsKYCRequired(data.discountActive || false);
        setDuration(data.duration || "");
        setNoOfVideos(data.no_of_videos?.toString() || "");
        setSuccessRate(data.successRate?.toString() || "");
        setCourseIncludes(Array.isArray(data.course_includes) ? data.course_includes.join(", ") : "");
        setDescription(data.description || "");
        setLiveClass(data.live_class || false);
        setRecordedClass(data.recorded_class || false);
        setIsPublished(data.isPublished || false);
        setStatus(data.status || "active");
        setSelectedCategory(data.category?._id || data.category || null);
        setPreviewUrl(data.image || null);

        // Fetch subjects and set checkboxes
        const responseSubjects = await getSubjects();
        const subjectsArray = Array.isArray(responseSubjects?.data)
          ? responseSubjects.data
          : Array.isArray(responseSubjects)
            ? responseSubjects
            : [];
            
        const subjectsData = subjectsArray.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: data.subjects?.some((s) => 
            (typeof s === 'object' ? s._id : s) === item._id
          ) || false,
        }));
        setSubjectCheckboxes(subjectsData);

        // Set mock tests if they exist in the data
        if (data.mockTests && data.mockTests.length > 0) {
          setMockTestCheckboxes(prev => 
            prev.map(item => ({
              ...item,
              checked: data.mockTests.includes(item.id)
            })))
        }

        // Fetch and set categories
        const responseCategories = await getCategories();
        const categoryArray = Array.isArray(responseCategories?.data)
          ? responseCategories.data
          : Array.isArray(responseCategories)
            ? responseCategories
            : [];
            
        const formattedCategories = categoryArray.map((item) => ({
          label: item.title,
          value: item._id,
        }));
        setCategories(formattedCategories);

      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Failed to load course data");
      }
    };
    fetchCourse();
  }, [id]);

  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleToggleChange = () => setIsKYCRequired((prev) => !prev);
  const handleLiveClassToggle = () => setLiveClass((prev) => !prev);
  const handleRecordedClassToggle = () => setRecordedClass((prev) => !prev);
  const handlePublishedToggle = () => setIsPublished((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileURL = previewUrl;
      if (thumbnailFile) {
        const fileData = await uploadFileToAzureStorage(thumbnailFile, "course");
        fileURL = fileData.blobUrl;
      }

      const subjects = subjectCheckboxes.filter((i) => i.checked).map((i) => i.id);
      const mockTests = mockTestCheckboxes.filter((i) => i.checked).map((i) => i.id);
      
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
        no_of_videos: Number(noOfVideos),
        successRate: Number(successRate),
        course_includes: courseIncludes.split(',').map(i => i.trim()),
        student_feedback: [{ student_ref: null, review: "Great course!" }],
        live_class: liveClass,
        recorded_class: recordedClass,
        isPublished,
        status,
        subjects,
        mockTests,
        image: fileURL,
      };
      
      await updateCourseById(id, payload);
      toast.success("Course updated successfully");
      setTimeout(() => navigate("/admin/course-management"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Course update failed.");
    }
  };

  const handleUploadAreaClick = () => fileInputRef.current?.click();
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Edit Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Course Title & Course Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                // onChange={(e) => setCourseTitle(e.target.value)}
                onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setCourseTitle(filteredData);
                }}
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
                onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setInternalTitle(filteredData);
                }}
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
                  onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setShortDescription(filteredData);
                }}
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
                type="number"
                value={discountedPrice}
                onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, '');
                  setDiscountedPrice(filteredData);
                }}
                placeholder="Enter Discounted Price in ₹ (eg: 2999)"
              />
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label htmlFor="actualPrice">Actual Price</Label>
              <PriceInput
                id="actualPrice"
                type="number"
                value={actualPrice}
                  onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, '');
                  setActualPrice(filteredData);
                }}
                placeholder="Enter Actual Price in ₹ (eg: 3999)"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Category Selection */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                style={{ width: "100%" }}
                onChange={(value) => setSelectedCategory(value)}
                options={categories}
                placeholder="Select a category"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 4: Add Subject + Add Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Subject
              </CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
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
              <CheckboxSectionTitle>
                Add Mock Test (Click Checkbox to Select)
              </CheckboxSectionTitle>
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

        {/* Row 5: Course Details */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 months"
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
                 onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, '');
                  setNoOfVideos(filteredData);
                }}
                placeholder="e.g. 120"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

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
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseIncludes">Course Includes (comma separated)</Label>
              <Input
                id="courseIncludes"
                value={courseIncludes}
                onChange={(e) => setCourseIncludes(e.target.value)}
                placeholder="e.g. Video lectures, PDF notes, Mock tests"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 6: Description */}
        <FormRow>
          <Column>
            {/* <FieldWrapper> */}
              {/* <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed description"
              />
            </FieldWrapper> */}
          </Column>
        </FormRow>

        {/* Row 7: Upload Thumbnail and Toggles */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {previewUrl ? (
                <>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} 
                  />
                  {thumbnailFile && <p>{thumbnailFile.name}</p>}
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uplaod} className="upload-icon" alt="" />
                  </UploadPlaceholder>
                  <p>Drag and drop image here</p>
                  <p>or <strong>Add Image</strong></p>
                </>
              )}
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </UploadArea>
          </Column>

          <Column className="toggle-column">
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Is Discount Active?</Label>
              <ToggleSwitch
              type="checkbox"
                checked={isKYCRequired}
                onChange={handleToggleChange}
              />
            </FieldWrapper>

            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Live Class Available?</Label>
              <ToggleSwitch
              type="checkbox"
                checked={liveClass}
                onChange={handleLiveClassToggle}
              />
            </FieldWrapper>

            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Recorded Class Available?</Label>
              <ToggleSwitch
              type="checkbox"
                checked={recordedClass}
                onChange={handleRecordedClassToggle}
              />
            </FieldWrapper>

            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Publish Course?</Label>
              <ToggleSwitch
              type="checkbox"
                checked={isPublished}
                onChange={handlePublishedToggle}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 8: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Update Course</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}