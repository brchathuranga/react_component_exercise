import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";

class TableComponent extends Component {
  state = {
    movieList: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null
  };

  componentDidMount() {
    this.setState({ genres: getGenres(), movieList: getMovies() });
  }
  handleDeleteMovie = movieId => {
    const movies = this.state.movieList.filter(m => m._id !== movieId);
    this.setState({ movieList: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleLike = movie => {
    const movieList = [...this.state.movieList];
    const index = movieList.indexOf(movie);
    movieList[index] = { ...movieList[index] };
    movieList[index].liked = !movieList[index].liked;
    this.setState({ movieList });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre });
  };
  render() {
    const { length: count } = this.state.movieList;
    const {
      pageSize,
      currentPage,
      movieList,
      genres,
      selectedGenre
    } = this.state;

    if (count !== 0) {
      return (
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              OnItemSelect={this.handleGenreSelect}
              selected={selectedGenre}
            />
          </div>
          <div className="col">
            <p className="lead">Showing {count} movies in the database.</p>
            {this.generatetableStructure(movieList, currentPage, pageSize)}
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              onPagechange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      );
    }
    return <p className="lead">There are no movies in the database.</p>;
  }

  generatetableStructure(movieList, currentPage, pageSize) {
    const movies = paginate(movieList, currentPage, pageSize);
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  onLikeToggled={() => this.handleLike(movie)}
                />
              </td>
              <td>
                <button
                  onClick={() => this.handleDeleteMovie(movie._id)}
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
}
export default TableComponent;
