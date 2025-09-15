import styled from 'styled-components';

export const AchieversSection = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
  font-weight: 700;
`;

export const FilterLabel = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

export const Chip = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  border: 1px solid ${({ $active }) => ($active ? '#2d79f3' : '#ddd')};
  background: ${({ $active }) => ($active ? '#2d79f3' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#666')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2d79f3;
    background: ${({ $active }) => ($active ? '#2d79f3' : '#f0f6ff')};
  }
`;

export const ChipCount = styled.span`
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.2)' : '#f0f0f0')};
  color: ${({ $active }) => ($active ? '#fff' : '#666')};
  padding: 0.15rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const AvatarWrap = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #2d79f3 0%, #5b6ef5 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
`;

export const Name = styled.h3`
  margin: 0.75rem 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
`;

export const Achievement = styled.div`
  margin-top: 0.5rem;
`;

export const AchievementText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d79f3;
  background: #f0f6ff;
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  display: inline-block;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #e74c3c;
`;

export const ViewAllButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.9rem 2rem;
  background: #2d79f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1c6de9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 121, 243, 0.3);
  }
`;