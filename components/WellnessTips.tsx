
import React, { useState, useEffect } from 'react';
import { WellnessTip, MoodType } from '../types';
import { fetchWellnessTips } from '../services/wellnessService';

interface WellnessTipsProps {
  activeMood?: MoodType;
}

const WellnessTips: React.FC<WellnessTipsProps> = ({ activeMood }) => {
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTips = async () => {
    setLoading(true);
    const data = await fetchWellnessTips(activeMood);
    setTips(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTips();
  }, [activeMood]);

  return (
    <div className="bg-emerald-50/60 backdrop-blur-lg border border-emerald-100/20 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Mindful Guidance</h3>
        <button 
          onClick={loadTips}
          className="p-2 hover:bg-emerald-100/50 rounded-full transition-colors text-emerald-600"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-emerald-100/30 animate-pulse rounded-2xl" />
          ))
        ) : (
          tips.map((tip, idx) => (
            <div key={idx} className="p-4 bg-white/40 rounded-2xl border border-white/40 hover:bg-white/60 transition-all">
              <h4 className="font-bold text-emerald-800 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{tip.content}</p>
              {tip.url && (
                <a href={tip.url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 mt-2 inline-block font-medium hover:underline">
                  Learn more &rarr;
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WellnessTips;
