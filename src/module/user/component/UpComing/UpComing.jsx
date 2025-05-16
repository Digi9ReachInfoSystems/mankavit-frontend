import React from 'react'
import {
    MainContainer,
    SectionTitle,
    ListSection,
    ListCard,
    ListTime,
    Testdate,
    Testmonth,
    Testtime,
    ListContent,
    Testtitle,
    Testsubtitle,
    Testpara,
    Testattempt,
    Testdetails,
    // Testduration,
    // Testquestions,
    // Testmarks,
    ClassCard,
    Classtime,
    LiveBadge,
    ViewAllLink
} from './Upcoming.styles';

const upcomingTests = [
    { date: "13", month: "March", time: "11:00 AM", title: "Mankavit Mock Test — ", subtitle: "CLAT 2025", type: "Practice Test", attempt: "Attempted - 1", duration: "120 min", questions: "50", marks: "100" },
    { date: "13", month: "March", time: "11:00 AM", title: "Mankavit Mock Test — ", subtitle: "CLAT 2025", type: "Practice Test", attempt: "Attempted - 1", duration: "120 min", questions: "50", marks: "100" },
];

const liveClasses = [
    { date: "13", month: "March", time: "11:00 AM", title: "Dummy Live —", subtitle: "CLAT 2025 Practice", type: "Dummy Topic", live: true, attempt: "Ongoing", duration: "120 min" },
    { date: "13", month: "March", time: "11:00 AM", title: "Dummy Live —", subtitle: "CLAT 2025 Practice", type: "Dummy Topic", live: false, attempt: "28:00 min remaining", duration: "120 min" },
];
const UpComing = () => {
    return (
        <MainContainer>
            <ListSection>
                <SectionTitle>Upcoming Test <ViewAllLink>View all</ViewAllLink></SectionTitle>
                {upcomingTests.map((test, index) => (
                    <ListCard key={index}>
                        <ListTime>
                            <Testdate>{test.date}</Testdate>
                            <Testmonth>{test.month}</Testmonth>
                            <Testtime>{test.time}</Testtime>
                        </ListTime>
                        <ListContent>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Testtitle>{test.title}</Testtitle>
                                <Testsubtitle>{test.subtitle}</Testsubtitle>
                            </div>
                            <Testpara>{test.type}</Testpara>
                            <Testattempt>{test.attempt}</Testattempt>
                            <Testdetails>
                                <p className='testDetails'>🕒 Duration: {test.duration}</p>
                                <div className='endLine'></div>
                                <p className='testDetails'>📋 Total Questions: {test.questions}</p>
                                <div className='endLine'></div>
                                <p className='testDetails'>🎯 Total Marks: {test.marks}</p>
                            </Testdetails>
                        </ListContent>
                    </ListCard>
                ))}
            </ListSection>

            <ListSection>
                <SectionTitle>Upcoming Live Classes <ViewAllLink>View all</ViewAllLink></SectionTitle>
                {liveClasses.map((cls, index) => (
                    <ListCard key={index} live>
                        <ClassCard>
                            <Testdate>{cls.date}</Testdate>
                            <Testmonth>{cls.month}</Testmonth>
                            <Classtime>
                                {cls.live ? (
                                    <LiveBadge>LIVE <div className='liveDot'></div></LiveBadge>
                                ) : (
                                    cls.time
                                )}
                            </Classtime>
                        </ClassCard>
                        <ListContent>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Testtitle>{cls.title}</Testtitle>
                                <Testsubtitle>{cls.subtitle}</Testsubtitle>
                            </div>
                            <Testpara>{cls.type}</Testpara>
                            <Testattempt>{cls.attempt}</Testattempt>
                            <Testdetails>
                                <p className='testDetails'>🕒 Duration: {cls.duration}</p>
                            </Testdetails>
                        </ListContent>
                    </ListCard>
                ))}
            </ListSection>
        </MainContainer>
    )
}

export default UpComing;
