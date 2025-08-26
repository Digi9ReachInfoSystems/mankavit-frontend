import styled from "styled-components";
import {
  FaClock,
  FaListOl,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";

export const Container = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: "Inter", "Segoe UI", sans-serif;
  color: #2d3748;
  background: #fff;
  border-radius: 16px;
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 1360px) {
    width: 85%;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
    margin: 1rem auto;
  }
`;

export const InstructionsContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #4299e1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #00c6ff, #0072ff);
    border-radius: 2px;
  }

  @media (max-width: 1360px) {
    font-size: 2.2rem;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

export const Instructions = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

export const List = styled.ol`
  margin-left: 1.5rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;

  @media (max-width: 480px) {
    margin-left: 1rem;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #edf2f7;
  border-radius: 8px;
`;

export const Checkbox = styled.input`
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ReadyBtn = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export const StartButton = styled.button`
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 114, 255, 0.2);
  width: 100%;
  max-width: 300px;

  &:hover {
    background: linear-gradient(90deg, #0072ff, #00c6ff);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 114, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

export const TestCard = styled.div`
  background-color: white;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(90deg, #f7fafc, #ebf4ff);
  border-bottom: 1px solid #e2e8f0;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
  }
`;

export const GradientBar = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  margin-top: 0.5rem;
  border-radius: 2px;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const TestDetails = styled.div`
  margin-bottom: 0;
`;

export const DetailGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #edf2f7;
    transform: translateY(-2px);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: #ebf4ff;
  border-radius: 50%;
  margin-right: 1rem;
  color: #4299e1;
  font-size: 1.2rem;
`;

export const DetailContent = styled.div`
  flex: 1;
`;

export const DetailTitle = styled.h4`
  margin: 0 0 0.3rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailValue = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
`;

export const TimeIcon = styled(FaClock)`
  color: #4299e1;
`;

export const QuestionIcon = styled(FaListOl)`
  color: #4299e1;
`;

export const TypeIcon = styled(FaQuestionCircle)`
  color: #4299e1;
`;

export const ImportantNote = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #fff5f5;
  border-radius: 8px;
  border-left: 4px solid #f56565;
`;

export const NoteIcon = styled(FaExclamationTriangle)`
  color: #f56565;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export const RulesSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #fffaf0;
  border-radius: 8px;
  border-left: 4px solid #ed8936;
`;

export const TipItem = styled.li`
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
  position: relative;

  &::before {
    content: "•";
    color: #4299e1;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

export const TipsSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0fff4;
  border-radius: 8px;
  border-left: 4px solid #48bb78;
`;
export const SubList = styled.ol`
  margin-left: 1.5rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
  list-style-type: lower-alpha;
  @media (max-width: 480px) {
    margin-left: 1rem;
  }
`;

export const IndicatorsSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #38bdf8;
`;

export const LegendContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0.4rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &.answered {
    background: #7bd37b;
    clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%);
  }
  &.not-answered {
    background: #f44336;
    clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%);
  }
  &.marked {
    background: #a855f7;
    border-radius: 50%;
  }
  &.unattempted {
    background: rgb(253, 253, 255);
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  &.answered-marked {
    background: #c084fc;
    border-radius: 50%;
    position: relative;

    &::after {
      content: "✓";
      position: absolute;
      color: green;
      font-size: 16px;
      font-weight: bold;
      bottom: -5px;
      right: -5px;
    }
  }
  &.not-answered-marked {
    background: #c084fc;
    border-radius: 50%;
  }

  @media (max-width: 1360px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

export const LegendLabel = styled.span`
  font-size: 1rem;
  color: #4a5568;
`;
