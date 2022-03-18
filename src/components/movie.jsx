import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <div>
        <h1>Movie {this.props.match.params.id}</h1>
        <button type="button" className="btn btn-primary" onClick={this.onSave}>
          Save
        </button>
      </div>
    );
  }

  onSave = () => {
    this.props.history.push("/movies");
  };
}

export default Movie;
