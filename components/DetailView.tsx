
import React, { useState } from 'react';
import { MapPin, Plus, List, RotateCw, HelpCircle, X, Share, Smartphone, Copy, Check } from 'lucide-react';
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
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    // Kopyalanması gereken asıl link window.location.href'dir
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bgImage = getBackgroundImage(data.iconType);

  return (
    <div className={`relative w-full h-full flex flex-col text-white overflow-hidden transition-all duration-1000 bg-gradient-to-b ${data.bgGradient}`}>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-indigo-950/80 border border-white/20 rounded-[2.5rem] p-8 w-full max-w-sm relative overflow-hidden shadow-2xl">
            <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full active:scale-90 transition-transform">
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center animate-bounce">
                <Smartphone size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Telefonda Aç</h3>
              
              <div className="bg-white/5 rounded-2xl p-4 w-full border border-white/10">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-bold">Uygulama Linki</p>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] truncate text-blue-300 flex-1 opacity-70">{window.location.href}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 bg-blue-600 rounded-lg active:scale-90 transition-all shadow-lg"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-[10px] text-blue-400 mt-2 font-medium">Bu linki kopyalayıp kendine gönder!</p>
              </div>

              <div className="space-y-4 text-left w-full text-sm">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <p className="text-gray-300">Linki telefonunda <b>Safari</b> veya <b>Chrome</b> ile aç.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <p className="text-gray-300">Tarayıcı menüsünden <b>"Ana Ekrana Ekle"</b>ye bas.</p>
                </div>
              </div>

              <button 
                onClick={() => setShowHelp(false)}
                className="w-full py-4 bg-white text-indigo-950 font-bold rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="absolute top-12 right-6 z-50">
        <button 
          onClick={() => setShowHelp(true)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 active:scale-90 transition-all shadow-lg"
        >
          <HelpCircle size={20} className="text-white/70" />
        </button>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-1000 scale-110 animate-[pulse_15s_infinite]"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center pt-10 px-6 pb-[110px]">
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[320px]">
            <div className="flex items-center gap-3 mb-6 bg-black/30 backdrop-blur-xl py-2 px-6 rounded-full border border-white/10 shadow-2xl">
              <h1 className="text-xl font-semibold tracking-wide drop-shadow-md">{data.city}</h1>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <button 
                onClick={onRefresh}
                className={`p-1 rounded-full hover:bg-white/20 transition-all active:rotate-180 duration-500 ${isRefreshing ? 'animate-spin opacity-50' : ''}`}
              >
                <RotateCw size={14} />
              </button>
            </div>
            
            <div className="mb-4 transform scale-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] animate-[bounce_4s_infinite]">
               <WeatherIcon3D type={data.iconType} size="large" />
            </div>
            
            <div className={`text-8xl font-light leading-none tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all ${isRefreshing ? 'blur-sm opacity-50' : ''}`}>
              {data.currentTemp}°
            </div>
            
            <div className="flex flex-col items-center mt-4">
              <p className="text-white/60 text-lg font-medium mb-4 tracking-wide">{data.description}</p>
              <div className="flex gap-4 text-white/90 text-sm font-bold backdrop-blur-md bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
                <span className="flex items-center gap-2">H: <b className="text-white text-base">{data.high}°</b></span>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <span className="flex items-center gap-2">L: <b className="text-white text-base">{data.low}°</b></span>
              </div>
            </div>
        </div>

        <div className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_-10px_60px_rgba(0,0,0,0.4)] transition-all duration-300 shrink-0">
          <div className="flex justify-between border-b border-white/10 pb-4 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase relative">
            <span 
              className={`flex-1 text-center cursor-pointer transition-all duration-300 ${activeTab === 'hourly' ? 'text-white' : 'hover:text-purple-200 opacity-50'}`}
              onClick={() => setActiveTab('hourly')}
            >
              Saatlik
            </span>
            <span 
              className={`flex-1 text-center cursor-pointer transition-all duration-300 ${activeTab === 'weekly' ? 'text-white' : 'hover:text-purple-200 opacity-50'}`}
              onClick={() => setActiveTab('weekly')}
            >
              Haftalık
            </span>
            <div className={`absolute bottom-[-1px] w-1/2 h-[2px] bg-blue-400 transition-all duration-500 ease-out ${activeTab === 'weekly' ? 'left-1/2' : 'left-0'}`}></div>
          </div>

          <div className="h-[160px] flex flex-col justify-center">
            {activeTab === 'hourly' ? (
              <div className="flex justify-between items-center overflow-x-auto no-scrollbar gap-2 h-full py-2">
                {data.hourly.length > 0 ? data.hourly.map((h, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center justify-between min-w-[4rem] h-full rounded-3xl py-4 px-1 border transition-all duration-500
                      ${h.isNow 
                        ? 'bg-gradient-to-b from-blue-500/40 to-indigo-600/40 shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-105 z-10 border-white/30' 
                        : 'bg-white/5 border-white/5'}`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${h.isNow ? 'text-white' : 'text-gray-400'}`}>{h.time}</span>
                    <div className="flex-1 flex items-center justify-center scale-90">
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
                  <div key={i} className="flex items-center justify-between px-4 py-2 shrink-0 bg-white/5 rounded-2xl border border-white/5 active:bg-white/10 transition-colors">
                    <span className="w-12 text-xs font-bold uppercase tracking-widest text-white/70">{day.day}</span>
                    <div className="flex-1 flex justify-center">
                       <div className="w-7 h-7">
                          <WeatherIcon3D type={day.icon} size="small" />
                       </div>
                    </div>
                    <div className="w-24 flex items-center justify-end gap-3">
                       <span className="text-xs text-white/40 font-medium">{day.low}°</span>
                       <div className="w-10 h-1 bg-white/10 rounded-full relative overflow-hidden">
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

      <div className="absolute bottom-0 left-0 w-full h-[90px] z-50 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" viewBox="0 0 375 90" preserveAspectRatio="none">
          <path d="M0,90 L375,90 L375,20 L245,20 C230,20 220,55 187.5,55 C155,55 145,20 130,20 L0,20 Z" fill="#1e1b4b" />
        </svg>

        <div className="absolute inset-0 flex justify-between items-end px-10 pb-6 pointer-events-auto">
          <button 
            onClick={onLocationClick}
            className="text-gray-400 hover:text-white transition-all active:scale-75 transform p-3 hover:bg-white/5 rounded-full"
          >
            <MapPin size={24} />
          </button>
          
          <button 
            onClick={onNavigateToList}
            className="mb-8 w-16 h-16 bg-white rounded-full text-indigo-950 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-90 hover:scale-105 transition-all"
          >
            <Plus size={36} strokeWidth={3} />
          </button>

          <button 
            className="text-gray-400 hover:text-white transition-all p-3 active:scale-75 hover:bg-white/5 rounded-full" 
            onClick={onNavigateToList}
          >
            <List size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
