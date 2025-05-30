import React, { useState } from 'react';
import styled from 'styled-components';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import { getCookiesData } from '../../utils/cookiesService';
import { createFeedApi } from '../../api/feedbackApi';
import { useNavigate, useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { updateViewCertificate } from '../../api/userProgressApi';

// Custom hook to get window size
const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    React.useEffect(() => {
        const handleResize = () =>
            setSize({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

const CourseCompletionPage = () => {
    const { width, height } = useWindowSize();
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const handleReviewSubmit = async ({ rating, title, review }) => {
        try {
            const cookieData = await getCookiesData();
            const userId = cookieData.userId;
            console.log("userId", params.courseId);
            await createFeedApi({
                rating,
                review,
                userRef: userId,
                courseRef: params.courseId,
                title,
            });

            console.log("Review submitted");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <>
            {/* Fullscreen Confetti */}
            <Confetti width={width} height={height} />

            <CompletionContainer>
                <CompletionCard>
                    <Header>Congratulations!</Header>
                    <Subheader>You've successfully completed the course.</Subheader>

                    <CertificateContainer>
                        <CertificateImage src="/certificate-placeholder.png" alt="Course Certificate" />
                        <br />
                        <DownloadButton>
                            <FaDownload /> Download Certificate
                        </DownloadButton>
                    </CertificateContainer>

                    <Divider />

                    <SectionTitle>Rate this Course</SectionTitle>

                    <ButtonGroup>
                        <PrimaryButton onClick={() => setIsFeedbackModalOpen(true)}>
                            Submit Rating
                        </PrimaryButton>
                        <SecondaryButton onClick={async () => {
                            const cookieData = await getCookiesData();
                            console.log("cookieData", cookieData);
                            const response = await updateViewCertificate(
                                cookieData.userId,
                                params.courseId
                            );
                            navigate('/user')
                        }}>
                            Browse Other Courses <FaArrowRight />
                        </SecondaryButton>
                    </ButtonGroup>
                </CompletionCard>

                <FeedbackModal
                    isOpen={isFeedbackModalOpen}
                    onClose={() => { setIsFeedbackModalOpen(false) }}
                    onSubmit={handleReviewSubmit}
                />
            </CompletionContainer>
        </>
    );
};

// Styled Components
const CompletionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding: 2rem;
`;

const CompletionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subheader = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const CertificateContainer = styled.div`
  margin: 2rem 0;
`;

const CertificateImage = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const DownloadButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #3e8e41;
    transform: translateY(-2px);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background-color: white;
  color: #3498db;
  border: 2px solid #3498db;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
  }
`;

export default CourseCompletionPage;
