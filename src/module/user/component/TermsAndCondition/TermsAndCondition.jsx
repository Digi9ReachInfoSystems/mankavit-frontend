import React from 'react';
import { TermsContainer, TermsHeading, Termspara, List } from './TermsAndCondition.styles';

const introParagraphs = [
  "By accessing and using the services provided by Mankavit Law Academy, you agree to the following Terms and Conditions:",
  // You can add more paragraphs here if needed.
];

const termsList = [
  { title: "Eligibility", description: "To enroll in our courses, you must meet the eligibility criteria specified for each program. To enroll in our courses, you must meet the eligibility criteria specified for each program" },
  { title: "Course Enrollment", description: "Enrollment is subject to availability, and the fee must be paid in full at the time of registration unless specified otherwise." },
  { title: "Course Materials", description: "All study materials provided are for personal use only and may not be reproduced or distributed without prior written consent." },
  { title: "Payment Terms", description: "Fees must be paid as per the payment schedule. Failure to pay on time may result in suspension of access.To enroll in our courses, you must meet the eligibility criteria specified for each program.  To enroll in our courses, you must meet the eligibility criteria specified for each program" },
  { title: "Live Classes", description: "Classes will be conducted as per the schedule. Mankavit reserves the right to reschedule or cancel in exceptional cases with prior notice." },
  { title: "Intellectual Property", description: "All content remains the intellectual property of Mankavit Law Academy." },
  { title: "Refund Policy", description: "Refunds are subject to conditions outlined in our policy." },
  { title: "User Conduct", description: "Unethical or illegal conduct during the course can result in termination without a refund." },
  { title: "Liability", description: "Mankavit is not responsible for damages from misuse of services or content." },
  { title: "Eligibility", description: "To enroll in our courses, you must meet the eligibility criteria specified for each program. To enroll in our courses, you must meet the eligibility criteria specified for each program" },
  { title: "Course Enrollment", description: "Enrollment is subject to availability, and the fee must be paid in full at the time of registration unless specified otherwise." },
  { title: "Course Materials", description: "All study materials provided are for personal use only and may not be reproduced or distributed without prior written consent." },
  { title: "Payment Terms", description: "Fees must be paid as per the payment schedule. Failure to pay on time may result in suspension of access.To enroll in our courses, you must meet the eligibility criteria specified for each program.  To enroll in our courses, you must meet the eligibility criteria specified for each program" },
];

const TermsAndCondition = () => (
  <TermsContainer>
    <TermsHeading>Terms And Conditions</TermsHeading>
    {introParagraphs.map((para, index) => (
      <Termspara key={index}>{para}</Termspara>
    ))}
    <List>
  {termsList.map((item, index) => (
    <li key={index}>
      <strong>{item.title}:</strong> {item.description}
    </li>
  ))}

    </List>
  </TermsContainer>
);

export default TermsAndCondition;
