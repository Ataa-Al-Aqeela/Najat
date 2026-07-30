import React, { useState, useEffect } from 'react';
import { HeartHandshake, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { DHIKR_ITEMS } from '../data/spiritualData';
import { soundManager } from '../utils/audio';
import { loadTasbeehCount, saveTasbeehCount } from '../utils/storage';
import { Language } from '../types';
import { t } from '../utils/translations';
import { DailyDhikrCard } from './DailyDhikrCard';

interface TasbeehCounterProps {
  language?: Language;
}

export const TasbeehCounter: React.FC<TasbeehCounterProps> = ({ language = 'ar' }) => {
  const [selectedDhikr, setSelectedDhikr] = useState(DHIKR_ITEMS[0]);
  const [count, setCount] = useState(0);
  const [targetGoal, setTargetGoal] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [totalSessionCompleted, setTotalSessionCompleted] = useState(0);

  useEffect(() => {
    const saved = loadTasbeehCount();
    setCount(saved);
  }, []);

  const handleIncrement = () => {
    if (!isMuted) soundManager.playClickSound();

    const newCount = count + 1;
    setCount(newCount);
    saveTasbeehCount(newCount);

    if (newCount % targetGoal === 0) {
      soundManager.playCompletionSound();
      setTotalSessionCompleted((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    const confirmMsg = language === 'en'
      ? 'Do you want to reset the tasbeeh counter?'
      : language === 'fa'
      ? 'آیا می‌خواهید شمارنده تسبیح را بازنشانی کنید؟'
      : 'هل ترغب في إعادة ضبط عدّاد المسبحة؟';

    if (confirm(confirmMsg)) {
      if (!isMuted) soundManager.playClickSound();
      setCount(0);
      saveTasbeehCount(0);
    }
  };

  const handleSelectDhikr = (dhikr: typeof DHIKR_ITEMS[0]) => {
    setSelectedDhikr(dhikr);
    setTargetGoal(dhikr.recommendedCount);
  };

  const progressPercent = Math.min(100, Math.round(((count % targetGoal) / targetGoal) * 100));

  return (
    <div className="space-y-8">
      {/* Dynamic Day-of-the-Week Dhikr Section («وِرْد اليوم») */}
      <DailyDhikrCard language={language} />

      {/* Free Tasbeeh Banner */}

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mb-1 dir-auto">
            <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{t.tasbeehTitle[language] || t.tasbeehTitle.ar}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 dir-auto">
            {t.tasbeehSubtitle[language] || t.tasbeehSubtitle.ar}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            title={isMuted ? 'Mute' : 'Unmute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dhikr Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DHIKR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectDhikr(item)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer dir-auto ${
              selectedDhikr.id === item.id
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {item.phrase.split(' ')[0]} {item.phrase.split(' ')[1] || ''}...
          </button>
        ))}
      </div>

      {/* Main Counter Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Selected Dhikr Title & Significance */}
        <div className="space-y-2 max-w-lg z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {t.targetTag[language] || t.targetTag.ar}: {targetGoal}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-amiri leading-relaxed dir-auto">
            {selectedDhikr.phrase}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dir-auto">{selectedDhikr.significance}</p>
        </div>

        {/* Big Interactive Counter Circle */}
        <button
          onClick={handleIncrement}
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-slate-900 via-slate-950 to-amber-950/40 border-4 border-amber-400/80 hover:border-amber-300 text-amber-300 shadow-2xl shadow-amber-500/20 active:scale-95 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer z-10 select-none group"
        >
          <span className="text-5xl sm:text-6xl font-black font-mono tracking-wider group-hover:text-amber-200 transition-colors">
            {count}
          </span>
          <span className="text-xs text-amber-400/80 font-medium dir-auto">
            {t.clickToCount[language] || t.clickToCount.ar}
          </span>
        </button>

        {/* Progress Bar */}
        <div className="w-full max-w-md space-y-2 z-10">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="dir-auto">{t.roundProgress[language] || t.roundProgress.ar}</span>
            <span className="font-mono text-amber-300">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Session Stats */}
        {totalSessionCompleted > 0 && (
          <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full font-semibold z-10 dir-auto">
            🎉 {language === 'en' ? 'Completed rounds:' : language === 'fa' ? 'دورهای کامل شده:' : 'أتممتَ دورات كاملة:'} {totalSessionCompleted}
          </div>
        )}
      </div>
    </div>
  );
};
