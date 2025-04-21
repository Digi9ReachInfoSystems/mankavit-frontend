import styled from "styled-components";

export const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-left: 40px;
    padding:5px 0 0 0;

    @media (max-width: 768px) {
        margin-left: 0;
    }
    `;

export const FooterContent = styled.div`
    display: flex;
    background-color: #f5f5f5;
    gap: 30px
    `;

export const FooterTitle = styled.p`
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: #6D6E75;
    `;

export const FooterLinks = styled.div`
    display: flex;
    gap: 10px;
    `;

export const FooterLink = styled.a`
    color: #B1B2B5;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
    `;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    // min-height: 100vh;
    `;

export const FooterList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
    `;

export const FooterListItem = styled.li`
    // margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    color: #6D6E75;
    cursor: pointer;
    `;

