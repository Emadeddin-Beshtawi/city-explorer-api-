"use strict";
const axios = require("axios");
const cache = require("./cache.js");
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
let movieInfo = [];
getMovie("paris");
function getMovie(query) {
  const key = "movie-" + query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache movie hit");
  } else {
    console.log("Cache movie miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseMovie(response.data));
  }
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    movieInfo = movieData.results.map((x) => {
      return new MovieSet(x);
    });
    console.log(movieInfo);

    return Promise.resolve(movieInfo);
  } catch (e) {
    return Promise.reject(e);
  }
}

class MovieSet {
  constructor(t) {
    this.title = t.title;
    this.overview = t.overview;
    this.average_votes = t.vote_average;
    this.total_votes = t.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${t.poster_path}`;
    this.popularity = t.popularity;
    this.released_on = t.release_date;
  }
}

module.exports = getMovie;
