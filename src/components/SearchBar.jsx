import React from "react";

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Cari catatan..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  );
}

export default SearchBar;
