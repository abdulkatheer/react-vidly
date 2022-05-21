import * as genresAPI from "./genreService";
import http from "./httpService";
import config from "../config.json";

export async function getMovies() {
  const { data: movies } = await http.get(`${config.apiBaseUrl}/movies`);
  return movies;
}

export async function getMovie(id) {
  const movies = await getMovies();
  return movies.find((m) => m._id === id);
}

export async function saveMovie(movie) {
  const movies = await getMovies();
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  const genres = await genresAPI.getGenres();
  movieInDb.genre = genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  const movieDTO = mapModelToDTO(movieInDb);

  let upsertedMovie;
  if (movieInDb._id) {
    const result = await http.put(
      `${config.apiBaseUrl}/movies/${movieInDb._id}`,
      movieDTO
    );
    upsertedMovie = result.data;
  } else {
    const result = await http.post(`${config.apiBaseUrl}/movies`, movieDTO);
    upsertedMovie = result.data;
  }

  return upsertedMovie;
}

export async function deleteMovie(id) {
  await http.delete(`${config.apiBaseUrl}/movies/${id}`);
}

function mapModelToDTO(movieModel) {
  return {
    title: movieModel.title,
    genreId: movieModel.genre._id,
    numberInStock: movieModel.numberInStock,
    dailyRentalRate: movieModel.dailyRentalRate,
  };
}
