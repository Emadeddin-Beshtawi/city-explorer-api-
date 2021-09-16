"use strict";

//============================Packages================================
const axios = require("axios");

const express = require("express"); //to load modules and give you access to their exports

const cors = require("cors"); //lets our computer talk to itself

//TODO: load dotenv

require("dotenv").config(); // read the '.env' files's saved env variables AFTER reading the real env's variables

//============================Apps================================
const app = express(); // express() will return a fully ready to run server object

app.use(cors()); // enables local processes to talk  to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT; //If there is a port use it

//============================Routes================================
app.get("/", (req, res) => {
  res.status(200).json({ message: "I'm working" });
});

const weatherController =require("./weather");
const movieController = require("./movie")

///////// Task 1 for weather ///////////
// let handleWeather = async (req, res) => {
//   let lat = Number(req.query.lat);
//   let lon = Number(req.query.lon);
//   if (lat && lon) {
//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`;
//     let axiosResponse = await axios.get(url);
//     let weatherData = axiosResponse.data;
//     let cleanedData = weatherData.data.map((item) => {
//       return new ForeCast(item.datetime, item.weather.description);
//     });
//     let result = {
//       city_name: weatherData.city_name,
//       foreCast: cleanedData,
//     };
//     res.status(200).json(result);
//   } else {
//     res.status(500).send("please provide correct query params");
//   }
// };

app.get("/weather", weatherController);

// Creating a class to model the data
// class ForeCast {
//   constructor(date, description) {
//     this.date = date;
//     this.description = description;
//   }
// }

///////// Task 2 for Movie /////////

// let handleMovie = async (req, res) => {
//   let movCity = req.query.query;
//   let urlForMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movCity}`;
//   let axiosMovieResponse = await axios.get(urlForMovie);

//   let MovieData = axiosMovieResponse.data.results.map((item) => {
//     return new MovieSet(
//       item.title,
//       item.overview,
//       item.vote_average,
//       item.vote_count,
//       item.poster_path,
//       item.popularity,
//       item.release_date
//     );
//   });
//   res.status(200).json(MovieData);
// };

app.get("/movie", movieController);

// Creating a class to model the data
// class MovieSet {
//   constructor(
//     title,
//     overview,
//     average_votes,
//     total_votes,
//     image_url,
//     popularity,
//     released_on
//   ) {
//     this.title = title;
//     this.overview = overview;
//     this.average_votes = average_votes;
//     this.total_votes = total_votes;
//     this.image_url = "https://image.tmdb.org/t/p/w500" + image_url;
//     this.popularity = popularity;
//     this.released_on = released_on;
//   }
// }

//============================Initialization================================
// I can visit this server on http://localhost:8000

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

////////////////// Important instructions //////////////

/*
## Set up Server
- Create and clone down a github repository
- touch server.js
- npm init
- npm install -S express dotenv cors - Install needed libraries
-Setup the server.js file
- Loading the packages
- setting up the app
- adding routes
- starting the server
*/

/*
    The Environment: the collection of all variables that belong to the terminal window your code is running in
    I want to use the PORT the computer wants me to use since the port is a computerish thing
    I will pick my port from the environment.
    Creating a variable in your terminals env is 'export VARNAME=value'
    It is semantic to name your variables in all caps
    If I want to look at the env variables in the terminal type: 'env'
    To see them in javascript: 'process.env.VARNAME'
    As devs, we can save our environment variables in a file called '.env'
    
    When data is sent from the client to the backend, it comes in a property: ' request.query'
    */