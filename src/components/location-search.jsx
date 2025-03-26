"use client";
import React, { useState } from "react";

export default function LocationSearch({ onWeatherFetched }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/get-weather?city=${city}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        onWeatherFetched(data); // Send weather data to parent component
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      setError("Please enter a city name");
      return;
    }
    fetchWeather(searchValue);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-inter"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            disabled={loading}
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-search"}`}></i>
          </button>
        </div>
      </form>
      {error && (
        <div className="absolute -bottom-6 left-0 text-sm text-red-500 dark:text-red-400 font-inter">
          {error}
        </div>
      )}
    </div>
  );
}