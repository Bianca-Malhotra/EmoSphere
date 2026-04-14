import React from 'react';

interface WeeklyVibrationProps {
  focus?: number;
  rest?: number;
  imageUrl?: string;
  weather?: number;
  noise?: number;
  connection?: number;
  tension?: number;
}

const WeeklyVibration: React.FC<WeeklyVibrationProps> = ({ 
  focus = 0, 
  imageUrl = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400",
  weather = 0,
  noise = 0,
  connection = 0,
  tension = 0
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const focusOffset = circumference - (focus / 100) * circumference;

  return (
    <div className="bg-[#0f1115] border border-white/5 shape-premium p-10 shadow-2xl flex flex-col relative overflow-hidden group min-h-[480px]">
      
      {/* Glossy Header */}
      <div className="w-full mb-10 flex justify-between items-start relative z-10">
         <div>
            <h3 className="text-4xl font-black text-white tracking-tighter leading-none">Vibe Check</h3>
            <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em] mt-3">Personal Growth</p>
         </div>
         <div className="px-5 py-2 bg-white/5 shape-premium border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Live Sync</span>
         </div>
      </div>

      {/* Main Circular Progress Visualization */}
      <div className="flex-1 flex items-center justify-center relative mb-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background Track */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle 
              cx="50%" cy="50%" r="45%" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="11" 
              fill="transparent" 
            />
            {/* Primary Focus Progress (Cyan) */}
            <circle 
              cx="50%" cy="50%" r="45%" 
              stroke="#22d3ee" 
              strokeWidth="11" 
              fill="transparent" 
              strokeDasharray={circumference} 
              strokeDashoffset={focusOffset} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            />
          </svg>

          {/* Center Image Container */}
          <div className="w-44 h-44 shape-premium overflow-hidden border-[8px] border-[#16191e] shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700">
            <img 
              src={imageUrl} 
              alt="Wellness Snapshot" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Central Percentage Badge */}
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-[#22d3ee] text-black px-8 py-3 shape-premium font-black text-xs shadow-[0_15px_40px_rgba(34,211,238,0.4)] z-20 whitespace-nowrap">
            {focus}% Harmony
          </div>
        </div>
      </div>

      {/* Detailed Metrics Matching the Image Request */}
      <div className="grid grid-cols-2 w-full gap-x-12 gap-y-8 relative z-10">
         <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weather</span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">Level {weather}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Noise</span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{noise}/5</p>
            </div>
         </div>
         <div className="space-y-4 text-right">
            <div>
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Connection</span>
                <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{connection}/5</p>
            </div>
            <div>
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Relaxation</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{tension}/5</p>
            </div>
         </div>
      </div>

      {/* Decorative bot head */}
      <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity">
        <div className="w-14 h-14 bg-white/5 shape-premium border border-white/10 flex flex-col items-center justify-center">
          <div className="flex gap-2.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
          </div>
          <div className="w-8 h-[1.5px] bg-white/20 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyVibration;