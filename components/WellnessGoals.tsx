
import React, { useState, useEffect } from 'react';
import { WellnessGoal } from '../types';
import { DEFAULT_GOALS } from '../constants';

interface WellnessGoalsProps {
  initialGoals?: WellnessGoal[];
}

const WellnessGoals: React.FC<WellnessGoalsProps> = ({ initialGoals }) => {
  const [goals, setGoals] = useState<WellnessGoal[]>(initialGoals || DEFAULT_GOALS);

  useEffect(() => {
    if (initialGoals) {
      setGoals(initialGoals);
    }
  }, [initialGoals]);

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Daily Rituals</h3>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {completedCount}/{goals.length} DONE
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
        <div 
          className="bg-emerald-400 h-2 rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        {goals.map(goal => (
          <div 
            key={goal.id} 
            onClick={() => toggleGoal(goal.id)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              goal.completed ? 'bg-emerald-400 border-emerald-400 text-white' : 'border-gray-200 group-hover:border-emerald-300'
            }`}>
              {goal.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={`text-sm font-medium transition-all ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {goal.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessGoals;
