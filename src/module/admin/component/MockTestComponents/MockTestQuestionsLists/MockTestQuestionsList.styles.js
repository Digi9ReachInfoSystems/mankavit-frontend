import styled from 'styled-components';

export const MockTestQuestionsListContainer = styled.div`
  padding: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const PageContainer = styled.div`
  background-color: #f8f9fa;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid #dee2e6;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const QuestionContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionNumber = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const QuestionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

export const PageFooter = styled.div`
  text-align: right;
  margin-top: 0.75rem;
`;

export const CreateButton = styled.button`
  background-color: #212529;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #343a40;
  }
`;

export const PageControl = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const QuestionTextDisplay = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 5px;
  word-break: break-word;
`;