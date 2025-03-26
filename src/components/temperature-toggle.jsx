"use client";
import React, { useState } from "react";

function MainComponent({ value = "celsius", onChange = () => {} }) {
  return (
    <div className="inline-flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
      <button
        onClick={() => onChange("celsius")}
        className={`px-4 py-2 rounded-full transition-all duration-200 font-inter text-sm ${
          value === "celsius"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onChange("fahrenheit")}
        className={`px-4 py-2 rounded-full transition-all duration-200 font-inter text-sm ${
          value === "fahrenheit"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        °F
      </button>
    </div>
  );
}

export default function Index() {
  return <MainComponent />;
}

function StoryComponent() {
  const [unit, setUnit] = useState("celsius");

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">
          Default State
        </h3>
        <MainComponent />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">
          Interactive Demo
        </h3>
        <MainComponent value={unit} onChange={setUnit} />
        <p className="text-sm font-inter text-gray-600 dark:text-gray-400">
          Selected unit: {unit}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 dark:text-white">
          Preset to Fahrenheit
        </h3>
        <MainComponent value="fahrenheit" />
      </div>
    </div>
  );
}
