import React, { useEffect, useState } from "react";
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
  ClassCard,
  Classtime,
  LiveBadge,
  ScrollableList,
  EmptyState
} from "./Upcoming.styles";
import { getUpComingMeetings } from "../../../../api/meetingApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { getAllUpcomingMocktest } from "../../../../api/mocktestApi";

const UpComing = () => {
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      setLoading(true);
      try {
        const cookieData = getCookiesData();
        const response = await getUpComingMeetings(cookieData.userId);
        const upcomingTestsResp = await getAllUpcomingMocktest(cookieData.userId);
      //  console.log("  upcomingTestsResp", upcomingTestsResp);  
        const transformedTests =
          upcomingTestsResp.data?.map((test) => ({
            id: test._id,
            date: new Date(test.startDate).getDate().toString(),
            month: new Date(test.startDate).toLocaleString("default", {
              month: "long",
            }),
            time: new Date(test.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            title: test.title,
            attempt: test.maxAttempts,
            duration: test.duration,
            questions: test.questions.length,
            marks: test.totalMarks,
          })) || [];

        const transformedClasses =
          response.data?.map((cls) => ({
            id: cls._id,
            date: new Date(cls.meeting_time).getDate().toString(),
            month: new Date(cls.meeting_time).toLocaleString("default", {
              month: "long",
            }),
            time: new Date(cls.meeting_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            title: cls.meeting_title,
            duration: cls.meeting_duration,
          })) || [];

        setUpcomingTests(transformedTests);
        setLiveClasses(transformedClasses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    apiCaller();
  }, []);

  return (
    <MainContainer>
      {loading ? (
        <div>Loading upcoming events...</div>
      ) : (
        <>
          <ListSection>
            <SectionTitle>Upcoming Tests</SectionTitle>
            {upcomingTests.length > 0 ? (
              <ScrollableList>
                {upcomingTests.map((test) => (
                  <ListCard key={test.id}>
                    <ListTime>
                      <Testdate>{test.date}</Testdate>
                      <Testmonth>{test.month}</Testmonth>
                      {/* <Testtime>{test.time}</Testtime> */}
                    </ListTime>
                    <ListContent>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Testtitle>{test.title}</Testtitle>
                        <Testsubtitle></Testsubtitle>
                      </div>
                      <Testpara></Testpara>
                      <Testattempt></Testattempt>
                      <Testdetails>
                        <p className="testDetails">🕒 Duration: {test.duration}</p>
                        <div className="endLine"></div>
                        <p className="testDetails">📋 Total Questions: {test.questions}</p>
                        <div className="endLine"></div>
                        <p className="testDetails">🎯 Total Marks: {test.marks}</p>
                        <div className="endLine"></div>
                        <p className="testDetails">🔢 Max Attempt: {test.attempt}</p>
                      </Testdetails>
                    </ListContent>
                  </ListCard>
                ))}
              </ScrollableList>
            ) : (
              <EmptyState>No upcoming tests scheduled</EmptyState>
            )}
          </ListSection>

          <ListSection>
            <SectionTitle>Upcoming Live Classes</SectionTitle>
            {liveClasses.length > 0 ? (
              <ScrollableList>
                {liveClasses.map((cls) => (
                  <ListCard key={cls.id} live={cls?.live}>
                    <ClassCard>
                      <Testdate>{cls.date}</Testdate>
                      <Testmonth>{cls.month}</Testmonth>
                      <Classtime>
                        {cls.live ? (
                          <LiveBadge>
                            LIVE <div className="liveDot"></div>
                          </LiveBadge>
                        ) : (
                          cls.time
                        )}
                      </Classtime>
                    </ClassCard>
                    <ListContent>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Testtitle>{cls.title}</Testtitle>
                        <Testsubtitle>{cls.subtitle}</Testsubtitle>
                      </div>
                      <Testpara></Testpara>
                      <Testdetails>
                        <p className="testDetails">🕒 Duration: {cls.duration}</p>
                      </Testdetails>
                    </ListContent>
                  </ListCard>
                ))}
              </ScrollableList>
            ) : (
              <EmptyState>No upcoming classes scheduled</EmptyState>
            )}
          </ListSection>
        </>
      )}
    </MainContainer>
  );
};

export default UpComing;
