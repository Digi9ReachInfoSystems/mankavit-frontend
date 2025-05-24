import React from 'react'
import Header from '../LandingPage/LandingHeader/LandingHeader'
import Footer from '../LandingPage/Footer/Footer'
import Blogcards from '../../component/UserBlogComponents/Blogcards/Blogcards'

const UserBlog = () => {
  return (
    <div>
      <Header/>
      <Blogcards/>
      <Footer/>
    </div>
  )
}

export default UserBlog
