import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/common/customers";
import NotFound from "./components/notFound";
import Rentals from "./components/common/rentals";
import { Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: getCurrentUser() });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
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
  }
}

export default App;
