import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-4">
        {/* Previous Arrow */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`text-white text-base font-bold  ${
            currentPage === 1
              ? "bg-transparent cursor-not-allowed"
              : "bg-transparent hover:bg-gray-400"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded text-white text-base font-bold ${
                page === currentPage
                  ? "bg-primary "
                  : "bg-background-100  hover:bg-gray-400"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Arrow */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={` text-white text-base font-bold ${
            currentPage === totalPages
              ? "bg-transparent cursor-not-allowed"
              : "bg-transparent hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
