
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
      case 'clear': return { start: '#FBBF24', end: '#F59E0B' };
      case 'rain': return { start: '#60A5FA', end: '#3B82F6' };
      case 'thunder': return { start: '#A78BFA', end: '#8B5CF6' };
      default: return { start: '#818CF8', end: '#6366F1' };
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b0a1a] text-white overflow-hidden">
      {/* Header */}
      <div className="pt-16 px-6 pb-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={28} />
          </button>
          <h2 className="text-3xl font-bold">Şehirler</h2>
        </div>
      </div>

      {/* Arama Barı */}
      <div className="px-6 mb-6 z-10">
        <div className="relative w-full h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center px-4 border border-white/5 focus-within:bg-white/15 transition-all">
          <Search size={20} className="text-white/40 mr-3" />
          <input 
            type="text" 
            placeholder="Şehir ara..." 
            className="bg-transparent flex-1 h-full outline-none text-base placeholder-white/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTopAdd()}
          />
          {searchTerm && (
            <button onClick={handleTopAdd} className="p-2 bg-indigo-600 rounded-lg">
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Şehir Listesi */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-5 no-scrollbar z-10">
        {filteredCities.map((city) => {
          const colors = getGradientColors(city.iconType);
          return (
            <div 
              key={city.id} 
              onClick={() => onSelectCity(city.id)}
              className="relative w-full h-32 rounded-[2rem] overflow-hidden cursor-pointer active:scale-95 transition-transform group shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.start}, ${colors.end})` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-8 translate-x-8"></div>
              
              <div className="relative h-full p-6 flex justify-between items-center">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">{city.city}</h3>
                    <p className="text-white/70 text-sm font-medium">{city.country}</p>
                  </div>
                  <p className="text-sm font-semibold opacity-80">{city.condition}</p>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <div className="text-4xl font-light">{city.currentTemp}°</div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteCity(city.id); }}
                    className="p-2 bg-black/10 rounded-full hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Yan Taraftaki İkon */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none scale-75">
                  <WeatherIcon3D type={city.iconType} size="medium" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
