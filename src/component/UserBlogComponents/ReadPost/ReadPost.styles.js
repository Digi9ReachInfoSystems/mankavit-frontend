import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;

  @media (max-width: 480px) {
  padding: 0px;

  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #0b2341;
  margin: 0;
`;

export const Author = styled.p`
  font-size: 0.95rem;
  color: #007bff;
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 24px;
  line-height: 2;
  text-align: justify;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #0b2341;
  margin-top: 24px;
`;

export const SubSectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #1c1c1c;
  margin-top: 20px;
`;

export const BulletList = styled.ul`
  padding-left: 20px;
  margin-top: 8px;
`;

export const OrderedList = styled.ol`
  padding-left: 20px;
  margin-top: 8px;
  line-height: 1.6;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  color: #333;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
//   padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex-wrap: wrap;

  .space {
      height: 1px;
      width: 100%;
      background-color: #ddd;
  }
`;

export const AuthorDetails = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;

  @media (max-width: 480px) {
  display: flex;
    flex-direction: column;
  }
`;

export const AuthorImage = styled.div`

@media (max-width: 480px) {
    display: flex;
    justify-content: center;
}
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 160px;
//   object-fit: cover;
  border-radius: 4px;

  @media (max-width: 480px) {
    width: 90%;
    height: 150px;
  }
`;

export const AuthorInfo = styled.div`
  flex: 1;
`;

export const AuthorName = styled.h3`
  color: #0077cc;
  margin: 0;
`;

export const AuthorBio = styled.p`
  color: #333;
  font-size: 0.95rem;
  margin: 8px 0 16px;
  text-align: left;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 30px;
  padding: 16px;

  @media (max-width: 1320px) {
    gap: 20px;
    padding: 10px;
  }

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const Image = styled.img`
  width: 36px;
  height: 30px;

  @media (max-width: 1636px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1320px) {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 576px) {
    width: 12px;
    height: 12px;
  }
`;
