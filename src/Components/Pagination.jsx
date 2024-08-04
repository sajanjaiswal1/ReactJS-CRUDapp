import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 border rounded ${currentPage === page ? ' text-blue-500' : 'bg-white text-black hover:bg-blue-500'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
