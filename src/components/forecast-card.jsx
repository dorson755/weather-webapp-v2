"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ 
  day = "Monday",
  condition = "Clear",
  temperature = { 
    high: { celsius: 0, fahrenheit: 32 },
    low: { celsius: 0, fahrenheit: 32 }
  },
  unit = 'celsius'
}) {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return 'fa-cloud-rain';
    if (conditionLower.includes('snow')) return 'fa-snowflake';
    if (conditionLower.includes('cloud')) return 'fa-cloud';
    if (conditionLower.includes('thunder')) return 'fa-bolt';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'fa-smog';
    return 'fa-sun';
  };

  return (
    <div className="relative backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg p-4 min-w-[150px] transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40">
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-inter font-semibold text-gray-900 dark:text-white mb-2">
          {day}
        </h3>
        
        <i className={`fas ${getWeatherIcon(condition)} text-3xl text-gray-900 dark:text-white mb-2`}></i>
        
        <div className="flex gap-2 text-sm font-inter">
          <span className="text-gray-900 dark:text-white font-semibold">
            {unit === 'celsius' ? temperature.high.celsius : temperature.high.fahrenheit}°
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {unit === 'celsius' ? temperature.low.celsius : temperature.low.fahrenheit}°
          </span>
        </div>
        
        <p className="text-xs font-inter text-gray-700 dark:text-gray-300 mt-1 text-center">
          {condition}
        </p>
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <MainComponent 
          day="Monday"
          condition="Sunny"
          temperature={{
            high: { celsius: 25, fahrenheit: 77 },
            low: { celsius: 18, fahrenheit: 64 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Tuesday"
          condition="Rainy"
          temperature={{
            high: { celsius: 20, fahrenheit: 68 },
            low: { celsius: 15, fahrenheit: 59 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Wednesday"
          condition="Partly Cloudy"
          temperature={{
            high: { celsius: 22, fahrenheit: 72 },
            low: { celsius: 16, fahrenheit: 61 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Thursday"
          condition="Thunderstorm"
          temperature={{
            high: { celsius: 19, fahrenheit: 66 },
            low: { celsius: 14, fahrenheit: 57 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Friday"
          condition="Snow"
          temperature={{
            high: { celsius: 2, fahrenheit: 36 },
            low: { celsius: -3, fahrenheit: 27 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Saturday"
          condition="Foggy"
          temperature={{
            high: { celsius: 17, fahrenheit: 63 },
            low: { celsius: 12, fahrenheit: 54 }
          }}
          unit={unit}
        />
        
        <MainComponent 
          day="Sunday"
          condition="Clear"
          temperature={{
            high: { celsius: 24, fahrenheit: 75 },
            low: { celsius: 17, fahrenheit: 63 }
          }}
          unit={unit}
        />
      </div>
    </div>
  );
});
}