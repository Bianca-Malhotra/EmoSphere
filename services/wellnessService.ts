
/**
 * Wellness Service (Native Loophole Version)
 * 100% Browser-Native. No API Keys. No Expiry.
 * Personalized Greeting + 50 Question Bank.
 */

const QUESTION_BANK = {
  Physical: [
    "How heavy do your eyelids feel right now?",
    "Where in your body are you holding the most tension?",
    "On a scale of 1-10, how is your physical energy?",
    "Have you nourished your body with enough water today?",
    "How does the air feel against your skin right now?",
    "Is your breath shallow or deep at this moment?",
    "How comfortable is the chair or surface you're on?",
    "Do you feel any specific hunger or fullness in your stomach?",
    "When was the last time you stretched your arms?",
    "Are your shoulders hunched or relaxed right now?",
    "How do your feet feel touching the floor?",
    "Can you feel your heartbeat if you stay very still?",
    "Is there a physical sensation you've been ignoring today?"
  ],
  Emotional: [
    "If your current mood was a weather pattern, what would it be?",
    "What is one thing that felt unexpectedly heavy today?",
    "What color best represents your heart right now?",
    "When was the last time you felt truly 'at peace' today?",
    "Is there a feeling you are currently trying to avoid?",
    "What is the 'temperature' of your emotions right now?",
    "If your mood was a song, would it be fast or slow?",
    "What is one thing you're proud of yourself for today?",
    "Are you being kind to your inner child right now?",
    "What emotion is sitting most prominently in your chest?",
    "How would you describe your current headspace in three words?",
    "Is there something small that brought a smile to your face today?",
    "Are you carrying any 'emotional luggage' that isn't yours to hold?"
  ],
  Social: [
    "Who is one person you've thought of today?",
    "Did you feel 'seen' by anyone in your circles today?",
    "How much social energy do you have left in your 'battery'?",
    "Was there a conversation that felt particularly draining?",
    "Who would you reach out to if you needed a laugh right now?",
    "Do you feel connected to the world around you today?",
    "Was there a moment of kindness you witnessed recently?",
    "Are you craving solitude or company right now?",
    "Who makes you feel most like yourself?",
    "Have you set any boundaries for your energy today?",
    "Is there a relationship that needs a little extra care today?",
    "When did you last feel truly heard?"
  ],
  Mindfulness: [
    "What is one sound in your room you hadn't noticed until now?",
    "Can you describe the texture of the surface you are sitting on?",
    "Take a deep breath; what is the first scent you notice?",
    "What is one thing you can see right now that is beautiful in its simplicity?",
    "How does it feel to just 'be' for this exact moment?",
    "What is the most vibrant color in your current field of vision?",
    "Can you feel the movement of your ribcage as you breathe?",
    "What is one thought that keeps drifting back to you?",
    "How does the concept of 'now' feel to you today?",
    "Are you dwelling on a 'yesterday' or a 'tomorrow' right now?",
    "Can you find one thing to be grateful for in this exact second?",
    "What does silence sound like to you right now?",
    "If your thoughts were clouds, how fast would they be moving?"
  ]
};

const WELLNESS_TIPS = [
  { title: "Box Breathing", content: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Repeat 3 times.", url: "https://www.webmd.com/balance/what-is-box-breathing" },
  { title: "Hydration Check", content: "Drink a glass of water now. Your brain is 75% water.", url: "#" },
  { title: "Digital Sunset", content: "Turn off screens 30 minutes before sleep to reset your circadian rhythm.", url: "#" },
  { title: "Grounding 5-4-3-2-1", content: "Identify 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.", url: "#" }
];

export const speakMaia = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported.");
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1; 
    utterance.rate = 0.85; 
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Natural')) && 
      v.lang.startsWith('en')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
};

let lastCategory = '';

export async function chatWithMaia(message: string) {
  await new Promise(r => setTimeout(r, 600));
  
  const userName = localStorage.getItem('emosphere_user') || 'friend';
  const isFirstContact = message === "Initial Contact";

  const categories = Object.keys(QUESTION_BANK);
  let category = categories[Math.floor(Math.random() * categories.length)];
  
  if (category === lastCategory) {
    category = categories[(categories.indexOf(category) + 1) % categories.length];
  }
  lastCategory = category;

  const questions = QUESTION_BANK[category as keyof typeof QUESTION_BANK];
  const question = questions[Math.floor(Math.random() * questions.length)];

  let validation = "";
  if (isFirstContact) {
    validation = `Hello ${userName}, it's so good to connect with you. I'm Maia, your wellness companion. I'm here to help you check in with yourself.`;
  } else {
    const greetings = [
      "Thank you for sharing that with me.",
      "I appreciate your honesty.",
      "That's a very valid way to feel.",
      "I'm listening and I'm here for you.",
      "It's good to speak these things out loud."
    ];
    validation = greetings[Math.floor(Math.random() * greetings.length)];
  }

  const text = `${validation} Let's do a ${category} Check-in: ${question}`;
  
  return {
    text,
    data: {
      category,
      score_impact: 3,
      recorded_ans: message.slice(0, 50) + "..."
    }
  };
}

export async function fetchWellnessTips(mood?: string) {
  return WELLNESS_TIPS;
}

export async function analyzeJournalImage(base64Data: string) {
  return {
    sentiment: "This image carries a quiet, reflective energy.",
    advice: "Capture more moments like this. They are anchors for your future self."
  };
}

export async function analyzeGratitude(list: string[]) {
  if (list.length > 3) return "Your heart is overflowing with gratitude today. This abundance is a beautiful foundation for your growth.";
  return "Focusing on these small sparks of light is how we build a warmer inner world.";
}

// Add these to wellnessService.ts

/**
 * Persists premium status to localStorage (Native Loophole Version)
 */
export const upgradeToPremium = async (userId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(`emosphere_premium_${userId}`, 'true');
      console.log(`User ${userId} upgraded to Premium.`);
      resolve(true);
    }, 2000); // 2 second mock delay
  });
};

/**
 * Checks if the current user is premium
 */
export const checkPremiumStatus = (userId: string): boolean => {
  return localStorage.getItem(`emosphere_premium_${userId}`) === 'true';
};