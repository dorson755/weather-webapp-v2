"use client";
import React, { useState, useMemo } from "react";
import WeatherAnimation from "../components/weather-animation";
import LocationSearch from "../components/location-search";
import TemperatureToggle from "../components/temperature-toggle";
import WeatherCard from "../components/weather-card";
import ForecastCarousel from "../components/forecast-carousel";

function MainComponent() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("celsius");

  // Memoized function to determine time of day
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
  }, []);

  // Memoized function to get the background gradient based on time of day
  const backgroundGradient = useMemo(() => {
    const gradients = {
      morning: "from-blue-300 via-purple-200 to-pink-200",
      afternoon: "from-blue-400 via-blue-300 to-blue-200",
      evening: "from-orange-400 via-purple-400 to-blue-500",
      night: "from-gray-900 via-purple-900 to-blue-900",
    };
    return gradients[timeOfDay];
  }, [timeOfDay]);

  const handleSearch = async (searchCity) => {
    if (!searchCity || searchCity.trim().length === 0) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: searchCity.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Weather service error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.temperature || !data.location) {
        throw new Error("Invalid weather data received");
      }

      setWeatherData(data);
      setCity(searchCity);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(
        err.message || "Failed to fetch weather data. Please try again."
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${backgroundGradient} transition-colors duration-1000 p-4 md:p-8`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Search and Temperature Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full md:w-2/3">
            <LocationSearch
              value={city}
              onChange={setCity}
              onSearch={handleSearch}
              loading={loading}
              error={error}
              placeholder="Enter a city name..."
            />
          </div>
          <div className="w-full md:w-auto">
            <TemperatureToggle value={unit} onChange={setUnit} />
          </div>
        </div>

        {/* Weather Display */}
        <div className="relative mb-8">
          {weatherData && !loading && (
            <div className="absolute inset-0 z-0">
              <WeatherAnimation condition={weatherData.condition} />
            </div>
          )}

          <div className="relative z-10 flex justify-center items-center min-h-[400px]">
            <WeatherCard
              temperature={weatherData?.temperature}
              condition={weatherData?.condition}
              humidity={weatherData?.humidity}
              wind={weatherData?.wind}
              pressure={weatherData?.pressure}
              location={weatherData?.location}
              loading={loading}
              error={error}
              unit={unit}
            />
          </div>
        </div>

        {/* Weather Forecast */}
        {weatherData?.forecast?.length > 0 && (
          <div className="relative z-10">
            <ForecastCarousel forecasts={weatherData.forecast} unit={unit} />
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="text-center p-4 bg-red-100 dark:bg-red-900/30 rounded-xl backdrop-blur-md">
            <p className="text-red-600 dark:text-red-400 font-inter">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
