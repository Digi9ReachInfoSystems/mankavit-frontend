import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

export const Content = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 55px;
  font-weight: 400;
  margin: 1rem;

  @media (max-width: 1636px) {
    font-size: 50px;
  }

  @media (max-width: 1468px) {
    font-size: 45px;
  }
  
  @media (max-width: 1024px) {
    font-size: 40px;
  }
  
  @media (max-width: 863px) {
    font-size: 30px;
  }
`;

export const Highlight = styled.span`
  color: #007bff;
`;

export const Divider = styled.div`
  width: 22%;
  height: 6px;
  background-color: #007bff;
  margin: 3.5rem auto 2.5rem;
  border-radius: 2px;

  @media (max-width: 1024px) {
    width: 50%;
    height: 4px;
    margin: 3rem auto 2rem;
  }

  @media (max-width: 868px) {
    width: 40%;
    height: 3px;
    margin: 2.5rem auto 2rem;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem; // Space for scrollbar
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background:rgb(138, 143, 148);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Card = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  background: #fff;
  width: 500px;
  text-align: center;
  position: relative;

  @media (max-width: 1802px) {
    width: 450px;
  }

  @media (max-width: 1636px) {
    width: 400px;
  }

  @media (max-width: 1468px) {
    width: 350px;
  }

  @media (max-width: 1320px) {
    width: 310px;
  }

  @media (max-width: 1179px) {
    width: 250px;
  }

  @media (max-width: 1024px) {
    width: 300px;
  }

  @media (max-width: 768px) {
    width: 280px;
  }

  @media (max-width: 576px) {
    width: 90%;
    margin: 0 5%;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  @media (max-width: 1636px) {
    height: 250px;
  }

  @media (max-width: 1179px) {
    height: 180px;
  }

  @media (max-width: 1024px) {
    height: 200px;
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 30px;
  font-weight: 400;
  color: #252525;
  margin-bottom: 0.5rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 1468px) {
    font-size: 30px;
  }

  @media (max-width: 1024px) {
    font-size: 25px;
  }

  @media (max-width: 853px) {
    font-size: 20px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const CardDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: #252525;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;

  @media (max-width: 1802px) {
    font-size: 18px;
  }

  @media (max-width: 1468px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 868px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 14px;  
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const CarouselButton = styled.button`
  // background:rgb(180, 197, 214);
  // color: black;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;