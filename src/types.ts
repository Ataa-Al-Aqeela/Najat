export type Language = 'ar' | 'en' | 'fa';

export interface PillarItem {
  id: string;
  text: string;
}

export interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor?: string;
  focusArea: string;
  salvationQuestion: string;
  suggestedChecklist: PillarItem[];
}

export interface ReflectionEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  blessings: string; // نِعَم وأرباح
  shortcomings: string; // تقصير تم رصده
  restorationPlan: string; // قرار الترميم لغدٍ
  rating?: number; // 1 - 5
  pillarScores?: { [key: number]: number }; // score 1-5 for each pillar
  checkedItems?: { [key: string]: boolean };
  notes?: string;
}

export interface HadithQuote {
  id: string;
  text: string;
  source: string;
  category?: string;
}

export interface DhikrItem {
  id: string;
  phrase: string;
  translation?: string;
  recommendedCount: number;
}
