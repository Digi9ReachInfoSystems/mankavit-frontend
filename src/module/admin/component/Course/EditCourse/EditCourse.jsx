import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
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
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import { getCategories } from "../../../../../api/categoryApi";
import { updateCourseById, getCourseById } from "../../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { getAuth } from "../../../../../utils/authService";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const editor = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    courseTitle: "",
    internalTitle: "",
    shortDescription: "",
    discountedPrice: "",
    actualPrice: "",
    isKYCRequired: false,
    previewUrl: null,
    description: "",
    duration: "",
    noOfVideos: "",
    successRate: "",
    courseIncludes: "",
    liveClass: false,
    recordedClass: false,
    isPublished: false,
    status: "active",
    thumbnailFile: null,
    courseExpiry: "",
    ratting: 0,
  });

  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState([]);
  const [searchSubject, setSearchSubject] = useState("");
  // const [selectedSubjects, setSelectedSubjects] = useState([]);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(
          response.Permissions["courseManagement"].readOnly
        );
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        const data = response.data;

        const [subjectsResponse, categoriesResponse] = await Promise.all([
          getSubjects(),
          getCategories(),
        ]);

        // Process subjects
        const subjectsArray = Array.isArray(subjectsResponse?.data)
          ? subjectsResponse.data
          : Array.isArray(subjectsResponse)
          ? subjectsResponse
          : [];

        const subjectsData = subjectsArray.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked:
            data.subjects?.some(
              (s) => (typeof s === "object" ? s._id : s) === item._id
            ) || false,
        }));

        // Initialize selected subjects in correct order
        const orderedSubjects = [];
        if (Array.isArray(data.subjects)) {
          data.subjects.forEach((subjectId) => {
            const subject = subjectsData.find(
              (s) =>
                s.id ===
                (typeof subjectId === "object" ? subjectId._id : subjectId)
            );
            if (subject) {
              orderedSubjects.push(subject);
            }
          });
        }

        // Process categories
        const categoryArray = Array.isArray(categoriesResponse?.data)
          ? categoriesResponse.data
          : Array.isArray(categoriesResponse)
          ? categoriesResponse
          : [];

        const formattedCategories = categoryArray.map((item) => ({
          label: item.title,
          id: item._id,
          checked:
            data.category?.some(
              (s) => (typeof s === "object" ? s._id : s) === item._id
            ) || false,
        }));

        setFormData({
          courseTitle: data.courseDisplayName || "",
          internalTitle: data.courseName || "",
          shortDescription: data.shortDescription || "",
          actualPrice: data.price?.toString() || "",
          discountedPrice: data.discountPrice?.toString() || "",
          isKYCRequired: data.discountActive || false,
          duration: data.duration || null,
          noOfVideos: data.no_of_videos?.toString() || "",
          successRate: data.successRate?.toString() || "",
          courseIncludes: Array.isArray(data.course_includes)
            ? data.course_includes.join(", ")
            : "",
          description: data.description || "",
          liveClass: data.live_class || false,
          recordedClass: data.recorded_class || false,
          isPublished: data.isPublished || false,
          status: data.status || "active",
          previewUrl: data.image || null,
          thumbnailFile: null,
          ratting: data.course_rating || 0,
          courseExpiry: data.courseExpiry
            ? new Date(data.courseExpiry).toISOString().split("T")[0]
            : null,
        });

        setSubjectCheckboxes(subjectsData);
        setSelectedSubjects(orderedSubjects);
        setCategoryCheckboxes(formattedCategories);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Failed to load course data");
      }
    };
    fetchCourse();
  }, [id]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: formData.shortDescription,
    }),
    []
  );

  const configDis = useMemo(
    () => ({
      readonly: false,
      placeholder: formData.description,
    }),
    []
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubjectCheckboxChange = (index) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    // Update selected subjects
    const subjectToUpdate = updatedCheckboxes[index];
    let newSelectedSubjects = [...selectedSubjects];

    if (subjectToUpdate.checked) {
      // Add to selected if not already there
      if (!newSelectedSubjects.some((s) => s.id === subjectToUpdate.id)) {
        newSelectedSubjects.push(subjectToUpdate);
      }
    } else {
      // Remove from selected
      newSelectedSubjects = newSelectedSubjects.filter(
        (s) => s.id !== subjectToUpdate.id
      );
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

  const handleToggleChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUploadAreaClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        thumbnailFile: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // === Required fields validation ===
  if (!formData.courseTitle?.trim()) {
    toast.error("Please enter course title.");
    return;
  }
  if (!formData.internalTitle?.trim()) {
    toast.error("Please enter internal course title.");
    return;
  }
  if (formData.discountedPrice === "" || isNaN(formData.discountedPrice)) {
    toast.error("Discounted price should be a number.");
    return;
  }
  if (formData.actualPrice === "" || isNaN(formData.actualPrice)) {
    toast.error("Actual price should be a number.");
    return;
  }
  if (Number(formData.discountedPrice || 0) > Number(formData.actualPrice || 0)) {
    toast.error("Discount price cannot exceed regular price.");
    return;
  }
  // Image is mandatory: must have either existing previewUrl or new file
  if (!formData.thumbnailFile && !formData.previewUrl) {
    toast.error("Please upload a thumbnail image.");
    return;
  }

  try {
    // === Resolve image URL ===
    let fileURL = formData.previewUrl;
    if (formData.thumbnailFile) {
      const fileData = await uploadFileToAzureStorage(formData.thumbnailFile, "course");
      fileURL = fileData.blobUrl;
    }

    // === Subjects are OPTIONAL ===
    let subjectIds = [];
    if (selectedSubjects.length > 0) {
      subjectIds = selectedSubjects.map((s) => s.id);
      await rearrangeSubjects(subjectIds); // only if there are any
    }

    // Categories can be empty (optional)
    const categories = categoryCheckboxes
      .filter((item) => item.checked)
      .map((item) => item.id);

    // Build payload: requireds always present; others are optional
    const payload = {
      // required
      courseName: formData.internalTitle,
      courseDisplayName: formData.courseTitle,
      price: Number(formData.actualPrice || 0),
      discountPrice: Number(formData.discountedPrice || 0),
      image: fileURL,

      // optional (send as you had them; no extra mandatory checks)
      shortDescription: formData.shortDescription,
      description: formData.description,
      category: categories,
      discountActive: formData.isKYCRequired,
      duration: formData.duration,
      no_of_videos: formData.noOfVideos ? Number(formData.noOfVideos) : undefined,
      successRate: formData.successRate ? Number(formData.successRate) : undefined,
      course_includes: formData.courseIncludes
        ? formData.courseIncludes
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0)
        : undefined,
      live_class: formData.liveClass,
      recorded_class: formData.recordedClass,
      isPublished: formData.isPublished,
      status: formData.status,
      course_rating: formData.ratting ? Number(formData.ratting) : undefined,
      courseExpiry: formData.courseExpiry ? new Date(formData.courseExpiry) : null,
    };

    // Only include subjects if any selected
    if (subjectIds.length > 0) {
      payload.subjects = subjectIds;
    }

    await updateCourseById(id, payload);
    toast.success("Course updated successfully");
    setTimeout(() => navigate("/admin/course-management"), 1000);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update course. Please try again.");
  }
};


  const sanitizeInput = (value, type = "text") => {
    if (type === "number") {
      return value.replace(/[^0-9]/g, "");
    }
    return value.replace(/[^a-zA-Z0-9\s.,-]/g, "");
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

      <Title>Edit Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={formData.courseTitle}
                onChange={(e) =>
                  handleInputChange(
                    "courseTitle",
                    sanitizeInput(e.target.value)
                  )
                }
                placeholder="Enter Course Title"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="internalTitle">Course Internal Title</Label>
              <Input
                id="internalTitle"
                value={formData.internalTitle}
                onChange={(e) =>
                  handleInputChange(
                    "internalTitle",
                    sanitizeInput(e.target.value)
                  )
                }
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
                value={formData.description}
                config={configDis}
                tabIndex={1}
                onChange={(newContent) =>
                  handleInputChange("description", newContent)
                }
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
                value={formData.shortDescription}
                config={config}
                tabIndex={1}
                onChange={(newContent) =>
                  handleInputChange("shortDescription", newContent)
                }
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
                value={formData.discountedPrice}
                onChange={(e) =>
                  handleInputChange(
                    "discountedPrice",
                    sanitizeInput(e.target.value, "number")
                  )
                }
                placeholder="Enter Discounted Price in ₹ (eg: 2999)"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="actualPrice">Actual Price</Label>
              <PriceInput
                id="actualPrice"
                value={formData.actualPrice}
                onChange={(e) =>
                  handleInputChange(
                    "actualPrice",
                    sanitizeInput(e.target.value, "number")
                  )
                }
                placeholder="Enter Actual Price in ₹ (eg: 3999)"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Subjects Section */}
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
                  <CheckboxLabel key={item.id}>
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
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration ( Days )</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g. 4 months"
              />
            </FieldWrapper>
          </Column>
          <Column>
            {/* <FieldWrapper>
              <Label htmlFor="courseExpiry">Course Expiry Date</Label>
              <Input
                id="courseExpiry"
                type="date"
                value={formData.courseExpiry}
                onChange={(e) =>
                  handleInputChange("courseExpiry", e.target.value)
                }
              />
            </FieldWrapper> */}
          </Column>
        </FormRow>

        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {formData.previewUrl ? (
                <>
                  <img
                    src={formData.previewUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  {formData.thumbnailFile && (
                    <p>{formData.thumbnailFile.name}</p>
                  )}
                </>
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Label style={{ marginBottom: "0px" }}>Is Discount Active?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={formData.isKYCRequired}
                onChange={() => handleToggleChange("isKYCRequired")}
              />
            </FieldWrapper>

            <FieldWrapper
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Label style={{ marginBottom: "0px" }}>Publish Course?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={formData.isPublished}
                onChange={() => handleToggleChange("isPublished")}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          {!readOnlyPermissions && (
            <SubmitButton type="submit">Update Course</SubmitButton>
          )}
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
