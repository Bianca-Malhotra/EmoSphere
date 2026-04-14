
import React, { useState } from 'react';
import { DEFAULT_QUOTES } from '../constants';
import { speakMaia } from '../services/wellnessService';

const DailyQuotes: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const quote = DEFAULT_QUOTES[quoteIdx];

  const handleNext = () => setQuoteIdx((prev) => (prev + 1) % DEFAULT_QUOTES.length);
  const handleNarrate = async () => {
    setIsNarrating(true);
    await speakMaia(`${quote.text} - By ${quote.author}`);
    setIsNarrating(false);
  };

  return (
    <div className="bg-[#131316] border border-white/5 shape-premium p-10 shadow-2xl flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/5 blur-[100px] group-hover:bg-cyan-500/10 transition-all"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.4em]">Daily Insight</span>
          <button 
            onClick={handleNarrate}
            disabled={isNarrating}
            className="w-12 h-12 flex items-center justify-center shape-premium bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isNarrating ? 'animate-pulse text-cyan-400' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-white text-2xl font-bold leading-tight mb-8 tracking-tight">
          "{quote.text}"
        </p>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
           <div className="w-8 h-[2px] bg-cyan-500"></div>
           <span className="text-sm font-bold text-gray-500">{quote.author}</span>
        </div>
        <button 
          onClick={handleNext}
          className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-white transition-colors"
        >
          Next Insight &rarr;
        </button>
      </div>
    </div>
  );
};

export default DailyQuotes;
