import React from 'react';
import { Flame, Moon, BookOpen, Clock, HeartHandshake, Volume2, VolumeX, Sparkles, Award, Globe } from 'lucide-react';
import { getTodayDateString, formatNajafCalendarDate } from '../utils/storage';
import { Language } from '../types';
import { t } from '../utils/translations';

interface HeaderProps {
  activeTab: 'evening' | 'pillars' | 'history' | 'tasbeeh' | 'wisdom';
  setActiveTab: (tab: 'evening' | 'pillars' | 'history' | 'tasbeeh' | 'wisdom') => void;
  streakCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  isMuted,
  onToggleMute,
  language,
  setLanguage,
}) => {
  const todayStr = getTodayDateString();
  const formattedCalendarDate = formatNajafCalendarDate(todayStr, language);

  return (
    <header className="relative w-full mb-8 pb-6 border-b border-amber-500/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 -z-10 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar with dates, language selector, and action controls */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Date Display (Najaf Calendar Standard - Unified without duplicate Gregorian) */}
        <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-4 py-2 rounded-2xl text-xs sm:text-sm text-slate-200 shadow-sm">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-200 dir-auto">{formattedCalendarDate}</span>
        </div>

        {/* Center: Modern Language Selection Buttons (العربية | English | فارسی) */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur border border-slate-700/60 p-1 rounded-2xl shadow-sm">
          <Globe className="w-4 h-4 text-amber-400 ml-1.5 mr-0.5 shrink-0 hidden sm:block" />
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              language === 'ar'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('fa')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              language === 'fa'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            فارسی
          </button>
        </div>

        {/* Action Controls: Streak & Audio Toggle */}
        <div className="flex items-center gap-3">
          {/* Streak Counter */}
          <div
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-2xl text-amber-300 text-sm font-semibold shadow-inner"
            title={t.streakLabel[language] || t.streakLabel.ar}
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{t.streakLabel[language] || t.streakLabel.ar}</span>
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center">
              {streakCount} {t.daysUnit[language] || t.daysUnit.ar}
            </span>
          </div>

          {/* Mute/Sound button */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
            title={isMuted ? (t.soundMuted[language] || t.soundMuted.ar) : (t.soundOn[language] || t.soundOn.ar)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="text-center my-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.appSubTitle[language] || t.appSubTitle.ar}</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-400 tracking-wide font-cairo drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] mb-2">
          {t.appTitle[language] || t.appTitle.ar}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto italic">
          {t.appQuote[language] || t.appQuote.ar}
        </p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap items-center justify-center gap-2 mt-8 w-full">
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
    </header>
  );
};
