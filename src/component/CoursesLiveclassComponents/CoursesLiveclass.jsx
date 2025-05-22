import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    VideoContainer,
    StyledVideo,
    OverlayText,
    Tag,
    PhoneNumber,
    VideoPlayer,
    BottomTitle,
    TopBar,
    ButtonGroup,
    ActionButton,
    TabContentWrapper,
    ContentText
} from './CoursesLiveclass.styles';
import { FaUser } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';

const CoursesLiveclass = () => {
    const tabContentRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Overview');

    const notesContent = [
        {
            title: "English Grammar Basics",
            description: "Detailed notes on English grammar fundamentals.",
            pdfUrl: "/pdfs/english-grammar-basics.pdf"
        },
        {
            title: "Vocabulary Building",
            description: "A guide to improving vocabulary for CLAT.",
            pdfUrl: "/pdfs/vocabulary-building.pdf"
        },
        {
            title: "Reading Comprehension Strategies",
            description: "Effective techniques for tackling reading passages.",
            pdfUrl: "/pdfs/reading-comprehension.pdf"
        },
        {
            title: "Mock Test - English Section",
            description: "Sample mock test with solutions.",
            pdfUrl: "/pdfs/mock-test-english.pdf"
        }
    ];


    useEffect(() => {
        // Only update on hashchange, not on first render
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            setActiveTab(hash || 'Overview');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Set default tab only once on mount
    useEffect(() => {
        if (!window.location.hash) {
            setActiveTab('Overview');
        } else {
            setActiveTab(window.location.hash.replace('#', ''));
        }
    }, []);


    useEffect(() => {
        if (tabContentRef.current) {
            tabContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeTab]);

    const renderTabContent = () => {
        if (activeTab === 'Notes') {
            return notesContent.map((note, i) => (
                <ContentText key={i}>
                    <div className="note-header">
                        <span className="pdf-title">{note.title}</span>
                        <a
                            href={note.pdfUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-link"
                        >
                            <FaDownload style={{display: 'flex',alignItems:'center', justifyContent: 'center'}} />
                        </a>
                    </div>
                    <p>{note.description}</p>
                </ContentText>

            ));
        }

        if (activeTab === 'Overview') {
            return <ContentText>This is the Overview tab content.</ContentText>;
        }

        return <ContentText>Tab not found.</ContentText>;
    };


    return (
        <Container>
            <VideoContainer>
                <StyledVideo>
                    <VideoPlayer controls poster="">
                        {/* <source src="sample-video.mp4" type="video/mp4" /> */}
                        Your browser does not support the video tag.
                    </VideoPlayer>

                    <TopBar>
                        <OverlayText>
                            <h4>Introduction To CLAT English</h4>
                            <Tag>📊 Topic</Tag>
                        </OverlayText>

                        <PhoneNumber>
                            <FaUser style={{ marginRight: '8px' }} />
                            9876543210
                        </PhoneNumber>
                    </TopBar>

                    <BottomTitle>Live : Clat Preparation</BottomTitle>
                </StyledVideo>
            </VideoContainer>

            <TabContentWrapper ref={tabContentRef}>

               <ButtonGroup>
         <ActionButton active={activeTab === 'Overview'} onClick={() => setActiveTab('overview')}>
          Overview
        </ActionButton>
        <ActionButton active={activeTab === 'Notes'} onClick={() => setActiveTab('Notes')}>
          Notes
        </ActionButton>
      </ButtonGroup>

                


                {renderTabContent()}
            </TabContentWrapper>
        </Container>
    );
};

export default CoursesLiveclass;