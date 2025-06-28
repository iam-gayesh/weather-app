import React, { useEffect, useState } from "react";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snow from "../assets/images/snowy.png";

const MainPage = () => {
  const [searchData, setSearchData] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const apiKey = "976680a37f7c1b5420262c6c3c32c247";

  useEffect(() => {
    fetchWeatherData("Colombo");
  }, []);

  const handleSearchChange = (event) => {
    setSearchData(event.target.value);
  };

  const fetchWeatherData = async (city) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getFormattedDateTime = (dt, timezone) => {
    if (dt == null || timezone == null) return { date: "", time: "" };

    const utcDate = new Date(dt * 1000);
    const localTimeMs = utcDate.getTime() + timezone * 1000;
    const localDate = new Date(localTimeMs);

    const optionsDate = { day: "numeric", month: "long" };
    const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };

    return {
      date: localDate.toLocaleDateString("en-GB", optionsDate),
      time: localDate.toLocaleTimeString("en-GB", optionsTime),
    };
  };

  const { date, time } = getFormattedDateTime(
    weatherData?.dt,
    weatherData?.timezone
  );

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <img src={sunny} alt="Sunny" />;
      case "Clouds":
        return <img src={cloudy} alt="Cloudy" />;
      case "Rain":
      case "Drizzle":
        return <img src={rainy} alt="Rainy" />;
      case "Thunderstorm":
        return <img src={thunder} alt="Thunderstorm" />;
      case "Snow":
        return <img src={snow} alt="Snowy" />;
      case "Mist":
      case "Haze":
      case "Fog":
        return <img src={cloudy} alt="Foggy" />;
      //   case "Smoke":
      //     return <img src={smoke} alt="Smoky" />;
      //   case "Dust":
      //   case "Sand":
      //     return <img src={dust} alt="Dusty" />;
      //   case "Ash":
      //     return <img src={ash} alt="Ash" />;
      //   case "Squall":
      //     return <img src={windy} alt="Squall" />;
      //   case "Tornado":
      //     return <img src={tornado} alt="Tornado" />;
      default:
        return <img src={sunny} alt="Default Weather" />;
    }
  };

  const getBackgroundStyle = (condition) => {
    switch (condition) {
      case "Clear":
        return {
          background: "linear-gradient(to right, #f3b07c, #fcd238)",
        };
      case "Clouds":
        return {
          background: "linear-gradient(to right, #d7d2cc, #304352)",
        };
      case "Rain":
      case "Drizzle":
        return {
          background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        };
      case "Thunderstorm":
        return {
          background: "linear-gradient(to right, #373B44, #4286f4)",
        };
      case "Snow":
        return {
          background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        };
      case "Mist":
      case "Fog":
      case "Haze":
        return {
          background: "linear-gradient(to right, #757F9A, #D7DDE8)",
        };
      case "Smoke":
        return {
          background: "linear-gradient(to right, #434343, #000000)",
        };
      case "Dust":
      case "Sand":
        return {
          background: "linear-gradient(to right, #d1913c, #ffd194)",
        };
      case "Ash":
        return {
          background: "linear-gradient(to right, #3E5151, #DECBA4)",
        };
      case "Squall":
        return {
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
        };
      case "Tornado":
        return {
          background: "linear-gradient(to right, #000000, #434343)",
        };
      default:
        return {
          background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
        };
    }
  };

  const getApplicationStyle = (condition) => {
    switch (condition) {
      case "Clear":
        return {
          background: "linear-gradient(to top, #fcb045, #fd1d1d)", // vivid sunny
        };
      case "Clouds":
        return {
          background: "linear-gradient(to top, #89f7fe, #66a6ff)", // cool clouds
        };
      case "Rain":
      case "Drizzle":
        return {
          background: "linear-gradient(to top, #3a7bd5, #3a6073)", // moody rain
        };
      case "Thunderstorm":
        return {
          background: "linear-gradient(to top, #1f1c2c, #928dab)", // deep storm
        };
      case "Snow":
        return {
          background: "linear-gradient(to top, #83a4d4, #b6fbff)", // frosty snow
        };
      case "Mist":
      case "Fog":
      case "Haze":
        return {
          background: "linear-gradient(to top, #757f9a, #d7dde8)", // faded mist
        };
      case "Smoke":
        return {
          background: "linear-gradient(to top, #232526, #414345)", // heavy smoke
        };
      case "Dust":
      case "Sand":
        return {
          background: "linear-gradient(to top, #eacda3, #d6ae7b)", // earthy
        };
      case "Ash":
        return {
          background: "linear-gradient(to top, #1e130c, #9a8478)", // ash tone
        };
      case "Squall":
        return {
          background: "linear-gradient(to top, #005c97, #363795)", // intense wind
        };
      case "Tornado":
        return {
          background: "linear-gradient(to top, #000000, #434343)", // dark swirl
        };
      default:
        return {
          background: "linear-gradient(to top, #bdc3c7, #2c3e50)", // fallback
        };
    }
  };

  return (
    <div
      className="container"
      style={getBackgroundStyle(weatherData?.weather?.[0]?.main)}
    >
      <div
        className="application"
        style={getApplicationStyle(weatherData?.weather?.[0]?.main)}
      >
        <div className="header">
          <div className="location-indicator">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{weatherData?.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchData}
              onChange={handleSearchChange}
            />
            <button type="button" onClick={() => fetchWeatherData(searchData)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="weather-info">
          <div className="weather-icon">
            {getWeatherIcon(weatherData?.weather?.[0]?.main)}
          </div>

          <div className="weather-condition">
            {weatherData?.weather?.[0]?.main}
          </div>
          <div className="temp">{weatherData?.main?.temp} °C</div>
          <div className="date-time">
            <div className="date">Today, {date}</div>
            {/* <div className="time">{time}</div> */}
          </div>
          <div className="weather-data">
            <div className="humidity">
              <div>Humidity</div>
              <i className="fa-solid fa-droplet"></i>
              <div className="humidity-value">
                {weatherData?.main?.humidity}%
              </div>
            </div>
            <div className="wind-speed">
              <div>Wind Speed</div>
              <i className="fa-solid fa-wind"></i>
              <div className="wind-speed-value">
                {weatherData?.wind?.speed} km/h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
