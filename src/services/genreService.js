import http from "./httpService";

export async function getGenres() {
  const { data: genres } = await http.get("http://localhost:3900/api/genres");
  return genres;
}
