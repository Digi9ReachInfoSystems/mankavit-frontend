import React, { useEffect } from "react";
import Header from "../../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from "../../../pages/LandingPage/Footer/Footer";
import GotQuestion from "../GotQuestions/GotQuestions";
import { useLocation } from "react-router-dom";

const Faq = () => {

       const { pathname } = useLocation();

  useEffect(() => {
    document.getElementsByClassName('faqs')[0].scrollIntoView();
  
  }, [pathname]);
    return <>
   <div className="faqs">
     <Header />
    <GotQuestion />
    <Footer />
   </div>
    </>;
};

export default Faq;