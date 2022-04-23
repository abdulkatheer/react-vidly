import React from "react";

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <input
      type="text"
      name="search"
      value={searchQuery}
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control"
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchBox;
