import React from "react";
import {
  AboutusContainer,
  AboutusTitle,
  AboutusFormGroup,
  AboutusLabel,
  AboutusInput,
  AboutusTextarea,
  AboutusButton,
} from './AboutUs.styles';

const Aboutus = () => {
  return (
    <AboutusContainer>
      <AboutusTitle>About Us</AboutusTitle>
      <AboutusFormGroup>
        <AboutusLabel>Title</AboutusLabel>
        <AboutusInput type="text" placeholder="Write title here" />
      </AboutusFormGroup>
      <AboutusFormGroup>
        <AboutusLabel>Description</AboutusLabel>
        <AboutusTextarea placeholder="Write description here" />
      </AboutusFormGroup>
      <AboutusButton>Update changes</AboutusButton>
    </AboutusContainer>
  )
};


export default Aboutus;