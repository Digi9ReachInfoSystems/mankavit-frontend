import styled from 'styled-components';
import { Select as AntdSelectBase } from 'antd';

export const Container = styled.div`
  padding: 2rem;
  background: #fff;
  width: 80%;
  margin: 0 auto;

  h2 {
    font-size: 48px;
    margin-bottom: 2rem;
    font-weight: 400;
    color: #242526;

    @media (max-width: 768px) {
      font-size: 36px;
    }

    @media (max-width: 480px) {
      font-size: 30px;
    }
  }

  @media (max-width: 1360px) {
    width: 90%;
  }

  @media (max-width: 576px) {
    padding: 1rem 1px;
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
    gap:0.5rem
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

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @
`;

export const YearButton = styled.button`
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  min-width: 60px; /* Default width */

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
    display: none;
  }
`;




export const CustomAntdSelect = styled(AntdSelectBase)`
  .ant-select-single {
    border-radius: 8px !important;
    border-color: #ccc !important;
    height: 40px !important;
    display: flex;
    align-items: center;
    background: #fff;
    width: 100% !important;

    @media (max-width: 1360px) {
      width: 70% !important;
    }

    @media (max-width: 1024px) {
      width: 50% !important;
    }
      @media (max-width: 768px) {
      width: 50% !important;
    }

    @media (max-width: 480px) {
      width: 20% !important;
    }
  }

  :where(.css-dev-only-do-not-override-1m63z2v).ant-select-single {
    font-size: 14px;
    height: 32px;

    @media (max-width: 480px) {
      width: 100%;
    }
    
}

  .ant-select-selection-placeholder {
    color: #242526 !important;
    font-size: 14px;
  }
`;
