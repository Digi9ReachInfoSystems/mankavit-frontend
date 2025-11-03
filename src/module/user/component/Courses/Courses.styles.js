import styled, { keyframes } from 'styled-components';

const floatIn = keyframes`
  from { transform: translateY(6px); opacity: .0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

export const Title = styled.h1`
   font-size: 50px;
  font-weight: 600;
  margin: 0.25rem 0 0.25rem 0;
  color: ${({ theme }) => theme.colors.jetBlack};
  letter-spacing: -0.02em;
 @media (max-width: 900px) {
    font-size: 36px;
  }
  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 560px) {
    font-size: 28px;
  }
`;
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  overflow: visible;           /* ⬅️ kill horizontal scroll */
  padding-bottom: 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;


export const CourseCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;                 /* ⬅️ fill grid cell */
  min-height: 450px;           /* keep your card height feel */
  border-radius: 18px;
  background: radial-gradient(90% 120% at 100% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
              linear-gradient(180deg, rgba(171,190,209,0.3), rgba(171,190,209,0.15));
  box-shadow: 0 10px 25px rgba(16, 24, 40, 0.10), 0 2px 6px rgba(16, 24, 40, 0.06);
  backdrop-filter: saturate(120%) blur(6px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  animation: ${floatIn} .35s ease both;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 38px rgba(16, 24, 40, 0.16), 0 6px 12px rgba(16, 24, 40, 0.08);
    border-color: rgba(0, 123, 255, 0.18);
  }

  @media (max-width: 520px) {
    min-height: 430px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  overflow: hidden;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    transform: scale(1);
    transition: transform .4s ease;
  }

  ${CourseCard}:hover & img { transform: scale(1.05); }

  /* Subtle top gradient overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.00) 60%);
    pointer-events: none;
  }
`;

export const ProgressContainer = styled.div`
  padding: 12px 18px 8px 18px;
`;

export const ProgressLabel = styled.div`
  font-size: .95rem;
  font-weight: 600;
  color: #334155; /* slate-700 */

  @media (max-width: 768px) {
    font-size: 14px;
  }
    @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  margin-top: 8px;
  background: linear-gradient(180deg, #eef2f7, #e6ebf1);
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #0DCAF0, #007BFF, #66b2ff);
  background-size: 200% 100%;
  animation: ${shimmer} 2.4s linear infinite;
  transition: width .4s ease;
`;

export const CourseContent = styled.div`
  padding: 12px 18px 0 18px;
  display: flex;
  flex-direction: column;
  gap: .25rem;
`;

export const CourseMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: .35rem;
`;

export const CourseHead = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkgray};
  font-weight: 400;
`;

export const CourseTitle = styled.h3`
  font-size: 1.35rem;
  line-height: 1.2;
  margin: 0;
  color: ${({ theme }) => theme.colors.jetBlack};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.6em;

  @media (max-width: 768px) {
    font-size: 18px;
  }
    @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const CourseMinititle = styled.p`
  font-size: .95rem;
  color: #475569; /* slate-600 */
  margin: 0.15rem 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.2em;
   @media (max-width: 768px) {
    font-size: 16px;
  }
    @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const CourseDesc = styled.p`
  margin: 0.25rem 0 0.1rem 0;
  color: ${({ theme }) => theme.colors.test};
  font-size: .95rem;
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Details = styled.div`
  margin: .35rem 0 .5rem 0;
  font-size: .95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.chorcaolgray};
  display: grid;
  gap: .35rem;
`;

export const DetailItem = styled.div`
  margin: 0;
`;

export const DetailItemok = styled.div`
  display: flex;
  align-items: center;
  gap: .6rem;
  color: #16a34a; /* green-600 */
  font-size: 1rem;
  line-height: 1.35;
  @media (max-width: 768px) {
    font-size: 14px;
  }
    @media (max-width: 576px) {
    font-size: 12px;
  }

`;

export const PriceActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const ShowMoreBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: .5rem;
`;
export const ToggleAllButton = styled.button`
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .15s ease, filter .2s ease, box-shadow .2s ease;
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
  &:hover { filter: brightness(1.05); }
  &:active { transform: translateY(1px); }
`;
export const ViewButton = styled.button`
  background-color: ${(props) => (props.completed ? '#10b981' : '#007bff')};
  color: #fff;
  padding: 0.95rem 1.2rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  transition: filter .2s ease, transform .2s ease, box-shadow .2s ease;
  box-shadow: 0 -1px 0 rgba(0,0,0,0.04) inset;

  &:hover {
    filter: brightness(1.05);
  }
  &:active { transform: translateY(1px); }
`;

export const NoCourseFoundButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  font-size: .95rem;
  font-weight: 700;
  border-radius: 10px;
  margin-left: 10px;
  transition: filter .2s ease;
  &:hover { filter: brightness(1.05); }
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin: 1.25rem 0 1rem 0;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  --active: linear-gradient(90deg, #0DCAF0, #007BFF);
  background: ${({ active }) => (active ? 'var(--active)' : '#E5E7EB')};
  color: ${({ active, theme }) => (active ? theme.colors.white : '#111827')};
  border: 1px solid ${({ active }) => (active ? 'transparent' : '#E5E7EB')};
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 999px;
  font-size: .95rem;
  font-weight: 600;
  transition: all .2s ease;
  box-shadow: ${({ active }) => (active ? '0 4px 12px rgba(0,123,255,0.25)' : 'none')};

  &:hover { background: var(--active); color: #fff; }
`;
// .blinking-live {
//   color: red;
//   font-weight: bold;
//   margin: 0.5rem 0;
//   padding-left: 1rem;
//   animation: blink 1s infinite;
// }


export const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;
export const BlinkingIcon = styled.span`
  animation: ${blink} 1.5s infinite;
  display: inline-flex;
  align-items: center;
  padding-left: 1rem;
`;
export const liveClassBadge = styled.span`
  animation: ${blink} 1.5s infinite;
  display: inline-flex;
  align-items: center;
`;


export const ViewAllButton = styled.button`
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 999px;
  &:hover {
    opacity: 0.9;
  }
`;