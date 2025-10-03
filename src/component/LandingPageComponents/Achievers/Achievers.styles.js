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
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;
export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
`;

export const Highlight = styled.span` color: #2d79f3; `;
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

  /* Mobile: 4 chips per row */
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* ← 4 columns */
    gap: 8px;
    justify-items: stretch;
  }
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
    @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 0.4rem 0.5rem;   /* tighter to fit 4 per row */
    font-size: 0.78rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
`;

export const ChipCount = styled.span`
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.2)' : '#f0f0f0')};
  color: ${({ $active }) => ($active ? '#fff' : '#666')};
  padding: 0.15rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;

  @media (max-width: 768px) {

  font-size: 0.75rem;

`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
  
  grid-template-columns: repeat(2, 1fr); /* exactly 2 cards per row */
   gap: 16px; 
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
  background: #fff;
  color: #2d79f3;
  border: none;
  border-radius: 8px;
  border: 1px solid #2d79f3;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

 
`;