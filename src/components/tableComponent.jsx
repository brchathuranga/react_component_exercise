import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
//import { deleteMovie } from "../services/fakeMovieService";

class TableComponent extends Component {
  state = {
    movieList: getMovies()
  };
  render() {
    const { length: count } = this.state.movieList;
    if (count !== 0) {
      return (
        <React.Fragment>
          <p className="lead">Showing {count} movies in the database.</p>
          {this.generatetableStructure()}
        </React.Fragment>
      );
    }
    return <p className="lead">There are no movies in the database.</p>;
  }

  generatetableStructure() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.movieList.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button
                  onClick={() => this.deleteMovie(movie._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  deleteMovie(movieId) {
    // deleteMovie(movieId);
    const movies = this.state.movieList.filter(m => m._id !== movieId);
    this.setState({ movieList: movies });
  }
}
export default TableComponent;
