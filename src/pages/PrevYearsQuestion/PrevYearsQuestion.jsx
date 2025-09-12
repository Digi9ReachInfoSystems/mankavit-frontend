import React, { useState, useEffect } from "react";
import Header from "../LandingPage/LandingHeader/LandingHeader";
import Footer from "../LandingPage/Footer/Footer";
import PrevQuestionPaper from "../../component/PrevYearsQuestionComponents/PrevQuestionPaper/PrevQuestionPaper";
import ModalForm from "../../component/ModalForm/ModalForm";
import { getCookiesData } from "../../utils/cookiesService";


const PrevYearsQuestion = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const cookiesData = await getCookiesData();
        if (!cookiesData.userId) {
          const isDownload = localStorage.getItem('isDownload');
          if (!isDownload || isDownload === 'false') {
            setShowModal(true);
          }
          return;
        } else {
          const userData = await getUserByUserId(cookiesData.userId);
          if (!userData.user) {
            const isDownload = localStorage.getItem('isDownload');
            if (!isDownload || isDownload === 'false') {
              setShowModal(true);
            }
            return;
          }
         
        }

      } catch (err) {
        console.log(err);
      }
    };
    apiCaller();

  }, []);

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      {showModal && <ModalForm onSubmit={handleModalSubmit} />}
      <PrevQuestionPaper />
      <Footer />
    </>
  );
};

export default PrevYearsQuestion;
