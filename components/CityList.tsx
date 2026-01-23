
import React, { useState } from 'react';
import { ChevronLeft, Search, Plus, Trash2 } from 'lucide-react';
import { WeatherData } from '../types';
import { WeatherIcon3D } from './Icons';

interface CityListProps {
  cities: WeatherData[];
  onSelectCity: (cityId: string) => void;
  onDeleteCity: (cityId: string) => void;
  onBack: () => void;
  onAddCity: (cityName: string) => void;
}

export const CityList: React.FC<CityListProps> = ({ cities, onSelectCity, onDeleteCity, onBack, onAddCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter(c => 
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopAdd = () => {
    if (searchTerm.trim()) {
      onAddCity(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const getGradientColors = (type: string) => {
    switch (type) {
      case 'clear':
        return { 
          start: '#FF8C00', 
          end: '#FF4E50', 
          glow: 'rgba(255, 140, 0, 0.5)',
          border: 'rgba(255, 255, 255, 0.2)' 
        };
      case 'rain':
        return { 
          start: '#2B32B2', 
          end: '#1488CC', 
          glow: 'rgba(43, 50, 178, 0.5)',
          border: 'rgba(255, 255, 255, 0.15)' 
        };
      case 'thunder':
        return { 
          start: '#4A148C', 
          end: '#7B1FA2', 
          glow: 'rgba(74, 20, 140, 0.5)',
          border: 'rgba(255, 255, 255, 0.2)' 
        };
      case 'cloudy':
      default:
        return { 
          start: '#512DA8', 
          end: '#311B92', 
          glow: 'rgba(81, 45, 168, 0.5)',
          border: 'rgba(255, 255, 255, 0.15)' 
        };
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0f0e2e] text-white overflow-hidden">
      
      {/* Dynamic background lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="pt-12 px-6 pb-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-gray-200 cursor-pointer group" onClick={onBack}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-xl font-medium">Hava Durumu</span>
        </div>
        {/* Three dots menu removed as requested */}
      </div>

      {/* Unified Search & Add Bar */}
      <div className="px-6 mb-8 z-10">
        <div className="relative w-full h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center px-2 border border-white/10 shadow-xl transition-all focus-within:border-purple-500/50 group focus-within:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="flex items-center flex-1 px-3">
            <Search size={22} className="text-gray-500 mr-3 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Şehir ara veya yeni ekle..." 
              className="bg-transparent w-full h-full outline-none text-base placeholder-gray-500 text-white font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTopAdd();
              }}
            />
          </div>
          
          {/* Top Add Button (appears when typing) */}
          <button 
            onClick={handleTopAdd}
            className={`mr-1 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${searchTerm ? 'bg-purple-600 text-white scale-100 opacity-100' : 'bg-transparent text-transparent scale-50 opacity-0 pointer-events-none'}`}
          >
            <Plus size={24} />
          </button>
        </div>
        {searchTerm && filteredCities.length === 0 && (
          <div className="mt-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-300 animate-in fade-in slide-in-from-top-1">
            "{searchTerm}" listende yok. Eklemek için <b>Enter</b>'a bas.
          </div>
        )}
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-6 no-scrollbar z-10">
        <style>
          {`
            @keyframes shine {
              0% { transform: translateX(-150%) skewX(-25deg); }
              100% { transform: translateX(150%) skewX(-25deg); }
            }
            .card-shine::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 50%;
              height: 100%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
              opacity: 0;
              transition: opacity 0.3s;
              pointer-events: none;
            }
            .group:hover .card-shine::after {
              opacity: 1;
              animation: shine 1.5s ease-in-out infinite;
            }
          `}
        </style>

        {filteredCities.map((city) => {
          const colors = getGradientColors(city.iconType);
          return (
            <div 
              key={city.id} 
              onClick={() => onSelectCity(city.id)}
              className="group relative w-full h-[180px] cursor-pointer transition-all duration-500 hover:scale-[1.04] active:scale-[0.98]"
            >
              {/* Card Glow Effect */}
              <div 
                className="absolute inset-x-8 bottom-4 h-12 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"
                style={{ backgroundColor: colors.glow }}
              ></div>

              {/* Main Card Shape */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-1">
                <svg className="absolute inset-0 w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 320 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`grad-${city.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.start}>
                          <animate attributeName="stop-color" values={`${colors.start};${colors.end};${colors.start}`} dur="8s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor={colors.end}>
                          <animate attributeName="stop-color" values={`${colors.end};${colors.start};${colors.end}`} dur="8s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                  </defs>
                  <path 
                    className="transition-all duration-500 ease-in-out group-hover:fill-opacity-95"
                    d="M0,24 C0,10.745 10.745,0 24,0 L296,0 C309.255,0 320,10.745 320,24 L320,130 C320,143.255 309.255,154 296,154 L190,154 C180,154 175,180 160,180 C145,180 140,154 130,154 L24,154 C10.745,154 0,143.255 0,130 L0,24 Z" 
                    fill={`url(#grad-${city.id})`}
                  />
                </svg>

                {/* Card Interior Content */}
                <div className="card-shine absolute inset-0 p-6 flex flex-col justify-between overflow-hidden rounded-3xl">
                  <div className="flex justify-between items-start z-10">
                    <div className="flex-1">
                      <div className="text-5xl font-semibold tracking-tighter mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:translate-x-1 transition-transform duration-500">
                        {city.currentTemp}°
                      </div>
                      <div className="text-xs font-medium text-white/70 mb-1 flex gap-2">
                        <span>Y:{city.high}°</span>
                        <span>D:{city.low}°</span>
                      </div>
                      <div className="text-lg font-bold tracking-tight mt-1 group-hover:translate-x-1.5 transition-transform duration-500 delay-75">
                        {city.city}
                        <span className="text-xs font-normal text-white/50 ml-2 uppercase tracking-widest">{city.country}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCity(city.id);
                        }}
                        className="p-2.5 bg-black/20 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 z-20 shadow-lg"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <div className="w-24 h-24 transform transition-all duration-700 ease-out group-hover:scale-125 group-hover:-translate-y-4 group-hover:rotate-12 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]">
                         <WeatherIcon3D type={city.iconType} size="medium" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end z-10">
                    <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 transition-all group-hover:bg-white/20 group-hover:border-white/30">
                        <span className="text-xs font-medium text-white/90 tracking-wide uppercase">{city.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* Bottom Add City Section removed as requested */}
      </div>
    </div>
  );
};
