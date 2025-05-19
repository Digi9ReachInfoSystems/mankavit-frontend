import React, { useEffect, useState } from "react";
import {
  FeatureItem,
  FeatureTitle,
  FeatureDescription,
  FeatureList,
} from "./CourseFeatures.styles";
import { getCourseById } from "../../../api/courseApi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const CourseFeatures = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to fetch course features");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]); // Added dependency array to prevent infinite re-renders

  if (loading) {
    return <div>Loading course features...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <FeatureItem>
      <FeatureTitle>Course <span>Features</span></FeatureTitle>
      <FeatureDescription>
        {course.course_includes?.length > 0 ? (
          course.course_includes.map((feature, index) => (
            <FeatureList key={index}>
              • {feature}
            </FeatureList>
          ))
        ) : (
          <FeatureList>No features listed for this course</FeatureList>
        )}
      </FeatureDescription>
    </FeatureItem>
  );
};

export default CourseFeatures;