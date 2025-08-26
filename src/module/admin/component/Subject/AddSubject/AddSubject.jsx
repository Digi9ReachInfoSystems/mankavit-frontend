import React, { useState, useRef, useEffect, useMemo } from "react";
import uploadIcon from "../../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Input,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
  SubjectsContainer,
  SelectedSubjectsContainer,
  SelectedSubjectItem,
  SubjectName,
  MoveButton,
} from "../AddSubject/AddSubject.style";
import { useNavigate } from "react-router-dom";
import { getAllNotes, rearrangeNotes } from "../../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createSubject } from "../../../../../api/subjectApi";
import { getAllLectures, rearrangeLectures } from "../../../../../api/lecturesApi";
import { getAllMocktest, rearrangeMocktest } from "../../../../../api/mocktestApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function AddSubject() {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectedMockTests, setSelectedMockTests] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [notesSearch, setNotesSearch] = useState("");
  const [lecturesSearch, setLecturesSearch] = useState("");
  const [mockSearch, setMockSearch] = useState("");
  const [coursesSearch, setCoursesSearch] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const editor = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch notes
        const notesResp = await getAllNotes();
        const sortedNotes = notesResp.data
          .sort((a, b) => a.noteDisplayName.localeCompare(b.noteDisplayName))
          .map(n => ({ id: n._id, label: n.noteDisplayName }));
        setNotesCheckboxes(sortedNotes);

        // Fetch lectures
        const lecturesResp = await getAllLectures();
        const sortedLectures = lecturesResp.data
          .sort((a, b) => a.lectureName.localeCompare(b.lectureName))
          .map(l => ({ id: l._id, label: l.lectureName }));
        setLecturesCheckboxes(sortedLectures);

        // Fetch mock tests
        const mockResp = await getAllMocktest();
        const sortedMocks = mockResp.data
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(m => ({ id: m._id, label: m.title }));
        setMockTestCheckboxes(sortedMocks);

        // Fetch courses
        const coursesResp = await getAllCourses();
        const sortedCourses = coursesResp.data
          .sort((a, b) => a.courseName.localeCompare(b.courseName))
          .map(c => ({ id: c._id, label: c.courseName }));
        setCoursesCheckboxes(sortedCourses);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (type, id) => {
    const setters = {
      notes: [setSelectedNotes, selectedNotes],
      lectures: [setSelectedLectures, selectedLectures],
      mockTests: [setSelectedMockTests, selectedMockTests],
      courses: [setSelectedCourses, selectedCourses]
    };

    const [setSelected, selectedItems] = setters[type];
    
    // Check if item is already selected
    const isSelected = selectedItems.some(item => item.id === id);
    
    if (isSelected) {
      // Remove from selected
      setSelected(prev => prev.filter(item => item.id !== id));
    } else {
      // Add to selected
      const allItems = {
        notes: notesCheckboxes,
        lectures: lecturesCheckboxes,
        mockTests: mockTestCheckboxes,
        courses: coursesCheckboxes
      }[type];
      
      const itemToAdd = allItems.find(item => item.id === id);
      if (itemToAdd) {
        setSelected(prev => [...prev, itemToAdd]);
      }
    }
  };

  // Move items up/down (only for notes, lectures, and mock tests)
  const moveItem = (type, index, direction) => {
    const setters = {
      notes: setSelectedNotes,
      lectures: setSelectedLectures,
      mockTests: setSelectedMockTests
    };
    const setSelected = setters[type];

    setSelected(prev => {
      const newItems = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex >= 0 && newIndex < newItems.length) {
        [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      }
      return newItems;
    });
  };

  // Handle file upload
  const handleUploadAreaClick = () => fileInputRef.current?.click();
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setThumbnailFile(file);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Handle form submission
 const handleSubmit = async e => {
  e.preventDefault();
  if (!internalTitle.trim()) {
    toast.error("Subject internal title is required");
    return;
  }
  if(!subjectTitle.trim()) {
    toast.error("Subject title is required");
    return;
  }
  if (!thumbnailFile) {
    toast.error("Thumbnail image is required");
    return;
  }

  try {
    // Upload thumbnail
    const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");

    // Rearrange items in the correct order (except courses)
    if (selectedNotes.length > 0) {
      await rearrangeNotes({ noteIds: selectedNotes.map(n => n.id) });
    }
    if (selectedLectures.length > 0) {
      await rearrangeLectures({ lectureIds: selectedLectures.map(l => l.id) });
    }
    if (selectedMockTests.length > 0) {
      await rearrangeMocktest({ mocktestIds: selectedMockTests.map(m => m.id) });
    }

    // Create subject with optional fields
    await createSubject({
      subjectName: internalTitle || "",
      subjectDisplayName: subjectTitle || "", // Optional
      vimeoShowcaseID: vimeoId || "", // Optional
      description: shortDescription || "", // Optional
      notes: selectedNotes.map(n => n.id) || [], // Optional
      lectures: selectedLectures.map(l => l.id) || [], // Optional
      mockTests: selectedMockTests.map(m => m.id) || [], // Optional
      courses: selectedCourses.map(c => c.id) || [], // Optional
      image: blobUrl,
    });

    toast.success("Subject created successfully");
    // Reset form
    setSubjectTitle("");
    setInternalTitle("");
    setVimeoId("");
    setShortDescription("");
    setThumbnailFile(null);
    setSelectedNotes([]);
    setSelectedLectures([]);
    setSelectedMockTests([]);
    setSelectedCourses([]);
    
    setTimeout(() => navigate("/admin/subject-management"), 1000);
  } catch (err) {
    console.error(err);
    const msg = err.response?.data?.message || err.message;
    toast.error(msg || "Failed to create subject. Please try again");
  }
};

  const editorConfig = useMemo(() => ({ readonly: false, placeholder: shortDescription }), []);

  // Filter items based on search
  const filteredNotes = notesCheckboxes.filter(n => 
    n.label.toLowerCase().includes(notesSearch.toLowerCase())
  );
  const filteredLectures = lecturesCheckboxes.filter(l => 
    l.label.toLowerCase().includes(lecturesSearch.toLowerCase())
  );
  const filteredMocks = mockTestCheckboxes.filter(m => 
    m.label.toLowerCase().includes(mockSearch.toLowerCase())
  );
  const filteredCourses = coursesCheckboxes.filter(c => 
    c.label.toLowerCase().includes(coursesSearch.toLowerCase())
  );

  // Check if an item is selected
  const isSelected = (type, id) => {
    const selectedItems = {
      notes: selectedNotes,
      lectures: selectedLectures,
      mockTests: selectedMockTests,
      courses: selectedCourses
    }[type];
    
    return selectedItems.some(item => item.id === id);
  };

  // Render selected items with move buttons (except for courses)
  const renderSelectedItems = (items, type) => (
    <SelectedSubjectsContainer>
      <CheckboxSectionTitle>Selected {type} ({items.length})</CheckboxSectionTitle>
      {items.length > 0 ? (
        items.map((item, index) => (
          <SelectedSubjectItem key={item.id}>
            <SubjectName>{item.label}</SubjectName>
            {type !== 'courses' && (
              <div>
                <MoveButton
                style={{backgroundColor: 'green'}}
                  type="button"
                  onClick={() => moveItem(type, index, 'up')}
                  disabled={index === 0}
                >
                  <FaArrowUp />
                </MoveButton>
                <MoveButton
                    style={{backgroundColor: 'red'}}
                  type="button"
                  onClick={() => moveItem(type, index, 'down')}
                  disabled={index === items.length - 1}
                >
                  <FaArrowDown />
                </MoveButton>
              </div>
            )}
          </SelectedSubjectItem>
        ))
      ) : (
        <p style={{marginLeft: '10px'}}>No {type} selected</p>
      )}
    </SelectedSubjectsContainer>
  );

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Basic Information */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input 
                value={subjectTitle} 
                onChange={e => setSubjectTitle(e.target.value)} 
                placeholder="Enter Subject Title" 
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input 
                value={internalTitle} 
                onChange={e => setInternalTitle(e.target.value)} 
                placeholder="Enter Internal Title" 
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Description */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <JoditEditor 
                ref={editor} 
                value={shortDescription} 
                config={editorConfig} 
                onChange={newContent => setShortDescription(newContent)} 
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Notes Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Notes ({filteredNotes.length})</CheckboxSectionTitle>
                <Input 
                  placeholder="Search notes..." 
                  value={notesSearch} 
                  onChange={e => setNotesSearch(e.target.value)} 
                  style={{ margin: '8px 0' }} 
                />
                <CheckboxList>
                  {filteredNotes.map((note) => (
                    <CheckboxLabel key={note.id}>
                      <CheckboxInput 
                        type="checkbox" 
                        checked={isSelected('notes', note.id)} 
                        onChange={() => handleCheckboxChange('notes', note.id)} 
                      />
                      {note.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedNotes, 'notes')}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Lectures Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Lectures ({filteredLectures.length})</CheckboxSectionTitle>
                <Input 
                  placeholder="Search lectures..." 
                  value={lecturesSearch} 
                  onChange={e => setLecturesSearch(e.target.value)} 
                  style={{ margin: '8px 0' }} 
                />
                <CheckboxList>
                  {filteredLectures.map((lecture) => (
                    <CheckboxLabel key={lecture.id}>
                      <CheckboxInput 
                        type="checkbox" 
                        checked={isSelected('lectures', lecture.id)} 
                        onChange={() => handleCheckboxChange('lectures', lecture.id)} 
                      />
                      {lecture.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedLectures, 'lectures')}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Mock Tests Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Mock Tests ({filteredLectures.length})</CheckboxSectionTitle>
                <Input 
                  placeholder="Search mock tests..." 
                  value={mockSearch} 
                  onChange={e => setMockSearch(e.target.value)} 
                  style={{ margin: '8px 0' }} 
                />
                <CheckboxList>
                  {filteredMocks.map((mock) => (
                    <CheckboxLabel key={mock.id}>
                      <CheckboxInput 
                        type="checkbox" 
                        checked={isSelected('mockTests', mock.id)} 
                        onChange={() => handleCheckboxChange('mockTests', mock.id)} 
                      />
                      {mock.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedMockTests, 'mockTests')}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Courses Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Courses ({filteredCourses.length})</CheckboxSectionTitle>
                <Input 
                  placeholder="Search courses..." 
                  value={coursesSearch} 
                  onChange={e => setCoursesSearch(e.target.value)} 
                  style={{ margin: '8px 0' }} 
                />
                <CheckboxList>
                  {filteredCourses.map((course) => (
                    <CheckboxLabel key={course.id}>
                      <CheckboxInput 
                        type="checkbox" 
                        checked={isSelected('courses', course.id)} 
                        onChange={() => handleCheckboxChange('courses', course.id)} 
                      />
                      {course.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedCourses, 'courses')}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Thumbnail Upload */}
        <FormRow>
          <Column>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
                  <p>{thumbnailFile.name}</p>
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uploadIcon} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag & drop image here</p>
                  <p>or <strong>Browse</strong></p>
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
        </FormRow>

        {/* Submit Button */}
        <FormRow>
          <SubmitButton type="submit">Add Subject</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}