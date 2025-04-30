import React from 'react'
import UserCourses from '../../component/UserCourses/UserCourses'
import UpComing from '../../component/UpComing/UpComing'

const MyCourses = () => {
  return (
    <div style={{ width: "100%"}}>
      <UserCourses/>
      <UpComing/>
    </div>
  )
}

export default MyCourses
