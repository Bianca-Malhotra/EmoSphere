import React, { useState } from 'react';

interface MoodInsightsProps {
  history: Array<{ day: string; intensity: number; color: string; label: string }>;
}

const MoodInsights: React.FC<MoodInsightsProps> = ({ history }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocalInsight = () => {
    setLoading(true);
    setTimeout(() => {
      const avgIntensity = history.reduce((acc, curr) => acc + curr.intensity, 0) / history.length;
      let reflection = "";
      
      if (avgIntensity > 75) {
        reflection = "Your energy levels have been remarkably consistent and high this week. Remember to balance this vibrancy with deep rest.";
      } else if (avgIntensity > 50) {
        reflection = "You're maintaining a steady emotional balance. The consistency in your mood tracking shows great self-awareness.";
      } else {
        reflection = "It seems you've navigated some quieter, perhaps more challenging days. Give yourself grace and focus on small moments of comfort.";
      }
      
      setInsight(reflection);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-[#FFF0F3] border border-white/40 rounded-[3rem] p-10 shadow-sm min-h-[250px] flex flex-col transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#2D3142]">Weekly Reflection</h3>
        <button 
          onClick={getLocalInsight}
          disabled={loading}
          className={`p-2 rounded-full transition-all ${loading ? 'opacity-50' : 'hover:bg-white/50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-indigo-500 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {insight ? (
          <div className="p-6 bg-white/40 rounded-[2rem] border border-white/60 text-sm text-[#4A4E69] italic leading-relaxed animate-fade-in font-medium">
            {insight}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#FAD2E1] rounded-[2rem]">
            <p className="text-xs text-[#A0A4B8] font-bold tracking-tight">Reflect on your history</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodInsights;