import Axios from "axios";

Axios.interceptors.response.use(null, (error) => {
  console.log("Interceptor Called");
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

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
};
