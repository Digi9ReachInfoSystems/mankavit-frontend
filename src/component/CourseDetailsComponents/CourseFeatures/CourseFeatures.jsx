import React from "react";
import {
  FeatureItem,
  FeatureTitle,
  FeatureDescription,
  FeatureList,
} from "./CourseFeatures.styles";

const features = [
  "Live Classes: Real-time learning with industry-experienced faculty.",
  "Recorded Sessions: Access to recorded sessions anytime for review.",
  "Personalized Guidance: Mentoring to help you focus on key areas.",
  "Mock Tests & Quizzes: Regular practice to ensure exam readiness.",
  "Doubt Solving: Clear your doubts through live interactions and Q&A sessions.",
];

const CourseFeatures = () => {
  return (
    <FeatureItem>
      <FeatureTitle>Course <span>Features</span></FeatureTitle>
      <FeatureDescription>
        {features.map((feature, index) => (
          <FeatureList key={index}>{feature}</FeatureList>
        ))}
      </FeatureDescription>
    </FeatureItem>
  );
};

export default CourseFeatures;
