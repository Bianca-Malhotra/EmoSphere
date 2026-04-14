export enum MoodType {
  HAPPY = 'Happy',
  CALM = 'Calm',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  ENERGIZED = 'Energized',
  TIRED = 'Tired'
}

export interface MoodEntry {
  id: string;
  type: MoodType;
  emoji: string;
  timestamp: Date;
  note?: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface WellnessTip {
  title: string;
  content: string;
  url?: string;
}

export interface AnalysisResult {
  sentiment: string;
  advice: string;
}

export interface WellnessGoal {
  id: string;
  text: string;
  completed: boolean;
}

export interface GratitudeEntry {
  id: string;
  text: string;
}

export interface WeeklyVibrationData {
  average: number;
  weather: number;
  noise: number;
  connection: number;
  tension: number;
  imageUrl: string;
}

export interface WellnessAssessmentResult {
  weather: number;
  noise: number;
  connection: number;
  tension: number;
  timestamp: Date;
}