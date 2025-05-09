import react from 'react'
import Header from '../LandingPage/LandingHeader/LandingHeader';
import Footer from '../LandingPage/Footer/Footer';
import EntranceCourses from '../../component/WhyExtranceCoursesComponents/ExtranceCourses/EntranceCourses';
import WantToLearn from '../../component/LandingPageComponents/WantToLearn/WantToLearn';

const WhyEntranceCourses = () => {
    return (
        <>
        <Header />
        <EntranceCourses />
        <WantToLearn />
        <Footer />
        </>
    )
}

export default WhyEntranceCourses;