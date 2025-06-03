
 import React, { useState, useEffect } from "react";
 import {
   HeaderContainer,
 Title,
   UserInfoWrapper,
   UserDetails,
   UserName,
   UserEmail
 } from "./Header.styles";
 import { getUserDetails } from "../../api/authApi";
 import { getCookiesData } from "../../utils/cookiesService";
 
 const Header = () => {
   const [user, setUser] = useState({ displayName: "", email: "" });
 
   useEffect(() => {
     const fetchUser = async () => {
       const { userId } = getCookiesData();
       if (userId) {
         try {
          const response = await getUserDetails(userId);
          const { user: userData } = response; // response = { success, message, user }
          setUser({
            displayName: userData.displayName,
            email: userData.email
          });
         } catch (err) {
           console.error(err);
         }
       }
     };
     fetchUser();
   }, []);
 
   return (
     <HeaderContainer>
      <Title>Dashboard</Title>
       <UserInfoWrapper>
         <UserDetails>
           <UserName>{user.displayName}</UserName>
           <UserEmail>{user.email}</UserEmail>
         </UserDetails>
       </UserInfoWrapper>
     </HeaderContainer>
   );
 };
 
 export default Header;
