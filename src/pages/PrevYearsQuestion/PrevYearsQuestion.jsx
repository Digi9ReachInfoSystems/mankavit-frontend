import React, { useState, useEffect } from "react";
import Header from "../LandingPage/LandingHeader/LandingHeader";
import Footer from "../LandingPage/Footer/Footer";
import PrevQuestionPaper from "../../component/PrevYearsQuestionComponents/PrevQuestionPaper/PrevQuestionPaper";
import ModalForm from "../../component/ModalForm/ModalForm";


const PrevYearsQuestion = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isDownload = localStorage.getItem('isDownload');
    if (!isDownload || isDownload === 'false') {
      setShowModal(true);
    }
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
