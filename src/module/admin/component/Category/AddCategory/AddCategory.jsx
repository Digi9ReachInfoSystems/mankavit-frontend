import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import {
  Container,
  Title,
  FieldWrapper,
  Label,
  Input,
  Column,
  FormRow,
  SubmitButton,
  FormWrapper
} from "./AddCategory.styles";

import { createCategory } from "../../../../../api/categoryApi";// Adjust path if needed

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!categoryTitle.trim()) {
      notification.warning({
        message: "Validation Error",
        description: "Category title is required",
      });
      return;
    }
  
    try {
      console.log("Sending data:", { title: categoryTitle }); // 👈 Log data
      const response = await createCategory({ title: categoryTitle });
      console.log("Response:", response); // 👈 Log response
  
      notification.success({
        message: "Category Added",
        description: "The category was successfully created.",
      });
  
      setCategoryTitle("");
      navigate("/admin/category-management");
    } catch (error) {
      console.error("Error creating category:", error); // 👈 Full error log
      notification.error({
        message: "Failed to Add Category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Container>
      <Title>Add Category</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <Column>
          <FieldWrapper>
            <Label htmlFor="categoryTitle">Category Title</Label>
            <Input
              id="categoryTitle"
              value={categoryTitle}
              // onChange={(e) => setCategoryTitle(e.target.value)}
              onChange={(e)=>{
                const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setCategoryTitle(filteredData);
              }}
              placeholder="Enter category title"
              rules={[
                {
                  required: true,
                  message: "Category title is required",
                },
              ]}
            />
          </FieldWrapper>
        </Column>
        <FormRow>
          <SubmitButton type="submit">Add Category</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
};

export default AddCategory;
