import React from 'react';

interface CrisisCardProps {
  onOpenModal: () => void;
}

const CrisisCard: React.FC<CrisisCardProps> = ({ onOpenModal }) => {
  return (
    <div className="relative group overflow-hidden shape-premium p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 min-h-[250px] flex flex-col justify-center">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[#2D3142] transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 opacity-80" style={{
          background: `
            radial-gradient(at 0% 0%, #4338ca 0, transparent 50%), 
            radial-gradient(at 50% 0%, #6366f1 0, transparent 50%), 
            radial-gradient(at 100% 0%, #a855f7 0, transparent 50%),
            radial-gradient(at 100% 100%, #ec4899 0, transparent 50%),
            radial-gradient(at 0% 100%, #3b82f6 0, transparent 50%)
          `
        }}></div>
      </div>
      
      {/* Animated Overlay Glimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/20 backdrop-blur-xl shape-premium border border-white/20 text-lg shadow-lg">
            <span>🆘</span>
          </div>
          <span className="text-[10px] font-extrabold text-white/80 uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 shape-premium border border-white/10 backdrop-blur-md">
            Professional Support
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Help is here
        </h3>
        
        <p className="text-indigo-50/80 text-sm leading-relaxed mb-8 font-medium italic">
          Compassionate support is available 24/7 if you need a safe space to talk.
        </p>

        <button 
          onClick={onOpenModal}
          className="w-full py-4 bg-white text-indigo-950 shape-premium font-black text-xs shadow-xl transition-all hover:bg-indigo-50 active:scale-95 uppercase tracking-widest border border-white"
        >
          Access Support Now
        </button>
      </div>
    </div>
  );
};

export default CrisisCard;