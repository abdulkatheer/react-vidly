import React, { Component } from "react";
import Like from "./common/like";
import "./moviesTable.css";
import PropsTypes from "prop-types";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      name: "Title",
      key: "title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { name: "Genre", path: "genre.name" },
    { name: "Stock", path: "numberInStock" },
    { name: "Price", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteUser = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteUser);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

MoviesTable.propTypes = {
  movies: PropsTypes.array.isRequired,
  sortColumn: PropsTypes.object.isRequired,
  onLike: PropsTypes.func.isRequired,
  onDelete: PropsTypes.func.isRequired,
  onSort: PropsTypes.func.isRequired,
};
