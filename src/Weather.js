import "./App.css";
import axios from "axios";
import { useState } from "react";

export default function Weather() {
  const [temperature, setTemperature] = useState();
  const [inputValue, setInputValue] = useState();
  const [description, setDescription] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState();

  function getInput(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  function fetchWeather(e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=4c9b53e4f8f5eb00df5915bdca340605&units=metric`;
    axios.get(url).then(function (response) {
      setTemperature(Math.round(response.data.main.temp));
      setDescription(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIcon(
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
      );
    });
  }

  return (
    <div className="weather-container">
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="search"
          value={inputValue}
          onChange={getInput}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {temperature && (
        <div className="weather-info">
          <h1 className="city-name">{inputValue}</h1>
          <div className="weather-icon">
            <img src={icon} alt={description} />
          </div>
          <div className="temperature">{temperature}°C</div>
          <div className="description">{description}</div>
          <ul className="weather-details">
            <li>Humidity: {humidity}%</li>
            <li>Wind: {wind} km/h</li>
          </ul>
        </div>
      )}
    </div>
  );
}
