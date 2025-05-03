import React from 'react'
import UserCourses from '../../component/UserCourses/UserCourses'
import UpComing from '../../component/UpComing/UpComing'
import { MainContainer } from './MyCourses.styles'

const MyCourses = () => {
  return (
    <MainContainer>
      <UserCourses/>
      <UpComing/>
    </MainContainer>
  )
}

export default MyCourses
