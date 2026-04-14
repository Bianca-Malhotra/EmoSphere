import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES } from '../constants';
import Logo from '../components/Logo';

interface HomePageProps {
  user: string | null;
  onSignIn: () => void;
  currentThemeId?: string;
}

const HomePage: React.FC<HomePageProps> = ({ user, onSignIn, currentThemeId = 'rose' }) => {
  const navigate = useNavigate();

  const activeTheme = useMemo(() => 
    THEMES.find(t => t.id === currentThemeId) || THEMES[0], 
  [currentThemeId]);

  const isDark = activeTheme.dark;

  const handleCta = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      onSignIn();
    }
  };

  return (
    <div 
      className={`relative min-h-screen flex flex-col overflow-x-hidden transition-colors duration-1000 ${isDark ? 'text-white' : 'text-gray-900'}`}
      style={{ background: activeTheme.pageGradient }}
    >
      
      {/* Immersive Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-40 px-6 overflow-hidden">
        
        {/* Dynamic Atmospheric Background Layer */}
        <div 
          className="absolute inset-0 -z-30 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ backgroundImage: activeTheme.bg }}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-white/30'} backdrop-blur-[1px]`}></div>
        </div>

        {/* Mesh Gradient Accents */}
        <div 
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] blur-[120px] opacity-20 transition-all duration-1000"
          style={{ background: activeTheme.accentColor }}
        ></div>
        <div 
          className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] blur-[120px] opacity-10 transition-all duration-1000"
          style={{ background: activeTheme.accentColor }}
        ></div>

        {/* Central Visualization Area */}
        <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 animate-fade-in delay-100">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
              <h1 className={`text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mindset <br/>
                Can't <br/>
                Speak <br/>
                <span className="font-stylish" style={{ color: activeTheme.accentColor }}>
                  — But You Can
                </span>
              </h1>

            <button 
              onClick={handleCta}
              className={`group relative px-20 py-8 shape-premium font-black text-xl transition-all shadow-[0_30px_70px_rgba(0,0,0,0.2)] active:scale-95 overflow-hidden ${
                isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              <span className="relative z-10 uppercase tracking-widest">Speak with us</span>
              <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-20"
                style={{ backgroundColor: activeTheme.accentColor }}
              ></div>
            </button>
          </div>

          {/* Aesthetic Image Card - REFINED VERSION */}
          <div className="relative w-full max-w-md xl:max-w-lg aspect-square flex items-center justify-center">
             
             {/* The Segmented Ring - Smaller radius (35), same thickness (6) */}
             <div className="absolute inset-0 -z-10 opacity-80 animate-maia-pulse">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 30px ${activeTheme.accentColor}33)` }}>
                  <circle cx="50" cy="50" r="30" stroke={isDark ? "#111" : "#eee"} strokeWidth="6" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke={activeTheme.accentColor} strokeWidth="6" fill="none" strokeDasharray="12 10.4" opacity="0.6" />
                  <circle cx="50" cy="50" r="30" stroke={isDark ? "#fb7185" : "#e11d48"} strokeWidth="6" fill="none" strokeDasharray="8 14.4" strokeDashoffset="20" opacity="0.6" />
               </svg>
             </div>

             {/* Center Hero Logo - Box removed for floating look */}
             <div className="w-[60%] h-[60%] flex items-center justify-center relative transition-transform duration-1000 hover:scale-105 group">
                <Logo className="w-2/3 h-2/3 animate-maia-pulse" showText={false} />
                
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button className={`absolute bottom-12 animate-bounce transition-colors ${isDark ? 'text-white/30 hover:text-white' : 'text-gray-900/30 hover:text-gray-900'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* Philosophy Section */}
      <section id="about" className={`py-48 px-6 relative border-t ${isDark ? 'bg-black/40 border-white/5' : 'bg-white/40 border-black/5'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <p className="font-black uppercase tracking-[0.5em] mb-8 text-sm" style={{ color: activeTheme.accentColor }}>Our Philosophy</p>
          <h2 className="text-6xl md:text-8xl font-bold mb-16 tracking-tighter leading-tight">The Purpose of <br/> EmoSphere.</h2>
          <div className={`grid md:grid-cols-2 gap-20 text-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>
              EmoSphere is a digital sanctuary designed to help you navigate your emotional landscape. We believe that mental wellness shouldn't be a checklist—it should be a creative process. 
            </p>
            <p>
              Created by <span className="font-bold font-stylish" style={{ color: activeTheme.accentColor }}>Bianca Malhotra</span>, this platform integrates state-of-the-art localized wellness logic with timeless mindfulness practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;