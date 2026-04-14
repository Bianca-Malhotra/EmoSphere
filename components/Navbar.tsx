import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { THEMES } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  user: string | null;
  onSignOut: () => void;
  onSignIn: () => void;
  currentThemeId: string;
  onThemeChange: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSignOut, onSignIn, currentThemeId, onThemeChange }) => {
  const location = useLocation();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const activeTheme = useMemo(() => 
    THEMES.find(t => t.id === currentThemeId) || THEMES[0], 
  [currentThemeId]);

  const isDark = activeTheme.dark;

  // Optimized colors for maximum legibility and premium feel
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-white/50' : 'text-gray-400';
  const barBg = isDark ? 'bg-[#0f1115]/80' : 'bg-white/80';
  const barBorder = isDark ? 'border-white/5' : 'border-black/5';
  const canvasBtn = isDark ? 'bg-white text-black' : 'bg-gray-900 text-white';
  const iconBtn = isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-gray-900 hover:bg-black/10';

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-8">
      {/* Single layered floating bar */}
      <nav className={`w-full max-w-7xl h-20 px-10 flex items-center justify-between shape-premium backdrop-blur-2xl border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 ${barBg} ${barBorder}`}>
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-4 group shrink-0">
          <Logo className="w-12 h-12 group-hover:rotate-6 transition-transform" themeId={currentThemeId} />
          <div className="hidden md:block">
            <span className={`text-xl font-bold tracking-tight block leading-tight ${textColor}`}>EmoSphere</span>
            <span className="text-[9px] font-black text-[#F43F5E] uppercase tracking-widest block -mt-1 opacity-90">Wellness AI</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Navigation with architectural rounded corners */}
          <Link 
            to="/dashboard" 
            className={`px-8 py-3 shape-premium text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl ${
              location.pathname === '/dashboard' 
                ? canvasBtn 
                : `${subTextColor} hover:${textColor}`
            }`}
          >
            Me-time
          </Link>

          {/* Minimal Separator */}
          <div className={`h-6 w-[1px] opacity-10 ${isDark ? 'bg-white' : 'bg-black'}`}></div>

          {/* Environment Toggler */}
          <div className="relative">
            <button 
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`w-12 h-12 flex items-center justify-center shape-premium text-xl shadow-sm transition-all border ${iconBtn} ${barBorder}`}
            >
              {activeTheme.icon}
            </button>
            
            {showThemePicker && (
              <div className={`absolute right-0 mt-6 p-5 shape-premium shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] w-72 animate-scale-up z-[70] border ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'}`}>
                <p className={`text-[10px] font-black px-4 py-3 uppercase tracking-[0.3em] mb-2 ${subTextColor}`}>Environment</p>
                <div className="space-y-1">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { onThemeChange(theme.id); setShowThemePicker(false); }}
                      className={`flex items-center gap-4 w-full px-5 py-4 shape-premium text-sm transition-all duration-300 ${
                        currentThemeId === theme.id 
                          ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-black') 
                          : `${subTextColor} hover:bg-white/5`
                      }`}
                    >
                      <span className="text-2xl">{theme.icon}</span>
                      <span className="font-bold tracking-tight">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User / Auth Button */}
          {user ? (
            <button 
              onClick={onSignOut}
              className={`w-12 h-12 flex items-center justify-center shape-premium transition-all border ${iconBtn} ${barBorder}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={onSignIn}
              className={`px-10 py-3 shape-premium text-xs font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 ${canvasBtn}`}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;