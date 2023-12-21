import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    const location = axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}=Bielefeld&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Event
  const weatherInput = (e) => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => {
        <h1>not found</h1>;
      });
  };
  return (
    <div className="App">
      {weather && (
        <div className="App-header">
          <div className="search ">
            <input type="text" onChange={weatherInput} />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <h2 className="App-link">{weather.location.name}</h2>
            <div className="condition ">
              <h3> {weather.current.condition.text}</h3>
              <img className="App-logo" src={weather.current.condition.icon} alt="" />
              <h3>{weather.current.temp_c} Celsius</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
