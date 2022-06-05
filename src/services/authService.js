import jwtDecode from "jwt-decode";

import http from "./httpService";
import config from "../config.json";

const TOKEN_KEY = "authToken";

export async function login(credentials) {
  const { data: token } = await http.post(`${config.apiBaseUrl}/auth`, {
    email: credentials.username,
    password: credentials.password,
  });
  localStorage.setItem(TOKEN_KEY, token);
}

export async function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const authToken = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(authToken);
  } catch (e) {
    console.error("Unexpected error", e);
    return null;
  }
}

export async function loginWithToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
