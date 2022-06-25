import jwtDecode from "jwt-decode";

import http from "./httpService";

const TOKEN_KEY = "authToken";
http.setToken(getToken());

export async function login(credentials) {
  const { data: token } = await http.post('/auth', {
    email: credentials.username,
    password: credentials.password,
  });
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
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

export function loginWithToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
