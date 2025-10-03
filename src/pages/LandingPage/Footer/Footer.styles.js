import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #1f1f1f;
  padding: 20px 50px 20px 10px;
  display: flex;
  flex-wrap: wrap;
//   justify-content: space-between;
  flex-direction: row;

  @media (max-width: 1360px) {
    padding: 20px 40px 20px 10px;
  }

  @media (max-width: 768px) {
    padding: 10px 25px 10px 5px;
  }

  @media (max-width: 540px) {
    padding: 5px 15px 5px 5px;
  }

  @media (max-width: 480px) {
    padding: 5px 15px 5px 5px;
    // width: 100%;
  }

 
  .maincontainer{
    display: flex;
    margin-left: 8rem;
    width: 100%;

    @media (max-width: 1360px) {
      margin-left: 5rem;
    }

    @media (max-width: 768px) {
      margin-left: 4rem;
    }

    @media (max-width: 540px) {
      margin-left: 2rem;
    }

    @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    margin-left: 0px;
    // padding: 0 20px;
    // justify-content: center;
    }
  }
  `;

export const LeftContainer = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    
  }

  @media (max-width: 480px) {
    // width: 100%;
    // margin-left: 40px;
    // flex-direction: column;
    // text-align: center;
  }
  `;

export const RightContainer = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    // margin-left: 40px;
    // width: 100%;
    // flex-direction: column;
    // text-align: center;
  }
  `;

export const FooterSection = styled.div`
  flex: 1 1 200px;
  margin: 10px;
  // min-width: 220px;
  padding: 10px;
  line-height: 1.8;
 

  @media (max-width: 1360px) {
    margin: 8px;
    padding: 8px;
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    margin: 7px;
    padding: 7px;
    line-height: 1.5;
    min-width: 220px;

  }
  @media (max-width: 768px) {
    margin: 5px;
    padding: 5px;
    line-height: 1.4;
    min-width: 180px;
  }

  @media (max-width: 540px) {
    margin: 3px;
    padding: 3px;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    margin: 2px;
    padding: 2px;
    line-height: 1.2;
    margin-left: 20px;
    // text-align: center;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.vividblue};
  margin-bottom: 15px;
  font-family: ${props => props.theme.fonts.body2};

  @media (max-width: 1360px) {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: 400;
  }

  @media (max-width: 540px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 20px;
  font-weight: 300;
  color: ${props => props.theme.colors.lightwhite};
  margin-bottom: 10px;
  width: 100%;
  line-height: 1;          /* keep tight so it doesn’t wrap weirdly */

  .icon {
    flex: 0 0 auto;
    font-size: 1.2em;      /* scale with text */
  }

  a {
    color: ${props => props.theme.colors.lightwhite};
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis; /* if email is long */
    white-space: nowrap;     /* keep in one line */
  }

  a:hover {
    text-decoration: underline;
    color: #ccc;
  }

  @media (max-width: 1360px) { font-size: 16px; }
  @media (max-width: 768px)  { font-size: 12px; }
  @media (max-width: 540px)  { font-size: 11px; width: 100%; white-space: normal; }
  @media (max-width: 480px)  { font-size: 12px; }
`;


export const Phone = styled.div`
  font-size: 20px;
  margin-top: 5px;
  display: flex;
  align-items: center;

  .phoneicon {
  font-size: 22px;

@media (max-width: 768px) {
  font-size: 14px;
}

@media (max-width: 540px) {
  font-size: 12px;
}

@media (max-width: 480px) {
  font-size: 12px;
}
  }

  a {
  color: ${props => props.theme.colors.lightwhite};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #ccc;
    }
  }


  @media (max-width: 1360px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 540px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    // justify-content: center;
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 20px;
  font-weight: 300;
  color: ${props => props.theme.colors.lightwhite};

  li {
    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
      color: #ccc;
      text-decoration: underline;
    }
  }

  @media (max-width: 1360px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Maildescription = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${props => props.theme.colors.lightwhite};
  margin-bottom: 10px;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 100;
  }

  @media (max-width: 540px) {
    font-size: 11px;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    // width: 70%;
  }
`;

export const NewsletterInput = styled.input`
  padding: 15px;
  width: 90%;
  border-radius: 48px;
  border: ${props => props.theme.colors.lightgray} 1px solid;
  margin-bottom: 15px;
  background: transparent;
  color: ${props => props.theme.colors.lightgray};
  font-size: 18px;

  &::placeholder {
    color: #bbb;
    // padding: 10px;
  }

  @media (max-width: 1360px) {
    font-size: 16px;
    padding: 8px 10px;
    width: 80%;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }

  @media (max-width: 540px) {
    font-size: 10px;
    padding: 4px 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    width: 100%;
    box-sizing: border-box;
    padding: 4px 8px;
  }
`;

export const SubscribeButton = styled.button`
  padding: 16px 22px;
  border-radius: 40px;
  background-color: transparent;
  border: ${props => props.theme.colors.brightblue} 1px solid;
  color: ${(props) => props.theme.colors.brightblue};
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.colors.brightblue};
    color: ${props => props.theme.colors.lightwhite};
  }

  @media (max-width: 1360px) {
    font-size: 16px;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }

  @media (max-width: 540px) {
    font-size: 10px;
    padding: 4px 6px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    // margin-left: 10px;
  }

  .rightarrow{
  font-size: 22px;
//   margin-top: 5px;

@media (max-width: 1360px) {
    font-size: 16px;
  }

@media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 540px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.lightgray};

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 540px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

export const BottomLinks = styled.div`
  display: flex;
  gap: 35px;
  margin-right: 6rem;

  span {
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 1360px) {
    gap: 25px;
    margin-right: 4rem;
  }

  @media (max-width: 768px) {
    gap: 15px;
    margin-right: 1rem;
  }

  @media (max-width: 540px) {
    gap: 10px;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    gap: 5px;
    margin-right: 0;
  }
`;

export const Copyright = styled.div`
  margin-bottom: 10px;
`;
