
/**
 * Gemini Service (Mirrored for Consistency)
 * Now follows the same local-only architecture as wellnessService.
 */

const QUESTION_BANK = {
  Physical: ["How heavy do your eyelids feel?", "Where is your body holding tension?", "Rate your physical energy 1-10.", "Have you had enough water today?", "How does the air feel right now?", "Check your breath; is it deep?", "How comfortable is your current seat?", "Feel your hunger or fullness.", "Stretch your arms; how does it feel?", "Relax your shoulders now.", "Feel your feet on the ground.", "Listen for your heartbeat.", "Is a physical sensation asking for attention?"],
  Emotional: ["Describe your mood as weather.", "What felt heavy today?", "What color is your heart right now?", "When were you at peace today?", "Are you avoiding a specific feeling?", "What is your emotional temperature?", "Is your mood a fast or slow song?", "What are you proud of today?", "Be kind to your inner child.", "Where is the emotion in your chest?", "Describe your headspace in 3 words.", "What brought a smile today?", "Is there luggage you need to drop?"],
  Social: ["Who did you think of today?", "Did you feel seen today?", "How is your social battery?", "Was a conversation draining?", "Who makes you laugh?", "Do you feel connected today?", "Did you see kindness recently?", "Craving solitude or company?", "Who lets you be yourself?", "Did you set boundaries today?", "Which relationship needs care?", "When did you last feel truly heard?"],
  Mindfulness: ["Notice a new sound in the room.", "Feel the texture of your seat.", "Inhale; what is the scent?", "Find beauty in one simple object.", "How does it feel to just 'be'?", "Find the most vibrant color.", "Feel your ribcage moving.", "Which thought keeps returning?", "How does 'now' feel today?", "Are you in yesterday or tomorrow?", "Be grateful for this exact second.", "What does silence sound like?", "Are your thoughts moving like clouds?"]
};

export const speakMaia = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1; utterance.rate = 0.85; utterance.volume = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
};

export async function chatWithMaia(message: string) {
  await new Promise(r => setTimeout(r, 600));
  const userName = localStorage.getItem('emosphere_user') || 'friend';
  const isFirst = message === "Initial Contact";
  const cat = Object.keys(QUESTION_BANK)[Math.floor(Math.random() * 4)];
  const questions = QUESTION_BANK[cat as keyof typeof QUESTION_BANK];
  const question = questions[Math.floor(Math.random() * questions.length)];
  
  const greet = isFirst 
    ? `Hello ${userName}, I'm Maia. Let's explore your wellness together.` 
    : "I appreciate you sharing that.";
    
  return { text: `${greet} Let's do a ${cat} Check-in: ${question}`, data: { category: cat } };
}

export async function analyzeJournalImage(data: string) {
  return { sentiment: "Reflective and calm.", advice: "Keep documenting your journey." };
}

export async function analyzeGratitude(list: string[]) {
  return "Your gratitude is a powerful tool for wellness.";
}
