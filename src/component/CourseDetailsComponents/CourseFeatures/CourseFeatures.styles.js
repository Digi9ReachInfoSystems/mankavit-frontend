import styled from "styled-components";

export const FeatureItem = styled.div`
    font-family: 'Segoe UI', sans-serif;
    color: #333;
    width:80%;
    margin: 0 auto;

    @media (max-width: 1360px) {
        width:90%;
    }
        @media (max-width: 1024px) {
            width:100%;
        }
`;

export const FeatureTitle = styled.h2`
    font-size: 40px;
    font-weight: 500;
    color: #252525;
    margin: 10px 0;
    margin-bottom: 20px;
    margin-left: 70px;

    span {
        color: #0494FA;
    }

    @media (max-width: 1024px) {
        margin-left: 50px;
    }

    @media (max-width: 768px) {
        margin-left: 30px;
        font-size: 30px;
    }

    @media (max-width: 576px) {
        margin: 10px;
        font-size: 25px;
    }
`;

export const FeatureDescription = styled.ul`
    list-style: disc;
    padding-left: 20px;
    margin: 10px 0 10px 110px;

    @media (max-width: 1024px) {
        margin-left: 70px;
    }

    @media (max-width: 768px) {
        margin-left: 50px;
    }

    @media (max-width: 576px) {
        margin: 30px;
    }
`;

export const FeatureList = styled.li`
    margin-bottom: 10px;
    font-size: 24px;
    color: #000000;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 576px) {
        font-size: 16px;
    }
`;
