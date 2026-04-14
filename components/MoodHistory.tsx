import React from 'react';
import { WeeklyVibrationData } from '../types';

interface MoodHistoryProps {
  data?: WeeklyVibrationData | null;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ data }) => {
  // Mock fallback if no data provided
  const vibration = data || {
    average: 0,
    weather: 0,
    noise: 0,
    connection: 0,
    tension: 0,
    imageUrl: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=400"
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (vibration.average / 100) * circumference;

  return (
    <div className="bg-[#0f1115] border border-white/5 shape-premium p-10 shadow-2xl min-h-[420px] flex flex-col items-center relative overflow-hidden group">
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-1000"></div>

      {/* Header */}
      <div className="w-full mb-10 flex justify-between items-start">
         <div>
            <h3 className="text-3xl font-bold text-white tracking-tighter leading-none">Vibe Check</h3>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">Personal Growth</p>
         </div>
         <div className="px-3 py-1 bg-white/5 shape-premium border border-white/10">
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Live Sync</span>
         </div>
      </div>

      {/* Main Visualization */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Background Ring Track */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle 
            cx="50%" cy="50%" r="45%" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="10" 
            fill="transparent" 
          />
          {/* Progress Segmented Ring */}
          <circle 
            cx="50%" cy="50%" r="45%" 
            stroke="#22d3ee" 
            strokeWidth="10" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Image Container */}
        <div className="w-44 h-44 shape-premium overflow-hidden border-[8px] border-[#16191e] shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105">
          <img 
            src={vibration.imageUrl} 
            alt="Wellness Snapshot" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Dynamic Percentage Badge */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-[#22d3ee] text-black px-6 py-2 shape-premium font-black text-xs shadow-[0_10px_30px_rgba(34,211,238,0.4)] z-20">
          {vibration.average}% Harmony
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 w-full gap-8">
         <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Weather</span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">Level {vibration.weather}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Noise</span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">{vibration.noise}/5</p>
            </div>
         </div>
         <div className="space-y-4 text-right">
            <div>
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Connection</span>
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">{vibration.connection}/5</p>
            </div>
            <div>
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Relaxation</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">{vibration.tension}/5</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MoodHistory;