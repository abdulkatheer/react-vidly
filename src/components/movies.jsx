import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { getPageCount, paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MovieTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    console.log("newState", this.state);
  }

  render() {
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;
    const moviesCount = this.state.movies.length;

    if (moviesCount === 0) {
      return <p>There are no movies in the database!</p>;
    } else {
      const { data: movies, totalCount } = this.getPagedData();
      return (
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelected}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies from the database..</p>
            <MovieTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.hanglePageChange}
            />
          </div>
        </div>
      );
    }
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const { currentPage, pageSize } = this.state;
    let movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    if (getPageCount(movies.length, pageSize) < currentPage) {
      this.setState({
        movies,
        currentPage: currentPage - 1,
      });
    } else {
      this.setState({ movies });
    }
  };

  hanglePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn, currentPage: 1 });
  };

  getPagedData() {
    const {
      selectedGenre,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;
    const filtered =
      selectedGenre == null || selectedGenre.name === "All Genres"
        ? allMovies
        : allMovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    return {
      totalCount: filtered.length,
      data: paginate(sorted, currentPage, pageSize),
    };
  }
}

export default Movies;
