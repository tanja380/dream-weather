
import React, { useState } from 'react';
import { MapPin, Plus, List, RotateCw } from 'lucide-react';
import { WeatherData } from '../types';
import { WeatherIcon3D } from './Icons';

interface DetailViewProps {
  data: WeatherData;
  onNavigateToList: () => void;
  onLocationClick: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const DetailView: React.FC<DetailViewProps> = ({ 
  data, 
  onNavigateToList, 
  onLocationClick, 
  onRefresh, 
  isRefreshing 
}) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'weekly'>('hourly');

  // Map weather conditions to immersive background images
  const getBackgroundImage = (type: string) => {
    switch (type) {
      case 'rain':
        return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000&auto=format&fit=crop';
      case 'thunder':
        return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1000&auto=format&fit=crop';
      case 'cloudy':
        return 'https://images.unsplash.com/photo-1534088568595-a066f710521e?q=80&w=1000&auto=format&fit=crop';
      case 'clear':
      default:
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1000&auto=format&fit=crop';
    }
  };

  const bgImage = getBackgroundImage(data.iconType);

  return (
    <div className={`relative w-full h-full flex flex-col text-white overflow-hidden transition-all duration-1000 bg-gradient-to-b ${data.bgGradient}`}>
      
      {/* Dynamic Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          key={bgImage}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50 mix-blend-overlay transition-all duration-1000 scale-110 animate-[pulse_10s_infinite]"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        {/* Subtle vignette/overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-8 px-6 pb-[110px]">
        
        {/* Top Section: City Info & Main Stats */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[300px]">
            {/* City Info Pill */}
            <div className="flex items-center gap-3 mb-6 bg-black/20 backdrop-blur-md py-1.5 px-5 rounded-full border border-white/10 shadow-lg">
              <h1 className="text-xl font-medium tracking-wide drop-shadow-md">{data.city}</h1>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <button 
                onClick={onRefresh}
                className={`p-1 rounded-full hover:bg-white/20 transition-all ${isRefreshing ? 'animate-spin opacity-50' : ''}`}
              >
                <RotateCw size={14} />
              </button>
            </div>
            
            {/* Centered Weather Icon */}
            <div className="mb-4 transform scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
               <WeatherIcon3D type={data.iconType} size="large" />
            </div>
            
            {/* Temperature below icon - smaller as requested */}
            <div className={`text-7xl font-light leading-none tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] transition-all ${isRefreshing ? 'blur-sm opacity-50' : ''}`}>
              {data.currentTemp}°
            </div>
            
            {/* High/Low Section - Condition text removed as requested */}
            <div className="flex flex-col items-center mt-6">
              <div className="flex gap-4 text-white/80 text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-2xl border border-white/5 shadow-xl">
                <span className="flex items-center gap-1.5"><span className="text-[10px] opacity-50 uppercase tracking-tighter">Max</span> <b className="text-white text-base font-semibold">{data.high}°</b></span>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <span className="flex items-center gap-1.5"><span className="text-[10px] opacity-50 uppercase tracking-tighter">Min</span> <b className="text-white text-base font-semibold">{data.low}°</b></span>
              </div>
            </div>
        </div>

        {/* Bottom Section: Forecast Area */}
        <div className="w-full bg-indigo-950/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_-10px_60px_rgba(0,0,0,0.4)] transition-all duration-300 shrink-0">
          
          {/* Tabs */}
          <div className="flex justify-between border-b border-white/10 pb-4 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase relative">
            <span 
              className={`flex-1 text-center cursor-pointer transition-all duration-300 ${activeTab === 'hourly' ? 'text-white' : 'hover:text-purple-200'}`}
              onClick={() => setActiveTab('hourly')}
            >
              Saatlik
            </span>
            <span 
              className={`flex-1 text-center cursor-pointer transition-all duration-300 ${activeTab === 'weekly' ? 'text-white' : 'hover:text-purple-200'}`}
              onClick={() => setActiveTab('weekly')}
            >
              Haftalık
            </span>
            <div className={`absolute bottom-[-1px] w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-500 ease-out ${activeTab === 'weekly' ? 'left-1/2' : 'left-0'}`}></div>
          </div>

          {/* Forecast Content Area */}
          <div className="h-[160px] flex flex-col justify-center">
            {activeTab === 'hourly' ? (
              <div className="flex justify-between items-center overflow-x-auto no-scrollbar gap-2 h-full py-2">
                {data.hourly.length > 0 ? data.hourly.map((h, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center justify-between min-w-[3.8rem] h-full rounded-3xl py-4 px-1 border transition-all duration-500
                      ${h.isNow 
                        ? 'bg-gradient-to-b from-purple-600/60 to-purple-900/60 shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-105 z-10 border-white/30' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${h.isNow ? 'text-white' : 'text-gray-400'}`}>{h.time}</span>
                    <div className="flex-1 flex items-center justify-center">
                       <WeatherIcon3D type={h.icon} size="small" />
                    </div>
                    <span className="text-sm font-bold">{h.temp}°</span>
                  </div>
                )) : (
                   <div className="text-center w-full text-gray-400 text-sm italic">Veri yükleniyor...</div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar h-full pr-1 py-1">
                {data.daily && data.daily.length > 0 ? data.daily.map((day, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 shrink-0 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="w-12 text-xs font-bold uppercase tracking-widest text-white/70">{day.day}</span>
                    <div className="flex-1 flex justify-center">
                       <div className="w-7 h-7">
                          <WeatherIcon3D type={day.icon} size="small" />
                       </div>
                    </div>
                    <div className="w-28 flex items-center justify-end gap-3">
                       <span className="text-xs text-white/40 font-medium">{day.low}°</span>
                       <div className="w-12 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-yellow-400 w-full opacity-60"></div>
                       </div>
                       <span className="text-sm font-bold text-white">{day.high}°</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center w-full text-gray-400 text-sm italic">Veri yükleniyor...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full h-[90px] z-50 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" viewBox="0 0 375 90" preserveAspectRatio="none">
          <path d="M0,90 L375,90 L375,20 L245,20 C230,20 220,55 187.5,55 C155,55 145,20 130,20 L0,20 Z" fill="#1e1b4b" />
        </svg>

        <div className="absolute inset-0 flex justify-between items-end px-10 pb-6 pointer-events-auto">
          <button 
            onClick={onLocationClick}
            className="text-gray-400 hover:text-white transition-all active:scale-90 transform p-2 hover:bg-white/5 rounded-full"
          >
            <MapPin size={22} />
          </button>
          
          <button 
            onClick={onNavigateToList}
            className="mb-8 w-14 h-14 bg-white rounded-full text-[#1e1b4b] flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-90 hover:scale-105 transition-all"
          >
            <Plus size={32} strokeWidth={2.5} />
          </button>

          <button 
            className="text-gray-400 hover:text-white transition-all p-2 hover:bg-white/5 rounded-full" 
            onClick={onNavigateToList}
          >
            <List size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
