"use strict";

const axios = require("axios");

///////// Task 2 for Movie /////////

let handleMovie = async (req, res) => {
  let movCity = req.query.query;
  let urlForMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movCity}`;
  let axiosMovieResponse = await axios.get(urlForMovie);

  let MovieData = axiosMovieResponse.data.results.map((item) => {
    return new MovieSet(
      item.title,
      item.overview,
      item.vote_average,
      item.vote_count,
      item.poster_path,
      item.popularity,
      item.release_date
    );
  });
  res.status(200).json(MovieData);
};

// Creating a class to model the data
class ForeCast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

console.log("Hello from movie");

module.exports = handleMovie;
