import React from "react";
import "./listGroup.css";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, keyProperty, valueProperty, selectedItem, onItemSelect } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[keyProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  keyProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
