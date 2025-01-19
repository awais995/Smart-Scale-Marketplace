"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="mt-6 flex justify-center items-center gap-2">
    <button
      className="px-3 py-1 border rounded"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={`px-3 py-1 border rounded ${
          currentPage === index + 1 ? "bg-black text-white" : "bg-gray-100"
        }`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    <button
      className="px-3 py-1 border rounded"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
