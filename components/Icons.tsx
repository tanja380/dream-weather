import React from 'react';
import { Cloud, CloudRain, Sun, Zap, Moon } from 'lucide-react';

export const WeatherIcon3D = ({ type, size = "large" }: { type: string, size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-32 h-32"
  };

  const containerSize = sizeClasses[size];

  // Simulating 3D look with drop shadows and gradients through standard SVG/Icon composition
  switch (type) {
    case 'rain':
      return (
        <div className={`relative ${containerSize} flex items-center justify-center`}>
          <Moon className="absolute top-0 right-0 w-[60%] h-[60%] text-yellow-300 drop-shadow-lg fill-yellow-300 z-0" />
          <CloudRain className="w-full h-full text-white drop-shadow-2xl fill-gray-100 z-10" />
          <div className="absolute -bottom-2 w-full flex justify-center gap-1">
             <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-bounce delay-75"></span>
             <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></span>
             <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      );
    case 'cloudy':
      return (
        <div className={`relative ${containerSize} flex items-center justify-center`}>
           <Moon className="absolute top-0 right-2 w-[50%] h-[50%] text-purple-300 drop-shadow-lg fill-purple-300 z-0" />
          <Cloud className="w-full h-full text-white drop-shadow-xl fill-white z-10" />
          <div className="absolute bottom-2 -left-2 w-[60%] h-[40%] text-gray-200 z-20 opacity-80">
            <Cloud className="w-full h-full fill-gray-200" />
          </div>
        </div>
      );
    case 'thunder':
      return (
        <div className={`relative ${containerSize} flex items-center justify-center`}>
          <Cloud className="w-full h-full text-gray-200 drop-shadow-2xl fill-gray-300 z-10" />
          <Zap className="absolute -bottom-2 text-yellow-400 w-[40%] h-[60%] drop-shadow-lg fill-yellow-400 z-20" />
        </div>
      );
    case 'clear':
    default:
      return (
        <div className={`relative ${containerSize} flex items-center justify-center`}>
          <Sun className="w-full h-full text-yellow-400 drop-shadow-2xl fill-yellow-400" />
        </div>
      );
  }
};
