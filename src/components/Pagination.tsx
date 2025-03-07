import React from 'react';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
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
    <div className="flex flex-wrap items-center justify-center space-x-2 p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-[#ebebeb] text-[#322625] disabled:opacity-50"
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200
              ${
                currentPage === page
                  ? 'bg-[#322625] text-white font-bold'
                  : 'bg-[#c0e3e5] text-[#322625] hover:bg-[#fdc936]'
              }`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-[#322625]">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-[#ebebeb] text-[#322625] disabled:opacity-50"
      >
        Next
      </button>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="ml-4 px-3 py-2 rounded-lg border bg-[#ebebeb] text-[#322625]"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
