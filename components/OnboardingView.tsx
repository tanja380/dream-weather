
import React from 'react';
import { WeatherIcon3D } from './Icons';

interface OnboardingViewProps {
  onStart: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-24 px-10 bg-[#1e1b4b] overflow-hidden text-white">
      {/* Arka Plan Yumuşak Geçişler */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[70%] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[70%] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse"></div>

      {/* Ana Görsel Bölümü */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-14 w-full">
        <div className="transform scale-[2.5] mb-8 drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)] animate-float">
          <WeatherIcon3D type="cloudy" size="large" />
        </div>
        
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl font-bold tracking-tight">Hava Durumu</h1>
          <p className="text-lg text-white/40 font-light max-w-[240px] mx-auto leading-relaxed">
            Hava durumunu keşfedin ve güne hazır başlayın.
          </p>
        </div>
      </div>

      {/* Buton Bölümü */}
      <div className="relative z-10 w-full animate-in slide-in-from-bottom-8 duration-700 delay-300">
        <button 
          onClick={onStart}
          className="w-full py-5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-[2.5rem] text-xl font-semibold shadow-[0_20px_40px_rgba(99,102,241,0.3)] active:scale-95 transition-all hover:brightness-110"
        >
          Başla
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(2.5); }
          50% { transform: translateY(-15px) scale(2.5); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
