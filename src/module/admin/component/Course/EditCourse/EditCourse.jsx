import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { getAuth } from "../../../../../utils/authService";
// import { getAllMocktest } from "../../../../../api/mocktestApi";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  const [formData, setFormData] = useState({
    courseTitle: "",
    internalTitle: "",
    shortDescription: "",
    discountedPrice: "",
    actualPrice: "",
    isKYCRequired: false,
    previewUrl: null,
    categories: [],
    selectedCategory: null,
    description: "",
    duration: "",
    noOfVideos: "",
    successRate: "",
    courseIncludes: "",
    liveClass: false,
    recordedClass: false,
    isPublished: false,
    status: "active",
    subjectCheckboxes: [],
    // mockTestCheckboxes: [],
    thumbnailFile: null,
    courseExpiry: "",
    ratting: 0
  });
  const editor = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch course data
        const response = await getCourseById(id);
        console.log("Course by id response", response);
        const data = response.data;

        // Fetch subjects and categories in parallel
        const [subjectsResponse, categoriesResponse] = await Promise.all([
          getSubjects(),
          getCategories(),
          // getAllMocktest()
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
          checked: data.subjects?.some((s) =>
            (typeof s === 'object' ? s._id : s) === item._id
          ) || false,
        }));

        // Process mock tests
        // const mockTestsArray = Array.isArray(mockTestsResponse?.data)
        //   ? mockTestsResponse.data
        //   : Array.isArray(mockTestsResponse)
        //     ? mockTestsResponse
        //     : [];

        // const mockTestsData = mockTestsArray.map((item) => ({
        //   label: item.title || `Mock Test ${item._id}`,
        //   id: item._id,
        //   checked: data.mockTests?.includes(item._id) || false,
        // }));

        // Process categories
        const categoryArray = Array.isArray(categoriesResponse?.data)
          ? categoriesResponse.data
          : Array.isArray(categoriesResponse)
            ? categoriesResponse
            : [];

        const formattedCategories = categoryArray.map((item) => ({
          label: item.title,
          value: item._id,
          checked: data.category?.some((s) =>
            (typeof s === 'object' ? s._id : s) === item._id
          ) || false,
        }));
        console.log("formattedCategories", formattedCategories, data);

        // Set all form data at once
        setFormData({
          courseTitle: data.courseDisplayName || "",
          internalTitle: data.courseName || "",
          shortDescription: data.shortDescription || "",
          actualPrice: data.price?.toString() || "",
          discountedPrice: data.discountPrice?.toString() || "",
          isKYCRequired: data.discountActive || false,
          duration: data.duration || "",
          noOfVideos: data.no_of_videos?.toString() || "",
          successRate: data.successRate?.toString() || "",
          courseIncludes: Array.isArray(data.course_includes) ? data.course_includes.join(", ") : "",
          description: data.description || "",
          liveClass: data.live_class || false,
          recordedClass: data.recorded_class || false,
          isPublished: data.isPublished || false,
          status: data.status || "active",
          selectedCategory: data.category?._id || data.category || null,
          previewUrl: data.image || null,
          subjectCheckboxes: subjectsData,
          // mockTestCheckboxes: mockTestsData,
          categories: formattedCategories,
          thumbnailFile: null,
          ratting: data.course_rating || 0,
          courseExpiry: new Date(data.courseExpiry).toISOString().split('T')[0] || null
        });

      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Failed to load course data");
      }
    };
    fetchCourse();
  }, [id]);
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: formData.shortDescription,
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []);
  const configDis = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: formData.description,
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (index, checkboxType) => {
    setFormData(prev => {
      const updatedCheckboxes = [...prev[checkboxType]];
      updatedCheckboxes[index] = {
        ...updatedCheckboxes[index],
        checked: !updatedCheckboxes[index].checked
      };
      return {
        ...prev,
        [checkboxType]: updatedCheckboxes
      };
    });
  };

  const handleToggleChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Convert to Numbers ("" → 0)
    const actual = Number(formData.actualPrice || 0);
    const discount = Number(formData.discountedPrice || 0);

    // 2. Client‐side validation: 
    //    If your server disallows discount > price (but allows equality):
    if (discount > actual) {
      toast.error("Discount price cannot exceed regular price");
      return;
    }

    // 3. If you want to disallow discount === price as well, use:
    //    if (discount >= actual) { … }

    try {
      let fileURL = formData.previewUrl;
      if (formData.thumbnailFile) {
        const fileData = await uploadFileToAzureStorage(
          formData.thumbnailFile,
          "course"
        );
        fileURL = fileData.blobUrl;
      }

      const subjects = formData.subjectCheckboxes
        .filter(item => item.checked)
        .map(item => item.id);

      const categories = formData.categories
        .filter(item => item.checked)
        .map(item => item.value);
      // const mockTests = formData.mockTestCheckboxes
      //   .filter(item => item.checked)
      //   .map(item => item.id);

      const payload = {
        courseName: formData.internalTitle,
        courseDisplayName: formData.courseTitle,
        shortDescription: formData.shortDescription,
        description: formData.description,
        category: categories,
        price: actual,               // already a Number
        discountPrice: discount,     // already a Number
        discountActive: formData.isKYCRequired,
        duration: formData.duration,
        no_of_videos: Number(formData.noOfVideos || 0),
        successRate: Number(formData.successRate || 0),
        course_includes: formData.courseIncludes
          .split(",")
          .map(i => i.trim())
          .filter(i => i.length > 0),
        live_class: formData.liveClass,
        recorded_class: formData.recordedClass,
        isPublished: formData.isPublished,
        status: formData.status,
        subjects,
        course_rating: Number(formData.ratting) || 0,
        // mockTests,
        image: fileURL,
        courseExpiry: new Date(formData.courseExpiry)
      };
      console.log("payload", payload);

      await updateCourseById(id, payload);
      console.log("Course updated successfully", payload);
      toast.success("Course updated successfully");
      setTimeout(() => navigate("/admin/course-management"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course. Please try again.");
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
      setFormData(prev => ({
        ...prev,
        thumbnailFile: file,
        previewUrl: URL.createObjectURL(file)
      }));
    }
  };

  // Helper function to sanitize input
  const sanitizeInput = (value, type = 'text') => {
    if (type === 'number') {
      return value.replace(/[^0-9]/g, '');
    }
    return value.replace(/[^a-zA-Z0-9\s.,-]/g, '');
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

      <Title>Edit Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Course Title & Course Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={formData.courseTitle}
                onChange={(e) => handleInputChange('courseTitle', sanitizeInput(e.target.value))}
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
                onChange={(e) => handleInputChange('internalTitle', sanitizeInput(e.target.value))}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description"> Description</Label>
              <JoditEditor
                ref={editor}
                value={formData.description}
                config={configDis}
                tabIndex={1}
                onBlur={newContent => { console.log("new", newContent); }}
                onChange={newContent => { setFormData({ ...formData, description: newContent }) }}
              />
            </FieldWrapper>
          </Column>

        </FormRow>

        {/* Row 2: Course Short Description */}
        <FormRow>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Course Short Description</Label>
              <TextArea
                id="shortDescription"
                rows="3"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', sanitizeInput(e.target.value))}
                placeholder="Enter short description"
              />
            </FieldWrapper>
          </Column> */}
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Course Short Description</Label>
              <JoditEditor
                ref={editor}
                value={formData.shortDescription}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { setFormData({ ...formData, shortDescription: newContent }) }}
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
                value={formData.discountedPrice}
                onChange={(e) => handleInputChange('discountedPrice', sanitizeInput(e.target.value, 'number'))}
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
                value={formData.actualPrice}
                onChange={(e) => handleInputChange('actualPrice', sanitizeInput(e.target.value, 'number'))}
                placeholder="Enter Actual Price in ₹ (eg: 3999)"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Category Selection */}
        {/* <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Category</Label>
              <Select
                value={formData.selectedCategory}
                style={{ width: "100%" }}
                onChange={(value) => handleInputChange('selectedCategory', value)}
                options={formData.categories}
                placeholder="Select a category"
              />
            </FieldWrapper>
          </Column>
        </FormRow> */}

        {/* Row 4: Add Subject + Add Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Subject
              </CheckboxSectionTitle>
              <CheckboxList>
                {formData.subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, 'subjectCheckboxes')}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Category</CheckboxSectionTitle>
              <CheckboxList>
                {formData.categories.map((item, index) => (
                  <CheckboxLabel key={item.id || index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, 'categories')}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>

          </Column>
          <CheckboxSection>
            {/* <CheckboxSectionTitle>
                Add Mock Test (Click Checkbox to Select)
              </CheckboxSectionTitle> */}
            {/* <CheckboxList>
                {formData.mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, 'mockTestCheckboxes')}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList> */}
          </CheckboxSection>

        </FormRow>

        {/* Row 5: Course Details */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g. 4 months"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseExpiry">Course Expiry Date</Label>
              <Input
                id="courseExpiry"
                type="date"
                value={formData.courseExpiry}
                onChange={(e) => handleInputChange('courseExpiry', e.target.value)}
              />
            </FieldWrapper>
          </Column>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="noOfVideos">Number of Videos</Label>
              <Input
                id="noOfVideos"
                type="number"
                value={formData.noOfVideos}
                onChange={(e) => handleInputChange('noOfVideos', sanitizeInput(e.target.value, 'number'))}
                placeholder="e.g. 120"
              />
            </FieldWrapper>
          </Column> */}
        </FormRow>

        <FormRow>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="successRate">Success Rate (%)</Label>
              <Input
                id="successRate"
                type="number"
                value={formData.successRate}
                onChange={(e) => handleInputChange('successRate', sanitizeInput(e.target.value, 'number'))}
                placeholder="e.g. 95"
              />
            </FieldWrapper>
          </Column> */}
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="ratting">Ratting</Label>
              <Input
                id="ratting"
                type="number"
                min={0}
                max={5}
                value={formData.ratting}
                onChange={(e) => {
                  if (e.target.value < 0 || e.target.value > 5) {
                    toast.error("Rating must be between 0 and 5.");
                    return;
                  }
                  setFormData(prev => ({
                    ...prev,
                    ratting: e.target.value
                  }));
                }}
                placeholder="e.g. 4"
              />
            </FieldWrapper>
          </Column> */}

        </FormRow>
        <FormRow>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="courseIncludes">Course Includes (comma separated)</Label>
              <Input
                id="courseIncludes"
                value={formData.courseIncludes}
                onChange={(e) => handleInputChange('courseIncludes', e.target.value)}
                placeholder="e.g. Video lectures, PDF notes, Mock tests"
              />
            </FieldWrapper>
          </Column> */}
        </FormRow>

        {/* Row 6: Description */}
        {/* <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter detailed description"
              />
            </FieldWrapper>
          </Column>
        </FormRow> */}

        {/* Row 7: Upload Thumbnail and Toggles */}
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
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  {formData.thumbnailFile && <p>{formData.thumbnailFile.name}</p>}
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
                checked={formData.isKYCRequired}
                onChange={() => handleToggleChange('isKYCRequired')}
              />
            </FieldWrapper>

            {/* <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Live Class Available?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={formData.liveClass}
                onChange={() => handleToggleChange('liveClass')}
              />
            </FieldWrapper>

            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Recorded Class Available?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={formData.recordedClass}
                onChange={() => handleToggleChange('recordedClass')}
              />
            </FieldWrapper> */}

            <FieldWrapper style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <Label style={{ marginBottom: "0px" }}>Publish Course?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={formData.isPublished}
                onChange={() => handleToggleChange('isPublished')}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 8: Submit button */}
        <FormRow>
          {
            !readOnlyPermissions && (
              <SubmitButton type="submit">Update Course</SubmitButton>
            )
          }
        </FormRow>
      </FormWrapper>
    </Container>
  );
}