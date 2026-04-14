import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import WellnessExtension from './components/WellnessExtension';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import { THEMES } from './constants';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';

function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem('emosphere_user'));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('emosphere_email'));
  const [isPremium, setIsPremium] = useState<boolean>(localStorage.getItem('emosphere_premium') === 'true');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('emosphere_theme') || 'rose');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleLogin = (email: string, name: string) => {
    setUser(name);
    setUserEmail(email);
    localStorage.setItem('emosphere_user', name);
    localStorage.setItem('emosphere_email', email);
    setIsAuthOpen(false);
    if (!isPremium) {
      setTimeout(() => setIsSubscriptionOpen(true), 1500);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setUserEmail(null);
    localStorage.removeItem('emosphere_user');
    localStorage.removeItem('emosphere_email');
    localStorage.removeItem('emosphere_premium');
    setIsPremium(false);
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('emosphere_theme', themeId);
  };

  const handleUpgradeSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('emosphere_premium', 'true');
  };

  useEffect(() => {
    const activeTheme = THEMES.find(t => t.id === currentTheme) || THEMES[0];
    document.body.style.background = activeTheme.bg;

    if (activeTheme.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        
        <Navbar
          user={user}
          onSignOut={handleSignOut}
          onSignIn={() => setIsAuthOpen(true)}
          currentThemeId={currentTheme}
          onThemeChange={handleThemeChange}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />

        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          onClose={() => setIsSubscriptionOpen(false)}
          onSuccess={handleUpgradeSuccess}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  user={user}
                  onSignIn={() => setIsAuthOpen(true)}
                  currentThemeId={currentTheme}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  user={user}
                  isPremium={isPremium}
                  openSubscription={() => setIsSubscriptionOpen(true)}
                  currentThemeId={currentTheme}
                />
              }
            />
          </Routes>
        </main>

        <WellnessExtension />

        {/* FOOTER */}
        <footer className="py-20 px-8 border-t border-stone-200 bg-[#f5f2ee] text-stone-900">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            
            {/* Top Footer Section */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-12">
              
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tracking-tighter">
                  emosphere
                </span>
              </div>

              <div className="flex gap-8 md:gap-12 flex-wrap justify-center">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-xs font-bold text-stone-500 hover:text-[#1c1917] transition-colors uppercase tracking-widest"
                >
                  About
                </button>

                <button
                  onClick={() => scrollToSection('programs')}
                  className="text-xs font-bold text-stone-500 hover:text-[#1c1917] transition-colors uppercase tracking-widest"
                >
                  Programs
                </button>
              </div>

              <div className="text-center md:text-right">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.4em] mb-1">
                  Created By
                </p>
                <p className="font-signature text-2xl text-cyan-600">
                  Bianca Malhotra
                </p>
              </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="mt-16 pt-10 border-t border-stone-200 w-full flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
              
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.4em]">
                © 2026 EmoSphere. All rights reserved.
              </p>

              <div className="flex gap-6">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-xs hover:text-[#1c1917]"
                >
                  Privacy
                </button>

                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-xs hover:text-[#1c1917]"
                >
                  Terms
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* MODALS */}
        {isPrivacyOpen && (
          <PrivacyModal onClose={() => setIsPrivacyOpen(false)} />
        )}

        {isTermsOpen && (
          <TermsModal onClose={() => setIsTermsOpen(false)} />
        )}

      </div>
    </Router>
  );
}

export default App;