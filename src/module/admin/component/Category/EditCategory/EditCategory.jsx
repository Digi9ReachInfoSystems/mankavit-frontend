import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
} from "../AddCategory/AddCategory.styles";

import { createCategory, getCategoryById, updateCategory } from "../../../../../api/categoryApi"; // Adjust path if needed
import { getAuth } from "../../../../../utils/authService";

const EditCategory = () => {
  const navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");
  const location = useLocation();
  const params = useParams();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        // // console.log("location.state.categoryId", location, params);
        const response = await getCategoryById(params.id);
        // // console.log("Response:", response);
        setCategoryTitle(response.data.title);
      } catch (error) {
        // console.error("Error creating category:", error); // 👈 Full error log
      }
    }
    apiCaller();
  }, [location]);

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
      // console.log("Sending data:", { title: categoryTitle }); // 👈 Log data
      const response = await updateCategory(params.id, { title: categoryTitle });
      // console.log("Response:", response); // 👈 Log response

      notification.success({
        message: "Category Updated",
        description: "The category was updated successfully created.",
      });

      setCategoryTitle("");
      navigate("/admin/category-management");
    } catch (error) {
      // console.error("Error creating category:", error); // 👈 Full error log
      notification.error({
        message: "Failed to Add Category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Container>
      <Title>Edit Category</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <Column>
          <FieldWrapper>
            <Label htmlFor="categoryTitle">Category Title</Label>
            <Input
              id="categoryTitle"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              placeholder="Enter category title"
            />
          </FieldWrapper>
        </Column>
        {
          !readOnlyPermissions && (
            <FormRow>
              <SubmitButton type="submit">Update Category</SubmitButton>
            </FormRow>
          )
        }

      </FormWrapper>
    </Container>
  );
};

export default EditCategory;
