import React from "react";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  ToggleSwitch,
} from "../AddCourse/AddCourse.style"; // reuse styles for layout

const courseData = {
  title: "Sample Course Display Name",
  internalTitle: "Sample Course Internal Name",
  shortDescription: "This is a short description of the course.",
  discountedPrice: "₹ 499",
  actualPrice: "₹ 999",
  category: "Sample Category Name",
  subjects: "Math, Science, English",
  mockTests: "Mock Test 1, Mock Test 2",
  description:
    "This is the full course description that provides detailed information about the course.",
  thumbnail:
    "https://via.placeholder.com/200x150?text=Course+Thumbnail",
  isDiscountActive: true,
};

export default function ViewCourse() {
  return (
    <Container>
      <Title>View Course</Title>
      <FormWrapper>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Title</Label>
              <p className="field">{courseData.title}</p>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <p className="field">{courseData.internalTitle}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <p className="field">{courseData.shortDescription}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Discounted Price</Label>
              <p className="field">{courseData.discountedPrice}</p>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Actual Price</Label>
              <p className="field">{courseData.actualPrice}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <FieldWrapper>
            <Label>Category</Label>
            <p className="field">{courseData.category}</p>
          </FieldWrapper>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subjects</Label>
              <p className="field">{courseData.subjects}</p>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Mock Tests</Label>
              <p className="field">{courseData.mockTests}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Description</Label>
              <p className="field">{courseData.description}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Thumbnail Image</Label>
            <img
              src={courseData.thumbnail}
              alt="Course Thumbnail"
              style={{ width: "200px", height: "auto", borderRadius: "8px" }}
            />
          </Column>

          <Column>
            <FieldWrapper style={{ flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Discount Active?</Label>
              <ToggleSwitch type="checkbox" checked={courseData.isDiscountActive} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
