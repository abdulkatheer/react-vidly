import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.buildCellKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderCell(item, column) {
    return column.path ? _.get(item, column.path) : column.content(item);
  }

  buildCellKey(item, column) {
    return item._id + (column.name || column.key);
  }
}

export default TableBody;