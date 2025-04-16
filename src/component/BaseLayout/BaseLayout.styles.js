import styled from "styled-components";
import theme from "../../theme/Theme";
export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* This should match your sidebar width */
  max-width: calc(100% - 250px); /* Adjust based on sidebar width */
  background-color: ${theme.colors.backgrounGrey};

  @media (max-width: 990px) {
  margin-left: 200px;
  max-width: calc(100% - 240px); /* Adjust based on sidebar width */
  }

  @media (max-width: 768px) {
    margin-left: 0; /* Remove margin on smaller screens */
    max-width: 100%; /* Adjust width for smaller screens */
    padding: 0px; /* Adjust padding for smaller screens */
  }
`;