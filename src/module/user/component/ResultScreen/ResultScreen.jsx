import React from "react";
import {
    ResultsContainer,
    CardContainer,
    Greeting,
    Message,
    ScoreTable,
    ScoreRow,
    Label,
    Value,
    ButtonGroup,
    ActionButton
} from "./ResultScreen.styles";

const scoreDetails = [
    { label: "Your Score", value: 12 },
    { label: "Correct Answers", value: 18 },
    { label: "Wrong Answers", value: 2 },
    { label: "Question Not Answered", value: 3 },
    { label: "Question Not Visited", value: 10 }
];

const ResultScreen = () => {
    return (

        <CardContainer>

            <ResultsContainer>

                <Greeting>Dear Gaurav N ,</Greeting>
                <Message>Thank you for taking this test !</Message>

                <ScoreTable>
                    {scoreDetails.map((item, index) => (
                        <ScoreRow key={index}>
                            <Label>{item.label}</Label>
                            <Value>{item.value}</Value>
                        </ScoreRow>
                    ))}
                </ScoreTable>
            </ResultsContainer>

            <ButtonGroup>
                <ActionButton>Retake Test</ActionButton>
                <ActionButton primary>Go to Courses</ActionButton>
            </ButtonGroup>
        </CardContainer>



    );
};

export default ResultScreen;
