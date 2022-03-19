import React from "react";
import { Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/common/customers";
import NotFound from "./components/notFound";
import Rentals from "./components/common/rentals";
import Movie from "./components/movie";
import { Switch } from "react-router-dom";

const App = () => (
  <React.Fragment>
    <NavBar />
    <main className="container">
      <Switch>
        <Route path="/movies/:id" component={Movie} />
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
