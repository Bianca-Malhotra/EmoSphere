
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { chatWithMaia, speakMaia } from '../services/wellnessService';

interface WellnessVoiceAgentProps {
  onLimitReached?: () => void;
  isPremium?: boolean;
}

const WellnessVoiceAgent: React.FC<WellnessVoiceAgentProps> = ({ onLimitReached, isPremium }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'Idle' | 'Connecting' | 'Listening' | 'Thinking' | 'Speaking'>('Idle');
  const [transcription, setTranscription] = useState<string>('');
  const [userSpeechText, setUserSpeechText] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  
  const activeRef = useRef(isActive);
  const statusRef = useRef(status);
  
  useEffect(() => { activeRef.current = isActive; }, [isActive]);
  useEffect(() => { statusRef.current = status; }, [status]);

  const recognition = React.useMemo(() => {
    const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = true; 
      rec.lang = 'en-US';
      return rec;
    }
    return null;
  }, []);

  const processResponse = useCallback(async (message: string) => {
    if (!activeRef.current) return;
    
    setStatus('Thinking');
    const result = await chatWithMaia(message);
    
    setTranscription(result.text);
    if (result.data) {
      setCurrentCategory(result.data.category);
    }
    
    setStatus('Speaking');
    await speakMaia(result.text);
    
    if (activeRef.current) {
      startListening();
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognition || !activeRef.current) return;
    
    try {
      if (statusRef.current === 'Listening') return;

      setStatus('Listening');
      setUserSpeechText('');
      recognition.start();

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            setUserSpeechText(finalTranscript);
            setUserInput(finalTranscript); 
            processResponse(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setUserInput(interimTranscript); 
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("STT Error:", event.error);
        if (activeRef.current) setStatus('Idle');
      };
      
      recognition.onend = () => {
        if (activeRef.current && statusRef.current === 'Listening') {
          setStatus('Idle');
        }
      };
    } catch (e) {
      console.error("Recognition start failed:", e);
      setStatus('Idle');
    }
  }, [recognition, processResponse]);

  const toggleMic = () => {
    if (!isActive) return;
    if (status === 'Listening') {
      recognition?.stop();
      setStatus('Idle');
    } else {
      startListening();
    }
  };

  const checkTrialLimit = () => {
    if (isPremium) return true;
    const usage = parseInt(localStorage.getItem('emosphere_voice_trial') || '0');
    if (usage >= 1) {
      onLimitReached?.();
      return false;
    }
    return true;
  };

  const startCheckIn = async () => {
    if (!checkTrialLimit()) return;
    
    setStatus('Connecting');
    setIsActive(true);
    
    const result = await chatWithMaia("Initial Contact");
    setTranscription(result.text);
    if (result.data) setCurrentCategory(result.data.category);
    
    setStatus('Speaking');
    await speakMaia(result.text);
    
    if (activeRef.current) {
      startListening();
    }

    // Increment trial count if not premium
    if (!isPremium) {
      const current = parseInt(localStorage.getItem('emosphere_voice_trial') || '0');
      localStorage.setItem('emosphere_voice_trial', (current + 1).toString());
    }
  };

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
      setStatus('Idle');
      setTranscription('');
      setUserSpeechText('');
      setUserInput('');
      setCurrentCategory(null);
      window.speechSynthesis.cancel();
      if (recognition) {
        try { recognition.stop(); } catch (e) {}
      }
    } else {
      startCheckIn();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const msg = userInput;
    setUserInput('');
    setUserSpeechText(msg);
    
    if (status === 'Listening') {
      recognition?.stop();
    }
    
    processResponse(msg);
  };

  const DashboardTrigger = (
    <div className="bg-[#121214] shape-premium p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all border border-white/5"
         onClick={toggleSession}>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl font-bold">Speak to Maia</h3>
           <span className="text-[10px] font-black px-3 py-1 bg-white/5 shape-premium border border-white/10 uppercase tracking-widest text-cyan-400">
             {isPremium ? 'PRO ACCESS' : 'TRIAL'}
           </span>
        </div>
        <p className="text-gray-400 text-sm mb-6">Tap to start a zero-cost, browser-native voice check-in.</p>
        <div className="flex gap-2">
           <div className={`w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]`}></div>
           <div className={`w-1.5 h-10 bg-cyan-400 rounded-full animate-pulse delay-75 shadow-[0_0_10px_rgba(34,211,238,0.5)]`}></div>
           <div className={`w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse delay-150 shadow-[0_0_10px_rgba(34,211,238,0.5)]`}></div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl group-hover:bg-cyan-600/20 transition-all"></div>
    </div>
  );

  if (!isActive && status === 'Idle') return DashboardTrigger;

  return (
    <div className={`fixed inset-0 z-[200] transition-all duration-700 overflow-hidden bg-[#0a1128] animate-fade-in`}>
      <div className="h-full w-full max-w-lg mx-auto flex flex-col items-center justify-between p-8 sm:p-12 text-white">
        
        <div className="w-full flex items-center justify-between mt-2">
          <button onClick={toggleSession} className="p-3 bg-white/5 shape-premium hover:bg-white/10 transition-colors text-gray-400 border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <p className="text-[11px] font-bold text-cyan-500 tracking-widest uppercase opacity-80">
              {currentCategory ? `${currentCategory} Check-in` : 'Maia Processing'}
            </p>
          </div>
          <button onClick={toggleMic} className={`p-3 shape-premium border transition-all duration-300 ${status === 'Listening' ? 'bg-cyan-500 text-black border-cyan-400 animate-pulse' : 'bg-white/5 text-gray-400 border-white/5'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 005.93 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center w-full">
          <div className={`relative w-80 h-80 flex items-center justify-center transition-all duration-700 ${status === 'Speaking' || status === 'Thinking' || status === 'Listening' ? 'animate-maia-glow' : ''}`}>
            <div className={`absolute inset-0 rounded-full bg-cyan-500/10 blur-[100px] transition-all duration-1000 ${status !== 'Idle' ? 'opacity-100 scale-125 bg-cyan-400/20' : 'opacity-40 scale-100'}`}></div>
            
            <div className={`relative w-56 h-48 shape-premium transition-all duration-500 border border-white/10 flex flex-col items-center justify-center bg-[#131316] ${status !== 'Idle' ? 'scale-105 border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'scale-100'}`}>
               <div className="flex gap-10 items-center justify-center z-10">
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'Listening' ? 'bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5'}`}>
                    <div className={`w-6 h-6 rounded-full bg-cyan-400 ${status === 'Speaking' || status === 'Thinking' ? 'animate-maia-eyes' : ''} ${status === 'Listening' ? 'animate-pulse scale-125' : ''}`}></div>
                  </div>
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'Listening' ? 'bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5'}`}>
                    <div className={`w-6 h-6 rounded-full bg-cyan-400 ${status === 'Speaking' || status === 'Thinking' ? 'animate-maia-eyes' : ''} ${status === 'Listening' ? 'animate-pulse scale-125' : ''}`}></div>
                  </div>
               </div>
               <div className="mt-8 h-4 w-32 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`w-1.5 rounded-full bg-cyan-400/60 transition-all duration-200 ${
                      status === 'Speaking' || status === 'Thinking' ? 'animate-pulse h-6' : 'h-1'
                    } ${status === 'Listening' ? 'h-4 bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}`}></div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="mt-12 text-center px-4 min-h-[120px] flex flex-col items-center justify-center">
             {status === 'Listening' && (
               <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-4 animate-pulse">Maia is Listening...</p>
             )}
             
             <h2 className="text-xl font-light text-white/90 tracking-tight leading-relaxed max-w-sm italic">
               {status === 'Thinking' ? (
                 <span className="opacity-60">"{(userSpeechText || userInput).substring(0, 80)}{userInput.length > 80 ? '...' : ''}"</span>
               ) : (
                 transcription || "Let's connect..."
               )}
             </h2>
             
             {status === 'Thinking' && (
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-4">Maia is processing your words...</p>
             )}
          </div>
        </div>

        <div className="w-full max-w-md bg-white/5 shape-premium backdrop-blur-md border border-white/5 shadow-inner p-6 mt-8 flex flex-col gap-4">
           <form onSubmit={handleManualSubmit} className="flex gap-4 items-center">
             <button 
               type="button"
               onClick={toggleMic}
               className={`p-3 shape-premium transition-all ${status === 'Listening' ? 'bg-cyan-400 text-black scale-110 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 005.93 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
               </svg>
             </button>
             
             <input 
               type="text"
               value={userInput}
               onChange={(e) => setUserInput(e.target.value)}
               placeholder={status === 'Listening' ? "Listening..." : "Speak or type your answer..."}
               className="flex-1 bg-transparent border-none outline-none text-white font-medium placeholder:text-white/20 px-2 transition-all"
               disabled={status === 'Thinking' || status === 'Speaking'}
             />
             
             <button 
               type="submit"
               className="p-3 bg-cyan-500 text-black shape-premium hover:bg-cyan-400 transition-all disabled:opacity-50"
               disabled={!userInput.trim() || status === 'Thinking' || status === 'Speaking'}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
               </svg>
             </button>
           </form>
        </div>

        <div className="w-full flex items-center justify-center my-8">
           <button 
             onClick={toggleSession}
             className="px-8 py-3 bg-white/5 text-gray-500 shape-premium hover:bg-rose-500/10 hover:text-rose-400 transition-all uppercase tracking-widest text-[10px] font-black border border-white/5"
           >
             End Session
           </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessVoiceAgent;
