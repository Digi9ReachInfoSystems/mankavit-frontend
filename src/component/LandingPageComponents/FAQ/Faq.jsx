import React, { useEffect } from "react";
import Header from "../../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from "../../../pages/LandingPage/Footer/Footer";
import GotQuestion from "../GotQuestions/GotQuestions";
import { useLocation } from "react-router-dom";
import SectionWrapper from "../SectionWrapper";

const Faq = () => {

       const { pathname } = useLocation();

  useEffect(() => {
    document.getElementsByClassName('faqs')[0].scrollIntoView();
  
  }, [pathname]);
    return <>
   <div className="faqs">
     <Header />
   <SectionWrapper>
     <GotQuestion />
     </SectionWrapper>
    <Footer />
   </div>
    </>;
};

export default Faq;