"use client";
import React, { useEffect, useState } from "react";

function MainComponent({ 
  temperature = { celsius: 0, fahrenheit: 32 },
  condition = "Clear",
  humidity = 0,
  wind = { speed_kph: 0, speed_mph: 0, direction: "N" },
  pressure = { mb: 1000, in: 29.92 },
  location = "Unknown",
  loading = false,
  error = null,
  unit = 'celsius'
}) {
  useEffect(() => {
    console.log('Temperature prop received:', temperature);
  }, [temperature]);

  const getWeatherIcon = (condition) => {
    const conditionLower = (condition || "").toLowerCase();
    if (conditionLower.includes('rain')) return 'fa-cloud-rain';
    if (conditionLower.includes('snow')) return 'fa-snowflake';
    if (conditionLower.includes('cloud')) return 'fa-cloud';
    if (conditionLower.includes('thunder')) return 'fa-bolt';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'fa-smog';
    return 'fa-sun';
  };

  const formatNumber = (value, decimals = 0) => {
    if (value === undefined || value === null) return '—';
    return Number(value).toFixed(decimals);
  };

  const getTemperature = () => {
    if (!temperature || typeof temperature !== 'object') {
      return '—';
    }

    const tempValue = unit === 'celsius' ? temperature.celsius : temperature.fahrenheit;
    
    if (typeof tempValue !== 'number') {
      return '—';
    }

    return formatNumber(tempValue, 1);
  };

  const getWindSpeed = () => {
    const speed = unit === 'celsius' ? wind?.speed_kph : wind?.speed_mph;
    return formatNumber(speed);
  };

  const getPressure = () => {
    const pressureValue = unit === 'celsius' ? pressure?.mb : pressure?.in;
    return formatNumber(pressureValue, unit === 'celsius' ? 0 : 2);
  };

  if (loading) {
    return (
      <div className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 min-w-[300px] animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 min-w-[300px]">
        <div className="text-red-500 dark:text-red-400 font-inter text-center">
          <i className="fas fa-exclamation-circle text-2xl mb-2"></i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 min-w-[300px] transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-inter font-bold text-gray-900 dark:text-white">{location || 'Unknown'}</h2>
          <i className={`fas ${getWeatherIcon(condition)} text-2xl text-gray-900 dark:text-white`}></i>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-4xl font-inter font-bold text-gray-900 dark:text-white">
            {getTemperature()}{getTemperature() !== '—' ? `°${unit === 'celsius' ? 'C' : 'F'}` : ''}
          </div>
          <div className="text-lg font-inter text-gray-700 dark:text-gray-300">
            {condition || 'Unknown'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm font-inter text-gray-700 dark:text-gray-300">
          <div className="flex flex-col items-center">
            <i className="fas fa-tint mb-1"></i>
            <span>{formatNumber(humidity)}%</span>
            <span className="text-xs">Humidity</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-wind mb-1"></i>
            <span>{getWindSpeed()} {unit === 'celsius' ? 'km/h' : 'mph'}</span>
            <span className="text-xs">Wind</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-compress-arrows-alt mb-1"></i>
            <span>{getPressure()} {unit === 'celsius' ? 'mb' : 'in'}</span>
            <span className="text-xs">Pressure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryComponent() {
  const [unit, setUnit] = useState('celsius');

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-end">
        <></>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MainComponent 
          temperature={{ celsius: 25.6, fahrenheit: 77.3 }}
          condition="Sunny"
          humidity={45.5}
          wind={{ speed_kph: 15.3, speed_mph: 9.3, direction: "NE" }}
          pressure={{ mb: 1013.4, in: 29.92 }}
          location="London"
          unit={unit}
        />
        
        <MainComponent 
          loading={true}
        />
        
        <MainComponent 
          error="Unable to fetch weather data"
        />
      </div>
    </div>
  );
}

export default function Index() {
  return <StoryComponent />;
}
