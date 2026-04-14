
import React, { useState } from 'react';
import Moodboard from '../components/Moodboard';
import DailyQuotes from '../components/DailyQuotes';
import WellnessTips from '../components/WellnessTips';
import ImageJournal from '../components/ImageJournal';
import GratitudeJournal from '../components/GratitudeJournal';
import BreathingExercise from '../components/BreathingExercise';
import WellnessGoals from '../components/WellnessGoals';
import CrisisSupportModal from '../components/CrisisSupportModal';
import CrisisCard from '../components/CrisisCard';
import MoodInsights from '../components/MoodInsights';
import DailyActivity from '../components/DailyActivity';
import WellnessVoiceAgent from '../components/WellnessVoiceAgent';
import WellnessAssessmentModal from '../components/WellnessAssessmentModal';
import ConcentrationHub from '../components/ConcentrationHub';
import { MoodType, MoodEntry, WellnessGoal, WellnessAssessmentResult } from '../types';
import { DEFAULT_GOALS } from '../constants';

interface DashboardProps {
  user: string | null;
  isPremium: boolean;
  openSubscription: () => void;
  currentThemeId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isPremium, openSubscription, currentThemeId }) => {
  const [currentMood, setCurrentMood] = useState<MoodEntry | null>(null);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Demo state for child components
  const [demoGoals, setDemoGoals] = useState<WellnessGoal[]>(DEFAULT_GOALS);
  const [demoGratitude, setDemoGratitude] = useState<string[]>([]);
  const [demoImage, setDemoImage] = useState<{url: string | null, analysis: any}>({url: null, analysis: null});
  const [activityStats, setActivityStats] = useState({ 
    focus: 0, 
    rest: 0, 
    inputsCount: 0,
    inputsTotal: 5
  });

  // Mock history for the insights demo
  const mockHistory = [
    { day: 'Mon', intensity: 80, color: 'bg-yellow-400', label: 'Happy' },
    { day: 'Tue', intensity: 60, color: 'bg-blue-400', label: 'Calm' },
    { day: 'Wed', intensity: 45, color: 'bg-purple-400', label: 'Tired' },
    { day: 'Thu', intensity: 75, color: 'bg-emerald-400', label: 'Energized' },
    { day: 'Fri', intensity: 90, color: 'bg-yellow-400', label: 'Happy' },
    { day: 'Sat', intensity: 85, color: 'bg-orange-400', label: 'Happy' },
    { day: 'Sun', intensity: 70, color: 'bg-blue-400', label: 'Calm' },
  ];

  const handleMoodSelect = (type: MoodType, emoji: string) => {
    setCurrentMood({
      id: Math.random().toString(36).substr(2, 9),
      type,
      emoji,
      timestamp: new Date()
    });
    setActivityStats(prev => ({ ...prev, inputsCount: Math.min(prev.inputsTotal, prev.inputsCount + 1) }));
  };

  const handleAssessmentSubmit = (result: WellnessAssessmentResult) => {
    const focusVal = Math.min(100, (result.weather + (6 - result.noise)) * 10);
    const restVal = Math.min(100, (result.tension + result.connection) * 10);
    
    setActivityStats({ 
      focus: focusVal, 
      rest: restVal,
      inputsCount: Math.min(activityStats.inputsTotal, activityStats.inputsCount + 1),
      inputsTotal: 5
    });

    const notification = document.createElement('div');
    notification.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-8 py-4 shape-premium text-sm font-black shadow-2xl z-[100] animate-bounce uppercase tracking-widest";
    notification.innerText = "✨ Wellness Assessment Synced";
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const loadDemo = () => {
    setDemoLoaded(true);
    setCurrentMood({ id: 'demo-1', type: MoodType.HAPPY, emoji: '😊', timestamp: new Date() });
    setDemoGratitude(["The morning sunlight", "Good coffee", "Productive focus"]);
    setDemoGoals(DEFAULT_GOALS.map((g, i) => i < 3 ? { ...g, completed: true } : g));
    setDemoImage({
      url: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=600",
      analysis: { sentiment: "Serene reflection.", advice: "You are centered today." }
    });
    setActivityStats({ focus: 75, rest: 40, inputsCount: 3, inputsTotal: 5 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const DailyFeedbackBar = (
    <div className="bg-[#0f1115] border border-white/5 shape-premium p-6 flex items-center justify-between shadow-2xl animate-fade-in transition-transform hover:scale-[1.01] w-full">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-white/5 shape-premium flex items-center justify-center text-3xl shadow-inner border border-white/5 shrink-0">
          📄<span className="absolute text-sm mt-4 ml-4">✏️</span>
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Daily Feedback</h3>
          <p className="text-sm text-gray-500 font-medium italic">Start your wellness assessment.</p>
        </div>
      </div>
      <button 
        onClick={() => setIsAssessmentOpen(true)}
        className="px-10 py-4 bg-cyan-500 text-black shape-premium text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400 transition-all active:scale-95"
      >
        CHECK-IN
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pt-36 pb-8 md:px-8">
      <CrisisSupportModal isOpen={isCrisisModalOpen} onClose={() => setIsCrisisModalOpen(false)} />
      <WellnessAssessmentModal isOpen={isAssessmentOpen} onClose={() => setIsAssessmentOpen(false)} onSubmit={handleAssessmentSubmit} />

      <div className="flex flex-col lg:flex-row gap-8 mb-16 items-start">
        <div className="flex-1 w-full lg:max-w-md">
           {DailyFeedbackBar}
           <div className="mt-8">
             <DailyActivity 
                focus={activityStats.focus} 
                rest={activityStats.rest}
                inputsCount={activityStats.inputsCount}
                inputsTotal={activityStats.inputsTotal}
                imageUrl={demoImage.url || undefined}
              />
           </div>
           
           {isPremium && (
             <div className="mt-8 p-8 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 shape-premium backdrop-blur-md">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="text-white font-black text-sm uppercase tracking-widest">Premium Account</h4>
                 <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded uppercase">Active</div>
               </div>
               <p className="text-gray-400 text-xs leading-relaxed mb-6 italic">Next billing cycle: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</p>
               <button className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors">Manage Subscription &rarr;</button>
             </div>
           )}
        </div>
        <div className="flex-1 w-full space-y-8">
            {!demoLoaded && !currentMood && (
              <div className="p-5 bg-white/60 backdrop-blur-md border border-white/60 shape-premium flex items-center justify-between animate-fade-in shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 shape-premium flex items-center justify-center text-2xl text-rose-500">✨</div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Experience EmoSphere</p>
                    <p className="text-xs text-gray-500 italic">Simulate full wellness data.</p>
                  </div>
                </div>
                <button onClick={loadDemo} className="px-8 py-3 bg-gray-900 text-white shape-premium text-xs font-black uppercase tracking-widest transition-all">Run Demo</button>
              </div>
            )}
            <DailyQuotes />
        </div>
      </div>

      <header className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.5em]">Personal Sanctuary</p>
            {isPremium && (
              <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">Premium Member</span>
            )}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-800 tracking-tighter leading-none">
            {user ? `Welcome, ${user}` : "Growth Space"}
          </h1>
          <p className="text-gray-400 font-medium mt-6 text-xl max-w-xl leading-relaxed italic">
            "Your journey towards inner peace starts with a single reflection."
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
           {!isPremium && (
             <button onClick={openSubscription} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shape-premium text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105">Go Premium</button>
           )}
           <div className="w-full sm:w-auto bg-white/40 backdrop-blur-sm border border-white/60 px-8 py-5 shape-premium shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Session Data</p>
            <p className="text-xl font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
        <div className="lg:col-span-8 space-y-12">
          <Moodboard onMoodSelect={handleMoodSelect} currentMood={currentMood} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ImageJournal 
              initialImage={demoImage.url} 
              initialAnalysis={demoImage.analysis} 
              isPremium={isPremium}
              onUpgrade={openSubscription}
            />
            <GratitudeJournal 
              initialItems={demoGratitude} 
              isPremium={isPremium}
              onUpgrade={openSubscription}
            />
          </div>
          <BreathingExercise />
        </div>

        <div className="lg:col-span-4 space-y-10">
          <WellnessVoiceAgent 
            onLimitReached={openSubscription} 
            isPremium={isPremium} 
          />
          <WellnessGoals initialGoals={demoGoals} />
          <WellnessTips activeMood={currentMood?.type} />
        </div>
      </div>

      <div className="mb-20">
        <ConcentrationHub currentThemeId={currentThemeId} />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        <MoodInsights history={mockHistory} />
        <CrisisCard onOpenModal={() => setIsCrisisModalOpen(true)} />
      </section>
    </div>
  );
};

export default Dashboard;
