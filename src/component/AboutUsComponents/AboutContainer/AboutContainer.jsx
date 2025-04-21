import React from 'react'
import { AboutmainContainer, AboutTitle, AboutContent, ContentOne, ContentTwo } from './AboutContainer.styles'

const aboutTexts = [
  {
    id: 1,
    component: ContentOne,
    text: `Welcome to Mankavit Law Academy, a leading institute dedicated to providing expert coaching and guidance for aspiring law students. Established with the vision to empower students and help them succeed in competitive law exams, we specialize in preparing candidates for CLAT, AILET, DU LL.M, and ILICAT.`
  },
  {
    id: 2,
    component: ContentTwo,
    text: `At Mankavit, we believe in fostering a deep understanding of legal concepts through personalized coaching, expert faculty, and comprehensive resources. Our teaching methodology focuses on clarity, engagement, and practical learning to ensure every student is fully prepared to excel in their exams.`
  }
]

const AboutContainer = () => {
  return (
    <AboutmainContainer>
      <AboutTitle>About Us</AboutTitle>
      <AboutContent>
        {aboutTexts.map((item) => {
          const Component = item.component
          return <Component key={item.id}>{item.text}</Component>
        })}
      </AboutContent>
    </AboutmainContainer>
  )
}

export default AboutContainer
