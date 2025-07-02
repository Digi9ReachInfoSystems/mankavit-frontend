import React, { useEffect, useRef, useState } from 'react';
import {
    AchieversSection,
    Title,
    Highlight,
    Description,
    CardSlider,
    Card,
    Avatar,
    Name,
    Achievement,
    ProgressBarWrapper,
    ProgressBar,
    Filterbar,
    FilterButton
} from './MeetAchievers.styles';
import achieverImage from '../../../assets/achievers.jpg';

// const achieversData = [
//     { name: 'John Doe', image: achieverImage, rank: 1, exam_name: 'CLAT' },
//     { name: 'Jane Smith', image: achieverImage, rank: 2, exam_name: 'EXAM 2' },
//     { name: 'Michael Johnson', image: achieverImage, rank: 3, exam_name: 'CLAT' },
//     { name: 'Emily Davis', image: achieverImage, rank: 4, exam_name: 'Exam2' },
//     { name: 'David Wilson', image: achieverImage, rank: 5, exam_name: 'CLAT' },
//     { name: 'Olivia Brown', image: achieverImage, rank: 6, exam_name: 'CLAT' },
// ];
import { getAllAchievers } from '../../../api/achieverApi';
const TABS = ['All', 'CLAT', 'LAW'];

const MeetAchievers = () => {
    const [activeTab, setActiveTab] = useState('All');
    const sliderRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [ achieversData, setAchieversData ] = useState([]);

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const achieversData = await getAllAchievers();
                setAchieversData(achieversData);
            } catch (error) {
                console.error('Error fetching achievers:', error);
            }
        };

        fetchAchievers();
    }, []);

    const handleScroll = (e) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.target;
        const maxScrollLeft = scrollWidth - clientWidth;
        const scrolled = (scrollLeft / maxScrollLeft) * 100;
        setScrollProgress(scrolled || 0);
    };

    const filteredAchievers = achieversData.filter((achiever) => {
        if (activeTab === 'All') return true;
        return achiever.exam_name === activeTab;
    });

    return (
        <AchieversSection>
            <Title>
                Meet Our <Highlight>Achievers</Highlight>
            </Title>
            <Description>
                At Mankavit Law Academy, our students' success stories are a testament to their hard work and dedication.
                Join us and start your journey toward achieving your law career goals today!
            </Description>

            {/* <Filterbar>
                {TABS.map((tab, index) => (
                    <FilterButton
                        key={index}
                        active={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </FilterButton>
                ))}
            </Filterbar> */}
            <Filterbar>
                
            </Filterbar>

            <CardSlider ref={sliderRef} onScroll={handleScroll}>
                {filteredAchievers.length > 0 ? (
                    filteredAchievers.map((achiever, index) => (
                        <Card key={index}>
                            <Avatar src={achiever.image} alt={achiever.name} />
                            <Name>{achiever.name}</Name>
                            <Achievement>{achiever.exam_name}, AIR {achiever.rank}</Achievement>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <Name>No Achievers Found</Name>
                    </Card>
                )}
            </CardSlider>

            <ProgressBarWrapper>
                <ProgressBar width={scrollProgress} />
            </ProgressBarWrapper>
        </AchieversSection>
    );
};

export default MeetAchievers;
