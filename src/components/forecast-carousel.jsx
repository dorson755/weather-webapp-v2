"use client";
import React, { useState } from "react";

// MainComponent for displaying the forecast
function MainComponent({ forecasts = [], unit = "celsius" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentIndex((prev) => (prev === forecasts.length - 1 ? prev : prev + 1));
    }
    if (touchStart - touchEnd < -75) {
      setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 overflow-hidden">
      <div className="hidden md:flex justify-between gap-4">
        {forecasts.map((forecast, index) => (
          <ForecastCard
            key={index}
            day={forecast.day}
            condition={forecast.condition}
            temperature={forecast.temperature}
            unit={unit}
          />
        ))}
      </div>

      <div
        className="md:hidden relative w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {forecasts.map((forecast, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <ForecastCard
                day={forecast.day}
                condition={forecast.condition}
                temperature={forecast.temperature}
                unit={unit}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-[-20px] left-0 right-0 flex justify-center gap-2">
          {forecasts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-gray-900 dark:bg-white w-4" : "bg-gray-400 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// StoryComponent to demonstrate different forecast states
function StoryComponent() {
  const [unit, setUnit] = useState("celsius");

  const sampleForecasts = [
    {
      day: "Monday",
      condition: "Sunny",
      temperature: {
        high: { celsius: 25, fahrenheit: 77 },
        low: { celsius: 18, fahrenheit: 64 },
      },
    },
    {
      day: "Tuesday",
      condition: "Rainy",
      temperature: {
        high: { celsius: 20, fahrenheit: 68 },
        low: { celsius: 15, fahrenheit: 59 },
      },
    },
    {
      day: "Wednesday",
      condition: "Partly Cloudy",
      temperature: {
        high: { celsius: 22, fahrenheit: 72 },
        low: { celsius: 16, fahrenheit: 61 },
      },
    },
    {
      day: "Thursday",
      condition: "Thunderstorm",
      temperature: {
        high: { celsius: 19, fahrenheit: 66 },
        low: { celsius: 14, fahrenheit: 57 },
      },
    },
    {
      day: "Friday",
      condition: "Clear",
      temperature: {
        high: { celsius: 23, fahrenheit: 73 },
        low: { celsius: 17, fahrenheit: 63 },
      },
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">Default State</h3>
        <MainComponent forecasts={sampleForecasts} unit={unit} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">Empty State</h3>
        <MainComponent forecasts={[]} unit={unit} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">Single Forecast</h3>
        <MainComponent forecasts={[sampleForecasts[0]]} unit={unit} />
      </div>
    </div>
  );
}

export default StoryComponent;
