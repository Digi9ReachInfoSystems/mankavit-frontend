import React from 'react'
import Courses from '../../component/Courses/Courses'
import Certificates from '../../component/Certificates/Certificates';
import { MainContainer } from './UserDashboard.styles';

const UserDashboard = () => {
  return (
    <MainContainer>
         
   <Courses/>
   <Certificates/>
   </MainContainer>
  )
}

export default UserDashboard
