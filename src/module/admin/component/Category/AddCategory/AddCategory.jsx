import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!categoryTitle.trim()) {
      toast.warning("Category title is required");
      return;
    }
  
    try {
      console.log("Sending data:", { title: categoryTitle }); // 👈 Log data
      const response = await createCategory({ title: categoryTitle });
      console.log("Response:", response); // 👈 Log response
  
      toast.success("Category Added");
      toast.success("The category was successfully created.");
      setTimeout(() => navigate("/admin/category-management"), 1000);
    } catch (err) {
      console.error(err)
           if (err.status == 400 && err.response?.data?.message === "Category with this title already exists") {
             toast.error("Category with this title already exists")
           } else {
             toast.error("Failed to create Category.Please try again");
           }
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
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Container>
  );
};

export default AddCategory;
