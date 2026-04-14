import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WellnessExtension: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/dashboard');
  };

  const isDashboard = location.pathname === '/dashboard';

  return (
    <div 
      onClick={handleClick}
      className="fixed bottom-10 right-10 z-[150] cursor-pointer group animate-fade-in"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Glow Overlay */}
        <div className="absolute inset-0 bg-cyan-500/10 shape-premium blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
        
        {/* Main Body (The Bot Head) */}
        <div className="relative w-16 h-16 bg-[#0B0D17] shape-premium flex flex-col items-center justify-center overflow-hidden border border-white/10 shadow-2xl shadow-black/40 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/30">
          
          {/* Subtle Grid dots inside bot */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '8px 8px' }}></div>
          
          {/* Glowing Eyes */}
          <div className="flex gap-4 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse delay-150"></div>
          </div>
          
          {/* Mouth line */}
          <div className="mt-2.5 w-7 h-[1.5px] bg-cyan-400/20 rounded-full"></div>

          {/* Scanning line animation */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/10 blur-[1px] animate-[maia-pulse_3s_infinite]"></div>
        </div>

        {/* Hover Label */}
        <div className="absolute bottom-full right-0 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#181D31] text-white text-[10px] font-black px-4 py-2 shape-premium whitespace-nowrap shadow-2xl tracking-[0.2em] uppercase border border-white/5">
            {isDashboard ? 'Maia Online' : 'Open Wellness'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessExtension;