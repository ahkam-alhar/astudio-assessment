import React from 'react';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
  pageSize,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxPagesToShow = 5;

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-1 py-1 sm:px-3 sm:py-2 rounded-lg bg-grey text-black disabled:opacity-50 mt-2"
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-1 py-1 sm:px-4 sm:py-2 rounded-lg border transition-all duration-200
              ${
                currentPage === page
                  ? 'bg-black text-white font-bold'
                  : 'bg-blue text-black hover:bg-yellow'
              }`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-black">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-1 py-1 sm:px-3 sm:py-2 rounded-lg bg-grey text-black disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
