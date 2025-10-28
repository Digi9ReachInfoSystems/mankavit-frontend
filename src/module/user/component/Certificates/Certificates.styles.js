import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.jetBlack};
  text-align: left;
`;

export const CertificatesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
   @media (max-width: 480px) {
     grid-template-columns: repeat(2, 1fr); 
   }
`;

export const CertificateCard = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;

  iframe {
    width: 100%;
    height: 270px;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    iframe {
      height: 240px; /* smaller to fit tablets */
    }
  }
    @media (max-width: 900px)and(min-height: 1200px) {
      iframe {
        height: 180px; /* smaller to fit smaller tablets */
      }
    }
   @media (max-width: 480px) {
    iframe {
      // height: 120px; /* smaller to fit smaller phones */
    }
  }
`;

export const CertificateDownload = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
`;

export const ViewMoreButton = styled.button`
  margin: 20px auto 0 auto;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;
export const CertificateTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: left;

  /* clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;   /* number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px; /* keeps all cards same height */
`;
