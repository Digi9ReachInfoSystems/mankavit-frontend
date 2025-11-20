import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  UploadBox,
  UploadContent,
  UploadIcon,
  UploadText,
  FormItem,
  Field
} from "./ViewQuestionPaper.styles";
import { getQuestionPaperById } from "../../../../../../api/questionPaperApi";
import { useParams } from "react-router-dom";

const ViewQuestionPaper = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const data = await getQuestionPaperById(id);
        setQuestionData(data);
      } catch (error) {
        console.error("Error fetching question paper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPaper();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <p>Loading question paper...</p>
      </Container>
    );
  }

  if (!questionData) {
    return (
      <Container>
        <p>No data found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>View Question Paper</h2>
      <Form>
        <FormItem>
          <FormGroup>
            <Label>Title</Label>
            <Field>{questionData.title || "—"}</Field>
          </FormGroup>

          <FormGroup>
            <Label>Year</Label>
            <Field>{questionData.year || "—"}</Field>
          </FormGroup>
        </FormItem>

        <FormGroup>
          <Label>Description</Label>
          <Field>{questionData.description || "—"}</Field>
        </FormGroup>

        <FormGroup>
  <Label>Uploaded PDF</Label>
  <UploadBox>
    <UploadContent>
      {questionData.question_url &&
      questionData.question_url.toLowerCase().endsWith(".pdf") ? (
        <a
          href={questionData.question_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007bff", textDecoration: "underline", textAlign: "center" }}
        >
          View PDF
        </a>
      ) : (
        <UploadIcon>
          <img
            src={questionData.question_url}
            alt="Uploaded file preview"
            style={{ width: "100%", height: "200px" }}
          />
        </UploadIcon>
      )}
    </UploadContent>
  </UploadBox>
</FormGroup>
      </Form>
    </Container>
  );
};

export default ViewQuestionPaper;
