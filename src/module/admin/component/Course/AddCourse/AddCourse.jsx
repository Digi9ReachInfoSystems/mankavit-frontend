import React, { useState, useRef, useEffect, useMemo } from "react";
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
  SubjectsContainer,
  SelectedSubjectsContainer,
  SelectedSubjectItem,
  SubjectName,
  MoveButton,
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from "../AddCourse/AddCourse.style";
import { useNavigate } from "react-router-dom";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import { getCategories } from "../../../../../api/categoryApi";
import { createCourse } from "../../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function AddCourse() {
  // State for form fields
  const [courseTitle, setCourseTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [isKYCRequired, setIsKYCRequired] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");

  // New state fields
  const [duration, setDuration] = useState("");
  const [courseExpiry, setCourseExpiry] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [searchSubject, setSearchSubject] = useState("");
  const editor = useRef(null);

  const navigate = useNavigate();

  // Checkbox selections
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // File upload state
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  // const filteredSubjects = subjectsCheckboxes.filter((subject) =>
  //   subject.label.toLowerCase().includes(searchSubject.toLowerCase())
  // );
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
        const categoryArray = Array.isArray(responseCategories?.data)
          ? responseCategories.data
          : Array.isArray(responseCategories)
          ? responseCategories
          : [];

        const dataCategories = categoryArray.map((item) => ({
          label: item.title,
          id: item._id,
          checked: false,
        }));
        setCategoryCheckboxes(dataCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    apiCaller();
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: shortDescription || "Start typings...",
    }),
    []
  );

  const configDis = useMemo(
    () => ({
      readonly: false,
      placeholder: description || "Start typings...",
    }),
    []
  );

  // Separate handlers for subjects and categories
  const handleSubjectCheckboxChange = (index) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    // Update selected subjects
    const selected = updatedCheckboxes.filter((item) => item.checked);

    // Maintain the order of already selected subjects
    const newSelectedSubjects = [...selectedSubjects];
    const subjectToUpdate = updatedCheckboxes[index];

    if (subjectToUpdate.checked) {
      // Add to selected if not already there
      if (!newSelectedSubjects.some((s) => s.id === subjectToUpdate.id)) {
        newSelectedSubjects.push(subjectToUpdate);
      }
    } else {
      // Remove from selected
      const removeIndex = newSelectedSubjects.findIndex(
        (s) => s.id === subjectToUpdate.id
      );
      if (removeIndex !== -1) {
        newSelectedSubjects.splice(removeIndex, 1);
      }
    }

    setSelectedSubjects(newSelectedSubjects);
  };

  const handleCategoryCheckboxChange = (index) => {
    const updatedCheckboxes = [...categoryCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCategoryCheckboxes(updatedCheckboxes);
  };

  const moveSubjectUp = (index) => {
    if (index <= 0) return;

    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = [
      newSelectedSubjects[index - 1],
      newSelectedSubjects[index],
    ];
    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectDown = (index) => {
    if (index >= selectedSubjects.length - 1) return;

    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = [
      newSelectedSubjects[index + 1],
      newSelectedSubjects[index],
    ];
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleToggleChange = () => setIsKYCRequired(!isKYCRequired);
  const handlePublishedToggle = () => setIsPublished(!isPublished);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validations
      if (!courseTitle) return toast.error("Please enter course title.");
      if (!internalTitle)
        return toast.error("Please enter internal course title.");
      if (!discountedPrice || isNaN(discountedPrice))
        return toast.error("Discounted price should be a number.");
      if (!actualPrice || isNaN(actualPrice))
        return toast.error("Actual price should be a number.");
      if (!thumbnailFile) return toast.error("Please upload thumbnail file.");

      // Rearrange subjects before submission
      const subjectIds = selectedSubjects.map((subject) => subject.id);
      await rearrangeSubjects(subjectIds);

      // Upload image
      const fileData = await uploadFileToAzureStorage(thumbnailFile, "course");
      const fileURL = fileData.blobUrl;

      // Prepare payload
      const payload = {
        courseName: internalTitle,
        courseDisplayName: courseTitle,
        shortDescription,
        description,
        category: categoryCheckboxes.filter((i) => i.checked).map((i) => i.id),
        price: Number(actualPrice),
        discountPrice: Number(discountedPrice),
        discountActive: isKYCRequired,
        duration,
        isPublished,
        subjects: subjectIds,
        image: fileURL,
        courseExpiry: courseExpiry ? new Date(courseExpiry) : null,
      };

      const createCourseResponse = await createCourse(payload);
      if (createCourseResponse) {
        toast.success("Course created successfully.");

        // Reset form
        setInternalTitle("");
        setCourseTitle("");
        setShortDescription("");
        setDescription("");
        setDuration("");
        setActualPrice("");
        setDiscountedPrice("");
        setIsKYCRequired(false);
        setSelectedSubjects([]);
        setSubjectCheckboxes((prev) =>
          prev.map((i) => ({ ...i, checked: false }))
        );
        setCategoryCheckboxes((prev) =>
          prev.map((i) => ({ ...i, checked: false }))
        );
        setThumbnailFile(null);
        setPreviewUrl(null);
        setCourseExpiry(null);

        setTimeout(() => navigate("/admin/course-management"), 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create course. Please try again.");
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
        theme="colored"
      />

      <Title>Add Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
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
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description</Label>
              <JoditEditor
                ref={editor}
                value={description}
                config={configDis}
                tabIndex={1}
                onBlur={(newContent) => {
                  console.log("new", newContent);
                }}
                onChange={(newContent) => {
                  setDescription(newContent);
                }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Course Short Description</Label>
              <JoditEditor
                ref={editor}
                value={shortDescription}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => {
                  console.log("new", newContent);
                }}
                onChange={(newContent) => {
                  setShortDescription(newContent);
                }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="discountedPrice">Discounted Price</Label>
              <PriceInput
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, "");
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
                value={actualPrice}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, "");
                  setActualPrice(filteredData);
                }}
                placeholder="Enter Actual Price in ₹ (eg: 3999)"
              />
            </FieldWrapper>
          </Column>
        </FormRow>
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
              <Label htmlFor="courseExpiry">Course Expiry Date</Label>
              <Input
                id="courseExpiry"
                type="date"
                value={courseExpiry}
                onChange={(e) => setCourseExpiry(e.target.value)}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Subjects ({subjectCheckboxes.length})</CheckboxSectionTitle>
                {/* Add the search input here */}
                <SearchWrapper style={{ marginBottom: "15px" }}>
                  <SearchIcon>
                    <CiSearch size={18} />
                  </SearchIcon>
                  <SearchInput
                    placeholder="Search subjects..."
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                  />
                </SearchWrapper>
                <CheckboxList>
                  {subjectCheckboxes
                    .filter((subject) =>
                      subject.label
                        .toLowerCase()
                        .includes(searchSubject.toLowerCase())
                    )
                    .map((item, index) => (
                      <CheckboxLabel key={item.id || index}>
                        <CheckboxInput
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleSubjectCheckboxChange(index)}
                        />
                        {item.label}
                      </CheckboxLabel>
                    ))}
                </CheckboxList>
              </CheckboxSection>

              <SelectedSubjectsContainer>
                <CheckboxSectionTitle>Selected Subjects ({selectedSubjects.length})</CheckboxSectionTitle>
                {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
                      <div>
                        <MoveButton
                          style={{ backgroundColor: "green" }}
                          type="button"
                          onClick={() => moveSubjectUp(index)}
                          disabled={index === 0}
                        >
                          <FaArrowUp />
                        </MoveButton>
                        <MoveButton
                          style={{ backgroundColor: "red" }}
                          type="button"
                          onClick={() => moveSubjectDown(index)}
                          disabled={index === selectedSubjects.length - 1}
                        >
                          <FaArrowDown />
                        </MoveButton>
                      </div>
                    </SelectedSubjectItem>
                  ))
                ) : (
                  <p>No subjects selected</p>
                )}
              </SelectedSubjectsContainer>
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Categories Section */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Category</CheckboxSectionTitle>
              <CheckboxList>
                {categoryCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id || index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCategoryCheckboxChange(index)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile ? (
                previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ width: "100%", height: "100%" }}
                    />
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
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </UploadArea>
          </Column>

          <Column className="toggle-column">
            <FieldWrapper
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Label style={{ marginBottom: 0 }}>Is Discount Active?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={isKYCRequired}
                onChange={handleToggleChange}
              />
            </FieldWrapper>
            <FieldWrapper
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Label style={{ marginBottom: 0 }}>Is Published?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={isPublished}
                onChange={handlePublishedToggle}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <SubmitButton type="submit">Add Course</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
