import React, { useEffect, useState } from "react";
import CLEARSKY from "./images/clearsky.jfif";
import RAIN from "./images/rain.webp";
import Mist from "./images/mist.png";
import SNOW from "./images/snow.jpg";
import THUNDER from "./images/thunder.jpeg";
import CLOUDS from "./images/clouds.jpg";

import "./index.css";

export const Weatherapp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("karachi");
  const [searchCityState, setSearchCityState] = useState("karachi");
  const [bgImage, setBgImage] = useState(CLEARSKY);
  //   const [time, setTime] = useState("");
  console.log("data", weatherData);
  //   console.log(time);
  //   console.log("check data", typeof weatherData);
  //   console.log(bgImage);
  // api for calling weather data
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCityState}&lat={lat}&lon={lon}&appid=1e01c0820f296768edb6816c17147b77&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeatherData(result);
        // passing setBackgroundImage function data as an argument
        setBackgroundImage(result.weather[0].main);
        // convertTime(weatherData.dt);
      })
      .catch((err) => err);
  }, [searchCityState]);

  const searchCity = (e) => {
    setSearchCityState(cityName);
    // console.log(cityName);
  };
  //   console.log("image sec ");
  // function,in which condition checking for background image
  const setBackgroundImage = (code) => {
    if (code === "Clear") {
      setBgImage(CLEARSKY);
    } else if (code === "Clouds") {
      setBgImage(CLOUDS);
    } else if (code === "Snow") {
      setBgImage(SNOW);
    } else if (code === "Thunderstorm") {
      setBgImage(THUNDER);
    } else if (
      code === "Rain" ||
      code === "Drizzle" ||
      code === "Fog" ||
      code === "Dust"
    ) {
      setBgImage(RAIN);
    } else if (code === "Smoke" || code === "Mist") {
      setBgImage(Mist);
    } else {
      setBgImage(CLEARSKY);
    }
  };
  return (
    <div
      className="setBackgroundImage"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <h1>WEATHER APP</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={searchCity}>search</button>
        {/* <button onClick={callApi}>CAll API</button> */}
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${
              weatherData &&
              weatherData.weather &&
              weatherData.weather[0] &&
              weatherData.weather[0].icon
            }@2x.png  `}
          />
        </li>
        <li>
          country:{weatherData && weatherData.sys && weatherData.sys.country}
        </li>
        <li>city:{weatherData && weatherData.name}</li>
        <li>
          current Temp:
          {weatherData &&
            weatherData.main &&
            weatherData.main.temp &&
            weatherData.main.temp.toFixed()}
          &deg;{" "}
        </li>
        <li>
          feels like :
          {weatherData && weatherData.main && weatherData.main.feels_like}
          &deg;{" "}
        </li>
        <li>
          Temp min:
          {weatherData && weatherData.main && weatherData.main.temp_min}
          &deg;{" "}
        </li>
        <li>
          Temp max:
          {weatherData && weatherData.main && weatherData.main.temp_max}
          &deg;{" "}
        </li>
        <li>
          time
          {new Date(weatherData && weatherData.dt * 1000).toLocaleString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZoneName: "short",
            }
          )}
        </li>
        {/* <li>Feels like: {weatherData.main.feels_like}&deg;</li>
      <li>Temp min: {weatherData.main.temp_min}&deg;</li>
      <li>Temp max: {weatherData.main.temp_max}&deg;</li>
      <li>humidity:{weatherData.main.humidity}%</li>
      <li>Wind speed {weatherData.wind.speed}m/s </li> */}
        {/* <img src={bgImage} alt="image" /> */}

        {/* <div style={{ backgroundImage: `url(${bgImage})` }}>

      </div> */}
      </div>
    </div>
  );
};
export default Weatherapp;
