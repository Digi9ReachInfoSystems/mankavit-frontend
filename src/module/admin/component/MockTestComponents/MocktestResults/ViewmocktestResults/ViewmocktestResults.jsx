import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Label,
  ReadOnlyText,
  ImageWrapper      
} from './ViewmocktestResults.styles';

export default function ViewMockTestResult() {
  const { state: result } = useLocation();  
  const navigate = useNavigate();

  if (!result) {
    return (
      <Container>
        <p>No data passed. <button onClick={() => navigate(-1)}>Go back</button></p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>View Mock Test Result</Title>

      <Label>Test Name</Label>
      <ReadOnlyText>{result.testName}</ReadOnlyText>

      <Label>Student Name</Label>
      <ReadOnlyText>{result.studentName}</ReadOnlyText>

      <Label>Email</Label>
      <ReadOnlyText>{result.email}</ReadOnlyText>

      <Label>Marks</Label>
      <ReadOnlyText>{result.marks}</ReadOnlyText>

      <Label>Time to Complete</Label>
      <ReadOnlyText>{result.timeToComplete}</ReadOnlyText>

      <Label>Submission Date</Label>
      <ReadOnlyText>{result.submissionDate}</ReadOnlyText>

    </Container>
  );
}
