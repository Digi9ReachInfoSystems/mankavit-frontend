import styled from "styled-components";
import theme from "../../theme/Theme";
export const PageWrapper = styled.div`
  display: flex;

  min-height: 100vh;
 width: 100%;
`;

export const ContentWrapper = styled.main`
  flex: 1;
  padding: 10px 20px;
  margin-left: 200px; /* default sidebar width */
  width: calc(100% - 200px);
  min-height: 100vh;

  /* Respect device safe area on iOS (home indicator) */
  padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 20px);

  @media (max-width: 990px) {
    margin-left: 160px;
    width: calc(100% - 160px);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 12px;
    /* On small screens make sure the safe area is honoured */
    padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 80px);
  }
`;
