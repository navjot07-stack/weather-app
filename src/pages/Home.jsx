import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Home() {
  const [city, setCity] = useState("Kathmandu");

  const [unit, setUnit] = useState(
    localStorage.getItem("weatherUnit") || "C"
  );

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: API_KEY,
              units: unit === "C" ? "metric" : "imperial",
            },
          }
        );

        setWeather(response.data);
      } catch (error) {
        console.error("Weather API error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to fetch weather data."
        );

        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  const getWeatherType = () => {
    if (!weather) return "clear";

    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("thunderstorm")) {
      return "thunderstorm";
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "rain";
    }

    if (condition.includes("snow")) {
      return "snow";
    }

    if (
      condition.includes("mist") ||
      condition.includes("fog") ||
      condition.includes("haze") ||
      condition.includes("smoke") ||
      condition.includes("dust")
    ) {
      return "fog";
    }

    if (condition.includes("cloud")) {
      return "clouds";
    }

    return "clear";
  };

  const weatherType = getWeatherType();

  const weatherIcon = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    : "";

  const createRainDrops = () => {
    return Array.from({ length: 35 }, (_, index) => (
      <span
        key={index}
        className="rain-drop"
        style={{
          left: `${(index * 37) % 100}%`,
          animationDelay: `${(index * 0.13) % 1.8}s`,
          animationDuration: `${0.7 + ((index * 17) % 10) / 10}s`,
        }}
      />
    ));
  };

  const createSnowflakes = () => {
    return Array.from({ length: 30 }, (_, index) => (
      <span
        key={index}
        className="snowflake"
        style={{
          left: `${(index * 41) % 100}%`,
          animationDelay: `${(index * 0.2) % 3}s`,
          animationDuration: `${3 + ((index * 13) % 20) / 10}s`,
        }}
      >
        ❄
      </span>
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">LIVE WEATHER</p>

          <h1>Weather Dashboard</h1>

          <p className="dashboard-subtitle">
            Real-time conditions from around the world.
          </p>
        </div>

        <div className="dashboard-controls">
          <select
            className="city-select"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            <option value="Kathmandu">Kathmandu</option>
            <option value="London">London</option>
            <option value="New York">New York</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Sydney">Sydney</option>
          </select>

          <div className="unit-toggle">
            <button
              className={unit === "C" ? "selected" : ""}
              onClick={() => setUnit("C")}
            >
              °C
            </button>

            <button
              className={unit === "F" ? "selected" : ""}
              onClick={() => setUnit("F")}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Updating weather...</p>
        </div>
      )}

      {error && (
        <div className="weather-error">
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="weather-dashboard">

          {/* MAIN WEATHER CARD */}

          <section className={`main-weather-card weather-${weatherType}`}>

            {/* Animated weather background */}

            <div className="weather-animation" aria-hidden="true">

              {weatherType === "clear" && (
                <>
                  <div className="animated-sun"></div>
                  <div className="sun-glow"></div>
                </>
              )}

              {weatherType === "clouds" && (
                <>
                  <div className="animated-cloud cloud-one"></div>
                  <div className="animated-cloud cloud-two"></div>
                  <div className="animated-cloud cloud-three"></div>
                </>
              )}

              {(weatherType === "rain" ||
                weatherType === "thunderstorm") && (
                <div className="rain-container">
                  {createRainDrops()}
                </div>
              )}

              {weatherType === "thunderstorm" && (
                <div className="lightning"></div>
              )}

              {weatherType === "snow" && (
                <div className="snow-container">
                  {createSnowflakes()}
                </div>
              )}

              {weatherType === "fog" && (
                <>
                  <div className="fog-layer fog-one"></div>
                  <div className="fog-layer fog-two"></div>
                  <div className="fog-layer fog-three"></div>
                </>
              )}

            </div>

            {/* Weather information */}

            <div className="weather-card-content">

              <div className="location">
                <span>📍</span>

                <div>
                  <h2>
                    {weather.name}, {weather.sys.country}
                  </h2>

                  <p>Current weather</p>
                </div>
              </div>

              <div className="main-weather">

                <img
                  src={weatherIcon}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />

                <div>
                  <div className="big-temperature">
                    {Math.round(weather.main.temp)}
                    <span>°{unit}</span>
                  </div>

                  <p className="condition">
                    {weather.weather[0].description}
                  </p>

                  <p className="feels">
                    Feels like{" "}
                    {Math.round(weather.main.feels_like)}
                    °{unit}
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* WEATHER DETAILS */}

          <section className="details-grid">

            <div className="info-card">
              <span className="info-icon">💧</span>

              <div>
                <p>Humidity</p>
                <strong>
                  {weather.main.humidity}%
                </strong>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">💨</span>

              <div>
                <p>Wind Speed</p>

                <strong>
                  {weather.wind.speed}{" "}
                  {unit === "C" ? "m/s" : "mph"}
                </strong>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">🌡️</span>

              <div>
                <p>Feels Like</p>

                <strong>
                  {Math.round(weather.main.feels_like)}
                  °{unit}
                </strong>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">🔽</span>

              <div>
                <p>Pressure</p>

                <strong>
                  {weather.main.pressure} hPa
                </strong>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">☁️</span>

              <div>
                <p>Cloudiness</p>

                <strong>
                  {weather.clouds.all}%
                </strong>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">👁️</span>

              <div>
                <p>Visibility</p>

                <strong>
                  {weather.visibility >= 10000
                    ? "10+ km"
                    : `${(
                        weather.visibility / 1000
                      ).toFixed(1)} km`}
                </strong>
              </div>
            </div>

          </section>
        </div>
      )}
    </div>
  );
}

export default Home;