import React from "react";
import { PaginationWrapper, PaginationButton } from "./Pagination.styles";

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationWrapper>
      <span>
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} from {totalItems}
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
