// src/pages/Admin/StudentManagement/updateKYC/updateKYC.style.js
import styled, { keyframes } from "styled-components";

/* ====== Layout ====== */

export const Container = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  min-height: 750px;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
  box-shadow: 0 8px 24px rgba(18, 38, 63, 0.06);
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
  }
`;

/* ====== Header ====== */

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  background: radial-gradient(1200px circle at 0% -10%, #eef4ff 0%, transparent 40%),
              radial-gradient(1200px circle at 100% 0%, #f2fffb 0%, transparent 40%);
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #e6eeff;
  color: #2a2a72;
  display: grid;
  place-items: center;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const SubTitle = styled.div`
  font-size: 13px;
  color: #475569;
  margin-top: 2px;
`;

/* ====== Badges & Dots ====== */

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;

  color: ${({ $tone }) =>
    $tone === "success" ? "#065f46" :
    $tone === "danger"  ? "#7f1d1d" :
    $tone === "warning" ? "#7c4a03" : "#1e293b"};

  background: ${({ $tone }) =>
    $tone === "success" ? "#dcfce7" :
    $tone === "danger"  ? "#fee2e2" :
    $tone === "warning" ? "#fef3c7" : "#e2e8f0"};
`;

export const KycDot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ status }) =>
    status === "approved" ? "#16a34a" :
    status === "rejected" ? "#dc2626" :
    status === "pending"  ? "#f59e0b" : "#64748b"};
`;

/* ====== Buttons ====== */

export const GhostButton = styled.button`
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: #f8fafc;
  }
`;

export const PrimaryButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform .1s ease, box-shadow .2s ease;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);

  &:hover { transform: translateY(-1px); }
  &:disabled { background: #93c5fd; cursor: not-allowed; box-shadow: none; }
`;

export const DangerButton = styled(PrimaryButton)`
  background: #ef4444;
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.25);
`;

/* ====== Content & Cards ====== */

export const Content = styled.div`
  padding: 22px 24px 28px;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 6px 18px rgba(18, 38, 63, 0.05);

  h3 {
    margin: 0 0 14px 0;
    font-size: 16px;
    color: #0f172a;
  }
`;

/* ====== Fields ====== */

export const Field = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #64748b;
`;

export const ReadonlyInput = styled.input`
  width: 100%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  color: #0f172a;
`;

export const StatusRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #334155;
  font-size: 14px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

/* ====== Documents ====== */

export const DocsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(210px, 1fr) );
  gap: 14px;
`;

export const DocCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  cursor: zoom-in;
  transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #cbd5e1;
    box-shadow: 0 8px 20px rgba(2, 6, 23, 0.08);
  }
`;

export const DocThumb = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  background: #f1f5f9;
`;

// export const DocMeta = styled.div`
//   padding: 10px 12px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   .name {
//     font-size: 14px;
//     color: #0f172a;
//     font-weight: 600;
//   }

//   a {
//     font-size: 12px;
//     color: #2563eb;
//     text-decoration: none;
//   }
// `;

/* ====== Empty / Fallback ====== */

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #0f172a;
`;

export const EmptyText = styled.p`
  margin: 0 0 14px 0;
  font-size: 14px;
  color: #64748b;
`;

/* ====== Modal ====== */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
`;

export const Modal = styled.div`
  position: relative;
  max-width: min(900px, 92vw);
   max-height: 95vh;
  border-radius: 14px;
  overflow: hidden;
  background: white;
  box-shadow: 0 24px 48px rgba(2, 6, 23, 0.35);

  img, embed {
    display: block;
    max-width: 100%;
    height: 70vh;
    object-fit: contain;
    background: #000;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 36px;
  width: 36px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  line-height: 0;
  display: grid;
  place-items: center;
`;

/* ====== Loader ====== */

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoaderWrap = styled.div`
  min-height: 60vh;
  display: grid;
  place-items: center;
  gap: 12px;
  color: #334155;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const DocMeta = styled.div`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    font-size: 14px;
    color: #0f172a;
    font-weight: 600;
  }

  .actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    a {
      font-size: 12px;
      color: #2563eb;
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid #dbeafe;
      background: #eff6ff;
      transition: background .15s ease, border-color .15s ease;

      &:hover {
        background: #e0edff;
        border-color: #c7ddff;
      }
    }

    .download {
      font-size: 12px;
      color: #065f46;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid #bbf7d0;
      background: #dcfce7;
      cursor: pointer;
      transition: background .15s ease, border-color .15s ease, transform .05s ease;

      &:hover {
        background: #c8f7d7;
        border-color: #99e9b7;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
`;
