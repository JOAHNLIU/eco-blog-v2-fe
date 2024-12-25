import React from 'react';

function Pagination({ currentPage, onPageChange, hasNextPage }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange('prev')}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="pagination-info">Page {currentPage}</span>
      <button
        onClick={() => onPageChange('next')}
        disabled={!hasNextPage}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
