import React from "react";
import { PaginationWrapper, PaginationButton } from "./Pagination.styles";

const ITEMS_PER_PAGE = 6;

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationWrapper>
      <span>
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
        {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} from {totalItems}
      </span>

      <div>
        <PaginationButton onClick={() => handlePageChange(currentPage - 1)}>
          ◀
        </PaginationButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationButton
            key={i}
            active={currentPage === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </PaginationButton>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
