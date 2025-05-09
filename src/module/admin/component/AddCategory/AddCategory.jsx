import react from "react";

import { Container, Title, FieldWrapper, Label, Input,Column, FormRow, SubmitButton,   FormWrapper } from "./AddCategory.styles";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Addcategory = () => {
    const navigate = useNavigate();
    const [categoryTitle, setcategoryTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your form submission logic here
        console.log("category Title:", categoryTitle);
        // Reset the form or navigate to another page if needed
        setcategoryTitle("");
        navigate("/admin/category-management");
    }   


  return (
    <>
      <Container>
        <Title>Add category</Title>
        <FormWrapper onSubmit={handleSubmit}>
          <Column>
            <FieldWrapper>
              <Label htmlFor="categoryTitle">category Title</Label>
              <Input
                id="categoryTitle"
                value={categoryTitle}
                onChange={(e) => setcategoryTitle(e.target.value)}
                placeholder="Enter category Title"
              />
            </FieldWrapper>
          </Column>

          <FormRow>
            <SubmitButton type="submit">Add category</SubmitButton>
          </FormRow>
        </FormWrapper>
      </Container>
    </>
  );
};

export default Addcategory;
