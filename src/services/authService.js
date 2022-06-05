import http from "./httpService";
import config from "../config.json";

export async function authenticateUser(credentials) {
  return await http.post(`${config.apiBaseUrl}/auth`, {
    email: credentials.username,
    password: credentials.password,
  });
}
