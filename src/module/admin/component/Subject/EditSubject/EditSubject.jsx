import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getAllNotes, rearrangeNotes } from "../../../../../api/notesApi";
import {
  getAllLectures,
  rearrangeLectures,
} from "../../../../../api/lecturesApi";
import {
  getSubjectById,
  updateSubjectById,
} from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import {
  getAllMocktest,
  rearrangeMocktest,
} from "../../../../../api/mocktestApi";
import { getAllCourses } from "../../../../../api/courseApi";
import JoditEditor from "jodit-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getAuth } from "../../../../../utils/authService";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const editor = useRef(null);

  // form fields
  const [subjectTitle, setSubjectTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // checkbox items
  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);

  // selected items
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectedMockTests, setSelectedMockTests] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // search states
  const [notesSearch, setNotesSearch] = useState("");
  const [lecturesSearch, setLecturesSearch] = useState("");
  const [mockSearch, setMockSearch] = useState("");
  const [coursesSearch, setCoursesSearch] = useState("");

  // permissions
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAuth();
      if (response.isSuperAdmin) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions.courseManagement.readOnly);
      }
    })();
  }, []);

  // fetch existing subject and checkbox data
  useEffect(() => {
    async function fetchData() {
      try {
        const [subRes, notesRes, lectRes, mockRes, courseRes] =
          await Promise.all([
            getSubjectById(id),
            getAllNotes(),
            getAllLectures(),
            getAllMocktest(),
            getAllCourses(),
          ]);
        const subject = subRes.data;

        // set form fields
        setSubjectTitle(subject.subjectDisplayName || "");
        setInternalTitle(subject.subjectName || "");
        setVimeoId(subject.vimeoShowcaseID || "");
        setShortDescription(subject.description || ""); // This sets the short description
        if (subject.image) setPreviewUrl(subject.image);

        // sort & build notes
        const sortedNotes = notesRes.data
          .sort((a, b) =>
            (a.noteDisplayName || a.title).localeCompare(
              b.noteDisplayName || b.title
            )
          )
          .map((n) => ({ id: n._id, label: n.noteDisplayName || n.title }));
        setNotesCheckboxes(sortedNotes);

        // sort & build lectures
        const sortedLectures = lectRes.data
          .sort((a, b) =>
            (a.lectureName || a.title).localeCompare(b.lectureName || b.title)
          )
          .map((l) => ({ id: l._id, label: l.lectureName || l.title }));
        setLecturesCheckboxes(sortedLectures);

        // sort & build mock tests
        const sortedMocks = mockRes.data
          .sort((a, b) =>
            (a.title || a.mockTestName).localeCompare(b.title || b.mockTestName)
          )
          .map((m) => ({ id: m._id, label: m.title || m.mockTestName }));
        setMockTestCheckboxes(sortedMocks);

        // sort & build courses
        const sortedCourses = courseRes.data
          .sort((a, b) =>
            (a.courseName || a.title).localeCompare(b.courseName || b.title)
          )
          .map((c) => ({ id: c._id, label: c.courseName || c.title }));
        setCoursesCheckboxes(sortedCourses);

        // Set selected items
        setSelectedNotes(
          subject.notes.map((n) => ({
            id: n._id || n,
            label:
              n.noteDisplayName ||
              n.title ||
              notesRes.data.find((note) => note._id === (n._id || n))
                ?.noteDisplayName ||
              "",
          }))
        );

        setSelectedLectures(
          subject.lectures.map((l) => ({
            id: l._id || l,
            label:
              l.lectureName ||
              l.title ||
              lectRes.data.find((lec) => lec._id === (l._id || l))
                ?.lectureName ||
              "",
          }))
        );

        setSelectedMockTests(
          subject.mockTests.map((m) => ({
            id: m._id || m,
            label:
              m.title ||
              m.mockTestName ||
              mockRes.data.find((mock) => mock._id === (m._id || m))?.title ||
              "",
          }))
        );

        setSelectedCourses(
          subject.courses.map((c) => ({
            id: c._id || c,
            label:
              c.courseName ||
              c.title ||
              courseRes.data.find((course) => course._id === (c._id || c))
                ?.courseName ||
              "",
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch subject details");
        navigate("/admin/subject-management");
      }
    }
    fetchData();
  }, [id, navigate]);

  // cleanup preview URL
  useEffect(
    () => () => previewUrl && URL.revokeObjectURL(previewUrl),
    [previewUrl]
  );

  // Handle checkbox changes
  const handleCheckboxChange = (type, id) => {
    if (readOnlyPermissions) return;

    const setters = {
      notes: [setSelectedNotes, selectedNotes],
      lectures: [setSelectedLectures, selectedLectures],
      mockTests: [setSelectedMockTests, selectedMockTests],
      courses: [setSelectedCourses, selectedCourses],
    };

    const [setSelected, selectedItems] = setters[type];
    const allItems = {
      notes: notesCheckboxes,
      lectures: lecturesCheckboxes,
      mockTests: mockTestCheckboxes,
      courses: coursesCheckboxes,
    }[type];

    // Check if item is already selected
    const isSelected = selectedItems.some((item) => item.id === id);

    if (isSelected) {
      // Remove from selected
      setSelected((prev) => prev.filter((item) => item.id !== id));
    } else {
      // Add to selected
      const itemToAdd = allItems.find((item) => item.id === id);
      if (itemToAdd) {
        setSelected((prev) => [...prev, itemToAdd]);
      }
    }
  };

  // Move items up/down (only for notes, lectures, and mock tests)
  const moveItem = (type, index, direction) => {
    if (readOnlyPermissions) return;

    const setters = {
      notes: setSelectedNotes,
      lectures: setSelectedLectures,
      mockTests: setSelectedMockTests,
    };
    const setSelected = setters[type];

    setSelected((prev) => {
      const newItems = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < newItems.length) {
        [newItems[index], newItems[newIndex]] = [
          newItems[newIndex],
          newItems[index],
        ];
      }
      return newItems;
    });
  };

  const handleUploadAreaClick = () => {
    if (!readOnlyPermissions) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    if (readOnlyPermissions) return;

    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setThumbnailFile(file);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleNavigate = (type, id) => {
    switch (type) {
      case "notes":
        navigate(`/admin/notes-management/edit/${id}`);
        break;
      case "lectures":
        navigate(`/admin/lecturer-management/edit/${id}`);
        break;
      case "mockTests":
        navigate(`/admin/mock-test/edit/${id}`);
        break;
      case "courses":
        navigate(`/admin/course-management/edit/${id}`);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnlyPermissions) return;

    if (!subjectTitle.trim() || !internalTitle.trim()) {
      return toast.error("Subject Title and Internal Title are required.");
    }

    let imageUrl = previewUrl;
    if (!imageUrl) {
      return toast.error("Image is required.");
    }

    if (thumbnailFile) {
      try {
        const { blobUrl } = await uploadFileToAzureStorage(
          thumbnailFile,
          "subjects"
        );
        imageUrl = blobUrl;
      } catch {
        return toast.error("Failed to upload image");
      }
    }

    try {
      // Rearrange items only if there are selected items
      if (selectedNotes.length > 0) {
        await rearrangeNotes({ noteIds: selectedNotes.map((n) => n.id) });
      }
      if (selectedLectures.length > 0) {
        await rearrangeLectures({
          lectureIds: selectedLectures.map((l) => l.id),
        });
      }
      if (selectedMockTests.length > 0) {
        await rearrangeMocktest({
          mocktestIds: selectedMockTests.map((m) => m.id),
        });
      }

      await updateSubjectById(id, {
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId || "", // Optional
        description: shortDescription || "", // Optional
        notes: selectedNotes.map((n) => n.id) || [], // Optional
        lectures: selectedLectures.map((l) => l.id) || [], // Optional
        mockTests: selectedMockTests.map((m) => m.id) || [], // Optional
        courses: selectedCourses.map((c) => c.id) || [], // Optional
        image: imageUrl,
      });
      toast.success("Subject updated successfully");
      setTimeout(() => navigate("/admin/subject-management"), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg || "Update failed");
    }
  };

  const handleRemoveSelectedItem = (type, id) => {
    if (readOnlyPermissions) return;

    // Update selected state
    const setters = {
      notes: setSelectedNotes,
      lectures: setSelectedLectures,
      mockTests: setSelectedMockTests,
      courses: setSelectedCourses,
    };

    setters[type]((prev) => prev.filter((item) => item.id !== id));
  };

  const editorConfig = useMemo(
    () => ({
      readonly: readOnlyPermissions,
      // placeholder: "Enter description here...",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "undo",
        "redo",
      ],
      height: 300,
    }),
    [readOnlyPermissions]
  );

  // Filter items based on search
  const filteredNotes = notesCheckboxes.filter((n) =>
    n.label.toLowerCase().includes(notesSearch.toLowerCase())
  );
  const filteredLectures = lecturesCheckboxes.filter((l) =>
    l.label.toLowerCase().includes(lecturesSearch.toLowerCase())
  );
  const filteredMocks = mockTestCheckboxes.filter((m) =>
    m.label.toLowerCase().includes(mockSearch.toLowerCase())
  );
  const filteredCourses = coursesCheckboxes.filter((c) =>
    c.label.toLowerCase().includes(coursesSearch.toLowerCase())
  );

  // Check if an item is selected
  const isSelected = (type, id) => {
    const selectedItems = {
      notes: selectedNotes,
      lectures: selectedLectures,
      mockTests: selectedMockTests,
      courses: selectedCourses,
    }[type];

    return selectedItems.some((item) => item.id === id);
  };

  // Render selected items with move buttons (except for courses)
  const renderSelectedItems = (items, type) => (
    <SelectedSubjectsContainer>
      <CheckboxSectionTitle>
        Selected {type} ({items.length})
      </CheckboxSectionTitle>
      {items.length > 0 ? (
        items.map((item, index) => (
          <SelectedSubjectItem key={item.id}>
            <SubjectName
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "blue",
              }}
              onClick={() => handleNavigate(type, item.id)}
            >
              {item.label}
            </SubjectName>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {type !== "courses" && !readOnlyPermissions && (
                <>
                  <MoveButton
                    style={{ backgroundColor: "green" }}
                    type="button"
                    onClick={() => moveItem(type, index, "up")}
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </MoveButton>
                  <MoveButton
                    style={{ backgroundColor: "red" }}
                    type="button"
                    onClick={() => moveItem(type, index, "down")}
                    disabled={index === items.length - 1}
                  >
                    <FaArrowDown />
                  </MoveButton>
                </>
              )}
              {/* ❌ Delete button */}
              {!readOnlyPermissions && (
                <MoveButton
                  style={{ backgroundColor: "gray" }}
                  type="button"
                  onClick={() => handleRemoveSelectedItem(type, item.id)}
                >
                  ❌
                </MoveButton>
              )}
            </div>
          </SelectedSubjectItem>
        ))
      ) : (
        <p>No {type} selected</p>
      )}
    </SelectedSubjectsContainer>
  );

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <Title>Edit Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
                placeholder="Enter Subject Title"
                readOnly={readOnlyPermissions}
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input
                value={internalTitle}
                onChange={(e) => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
                readOnly={readOnlyPermissions}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <JoditEditor
                ref={editor}
                value={shortDescription}
                config={editorConfig}
                onBlur={(newContent) => setShortDescription(newContent)}
                onChange={(newContent) => {}} // We use onBlur instead of onChange for performance
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Notes Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>
                  Available Notes ({filteredNotes.length}){" "}
                </CheckboxSectionTitle>
                <Input
                  placeholder="Search notes..."
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  style={{ margin: "8px 0" }}
                  readOnly={readOnlyPermissions}
                />
                <CheckboxList>
                  {filteredNotes.map((note) => (

                    <CheckboxLabel key={note.id}>
                      <CheckboxInput
                        type="checkbox"
                        checked={isSelected("notes", note.id)}
                        onChange={() => handleCheckboxChange("notes", note.id)}
                        disabled={readOnlyPermissions}
                      />
                      <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "6px",
                          textDecoration: "none",
                          color: "blue",
                        }}
                        onClick={() => handleNavigate("notes", note.id)}
                      >
                        {note.label}
                      </span>
                    </CheckboxLabel>

                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedNotes, "notes")}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Lectures Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>
                  Available Lectures ({filteredLectures.length})
                </CheckboxSectionTitle>
                <Input
                  placeholder="Search lectures..."
                  value={lecturesSearch}
                  onChange={(e) => setLecturesSearch(e.target.value)}
                  style={{ margin: "8px 0" }}
                  readOnly={readOnlyPermissions}
                />
                <CheckboxList>
                  {filteredLectures.map((lecture) => (

                    <CheckboxLabel key={lecture.id}>
                      <CheckboxInput
                        type="checkbox"
                        checked={isSelected("lectures", lecture.id)}
                        onChange={() =>
                          handleCheckboxChange("lectures", lecture.id)
                        }
                        disabled={readOnlyPermissions}
                      />
            <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "6px",
                          textDecoration: "none",
                          color: "blue",
                        }}
                        onClick={() => handleNavigate("lectures", lecture.id)}
                      >
                        {lecture.label}
                      </span>
                    </CheckboxLabel>

                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedLectures, "lectures")}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Mock Tests Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>
                  Available Mock Tests ({filteredMocks.length})
                </CheckboxSectionTitle>
                <Input
                  placeholder="Search mock tests..."
                  value={mockSearch}
                  onChange={(e) => setMockSearch(e.target.value)}
                  style={{ margin: "8px 0" }}
                  readOnly={readOnlyPermissions}
                />
                <CheckboxList>
                  {filteredMocks.map((mock) => (
                    <CheckboxLabel key={mock.id}>
                      <CheckboxInput
                        type="checkbox"
                        checked={isSelected("mockTests", mock.id)}
                        onChange={() =>
                          handleCheckboxChange("mockTests", mock.id)
                        }
                        disabled={readOnlyPermissions}
                      />
                      <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "6px",
                          textDecoration: "none",
                          color: "blue",
                        }}
                        onClick={() => handleNavigate("mockTests", mock.id)}
                      >
                        {mock.label}
                      </span>
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedMockTests, "mockTests")}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Courses Section */}
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>
                  Available Courses ({filteredCourses.length})
                </CheckboxSectionTitle>
                <Input
                  placeholder="Search courses..."
                  value={coursesSearch}
                  onChange={(e) => setCoursesSearch(e.target.value)}
                  style={{ margin: "8px 0" }}
                  readOnly={readOnlyPermissions}
                />
                <CheckboxList>
                  {filteredCourses.map((course) => (
                    <CheckboxLabel key={course.id}>
                      <CheckboxInput
                        type="checkbox"
                        checked={isSelected("courses", course.id)}
                        onChange={() =>
                          handleCheckboxChange("courses", course.id)
                        }
                        disabled={readOnlyPermissions}
                      />
                     <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "6px",
                          textDecoration: "none",
                          color: "blue",
                        }}
                        onClick={() => handleNavigate("courses", course.id)}
                      >
                        {course.label}
                      </span>
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              {renderSelectedItems(selectedCourses, "courses")}
            </SubjectsContainer>
          </Column>
        </FormRow>

        {/* Thumbnail Upload */}
        <FormRow>
          <Column>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {thumbnailFile && <p>{thumbnailFile.name}</p>}
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uploadIcon} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag & drop image here</p>
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
                disabled={readOnlyPermissions}
              />
            </UploadArea>
          </Column>
        </FormRow>

        {!readOnlyPermissions && (
          <FormRow>
            <SubmitButton type="submit">Update Subject</SubmitButton>
          </FormRow>
        )}
      </FormWrapper>
    </Container>
  );
}
