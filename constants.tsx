
import { MoodType } from './types';

export const MOOD_CONFIGS = [
  { type: MoodType.HAPPY, emoji: '😊', color: 'bg-yellow-100', accent: 'text-yellow-600' },
  { type: MoodType.CALM, emoji: '🧘', color: 'bg-blue-100', accent: 'text-blue-600' },
  { type: MoodType.SAD, emoji: '😢', color: 'bg-indigo-100', accent: 'text-indigo-600' },
  { type: MoodType.ANXIOUS, emoji: '😰', color: 'bg-orange-100', accent: 'text-orange-600' },
  { type: MoodType.ENERGIZED, emoji: '⚡', color: 'bg-emerald-100', accent: 'text-emerald-600' },
  { type: MoodType.TIRED, emoji: '😴', color: 'bg-purple-100', accent: 'text-purple-600' },
];

export const THEMES = [
  { 
    id: 'sunset', 
    name: 'Eternal Sunset', 
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2000&auto=format&fit=crop")',
    pageGradient: 'linear-gradient(180deg, #1a0f0a 0%, #000000 100%)',
    accentColor: '#fb923c',
    primary: 'orange',
    icon: '🌅',
    dark: true,
    collageImages: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop'
    ]
  },
  { 
    id: 'rose', 
    name: 'Rose Garden', 
    bg: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop")',
    pageGradient: 'linear-gradient(180deg, #fff5f5 0%, #ffffff 100%)',
    accentColor: '#f43f5e',
    primary: 'rose',
    icon: '🌸',
    dark: false,
    collageImages: [
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=400&auto=format&fit=crop'
    ]
  },
  { 
    id: 'ocean', 
    name: 'Deep Oceanic', 
    bg: 'linear-gradient(rgba(0,50,100,0.4), rgba(0,20,50,0.6)), url("https://images.unsplash.com/photo-1518467166778-b88f373ffec7?q=80&w=2000&auto=format&fit=crop")',
    pageGradient: 'linear-gradient(180deg, #0a192f 0%, #020617 100%)',
    accentColor: '#38bdf8',
    primary: 'blue',
    icon: '🌊',
    dark: true,
    collageImages: [
      'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=400&auto=format&fit=crop'
    ]
  },
  { 
    id: 'midnight', 
    name: 'Starry Night', 
    bg: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2000&auto=format&fit=crop")',
    pageGradient: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
    accentColor: '#818cf8',
    primary: 'slate',
    icon: '🌙',
    dark: true,
    collageImages: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475139450941-3b6464b2dde3?q=80&w=400&auto=format&fit=crop'
    ]
  }
];

export const DEFAULT_QUOTES = [
  { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss" },
  { text: "Nature doesn't hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" }
];

export const DEFAULT_GOALS = [
  { id: '1', text: 'Drink 8 glasses of water', completed: false },
  { id: '2', text: '10-minute mindful walk', completed: false },
  { id: '3', text: 'Read 5 pages of a book', completed: false },
  { id: '4', text: 'No screens before bed', completed: false },
];

export const FOCUS_RESOURCES = [
  // APPS & TOOLS
  { name: "Forest", type: "App", url: "https://www.forestapp.cc/", icon: "🌳", desc: "Stay focused, be present. Plant a tree while you work." },
  { name: "Focus To-Do", type: "App", url: "https://play.google.com/store/apps/details?id=com.superelement.pomodoro&pcampaignid=web_share", icon: "🍅", desc: "The ultimate Pomodoro timer & task manager for deep work." },
  { name: "Spotify", type: "Spotify", url: "https://play.google.com/store/apps/details?id=com.spotify.music", icon: "🎧", desc: "Access personalized soundtracks for your mental clarity." },
  { name: "Hallow", type: "Spirituality", url: "https://hallow.com/", icon: "🕊️", desc: "Meditation, prayer, and spiritual growth in one sacred space." },
  { name: "Padhai Mode", type: "App", url: "https://play.google.com/store/search?q=gigl+app&c=apps", icon: "📖", desc: "Access book summaries and growth content via the GIGL app." },
  
  // YOUTUBE AMBIENCE
  { name: "Lofi Girl Live", type: "YouTube", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", icon: "👩‍💻", desc: "Join 50k+ others in the ultimate study stream." },
  { name: "Forest Streams", type: "YouTube", url: "https://www.youtube.com/watch?v=xNN7iTA57jM", icon: "🌲", desc: "Native 4K nature sounds for mental clarity." },
  { name: "Binaural Waves", type: "YouTube", url: "https://www.youtube.com/watch?v=WPni755-Krg", icon: "📡", desc: "Delta and Alpha waves for brain synchronization." },
  { name: "Rainy Space", type: "YouTube", url: "https://www.youtube.com/watch?v=mPZkdNFkNps", icon: "🚀", desc: "Sci-fi ambient sounds for futuristic concentration." }
];
