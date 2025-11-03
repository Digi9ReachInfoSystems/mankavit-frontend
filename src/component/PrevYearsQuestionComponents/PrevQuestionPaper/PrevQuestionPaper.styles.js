import styled from 'styled-components';
import { Select as AntdSelectBase } from 'antd';

export const Container = styled.div`
  padding: 2rem;
  background: #fff;
  width: 80%;
  margin: 0 auto;

  // h2 {
  //   font-size: 48px;
  //   margin-bottom: 2rem;
  //   font-weight: 400;
  //   color: #242526;

  //   @media (max-width: 768px) {
  //     font-size: 36px;
  //   }

  //   @media (max-width: 576px) {
  //     font-size: 30px;
  //     padding-bottom: 0;
  //   }
  // }

  @media (max-width: 1360px) {
    width: 90%;
  }

  @media (max-width: 576px) {
    padding: 1rem 1px;
    padding-bottom: 1rem;
  
  }


  .icon-link img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  display: block;
}

@media (max-width: 768px) {
  .icon-link img {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .icon-link img {
    width: 30px;
    height: 30px;
  }
}

`;

export const TelegramBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    gap: 1rem;
    padding: 0.5rem 1rem;
  }

  img {
    width: 100px;
    height: 100px;

    @media (max-width: 1360px) {
      width: 80px;
      height: 80px;
    }
    @media (max-width: 1024px) {
      width: 60px;
      height: 60px;
    }

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }
`;

export const TelegramButton = styled.button`
  background: linear-gradient(to right, #08c8f6, #005bea);
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  padding: 1.5rem 1rem;
  border-radius: 8px;

  @media (max-width: 1360px) {
    font-size: 26px;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0.8rem 0.5rem;
  }
`;

export const PaperSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PaperCard = styled.div`
  display: flex;
  background: #f0f8ff;
  border-radius: 8px;
  gap: 1.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  .image-placeholder {
    width: 400px;
    height: 150px;
    background: #d0e9f5;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    @media (max-width: 1360px) {
      width: 300px;
    }

    @media (max-width: 1024px) {
      width: 200px;
      height: unset;
    }
    @media (max-width: 768px) {
      width: 100px;
    }
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @media (max-width: 576px) {
      padding: 0.5rem;
    }
  }
`;

export const PaperTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-top: 0;

  @media (max-width: 1360px) {
    font-size: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const YearButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
    .yearselect {
  min-width: 120px;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  height: 39px;
  margin-top: 2px;
  background: #fff;
  color: #242526;
  font-size: 14px;
  padding: 6px 10px;
  cursor: pointer;
  outline: none;

  /* 🔹 Makes the dropdown width adjust to its content */
  width: auto;
  display: inline-block;
  white-space: nowrap;
}

/* ✅ Tablet */
@media (max-width: 768px) {
  .yearselect {
    height: 29px !important;
    font-size: 13px;
    padding: 5px 8px;
  }
}

/* ✅ Mobile */
@media (max-width: 480px) {
  .yearselect {
    width: 40% !important;
    font-size: 13px;
    height: 30px;
    padding: 5px 8px;
  }
}

`;

export const YearButton = styled.button`
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  min-width: 60px;

  &:hover {
    background: #e0f7ff;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    font-size: 12px;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    min-width: 50px;
    font-size: 11px;
    padding: 0.2rem 0.4rem;
  }
`;

export const CustomAntdSelect = styled(AntdSelectBase)`
  .ant-select-selector {
    border-radius: 8px !important;
    border-color: #ccc !important;
    height: 39px !important;
    margin-Top:2px;
    display: flex;
    align-items: center;
    background: #fff;
  }

  .ant-select-selection-placeholder {
    color: #242526 !important;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .ant-select-selector {
      height: 36px !important;
    }
  }

  @media (max-width: 480px) {
    width: 100% !important;
  }
`;

// export const Title = styled.h2`
//   font-size: 50px;
//   font-weight: 700;
//   text-align: left;
//   margin-bottom: 1rem;
//   color: #2d3748;
//   // font-family: 'Merriweather', serif;
  
//   @media (max-width: 768px) {
//     font-size: 36px;
//   }
// `;

export const Title = styled.h2`
  font-size: clamp(26px, 5vw, 50px);
  font-weight: 500;
  text-align: center;
  margin: 0 0 1.25rem 0;
  white-space: nowrap; /* 👈 keeps it in a single line */
  color: #2d3748;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
    @media (max-width: 560px) {
    font-size: 28px;
    margin-bottom: 2px;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
    @media (max-width: 576px) {
    // width: 60px;
    margin-bottom: 1rem;
  }
`;
