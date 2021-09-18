"use strict";
const axios = require("axios");
const cache = require("./cache.js");
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
let weatherInfo = [];

getWeather(48, 2);
function getWeather(lat, lon) {
  const key = "weather-" + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHERBIT_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache weather hit");
  } else {
    console.log("Cache weather miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    weatherInfo = weatherData.data.map((x) => {
      return new ForeCast(x);
    });

    console.log(weatherInfo);

    return Promise.resolve(weatherInfo);
  } catch (e) {
    return Promise.reject(e);
  }
}

class ForeCast {
  constructor(day) {
    this.description = `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`;
    this.date = day.datetime;
  }
}

module.exports = getWeather;
