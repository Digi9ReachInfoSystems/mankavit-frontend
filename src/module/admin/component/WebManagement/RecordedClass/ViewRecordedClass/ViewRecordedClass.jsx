import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  FormRow,
  FormColumn,
  FormGroup,
  Label,
  ValueText,
} from "./ViewRecordedClass.styles";
import { getRecordedClassById } from "../../../../../../api/recordedAPi";
import { getAllCourses } from "../../../../../../api/courseApi";

const ViewRecordedClass = () => {
  const { id: classId } = useParams();
  const [recordedClass, setRecordedClass] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch recorded class data
        const classResponse = await getRecordedClassById(classId);
        setRecordedClass(classResponse.data);
        
        // Fetch all courses
        const coursesResponse = await getAllCourses();
        setCourses(coursesResponse.data || []);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load recorded class details");
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchData();
    }
  }, [classId]);

  // Function to get course name from course_ref
  const getCourseName = (courseRef) => {
    if (!courseRef) return "No course assigned";
    if (typeof courseRef === 'string') return courseRef; // if it's already a string
    
    // If courseRef is an object with courseName
    if (courseRef.courseName) return courseRef.courseName;
    
    // If we have the full courses list, try to find the course
    if (courses.length > 0 && courseRef._id) {
      const course = courses.find(c => c._id === courseRef._id);
      return course ? course.courseName : "Unknown course";
    }
    
    return "Course information not available";
  };

  if (loading) {
    return <Container>Loading recorded class details...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!recordedClass) {
    return <Container>No recorded class found</Container>;
  }

  const {
    title = "No title available",
    description = "No description available",
    duration = "N/A",
    videoUrl = "",
    course_ref = null, // Changed from selectedCourses to course_ref
    createdAt = "",
    updatedAt = ""
  } = recordedClass;

  return (
    <Container>
      <h2>Recorded Class Details</h2>

      <FormGroup>
        <Label>Title</Label>
        <ValueText>{title}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <ValueText>{description}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Duration (minutes)</Label>
        <ValueText>{duration}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Course</Label>
        <ValueText>
          {getCourseName(course_ref)}
        </ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Created At</Label>
        <ValueText>{new Date(createdAt).toLocaleString()}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Last Updated</Label>
        <ValueText>{new Date(updatedAt).toLocaleString()}</ValueText>
      </FormGroup>

      <FormRow>
        <FormColumn>
          <Label>Class Video</Label>
          {videoUrl ? (
            <video 
              controls 
              width="100%" 
              style={{ marginTop: "10px", maxHeight: "500px" }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <ValueText>No video available</ValueText>
          )}
        </FormColumn>
      </FormRow>
    </Container>
  );
};

export default ViewRecordedClass;