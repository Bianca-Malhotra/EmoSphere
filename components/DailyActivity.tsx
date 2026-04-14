
import React from 'react';

interface DailyActivityProps {
  focus?: number;
  rest?: number;
  inputsCount?: number;
  inputsTotal?: number;
  imageUrl?: string;
}

const DailyActivity: React.FC<DailyActivityProps> = ({ 
  focus = 0, 
  rest = 0, 
  inputsCount = 0, 
  inputsTotal = 5,
  imageUrl = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" 
}) => {
  return (
    <div className="bg-[#0f1115] border border-white/5 shape-premium p-8 shadow-2xl flex flex-col gap-6 animate-fade-in group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Daily Activity</h3>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mt-1">Metrics & Progress</p>
        </div>
        <div className="px-3 py-1 bg-white/5 shape-premium border border-white/10">
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Main Image and Progress Section */}
      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 shape-premium overflow-hidden border border-white/10 shrink-0">
          <img 
            src={imageUrl} 
            alt="Activity" 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Inputs</p>
            <p className="text-xl font-black text-white">{inputsCount}/{inputsTotal}</p>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${(inputsCount / inputsTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Focus & Rest Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 shape-premium border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Focus</span>
          </div>
          <p className="text-3xl font-black text-white">{focus}%</p>
          <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="bg-cyan-400 h-full" style={{ width: `${focus}%` }}></div>
          </div>
        </div>

        <div className="bg-white/5 p-4 shape-premium border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rest</span>
          </div>
          <p className="text-3xl font-black text-white">{rest}%</p>
          <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="bg-purple-400 h-full" style={{ width: `${rest}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivity;
