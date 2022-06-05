import http from "./httpService";
import config from "../config.json";

export async function registerUser(user) {
  return await http.post(`${config.apiBaseUrl}/users`, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
