
import React, { useState } from 'react';
import { ChevronLeft, Search, Plus, Trash2, MapPin } from 'lucide-react';
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
          glow: 'rgba(255, 140, 0, 0.4)',
          border: 'rgba(255, 255, 255, 0.2)' 
        };
      case 'rain':
        return { 
          start: '#2B32B2', 
          end: '#1488CC', 
          glow: 'rgba(43, 50, 178, 0.4)',
          border: 'rgba(255, 255, 255, 0.15)' 
        };
      case 'thunder':
        return { 
          start: '#4A148C', 
          end: '#7B1FA2', 
          glow: 'rgba(74, 20, 140, 0.4)',
          border: 'rgba(255, 255, 255, 0.2)' 
        };
      case 'cloudy':
      default:
        return { 
          start: '#512DA8', 
          end: '#311B92', 
          glow: 'rgba(81, 45, 168, 0.4)',
          border: 'rgba(255, 255, 255, 0.15)' 
        };
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0f0e2e] text-white overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="pt-14 px-6 pb-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3 text-white cursor-pointer group" onClick={onBack}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-active:scale-75 transition-all">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Şehirler</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8 mt-2 z-10">
        <div className="relative w-full h-14 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center px-2 border border-white/10 shadow-2xl transition-all focus-within:border-blue-500/50 group">
          <div className="flex items-center flex-1 px-3">
            <Search size={20} className="text-gray-500 mr-3 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Yeni şehir ekle..." 
              className="bg-transparent w-full h-full outline-none text-base placeholder-gray-500 text-white font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTopAdd();
              }}
            />
          </div>
          <button 
            onClick={handleTopAdd}
            className={`mr-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${searchTerm ? 'bg-blue-600 text-white scale-100 opacity-100' : 'bg-transparent text-transparent scale-50 opacity-0 pointer-events-none'}`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5 no-scrollbar z-10 scrollable-content">
        {filteredCities.map((city) => {
          const colors = getGradientColors(city.iconType);
          return (
            <div 
              key={city.id} 
              onClick={() => onSelectCity(city.id)}
              className="group relative w-full h-[140px] cursor-pointer transition-all duration-300 active:scale-[0.96]"
            >
              {/* Card Container */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-1"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
                  boxShadow: `0 15px 35px -5px ${colors.glow}`
                }}
              >
                {/* Visual Patterns */}
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex items-center justify-between">
                  <div className="flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-bold tracking-tight drop-shadow-md">{city.city}</h3>
                      {city.id === 'my-location' && <MapPin size={14} className="text-white/60" />}
                    </div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2">{city.country}</p>
                    <div className="flex items-center gap-2 text-white/80 font-bold bg-black/20 px-3 py-1 rounded-full self-start border border-white/5 text-[10px]">
                       <span>H:{city.high}°</span>
                       <div className="w-[1px] h-2 bg-white/20"></div>
                       <span>L:{city.low}°</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <div className="text-5xl font-light mb-1 drop-shadow-xl">{city.currentTemp}°</div>
                    <div className="w-16 h-16 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <WeatherIcon3D type={city.iconType} size="medium" />
                    </div>
                  </div>
                </div>

                {/* Delete Button (Swipe-like UI) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCity(city.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-xl text-white/40 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100 z-20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {filteredCities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Search size={48} className="mb-4" />
            <p className="text-sm font-bold tracking-widest uppercase">Şehir Bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};
