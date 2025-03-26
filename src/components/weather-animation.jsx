"use client";
import React, { useState, useEffect, useRef } from "react";

function MainComponent({ condition = "clear" }) {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const generateParticles = () => {
      const newParticles = [];
      const count = condition.toLowerCase().includes('rain') ? 50 
        : condition.toLowerCase().includes('snow') ? 30 
        : condition.toLowerCase().includes('cloud') ? 5 
        : 8;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [condition]);

  return (
    <div ref={containerRef} className="relative w-full h-[200px] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${
            condition.toLowerCase().includes('rain')
              ? 'w-[2px] h-[10px] bg-[#92a3ad]'
              : condition.toLowerCase().includes('snow')
              ? 'w-[6px] h-[6px] bg-white rounded-full'
              : condition.toLowerCase().includes('cloud')
              ? 'w-[80px] h-[30px] bg-[#e5e7eb] rounded-full'
              : 'w-[3px] h-[20px] bg-[#fbbf24]'
          }`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animation: `${
              condition.toLowerCase().includes('rain')
                ? 'rain 1s linear infinite'
                : condition.toLowerCase().includes('snow')
                ? 'snow 3s linear infinite'
                : condition.toLowerCase().includes('cloud')
                ? 'cloud 8s linear infinite'
                : 'sunray 2s ease infinite'
            }`
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes rain {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        @keyframes snow {
          0% { transform: translateY(-20px) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200px) translateX(20px); opacity: 0; }
        }
        @keyframes cloud {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes sunray {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg p-4">
        <h3 className="text-white font-inter mb-2">Rain Animation</h3>
        <MainComponent condition="rain" />
      </div>

      <div className="bg-gradient-to-b from-gray-200 to-gray-400 rounded-lg p-4">
        <h3 className="text-gray-800 font-inter mb-2">Snow Animation</h3>
        <MainComponent condition="snow" />
      </div>

      <div className="bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg p-4">
        <h3 className="text-gray-800 font-inter mb-2">Cloudy Animation</h3>
        <MainComponent condition="cloudy" />
      </div>

      <div className="bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg p-4">
        <h3 className="text-white font-inter mb-2">Clear Sky Animation</h3>
        <MainComponent condition="clear" />
      </div>
    </div>
  );
}

// Export MainComponent as default to be used in the app
export default MainComponent;
