import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 75%;

  @media (max-width: 1360px) {
    width: 70%;
  }

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin-left: 10px;
  }
  `;

export const Title = styled.h2`
  margin: 0px;
  font-size: 32px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.jetBlack};

  @media (max-width: 1360px) {
    font-size: 32px;
  }

  @media (max-width: 1024px) {
    font-size: 26px;
    margin: 0;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin: 10px 0;
  }
`;

export const NotificationContainer = styled.div`
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    padding: 5px 0;
  }
`;

export const NotificationBox = styled.div`
  position: relative;
  background: #fff;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  margin-bottom: 8px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const NotificationText = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.pureblack};

  p {
    margin: 5px 0 0;
    font-weight: 400;
  }

  strong {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  @media (max-width: 1360px) {
    font-size: 18px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Time = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.timeGray};
  white-space: nowrap;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

// export const NotificationBox = styled.div`
//   position: relative;
//   background: #fff;
//   padding: 12px;
//   border-radius: 6px;
//   box-shadow: 0 1px 4px rgba(0,0,0,0.1);
//   margin-bottom: 8px;
// `;
// export const NotificationText = styled.div`…`;
// export const Time = styled.div`…`;

// New clear button
export const ClearButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  border: none;
  background: transparent;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
`;