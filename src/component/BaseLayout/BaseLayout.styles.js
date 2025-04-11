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
`;