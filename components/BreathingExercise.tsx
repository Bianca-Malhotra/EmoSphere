import React, { useState, useEffect } from 'react';

const BreathingExercise: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Ready'>('Ready');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (phase === 'Ready') return;

    const timer = setInterval(() => {
      setSeconds(prev => {
        if (phase === 'Inhale' && prev >= 4) { setPhase('Hold'); return 0; }
        if (phase === 'Hold' && prev >= 4) { setPhase('Exhale'); return 0; }
        if (phase === 'Exhale' && prev >= 4) { setPhase('Inhale'); return 0; }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const start = () => {
    setPhase('Inhale');
    setSeconds(0);
  };

  const stop = () => {
    setPhase('Ready');
  };

  return (
    <div className="bg-blue-50/60 backdrop-blur-lg border border-blue-100/20 shape-premium p-8 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
      <h3 className="text-xl font-bold text-gray-800 mb-8 tracking-tight">Box Breathing</h3>
      
      <div className="relative flex items-center justify-center w-48 h-48 mb-8">
        {/* Animated Circle */}
        <div className={`absolute rounded-full bg-blue-400/20 transition-all duration-[4000ms] ease-in-out ${
          phase === 'Inhale' ? 'w-48 h-48' : 
          phase === 'Hold' ? 'w-48 h-48' : 
          phase === 'Exhale' ? 'w-24 h-24' : 'w-24 h-24'
        }`}></div>
        
        <div className="z-10 text-center">
          <p className="text-2xl font-bold text-blue-600 animate-pulse">{phase === 'Ready' ? '🧘' : phase}</p>
          {phase !== 'Ready' && <p className="text-xs font-bold text-blue-400 mt-1 uppercase tracking-[0.3em]">{4 - seconds}s</p>}
        </div>
      </div>

      {phase === 'Ready' ? (
        <button 
          onClick={start}
          className="px-8 py-3 bg-blue-600 text-white shape-premium font-bold shadow-lg hover:bg-blue-700 transition-all"
        >
          Begin Session
        </button>
      ) : (
        <button 
          onClick={stop}
          className="px-8 py-2 bg-gray-200 text-gray-600 shape-premium font-bold hover:bg-gray-300 transition-all"
        >
          End Session
        </button>
      )}
    </div>
  );
};

export default BreathingExercise;