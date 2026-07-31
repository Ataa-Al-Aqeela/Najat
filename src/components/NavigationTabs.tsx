import React from 'react';
import { Moon, Award, BookOpen, HeartHandshake, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface NavigationTabsProps {
  activeTab: 'evening' | 'pillars' | 'history' | 'tasbeeh' | 'wisdom';
  setActiveTab: (tab: 'evening' | 'pillars' | 'history' | 'tasbeeh' | 'wisdom') => void;
  language: Language;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 my-6 w-full">
      <button
        onClick={() => setActiveTab('evening')}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'evening'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/40'
        }`}
      >
        <Moon className="w-4 h-4 shrink-0" />
        <span>{t.navEvening[language] || t.navEvening.ar}</span>
      </button>

      <button
        onClick={() => setActiveTab('pillars')}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'pillars'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/40'
        }`}
      >
        <Award className="w-4 h-4 shrink-0" />
        <span>{t.navPillars[language] || t.navPillars.ar}</span>
      </button>

      <button
        onClick={() => setActiveTab('history')}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'history'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/40'
        }`}
      >
        <BookOpen className="w-4 h-4 shrink-0" />
        <span>{t.navHistory[language] || t.navHistory.ar}</span>
      </button>

      <button
        onClick={() => setActiveTab('tasbeeh')}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'tasbeeh'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/40'
        }`}
      >
        <HeartHandshake className="w-4 h-4 shrink-0" />
        <span>{t.navTasbeeh[language] || t.navTasbeeh.ar}</span>
      </button>

      <button
        onClick={() => setActiveTab('wisdom')}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'wisdom'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/40'
        }`}
      >
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>{t.navWisdom[language] || t.navWisdom.ar}</span>
      </button>
    </nav>
  );
};
