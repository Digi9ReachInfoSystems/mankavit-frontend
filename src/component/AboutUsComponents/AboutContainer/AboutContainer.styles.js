import styled from "styled-components"; 

export const AboutmainContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;

    @media (max-width: 480px) {
    margin: 0px;
    width: 90%;
}
`;

export const AboutTitle = styled.p`
    font-size: 32px;
    font-weight: 100;
    margin-bottom: 20px;
    margin-top: 0px;
    color: #252525;

    @media (max-width: 480px) {
        font-size: 24px;
    }
`;

export const AboutContent = styled.div`
    font-size: 24px;
    line-height: 1.5;
    color: #2525259d;
    line-height: 1.4;
`;

export const ContentOne = styled.p`
    margin-bottom: 20px;


    @media (max-width: 768px) {
        font-size: 18px;
    }
        
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

export const ContentTwo = styled.p`
    margin-bottom: 20px;
     @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;