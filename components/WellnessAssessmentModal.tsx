import React, { useState } from 'react';
import { WellnessAssessmentResult } from '../types';

interface WellnessAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (result: WellnessAssessmentResult) => void;
}

const WellnessAssessmentModal: React.FC<WellnessAssessmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    weather: 3,
    noise: 3,
    connection: 3,
    tension: 3
  });

  if (!isOpen) return null;

  const questions = [
    {
      id: 'weather',
      title: 'Emotional Weather',
      subtitle: "On a scale of 1-5, how would you rate your internal 'weather' today?",
      labels: ['Stormy', 'Cloudy', 'Overcast', 'Clear', 'Sunny'],
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'noise',
      title: 'Mind Noise',
      subtitle: "How 'noisy' is your mind right now?",
      labels: ['Racing', 'Busy', 'Moderate', 'Quiet', 'Focused'],
      color: 'from-purple-400 to-indigo-400'
    },
    {
      id: 'connection',
      title: 'Social Connection',
      subtitle: "Did you feel connected to friends or family today?",
      labels: ['Isolated', 'Detached', 'Neutral', 'Connected', 'Supported'],
      color: 'from-rose-400 to-pink-400'
    },
    {
      id: 'tension',
      title: 'Physical State',
      subtitle: "How much tension are you carrying in your body?",
      labels: ['Very Tense', 'Stiff', 'Average', 'Relaxed', 'Fully Relaxed'],
      color: 'from-emerald-400 to-teal-400'
    }
  ];

  const currentQ = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit({ ...answers, timestamp: new Date() });
      setStep(0);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateAnswer = (val: number) => {
    setAnswers({ ...answers, [currentQ.id]: val });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="bg-[#0f1115] w-full max-w-xl shape-premium p-10 shadow-2xl border border-white/5 relative overflow-hidden">
        
        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-cyan-400' : 'w-3 bg-white/10'
              }`}
            />
          ))}
        </div>

        <div className="animate-fade-in" key={step}>
          <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Wellness Sync</p>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">{currentQ.title}</h2>
          <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed">{currentQ.subtitle}</p>

          <div className="flex flex-col gap-4 mb-16">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => updateAnswer(val)}
                className={`w-full py-5 px-8 shape-premium text-left flex items-center justify-between transition-all duration-300 group ${
                  answers[currentQ.id as keyof typeof answers] === val
                    ? `bg-gradient-to-r ${currentQ.color} text-black font-black shadow-lg shadow-cyan-500/20`
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="text-lg uppercase tracking-widest">{currentQ.labels[val - 1]}</span>
                <span className="opacity-40 font-black">{val}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
          <button 
            onClick={handleBack}
            disabled={step === 0}
            className={`px-8 py-3 shape-premium text-xs font-black uppercase tracking-widest transition-all ${
              step === 0 ? 'opacity-20 cursor-not-allowed' : 'text-gray-500 hover:text-white'
            }`}
          >
            &larr; Back
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-4 bg-white text-black shape-premium font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-200 transition-all active:scale-95"
          >
            {step === questions.length - 1 ? 'Complete Assessment' : 'Next Question &rarr;'}
          </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WellnessAssessmentModal;