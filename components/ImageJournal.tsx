
import React, { useState, useEffect } from 'react';
import { analyzeJournalImage } from '../services/wellnessService';
import { AnalysisResult } from '../types';

interface ImageJournalProps {
  initialImage?: string | null;
  initialAnalysis?: AnalysisResult | null;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

const ImageJournal: React.FC<ImageJournalProps> = ({ initialImage, initialAnalysis, isPremium, onUpgrade }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(initialAnalysis || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialImage !== undefined) setImage(initialImage);
    if (initialAnalysis !== undefined) setAnalysis(initialAnalysis);
  }, [initialImage, initialAnalysis]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check trial limit
    if (!isPremium) {
      const usage = parseInt(localStorage.getItem('emosphere_journal_trial') || '0');
      if (usage >= 1) {
        onUpgrade?.();
        return;
      }
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      setImage(reader.result as string);
      setLoading(true);
      const result = await analyzeJournalImage(base64String);
      setAnalysis(result);
      setLoading(false);

      // Increment trial
      if (!isPremium) {
        const current = parseInt(localStorage.getItem('emosphere_journal_trial') || '0');
        localStorage.setItem('emosphere_journal_trial', (current + 1).toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-blue-50/60 backdrop-blur-lg border border-blue-100/20 rounded-3xl p-6 shadow-sm relative overflow-hidden">
      {!isPremium && <div className="absolute top-4 right-6 px-2 py-0.5 bg-amber-500/20 text-amber-600 text-[8px] font-black uppercase rounded">1 Trial Left</div>}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Visual Journal</h3>
      <p className="text-sm text-gray-500 mb-6">Upload a photo from your day for native reflection.</p>

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-3xl cursor-pointer hover:bg-blue-100/30 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-sm text-gray-500">Upload reflection photo</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden group">
            <img src={image} alt="Journal entry" className="w-full h-48 object-cover" />
            <button 
              onClick={() => { setImage(null); setAnalysis(null); }}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center gap-3 text-sm text-blue-600 font-medium">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : analysis && (
            <div className="p-4 bg-white/60 rounded-2xl border border-blue-100 text-sm animate-fade-in">
              <p className="font-bold text-blue-800 mb-1 italic">"{analysis.sentiment}"</p>
              <p className="text-gray-600 leading-relaxed">{analysis.advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageJournal;
