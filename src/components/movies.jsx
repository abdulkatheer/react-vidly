import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { getPageCount, paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MovieTable from "./moviesTable";
import { toast } from "react-toastify";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    this.setState({
      movies: await getMovies(),
      genres,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    console.log("newState", this.state);
  }

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;
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
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies from the database..</p>
            <SearchBox searchQuery={searchQuery} onChange={this.handleSearch} />
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

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const { currentPage, pageSize } = this.state;
    let movies = originalMovies.filter((mov) => mov._id !== movie._id);

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted!");
      }
      movies = originalMovies;
    }

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

  handleSearch = (searchQuery) => {
    this.setState({
      selectedGenre: null,
      currentPage: 1,
      searchQuery: searchQuery,
    });
  };

  getPagedData() {
    const {
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;
    let filtered;

    if (searchQuery) {
      filtered = allMovies.filter((m) => {
        const queryInLowercase = searchQuery.toLowerCase();
        const titleInLowercase = m.title.toLowerCase();
        return titleInLowercase.startsWith(queryInLowercase);
      });
    } else if (selectedGenre != null && selectedGenre.name !== "All Genres") {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    } else {
      filtered = allMovies;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    return {
      totalCount: filtered.length,
      data: paginate(sorted, currentPage, pageSize),
    };
  }
}

export default Movies;
