import React, { useState } from 'react';

function SortDropdown({ onSortChange, currentSort }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSort = (type) => {
    onSortChange(type);
    setShowDropdown(false);
  };

  return (
    <div className="sort-dropdown">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flat-button"
      >
        Sort by: {currentSort === 'date' ? 'Date' : 'Likes'}
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <button onClick={() => handleSort('date')}>Date</button>
          <button onClick={() => handleSort('likes')}>Likes</button>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;