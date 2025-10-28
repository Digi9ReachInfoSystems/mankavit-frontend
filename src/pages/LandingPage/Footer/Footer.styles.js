import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #1f1f1f;
  color: ${(props) => props.theme.colors.lightwhite};
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 30px 40px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
    gap: 1rem;
  }

  .maincontainer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1400px;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
`;

export const LeftContainer = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

export const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.vividblue};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  a {
    color: ${(props) => props.theme.colors.lightwhite};
    text-decoration: none;

    &:hover {
      color: #ccc;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 14px;
  }
`;

export const Phone = styled.div`
  font-size: 16px;
  margin-top: 6px;

  a {
    color: ${(props) => props.theme.colors.lightwhite};
    text-decoration: none;

    &:hover {
      color: #ccc;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 16px;

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

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 15px;
  // margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
     margin-bottom: 100px;
  }
`;

export const Copyright = styled.div`
  color: ${(props) => props.theme.colors.lightgray};
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
    font-size: 14px;
  }
`;

export const AppDownloadSection = styled.div`
  text-align: center;
  margin-top: 10px;

  .store-buttons {
    display: flex;
    justify-content: center;
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

  @media (max-width: 768px) {
    .store-badge {
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    .store-badge {
      height: 35px;
    }
  }
`;
