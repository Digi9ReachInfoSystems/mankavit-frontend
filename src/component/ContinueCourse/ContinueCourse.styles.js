import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  width:80%;
  margin: 0 auto;

  @media (max-width: 1360px) {
    width:90%;
  }

  @media (max-width: 1024px) {
    width:95%;
    padding: 20px 10px;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin-left: 10px;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const BackLink = styled.div`
// border: 1px solid #ccc;
border: none;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 576px) {
    padding: 5px;
  }
`;

export const BackIcon = styled.a`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 5px;

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const MainTitle = styled.h2`
  font-size: 32px;
  font-weight: 400;
  margin: 0px;

  span{
    color: #007bff;
  }

  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

export const CourseImage = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 10px;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    height: 300px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const CourseInfo = styled.div`
//   h2 {
//     font-size: 1.8rem;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 0.95rem;
//     margin-bottom: 15px;
//   }
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background: #fff;
`;
 
export const Rating = styled.div`
  font-size: 14px;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
 
export const Star = styled.span`
  color: ${({ faded }) => (faded ? '#ccc' : '#fbc02d')};
  margin-left: 2px;
`;
 
export const CourseDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-direction: column;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;
 
export const PlayButton = styled.div`
      background: linear-gradient(to right, #0DCAF0, #007BFF);
  width: 84px;
  height: 84px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
 
  span {
    margin-left: 5px;

    @media (max-width: 480px) {
      margin-left: 0;
    }
  }
`;
 
export const CourseSubject = styled.h2`
  font-size: 35px;
  color: #313131;
  width: 100px;
  margin: 0;
  margin-bottom: 10px;
  margin-left:30px;
  width: 100%;

  @media (max-width: 1024px) {
    font-size: 28px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
 
export const CourseStats = styled.div`
  font-size: 18px;
  color: #1a73e8;
  margin-top: 4px;
  margin-left:30px;

  @media (max-width: 1024px) {
    font-size: 16px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
 
export const StatLink = styled.span`
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;
 
  &:nth-child(1) {
    margin-left: 0;
  }

  @media (max-width: 480px) {
    margin-right: 2px;
    margin-left: 2px;
  }
`;

export const Statdesc = styled.span`
font-size: 16px;
font-weight: 400;
color: #313131;
  margin-left: 0px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
 
export const LiveClass = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #000;
  font-weight: 500;
  margin-bottom: 20px;
  margin-left: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 0px;
    margin-top: 10px;
  }
`;
 
export const TVIcon = styled.span`
  font-size: 24px;
  margin-left: 6px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
 
export const StarContainer = styled.span`
  margin-left: 8px;
  display: inline-flex;
  gap: 2px;
  vertical-align: middle;
`;

export const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  padding: 0 1rem;
  font-family: Arial, sans-serif;

  @media (max-width: 1024px) {
    width: 95%;
    margin: 10px 0;
  }
`;

export const FeatureColumn = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;

  @media (max-width: 480px) {
  margin: 0;
  }
`;

export const FeatureItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;


export const TabSection = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px;

  @media (max-width: 480px) {
    gap: 8px;
    margin: 8px 16px;
  }

  button {
    padding: 14px 20px;
    border: none;
    border-radius: 24px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    background: #D3D3D3 ;
    color: #fff;
    transition: all 0.3s ease;

    &.active {
      background: linear-gradient(to right, #0DCAF0, #007BFF);
      color: white;
    }

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 10px 16px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      padding: 8px 12px;
    }
  }
`;

export const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 16px;

  @media (max-width: 480px) {
    margin: 8px;
    gap: 8px;
  }
`;

export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;

  .video-info {
    display: flex;
    gap: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 480px) {
      gap: 20px;
    }

    p {
      margin: 0;
      color: #1D1617;
      font-size: 20px;
      font-weight: 500;

      @media (max-width: 480px) {
        font-size: 16px;
        width: 150px;
      }
    }

    span {
      font-size: 16px;
      font-weight: 400;
      color: #B6B4C2;

      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }

  .videoimage{
   width: 250px;
   height: 80px;
   border-radius: 8px;

   @media (max-width: 480px) {
    width: 100px;
    height: 60px;
  }
`;

export const Playbutton = styled.div`
    border: 1.5px solid #007BFF;
    cursor: pointer;
    border-radius: 8px;
`;

export const Playing = styled.div`
    color: #007BFF;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
`;

export const CompletedTag = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
`;
/* In your ContinueCourse.styles.js */
export const NotesSection = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

export const NoteItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f7ff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .note-icon {
    margin-right: 1rem;
    font-size: 1.5rem;
    color: #e74c3c;
    position: relative;
    
    .download-icon {
      position: absolute;
      bottom: -5px;
      right: -5px;
      font-size: 0.8rem;
      color: #3498db;
      background: white;
      border-radius: 50%;
      padding: 2px;
    }
  }
  
  .note-info {
    flex: 1;
    
    h4 {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }
    
    p {
      margin: 0.25rem 0 0;
      font-size: 0.8rem;
      color: #666;
    }
  }
`;