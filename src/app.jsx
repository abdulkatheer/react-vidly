import React from "react";
import { Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/common/customers";
import NotFound from "./components/notFound";
import Rentals from "./components/common/rentals";
import { Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <React.Fragment>
    <ToastContainer />
    <NavBar />
    <main className="container">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  </React.Fragment>
);

export default App;
