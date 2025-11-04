import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 95%;
  box-sizing: border-box;

  /* Stack on very small screens: text on top, buttons below */
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;

    > span {
      /* ensure the "Showing X–Y" line doesn't force scrolling */
      white-space: normal;
    }
  }
`;

/* NEW: a single-line, horizontally scrollable row for page buttons */
export const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;               /* ⬅ keep on one line */
  // overflow-x: auto;                  /* ⬅ allow scroll if too many */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;             /* Firefox hide scrollbar */
  flex: 0 1 auto;
  max-width: 100%;

  &::-webkit-scrollbar {
    display: none;                   /* WebKit hide scrollbar */
  }
`;

export const PaginationButton = styled.button`
  flex: 0 0 auto;                    /* ⬅ don't shrink, stay inline */
  background-color: ${({ active }) => (active ? '#007bff' : '#E5F2FF')};
  color: ${({ active }) => (active ? '#fff' : '#007BFF')};
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  margin: 0;                         /* gap is handled by ButtonsRow */
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
