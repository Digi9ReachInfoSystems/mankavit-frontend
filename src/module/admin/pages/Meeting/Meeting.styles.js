import styled from "styled-components";

/* Container */
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 20px;
  border-radius: 12px;
  padding: ${(p) => p.theme.spacing(2)} ${(p) => p.theme.spacing(4)} 0 ${(p) => p.theme.spacing(4)};
  font-family: ${(p) => p.theme.fonts.body};
  background-color: ${(p) => p.theme.colors.secondary};
  min-height: 720px;

  @media (max-width: 768px) {
    margin: 10px;
    padding: ${(p) => p.theme.spacing(1)};
  }
`;

/* Header Row: stacks on small screens */
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: ${(p) => p.theme.spacing(2)};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(p) => p.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* Right-side sort; Select becomes full-width on mobile */
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(p) => p.theme.colors.test};
  font-size: 12px;

  .ant-select {
    min-width: 160px;
  }

  @media (max-width: 768px) {
    width: 50%;
    .ant-select {
      width: 100% !important;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const SortLabel = styled.span`
  margin-right: 4px;
  white-space: nowrap;
`;

export const SortSelect = styled.select`
  border: 1px solid ${(p) => p.theme.colors.grey};
  background-color: ${(p) => p.theme.colors.backgrounGrey};
  padding: 4px;
  font-family: ${(p) => p.theme.fonts.body};
  font-size: 12px;
  color: ${(p) => p.theme.colors.test};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

/* Responsive controls row: search + filters */
export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  .filters {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .filter-select {
    min-width: 220px;
  }

  .filter-range {
    min-width: 260px;
  }

  .primary-btn {
    padding: 6px 14px;
    background-color: #1890ff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .ghost-btn {
    padding: 6px 14px;
    background-color: #f5f5f5;
    color: #666;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: stretch;

    .filters {
      flex-wrap: wrap;
      width: 100%;
    }

    .filter-select,
    .filter-range {
      flex: 1 1 280px;
      min-width: 0;
    }

    .primary-btn,
    .ghost-btn {
      width: auto;
    }
  }

  @media (max-width: 576px) {
    .filters {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-select,
    .filter-range,
    .primary-btn,
    .ghost-btn {
      width: 100%;
    }
  }
`;

/* Search */
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;

  @media (max-width: 576px) {
    max-width: 100%;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 5px 10px 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.silverGray};
  background: ${({ theme }) => theme.colors.backgrounGrey};
`;

/* Table */
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.colors.secondary};
  border: none;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px; /* prevent cramping on small screens */
`;

export const TableHead = styled.thead`
  background-color: ${(p) => p.theme.colors.black};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${(p) => p.theme.spacing(2)};
  font-family: ${(p) => p.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(p) => p.theme.colors.white};
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

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: ${(p) => p.theme.spacing(1.9)};
  font-size: 14px;
  color: ${(p) => p.theme.colors.black};
  white-space: nowrap;
  border-bottom: 1px solid ${(p) => p.theme.colors.grey};

  a {
    margin-left: 6px;
    text-decoration: none;
    color: ${(p) => p.theme.colors.primary};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* Actions */
export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)};
  font-size: 1rem;

  svg {
    cursor: pointer;
    color: ${(p) => p.theme.colors.test};
    transition: color 0.2s ease;

    &:hover {
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

/* Buttons row (Add / Bulk Delete) */
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: ${(p) => p.theme.spacing(0)};
  margin-top: ${(p) => p.theme.spacing(2)};

  @media (max-width: 768px) {
    margin: 10px 5px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export const CreateButton = styled.button`
  padding: ${(p) => p.theme.spacing(2)} ${(p) => p.theme.spacing(2)};
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(p) => p.theme.colors.white};
  border: none;
  border-radius: 6px;
  font-family: ${(p) => p.theme.fonts.body};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  width: 15%;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    width: 30%;
  }
  @media (max-width: 768px) {
    width: 48%;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

/* Pagination page info/buttons (if you use them) */
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(p) => p.theme.colors.test};
`;

export const PageButton = styled.button`
  border: 1px solid ${(p) => p.theme.colors.grey};
  background-color: ${(p) => p.theme.colors.secondary};
  color: ${(p) => p.theme.colors.test};
  font-size: 0.9rem;
  padding: 4px 8px;
  cursor: pointer;

  &.active {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.secondary};
    border-color: ${(p) => p.theme.colors.primary};
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.secondary};
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

/* Toast container anchor (kept) */
export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

/* Toggle Switch */
export const ToggleSwitch = styled.input`
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: ${(p) =>
    p.checked ? p.theme.colors.emaraldgreen : "#ccc"};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.3s;
    transform: ${(p) => (p.checked ? "translateX(25px)" : "translateX(0)")};
  }

  &:focus {
    outline: none;
  }
`;
