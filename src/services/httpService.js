import Axios from "axios";

Axios.interceptors.response.use(null, (error) => {
  console.log("Interceptor Called", error.response);
  const clientError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!clientError) {
    console.log(error);
    alert.error("An unexpected error occurred!");
  }
  return Promise.reject(error);
});

function setToken(token) {
  Axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setToken,
};
