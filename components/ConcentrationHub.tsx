
import React, { useMemo } from 'react';
import { FOCUS_RESOURCES, THEMES } from '../constants';

interface ConcentrationHubProps {
  currentThemeId: string;
}

const ConcentrationHub: React.FC<ConcentrationHubProps> = ({ currentThemeId }) => {
  const activeTheme = useMemo(() => 
    THEMES.find(t => t.id === currentThemeId) || THEMES[0], 
  [currentThemeId]);

  const isDark = activeTheme.dark;
  const accent = activeTheme.accentColor;

  // Adaptive Styles
  const containerBg = isDark ? 'bg-[#0f1115]/80' : 'bg-white/40';
  const containerBorder = isDark ? 'border-white/5' : 'border-black/5';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white/60';
  const cardBorder = isDark ? 'border-white/5' : 'border-white/80 shadow-sm';

  return (
    <div className={`relative overflow-hidden group shape-premium p-10 backdrop-blur-3xl border transition-all duration-700 ${containerBg} ${containerBorder}`}>
      
      {/* Decorative Atmospheric Glow */}
      <div 
        className="absolute -top-20 -right-20 w-80 h-80 blur-[120px] opacity-20 transition-all duration-1000 group-hover:opacity-30"
        style={{ background: accent }}
      ></div>

      {/* Glossy Header */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div className="animate-fade-in">
          <h3 className={`text-4xl font-black tracking-tighter leading-none ${textColor}`}>Concentration Hub</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-3" style={{ color: accent }}>Sync External Tools</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="px-5 py-2 bg-white/10 shape-premium border border-white/10 backdrop-blur-md flex items-center gap-3">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }}></span>
               <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }}></span>
             </span>
             <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-800'}`}>Eco-system Hub</span>
           </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {FOCUS_RESOURCES.map((res, index) => (
          <a 
            key={index} 
            href={res.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`group/card p-6 shape-premium border transition-all duration-500 flex items-start gap-4 hover:scale-[1.02] hover:-translate-y-1 ${cardBg} ${cardBorder}`}
            style={{ 
              boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)',
              borderColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = accent + '40'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div className={`w-14 h-14 shrink-0 shape-premium flex items-center justify-center text-2xl transition-all duration-500 ${isDark ? 'bg-white/5' : 'bg-white/90 shadow-inner'}`}>
              {res.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h4 className={`font-bold tracking-tight text-base ${textColor}`}>{res.name}</h4>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter ${
                  res.type === 'Spotify' ? 'bg-emerald-500/20 text-emerald-500' :
                  res.type === 'YouTube' ? 'bg-rose-500/20 text-rose-500' :
                  res.type === 'Spirituality' ? 'bg-amber-500/20 text-amber-500' :
                  res.type === 'App' ? 'bg-indigo-500/20 text-indigo-500' :
                  'bg-cyan-500/20 text-cyan-500'
                }`}>
                  {res.type}
                </span>
              </div>
              <p className={`text-xs leading-relaxed font-medium line-clamp-2 ${subTextColor}`}>{res.desc}</p>
            </div>

            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-x-2 group-hover/card:translate-x-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
               </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-10" style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}></div>
    </div>
  );
};

export default ConcentrationHub;
