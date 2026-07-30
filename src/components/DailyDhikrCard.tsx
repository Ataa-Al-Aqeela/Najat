import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Calendar, Award, Volume2, VolumeX, Plus } from 'lucide-react';
import { DAILY_DHIKR_DATA, DailyDhikr } from '../data/spiritualData';
import { loadDailyDhikrCount, saveDailyDhikrCount } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { Language } from '../types';

interface DailyDhikrCardProps {
  language?: Language;
}

export const DailyDhikrCard: React.FC<DailyDhikrCardProps> = ({ language = 'ar' }) => {
  // Determine current day index (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const todayDayIndex = new Date().getDay();

  // Selected day index state (defaults to today)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(todayDayIndex);

  // Active Dhikr object based on selected day
  const currentDhikr: DailyDhikr = DAILY_DHIKR_DATA.find((d) => d.dayIndex === selectedDayIndex) || DAILY_DHIKR_DATA[0];

  // Counter state
  const [count, setCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Load count when selected day changes
  useEffect(() => {
    const savedCount = loadDailyDhikrCount(selectedDayIndex);
    setCount(savedCount);
    setIsCompleted(savedCount >= currentDhikr.recommendedCount);
  }, [selectedDayIndex, currentDhikr.recommendedCount]);

  const handleIncrement = (amount = 1) => {
    soundManager.playClickSound();
    const newCount = Math.min(count + amount, currentDhikr.recommendedCount);
    setCount(newCount);
    saveDailyDhikrCount(selectedDayIndex, newCount);

    if (newCount >= currentDhikr.recommendedCount && !isCompleted) {
      setIsCompleted(true);
      soundManager.playCompletionSound();
    }
  };

  const handleReset = () => {
    soundManager.playClickSound();
    setCount(0);
    setIsCompleted(false);
    saveDailyDhikrCount(selectedDayIndex, 0);
  };

  const progressPercent = Math.min(100, Math.round((count / currentDhikr.recommendedCount) * 100));

  const dayTabs = [
    { idx: 6, label: { ar: 'السبت', en: 'Sat', fa: 'شنبه' } },
    { idx: 0, label: { ar: 'الأحد', en: 'Sun', fa: 'یکشنبه' } },
    { idx: 1, label: { ar: 'الإثنين', en: 'Mon', fa: 'دوشنبه' } },
    { idx: 2, label: { ar: 'الثلاثاء', en: 'Tue', fa: 'سه‌شنبه' } },
    { idx: 3, label: { ar: 'الأربعاء', en: 'Wed', fa: 'چهارشنبه' } },
    { idx: 4, label: { ar: 'الخميس', en: 'Thu', fa: 'پنج‌شنبه' } },
    { idx: 5, label: { ar: 'الجمعة', en: 'Fri', fa: 'جمعه' } },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 border border-emerald-500/40 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Calendar className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-cairo dir-auto">
                {language === 'en' ? 'Daily Interactive Dhikr' : language === 'fa' ? 'ورد روزانه تعاملی' : 'وِرْد اليوم التفاعلي'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold dir-auto">
                {currentDhikr.dayName[language] || currentDhikr.dayName.ar}
                {selectedDayIndex === todayDayIndex && (
                  <span className="mr-1 text-amber-300"> ({language === 'en' ? 'Today' : language === 'fa' ? 'امروز' : 'اليوم'})</span>
                )}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light dir-auto pt-0.5">
              {currentDhikr.significance[language] || currentDhikr.significance.ar}
            </p>
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          title="إعادة ضبط العداد"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'en' ? 'Reset' : language === 'fa' ? 'بازنشانی' : 'إعادة ضبط'}</span>
        </button>
      </div>

      {/* Days Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {dayTabs.map((tab) => {
          const isSelected = tab.idx === selectedDayIndex;
          const isToday = tab.idx === todayDayIndex;
          return (
            <button
              key={tab.idx}
              onClick={() => {
                soundManager.playClickSound();
                setSelectedDayIndex(tab.idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
              }`}
            >
              <span>{tab.label[language] || tab.label.ar}</span>
              {isToday && (
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Dhikr Card Counter */}
      <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-6">
        {/* Dhikr Phrase Display */}
        <div className="py-2">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-300 font-amiri leading-relaxed tracking-wide drop-shadow-md dir-auto">
            «{currentDhikr.phrase}»
          </p>
        </div>

        {/* Progress Bar & Repetition Counter */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300 px-1">
            <span>{language === 'en' ? 'Progress' : language === 'fa' ? 'پیشرفت' : 'نسبة الإنجاز'}</span>
            <span className="text-amber-400">
              {count} / {currentDhikr.recommendedCount} {language === 'en' ? 'reps' : language === 'fa' ? 'مرتبه' : 'مرة'} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Completion Celebration Badge */}
        {isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm font-bold animate-bounce dir-auto">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>
              {language === 'en'
                ? 'Great job! You completed today’s Dhikr (100 reps) 🎉'
                : language === 'fa'
                ? 'تقبل الله! ذکر امروز (۱۰۰ مرتبه) کامل شد 🎉'
                : 'تقبّل الله! أتممت وِرْد اليوم كاملاً (100 مرة) 🎉'}
            </span>
          </div>
        )}

        {/* Big Tap Button */}
        <div className="pt-2 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => handleIncrement(1)}
            disabled={isCompleted}
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center gap-1 border-4 shadow-2xl transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 opacity-90'
                : 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300/80 text-slate-950 shadow-amber-500/30 hover:scale-105 active:scale-95'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider opacity-80 dir-auto">
              {isCompleted
                ? language === 'en'
                  ? 'Completed'
                  : language === 'fa'
                  ? 'تکمیل شد'
                  : 'مكتمل'
                : language === 'en'
                ? 'Tap Dhikr'
                : language === 'fa'
                ? 'لمس ذکر'
                : 'اضغط للذكر'}
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold font-cairo drop-shadow">
              {count}
            </span>
            <span className="text-xs font-semibold dir-auto">
              / {currentDhikr.recommendedCount}
            </span>
          </button>

          {/* Quick Increment Chips (+1, +5, +10) */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 5, 10].map((step) => (
              <button
                key={step}
                onClick={() => handleIncrement(step)}
                disabled={isCompleted}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-amber-300 text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                +{step}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
