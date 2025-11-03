import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #1f1f1f;
  color: ${(props) => props.theme.colors.lightwhite};
  padding: 40px 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    padding: 35px 60px 18px;
  }

  @media (max-width: 1024px) {
    padding: 30px 40px 15px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px 10px;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

/* --- Top and Middle Rows --- */
export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (min-width: 881px) {
    flex-direction: row;
  }

  @media (max-width: 880px) {
    // flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

export const MiddleRow = styled(TopRow)`
  align-items: flex-start;
`;

/* --- Bottom Row --- */
export const BottomRow = styled.div`
  width: 100%;
  max-width: 1400px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 15px;
`;

/* --- Footer Sections --- */
export const FooterSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 880px) {
    align-items: center;
    text-align: center;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.vividblue};
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

/* --- Contact --- */
export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  margin-bottom: 10px;

  a {
    color: ${(props) => props.theme.colors.lightwhite};
    text-decoration: none;

    &:hover {
      color: #ccc;
      text-decoration: underline;
    }
  }

  @media (max-width: 880px) {
    justify-content: center;
    font-size: 14px;
  }
`;

export const Phone = styled.div`
  font-size: 16px;

  a {
    color: ${(props) => props.theme.colors.lightwhite};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      color: #ccc;
      text-decoration: underline;
    }
  }

  @media (max-width: 880px) {
    font-size: 14px;

    a {
      justify-content: center;
    }
  }
`;

/* --- Lists --- */
export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 16px;
  margin: 0;

  li {
    margin-bottom: 8px;

    a {
      color: ${(props) => props.theme.colors.lightwhite};
      text-decoration: none;

      &:hover {
        color: #ccc;
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 880px) {
    font-size: 14px;
  }
    @media (max-width: 576px) {
    font-size: 12px;
  }
`;

/* --- Bottom Bar --- */
export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 14px;

  @media (max-width: 880px) {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
    margin-bottom:100px;
  }
`;

export const Copyright = styled.div`
  color: ${(props) => props.theme.colors.lightgray};
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: ${(props) => props.theme.colors.lightgray};
    text-decoration: none;

    &:hover {
      color: #ccc;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 13px;
  }
`;

/* --- App Download Section --- */
export const AppDownloadSection = styled.div`
  flex: 1;
  min-width: 280px;
  text-align: left;

  .store-buttons {
    display: flex;
    gap: 12px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .store-badge {
    height: 45px;
    transition: transform 0.2s ease;
  }

  .store-badge:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    .store-badge {
      height: 40px;
    }
  }

  @media (max-width: 880px) {
    text-align: center;

    .store-buttons {
      justify-content: center;
    }

    .store-badge {
      height: 38px;
    }
  }

  @media (max-width: 480px) {
    .store-badge {
      height: 34px;
    }
  }
`;
