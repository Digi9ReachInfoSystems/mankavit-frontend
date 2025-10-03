import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 80%;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;

  @media (max-width: 1320px) {
    max-width: 90%;
  }
`;

export const Heading = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Highlight = styled.span`
  color: #0056ba;
`;

export const Subheading = styled.h3`
  font-size: 22px;
  font-weight: 500;
  margin: 24px 0 12px;
`;

export const HighlightTitle = styled.h3`
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 16px;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  color: #333;
`;

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  // font-size: 1px;
`;

export const ListItem = styled.li`
  margin-bottom: 18px;
  font-size: 16px;
`;
