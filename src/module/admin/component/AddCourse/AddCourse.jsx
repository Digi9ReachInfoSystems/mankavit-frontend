// AddCourse.jsx
import React, { useState, useRef, useEffect } from "react";
import uplaod from "../../../../assets/upload.png";
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
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../../api/subjectApi";
import { Select } from "antd";
import { getCategories } from "../../../../api/categoryApi";
import { createCourse } from "../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../utils/azureStorageService";

export default function AddCourse() {
  // State for form fields
  const [courseTitle, setCourseTitle] = useState(null);
  const [internalTitle, setInternalTitle] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [actualPrice, setActualPrice] = useState(null);
  const [isKYCRequired, setIsKYCRequired] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();


  // Checkbox selections for Add Subject and Add Mock Test
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([
  ]);

  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
  ]);

  // File upload state
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const responseSubjects = await getSubjects();
        const data = responseSubjects.data.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: false,
        }));
        setSubjectCheckboxes(data);
        const responseCategories = await getCategories();
        const dataCategories = responseCategories.data.map((item) => ({
          label: item.title,
          value: item._id,
        }))
        setCategory(dataCategories);
        setSelectedCategory(dataCategories[0].value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    apiCaller();

  }, []);

  // Handler for checkboxes
  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleToggleChange = () => {
    setIsKYCRequired(!isKYCRequired);
  };

  // For triggering the hidden file input
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // For reading selected file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
    if (!e.target.files[0].type.startsWith("image/")) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      toast.error('Please select an image file.',
        {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        }
      )
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseTitle == "" || courseTitle == null) {
        toast.error('Please enter course title.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        })
        return;
      }
      if (internalTitle == "" || internalTitle == null) {
        toast.error('Please enter internal course title.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      // if (shortDescription == "" || shortDescription == null) {
      //   toast.error('Please enter short description.', {
      //     duration: 3000,
      //     position: 'top-right',
      //     ariaProps: {
      //       role: 'status',
      //       'aria-live': 'polite',
      //     },
      //   });
      //   return;
      // }
      if (discountedPrice == "" || discountedPrice == null) {
        toast.error('Please enter discounted price.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      if (isNaN(discountedPrice) || !/^\d+$/.test(discountedPrice)) {
        toast.error('Discounted price should be a number.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }

      if (actualPrice == "" || actualPrice == null) {
        toast.error('Please enter actual price.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      if (isNaN(actualPrice) || !/^\d+$/.test(actualPrice)) {
        toast.error('Actual price should be a number.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      if (thumbnailFile == null) {

        toast.error('Please upload thumbnail file.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )

        return;
      }
      if (selectedCategory == null) {
        toast.error('Please select category.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        return;
      }
      if (!thumbnailFile.type.startsWith("image/")) {
        toast.error('Please select an image file.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        return;

      }
      const fileData = await uploadFileToAzureStorage(thumbnailFile, "course");
      const fileURL = fileData.blobUrl;
      const subjects = subjectCheckboxes.filter((item) => item.checked).map((item) => item.id);
      const createCourseResponse = await createCourse(
        {
          courseName: internalTitle,
          courseDisplayName: courseTitle,
          shortDescription: shortDescription,
          description: description,
          category: selectedCategory,
          price: actualPrice,
          discountPrice: discountedPrice,
          discountActive: isKYCRequired,
          subjects: subjects,
          mockTests: [],
          image: fileURL,

        }
      )
      if (createCourseResponse) {
        toast.success('Course created successfully.', {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      }
      setInternalTitle(null);
      setCourseTitle(null);
      setShortDescription(null);
      setDescription(null);
      setSelectedCategory(category[0].value);
      setActualPrice(null);
      setDiscountedPrice(null);
      setIsKYCRequired(false);
      setSubjectCheckboxes(subjectCheckboxes.map((item) => ({ ...item, checked: false })));
      setThumbnailFile(null);
      setTimeout(() => {
        navigate("/admin/course-management")
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('Course creation failed.', {
        duration: 3000,
        position: 'top-right',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
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
        <FormRow>
          <FieldWrapper>
            <Label htmlFor="actualPrice">Category</Label>
            {(selectedCategory && category) &&
              <Select
                defaultValue={selectedCategory || category[0]?.value}
                style={{ width: 120 }}
                onChange={(value) => setSelectedCategory(value)}
                options={category}
              />}
          </FieldWrapper>
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
                  <CheckboxLabel key={index}>
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
                Add Mock Test ( Click Checkbox to Select )
              </CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
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

        {/* Row 5: Add Notes */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription"> Description</Label>
              <TextArea
                id="shortDescription"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter short description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 6: Upload Thumbnail and KYC Toggle (Side by Side) */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile ? (
                previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
                    <p>{thumbnailFile.name}</p>
                  </>
                ) : (
                  <>
                    <UploadPlaceholder>
                      <img src={uplaod} alt="Upload" />
                    </UploadPlaceholder>
                    <p>Drag and drop image here</p>
                    <p>or <strong>Add Image</strong></p>
                  </>
                )
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
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: "0px" }}>Is Discount Active?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={isKYCRequired}
                onChange={handleToggleChange}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 7: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Course</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
