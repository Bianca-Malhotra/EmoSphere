import React from 'react';
import { MoodType, MoodEntry } from '../types';
import { MOOD_CONFIGS } from '../constants';

interface MoodboardProps {
  onMoodSelect: (mood: MoodType, emoji: string) => void;
  currentMood: MoodEntry | null;
}

const Moodboard: React.FC<MoodboardProps> = ({ onMoodSelect, currentMood }) => {
  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/20 shape-premium p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">How are you feeling?</h2>
      <p className="text-gray-500 mb-6">Select the emoji that matches your energy right now.</p>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
        {MOOD_CONFIGS.map((config) => (
          <button
            key={config.type}
            onClick={() => onMoodSelect(config.type, config.emoji)}
            className={`flex flex-col items-center p-4 shape-premium transition-all duration-300 hover:scale-105 ${
              currentMood?.type === config.type 
                ? `${config.color} ring-2 ring-white shadow-md` 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          >
            <span className="text-3xl mb-2">{config.emoji}</span>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">{config.type}</span>
          </button>
        ))}
      </div>

      {currentMood && (
        <div className="mt-4 p-4 shape-premium bg-white/80 border border-white/40 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentMood.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-700">Currently feeling {currentMood.type}</p>
              <p className="text-xs text-gray-400">
                Logged at {currentMood.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moodboard;