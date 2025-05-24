import React, { useState, useEffect } from "react";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  ConfirmButton,
  MocktestList,
  MocktestItem,
} from "./CustomModal.styles";
import { getSubjects } from "../../../../api/subjectApi";
import {getAllCourses} from "../../../../api/courseApi"
import { Link } from "react-router-dom";

const CustomModal = ({ title, type, data = [], onClose, onConfirm }) => {
  console.log(type);
  const [subjectData, setSubjectData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const getEmptyMessage = () => {
    if (type === "mockTests") return "No mock tests available.";
    if (type === "activeCourses") return "No active courses available.";
    if(type === "courses") return "No courses available.";
    if (type === "subjects") return "No subjects available.";
    if (type === "students" || type === "enrolled") return "No students available.";
    return "No data available.";
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      if (type === "subjects" && Array.isArray(data) && data.length > 0) {
        try {
          const res = await getSubjects();
          setSubjectData(res.data || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      }
    };

    fetchSubjects();
  }, [type, data]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (type === "activeCourses" && Array.isArray(data) && data.length > 0) {
        try {
          const res = await getAllCourses();
          setCourseData(res.data || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      }
    };

    fetchCourses();
  }, [type, data]);


  const renderList = () => {
    console.log(data);
    if (!Array.isArray(data) || data.length === 0) {
      return <MocktestItem>{getEmptyMessage()}</MocktestItem>;
    }

    if (type === "students" || type === "enrolled") {
      return data.map((student, index) => (
        <MocktestItem key={index}>{student.name}</MocktestItem>
      ));
    }

    if (type === "activeCourses") {

      console.log(data);
      return data.map((course, index) => {
        const courseName = typeof course === 'string' ? course : course.courseName;

        const matchedCourse = courseData.find(
          (course) =>
            course.courseName?.toLowerCase().trim() === courseName?.toLowerCase().trim()
        );

        return (
          <MocktestItem key={index}>
            {matchedCourse ? (
              <Link
                  to={`/admin/course-management/view/${matchedCourse._id}`}
                  className="subject-link"
              >
                {matchedCourse.courseName}
              </Link>
            ) : (
              courseName // fallback if not found
            )}
          </MocktestItem>
        );
      });
    }
    console.log(type);
    
    if(type === "courses") {
      console.log(data);
      return data.map((course, index) => (
        <MocktestItem key={index}>
          <Link
              to={`/admin/course-management/view/${course._id}`}
              className="subject-link"
          >
            {course.courseName}
          </Link>
        </MocktestItem>
      ));
    }

    if (type === "subjects") {
      return data.map((subjectObj, index) => {
        const subjectName = typeof subjectObj === 'string' ? subjectObj : subjectObj.subjectName;
      
        const matchedSubject = subjectData.find(
          (subject) =>
            subject.subjectName?.toLowerCase().trim() === subjectName?.toLowerCase().trim()
        );
      
        return (
          <MocktestItem key={index}>
            {matchedSubject ? (
              <Link
                  to={`/admin/subject-management/view/${matchedSubject._id}`}
                  className="subject-link"
              >
                {matchedSubject.subjectName}
              </Link>
            ) : (
              subjectName // fallback if not found
            )}
          </MocktestItem>
        );
      });
             }

    return data.map((item, index) => (
      <MocktestItem key={index}>{item}</MocktestItem>
    ));
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <MocktestList>{renderList()}</MocktestList>
        </ModalBody>
        <ModalFooter>
          <CloseButton onClick={onClose}>Close</CloseButton>
          {onConfirm && (
            <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          )}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default CustomModal;