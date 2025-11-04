import React, { useMemo } from "react";
import { PaginationWrapper, PaginationButton, ButtonsRow  } from "./Pagination.styles";

/** Build an inclusive number range */
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Material-UI–style pagination logic.
 * boundaryCount: pages always shown at the start & end
 * siblingCount: pages shown on each side of the current page
 */
function getPaginationItems(currentPage, totalPages, { boundaryCount = 1, siblingCount = 1 } = {}) {
  // Total numbers that would make ellipses unnecessary:
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(totalPages - boundaryCount + 1, totalPages);

  // Calculate the sliding window for siblings
  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      currentPage + siblingCount,
      boundaryCount + siblingCount * 2 + 2
    ),
    totalPages - boundaryCount - 1
  );

  const items = [
    ...startPages,
    // left ellipsis if needed
    siblingsStart > boundaryCount + 2 ? "start-ellipsis" : boundaryCount + 1,
    ...range(siblingsStart, siblingsEnd),
    // right ellipsis if needed
    siblingsEnd < totalPages - boundaryCount - 1 ? "end-ellipsis" : totalPages - boundaryCount,
    ...endPages,
  ];

  // When we used the fallback numbers instead of ellipses above, dedupe sequences like 1,2,2,3
  const cleaned = [];
  for (const it of items) {
    if (cleaned.length === 0 || cleaned[cleaned.length - 1] !== it) cleaned.push(it);
  }
  return cleaned;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  boundaryCount = 1,
  siblingCount = 1,
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const items = useMemo(
    () => getPaginationItems(currentPage, totalPages, { boundaryCount, siblingCount }),
    [currentPage, totalPages, boundaryCount, siblingCount]
  );

  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <PaginationWrapper>
      <span>
        Showing {showingFrom}-{showingTo} of {totalItems}
      </span>

      {/* single-line, scrollable button row */}
      <ButtonsRow>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ◀
        </PaginationButton>

        {items.map((it, idx) =>
          it === "start-ellipsis" || it === "end-ellipsis" ? (
            <PaginationButton key={it + idx} disabled>
              …
            </PaginationButton>
          ) : (
            <PaginationButton
              key={it}
              active={currentPage === it}
              onClick={() => handlePageChange(it)}
            >
              {it}
            </PaginationButton>
          )
        )}

        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </PaginationButton>
      </ButtonsRow>
    </PaginationWrapper>
  );
};

export default Pagination;
