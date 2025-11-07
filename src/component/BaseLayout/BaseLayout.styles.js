import styled from "styled-components";
import theme from "../../theme/Theme";
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100dvh; /* ✅ Use new dynamic viewport height unit */
  width: 100%;
  overflow: hidden; /* prevent double scroll */
`;

export const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.backgrounGrey};
  margin-left: 200px;
  max-width: calc(100% - 200px);
  overflow: hidden; /* ✅ Contain scroll inside inner divs, not here */

  @media (max-width: 990px) {
    margin-left: 160px;
    max-width: calc(100% - 160px);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
  }

  /* ✅ create a scrollable inner section safely */
  & > *:last-child {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    // padding: 10px 20px calc(20px + env(safe-area-inset-bottom));
    box-sizing: border-box;
  }
`;
