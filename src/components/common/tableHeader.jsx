import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.name || column.key}
              onClick={column.path ? () => this.raiseSort(column.path) : null}
            >
              {column.name}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (column.path === sortColumn.path) {
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-asc"></i>
      ) : (
        <i className="fa fa-sort-desc"></i>
      );
    } else {
      return null;
    }
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
