import React from "react";

const Dropdown = ({ name, label, options, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        id={name}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dropdown;
