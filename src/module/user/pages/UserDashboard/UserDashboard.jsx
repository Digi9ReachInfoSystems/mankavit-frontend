import React from 'react'
import Courses from '../../component/Courses/Courses'
import Certificates from '../../component/Certificates/Certificates';
import { MainContainer } from './UserDashboard.styles';
import UpComing from '../../component/UpComing/UpComing';

const UserDashboard = () => {
  return (
    <MainContainer>
         
   <Courses/>
   <UpComing/>
   <Certificates/>
   </MainContainer>
  )
}

export default UserDashboard
