import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  ToggleSwitch,
} from "../ViewCourse/ViewCourse.style";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../../../api/courseApi";
import toast from "react-hot-toast";

export default function ViewCourse() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await getCourseById(id);
        setCourseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Failed to load course data");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!courseData) {
    return <Container>Course not found</Container>;
  }

  // Helper function to format array data
  const formatArrayData = (array) => {
    if (!array || array.length === 0) return "None";
    return array.map(item => typeof item === 'object' ? item.subjectName || item.label : item).join(", ");
  };

  return (
    <Container>
      <Title>View Course</Title>
      <FormWrapper>
        {/* Basic Information */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Title</Label>
              <p className="field">{courseData.courseDisplayName || "Not specified"}</p>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <p className="field">{courseData.courseName || "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <p className="field">{courseData.shortDescription || "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Pricing */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Discounted Price</Label>
              <p className="field">{courseData.discountPrice ? `₹ ${courseData.discountPrice}` : "Not specified"}</p>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Actual Price</Label>
              <p className="field">{courseData.price ? `₹ ${courseData.price}` : "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Discount Active?</Label>
              <ToggleSwitch type="checkbox" checked={courseData.discountActive} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Course Details */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Category</Label>
              <p className="field">{formatArrayData(courseData.subjects)}</p>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Status</Label>
              <p className="field">{courseData.status ? courseData.status.charAt(0).toUpperCase() + courseData.status.slice(1) : "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            {/* <FieldWrapper>
              <Label>Duration</Label>
              <p className="field">{courseData.duration || "Not specified"}</p>
            </FieldWrapper> */}
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Number of Videos</Label>
              <p className="field">{courseData.no_of_videos || "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            {/* <FieldWrapper>
              <Label>Success Rate</Label>
              <p className="field">{courseData.successRate ? `${courseData.successRate}%` : "Not specified"}</p>
            </FieldWrapper> */}
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Published?</Label>
              <ToggleSwitch type="checkbox" checked={courseData.isPublished} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Live Class Available?</Label>
              <ToggleSwitch type="checkbox" checked={courseData.live_class} disabled />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Recorded Class Available?</Label>
              <ToggleSwitch type="checkbox" checked={courseData.recorded_class} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Subjects and Mock Tests */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subjects</Label>
              <p className="field">{formatArrayData(courseData.subjects)}</p>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Mock Tests</Label>
              <p className="field">{formatArrayData(courseData.mockTests)}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Course Includes */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Includes</Label>
              <p className="field">{formatArrayData(courseData.course_includes)}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Description */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Description</Label>
              <p className="field">{courseData.description || "Not specified"}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Thumbnail */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Thumbnail Image</Label>
            {courseData.image ? (
              <img
                src={courseData.image}
                alt="Course Thumbnail"
                style={{ 
                  width: "300px", 
                  height: "auto", 
                  borderRadius: "8px",
                  maxHeight: "200px",
                  objectFit: "cover"
                }}
              />
            ) : (
              <p className="field">No thumbnail available</p>
            )}
          </Column>
        </FormRow>

        {/* Student Feedback */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Student Feedback</Label>
              {courseData.student_feedback?.length > 0 ? (
                courseData.student_feedback.map((feedback, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <p className="field"><strong>Review:</strong> {feedback.review}</p>
                    {feedback.student_ref && (
                      <p className="field"><strong>Student:</strong> {feedback.student_ref.name}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="field">No feedback available</p>
              )}
            </FieldWrapper>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}