import http from "./httpService";

export async function registerUser(user) {
  return await http.post('/users', {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
