import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
`;

export const ResultsContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0 0 10px 0;
`;

export const RankBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #4caf50;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
`;

export const AttemptInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background:rgb(241, 244, 248);
  border-radius: 8px;
  width: 100%;  // Ensure it takes full width
`;

export const QuestionsContainer = styled.div`
  width: 100%;  // Ensure it takes full width
  margin-top: 0;
`;

export const SummaryItem = styled.div`
  display: flex;
  // justify-content: space-between;
`;

export const SummaryLabel = styled.span`
  font-weight: 500;
  color: #555;
  width: 50%;
`;

export const SummaryValue = styled.span`
  font-weight: 600;
  color: #333;
`;

// export const QuestionsContainer = styled.div`
//   flex: 1;
//   margin-top: 0;
// `;

export const QuestionItem = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

export const QuestionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #333;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #f5f5f5;
`;

export const OptionBullet = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color: ${({ status }) => {
    switch(status) {
      case 'correct-attempted': return '#4caf50';
      case 'incorrect-attempted': return '#f44336';
      case 'correct-unattempted': return '#2196f3';
      default: return '#9e9e9e';
    }
  }};
`;

export const OptionText = styled.span`
  flex: 1;
  color: ${({ status }) => {
    switch(status) {
      case 'correct-attempted': return '#4caf50';
      case 'incorrect-attempted': return '#f44336';
      case 'correct-unattempted': return '#2196f3';
      default: return '#333';
    }
  }};
`;

export const AnswerStatus = styled.span`
  margin-left: 10px;
  padding: 2px 6px;
  background: #4caf50;
  color: white;
  border-radius: 4px;
  font-size: 12px;
`;

export const QuestionNavButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
`;

export const NavButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background: ${props => props.disabled ? '#f5f5f5' : '#2196f3'};
  color: ${props => props.disabled ? '#9e9e9e' : 'white'};
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.disabled ? '#f5f5f5' : '#0d8bf2'};
  }
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
`;

export const RetakeButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f57c00;
  }
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #e0e0e0;
  }
`;