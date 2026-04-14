
import React, { useState, useEffect } from 'react';
import { analyzeGratitude } from '../services/wellnessService';

interface GratitudeJournalProps {
  initialItems?: string[];
  isPremium?: boolean;
  onUpgrade?: () => void;
}

const GratitudeJournal: React.FC<GratitudeJournalProps> = ({ initialItems, isPremium, onUpgrade }) => {
  const [items, setItems] = useState<string[]>(initialItems || []);
  const [input, setInput] = useState('');
  const [boost, setBoost] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems);
    }
  }, [initialItems]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setItems([...items, input.trim()]);
      setInput('');
    }
  };

  const getBoost = async () => {
    if (items.length === 0) return;

    // Check trial limit
    if (!isPremium) {
      const usage = parseInt(localStorage.getItem('emosphere_gratitude_trial') || '0');
      if (usage >= 1) {
        onUpgrade?.();
        return;
      }
    }

    setLoading(true);
    const result = await analyzeGratitude(items);
    setBoost(result);
    setLoading(false);

    // Increment trial
    if (!isPremium) {
      const current = parseInt(localStorage.getItem('emosphere_gratitude_trial') || '0');
      localStorage.setItem('emosphere_gratitude_trial', (current + 1).toString());
    }
  };

  return (
    <div className="bg-amber-50/60 backdrop-blur-lg border border-amber-100/20 rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden">
      {!isPremium && <div className="absolute top-4 right-6 px-2 py-0.5 bg-amber-500/20 text-amber-600 text-[8px] font-black uppercase rounded">1 Trial Left</div>}
      <h3 className="text-xl font-bold text-gray-800 mb-2">Gratitude List</h3>
      <p className="text-sm text-gray-500 mb-6">What made you smile today?</p>

      <form onSubmit={addItem} className="mb-4 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I'm grateful for..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/50 border-none focus:ring-2 focus:ring-amber-300 text-sm"
        />
        <button type="submit" className="p-2 bg-amber-400 text-white rounded-xl hover:bg-amber-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </form>

      <div className="space-y-2 mb-6 min-h-[100px]">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 animate-fade-in">
            <span className="text-amber-400 font-bold">✨</span>
            {item}
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-400 italic">No entries yet...</p>}
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={getBoost}
          disabled={loading || items.length === 0}
          className="w-full py-3 bg-white/80 border border-amber-200 text-amber-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-100 transition-all disabled:opacity-50"
        >
          {loading ? 'Reflecting...' : 'Native Boost'}
        </button>

        {boost && (
          <div className="p-4 bg-amber-100/50 rounded-2xl border border-amber-200 text-sm italic text-amber-800 animate-scale-up">
            "{boost}"
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
