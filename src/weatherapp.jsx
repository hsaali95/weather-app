import React, { useEffect, useState } from "react";
import "./index.css";

export const Weatherapp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("karachi");
  const [searchCityState, setSearchCityState] = useState("karachi");
  console.log("data", weatherData);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCityState}&lat={lat}&lon={lon}&appid=1e01c0820f296768edb6816c17147b77&units=metric`
    )
      .then((res) => res.json())
      .then((result) => setWeatherData(result))
      .catch((err) => console.log(err));
  }, [searchCityState]);
  const searchCity = (e) => {
    setSearchCityState(cityName);
    console.log(cityName);
  };

  return (
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
          }@2x.png`}
        />
      </li>
      <li>
        country:{weatherData && weatherData.sys && weatherData.sys.country}
      </li>
      <li>city:{weatherData && weatherData.name}</li>
      <li>
        current Temp:{weatherData && weatherData.main && weatherData.main.temp}
        &deg;{" "}
      </li>
      <li>
        feels like :
        {weatherData && weatherData.main && weatherData.main.feels_like}
        &deg;{" "}
      </li>
      <li>
        Temp min:{weatherData && weatherData.main && weatherData.main.temp_min}
        &deg;{" "}
      </li>
      <li>
        Temp max:{weatherData && weatherData.main && weatherData.main.temp_max}
        &deg;{" "}
      </li>
      {/* <li>Feels like: {weatherData.main.feels_like}&deg;</li>
      <li>Temp min: {weatherData.main.temp_min}&deg;</li>
      <li>Temp max: {weatherData.main.temp_max}&deg;</li>
      <li>humidity:{weatherData.main.humidity}%</li>
      <li>Wind speed {weatherData.wind.speed}m/s </li> */}
    </div>
  );
};
export default Weatherapp;
