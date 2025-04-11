import styled from "styled-components";
import theme from "../../theme/Theme";
export const HeaderContainer = styled.header`
  position: fixed;
//   top: 0;
  left: 250px; 
  width: calc(100% - 370px);
  height: 60px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.secondary};
  padding: 16px 24px;
  border-radius: 10px;
  margin-left: 60px;
  border-bottom: 1px solid #e0e0e0;
  z-index: 998; /* Just behind the sidebar's 999 if it overlaps */
`;

export const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  border-radius: 10px;

`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border:none;
  border-radius: 8px;
  font-size: 14px;
background-color: ${theme.colors.backgrounGrey};

`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserDetails = styled.div`
  text-align: left;
//   margin-right: 8px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
`;

export const UserName = styled.div`
//   background-color: #2290ac;
  color: ${theme.colors.black};
  border-radius: 50px;
  padding: 6px 12px;
  font-weight: 550;
  font-size: 16px;
  white-space: nowrap;

`;

export const UserEmail = styled.div`
  font-size: 14px;
  color: ${theme.colors.test};
  margin-top: 4px;
`;