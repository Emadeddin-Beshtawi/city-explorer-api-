"use strict";

//============================Packages================================

const express = require("express"); //to load modules and give you access to their exports

const cors = require("cors"); //lets our computer talk to itself

//TODO: load dotenv

require("dotenv").config(); // read the '.env' files's saved env variables AFTER reading the real env's variables

//============================Apps================================
const app = express(); // express() will return a fully ready to run server object

app.use(cors()); // enables local processes to talk  to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT; //If there is a port use it

//============================Routes================================
//const weatherData = require("./data/weather.json"); //in an express server, we can synchronously get data from a local json file without a .then

const weatherData = require("./data/weather.json");

//#region weather

app.get("/weather", (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  let searchQuery = req.query.searchQuery;
  if ((lat && lon) || searchQuery) {
    let results = weatherData.find((item) => item.display_name === searchQuery);
    if (results) {
      let forCast = results.data.map((item) => {
        return {
          date: item.datetime,
          description: item.weather.description,
        };
      });
      res.status(200).json(forCast);
    } else {
      res.status(404).send("City Not Found");
    }
  } else {
    res.status(400).send("please send right query params");
  }
});

//============================Initialization================================
// I can visit this server on http://localhost:8000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

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
