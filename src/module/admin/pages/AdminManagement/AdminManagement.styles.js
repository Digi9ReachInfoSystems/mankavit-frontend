import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 40px;
  background-color: ${(p) => p.theme.colors.secondary};
  border-radius: 12px;
  padding: 20px;
  min-height: 600px;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 12px;
  }
`;

/* Header stacks on mobile */
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  color: ${(p) => p.theme.colors.black};
  margin: 0;

  small {
    font-weight: 400;
    font-size: 0.9rem;
    color: ${(p) => p.theme.colors.test};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

/* Sort area grows to full width on mobile */
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 50%;
    select {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SortLabel = styled.span`
  margin-right: 4px;
  white-space: nowrap;
`;

export const SortSelect = styled.select`
  padding: 6px;
  font-size: 14px;
  border: 1px solid ${(p) => p.theme.colors.grey};
  background: ${(p) => p.theme.colors.backgrounGrey};
  border-radius: 6px;
`;

/* Controls row: Search + Buttons, fully responsive */
export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 16px 0 8px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    justify-content: flex-start;
  }
`;

export const CreateButton = styled.button`
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  min-width: 160px;

  &:hover {
    filter: brightness(0.95);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

/* Search is fluid and centered on small screens */
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;

  @media (max-width: 576px) {
    max-width: 100%;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

/* Table: keep columns readable with horizontal scroll on small screens */
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 980px; /* prevents column squish on phones */
`;

export const TableHead = styled.thead`
  background-color: ${(p) => p.theme.colors.black};
`;

export const TableHeader = styled.th`
  padding: 12px;
  color: white;
  text-align: left;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

export const TableCell = styled.td`
  padding: 12px;
  white-space: nowrap;

  a {
    color: ${(p) => p.theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

/* Toggle */
export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: auto;
  height: 30px;
`;

export const ToggleSlider = styled.span`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  background-color: ${(p) => (p.$isPublished ? "#4CAF50" : "#ccc")};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 5px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(p) => (p.$isPublished ? "translateX(26px)" : "translateX(0)")};
  }
`;

export const ToggleLabel = styled.label`
  font-size: 14px;
  color: ${(p) => (p.$isPublished ? "#4CAF50" : "#999")};
  user-select: none;
`;

/* Reset Password CTA & Modal */
export const ResetPasswordButton = styled.button`
  background-color: #ffc107;
  color: #000;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a800;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const ResetPasswordModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1;
`;

export const ResetPasswordModalContent = styled.div`
  position: relative;
  z-index: 2;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 92vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 20px;
  color: #007bff;
`;

export const ResetPasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalButton = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${(p) => (p.$variant === "cancel" ? "#ccc" : "#007bff")};
  color: ${(p) => (p.$variant === "cancel" ? "#333" : "#fff")};

  &:hover {
    background-color: ${(p) => (p.$variant === "cancel" ? "#bbb" : "#0056b3")};
  }
`;
