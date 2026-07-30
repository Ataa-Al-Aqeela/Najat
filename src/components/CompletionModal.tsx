import React, { useState } from 'react';
import { Moon, Sparkles, Copy, Check, X, ShieldCheck } from 'lucide-react';
import { ReflectionEntry, Language } from '../types';
import { SLEEPING_DUAS } from '../data/spiritualData';
import { formatNajafCalendarDate } from '../utils/storage';

interface CompletionModalProps {
  entry: ReflectionEntry;
  onClose: () => void;
  language?: Language;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ entry, onClose, language = 'ar' }) => {
  const [copied, setCopied] = useState(false);
  const [activeDuaIndex, setActiveDuaIndex] = useState(0);

  const currentLang: Language = (language || 'ar') as Language;

  const handleCopySummary = () => {
    const text = `🌙 **(${formatNajafCalendarDate(entry.date, currentLang)})**\n\n` +
      `✨ **${currentLang === 'en' ? 'Blessings:' : currentLang === 'fa' ? 'نعمت‌ها:' : 'نِعَم وأرباح:'}** ${entry.blessings}\n` +
      `⚠️ **${currentLang === 'en' ? 'Shortcomings:' : currentLang === 'fa' ? 'تقصیرها:' : 'تقصير استُغفر منه:'}** ${entry.shortcomings}\n` +
      `🌱 **${currentLang === 'en' ? 'Restoration Plan:' : currentLang === 'fa' ? 'برنامه فردا:' : 'قرار الترميم لغدٍ:'}** ${entry.restorationPlan}\n\n` +
      `«طوبى لمن بات ونفسه طاهرة وقلبه سليم»`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Glow Icon */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-400 shadow-inner">
            <Moon className="w-10 h-10 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-cairo dir-auto">
            {language === 'en'
              ? 'May God Accept Your Accounting 🤲'
              : language === 'fa'
              ? 'خداوند طاعت و مراقبه شما را بپذیرد 🤲'
              : 'تقبَّل اللهُ طَاعَتَك ومَحَاسَبَتَك 🤲'}
          </h3>
          <p className="text-sm sm:text-base text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/30 py-2 px-4 rounded-2xl inline-block dir-auto">
            {language === 'en'
              ? '«Blessed is he who sleeps with a pure soul and a clean heart. Sleep in God’s care!»'
              : language === 'fa'
              ? '«خوشا به حال کسی که با نیت پاک و دل بی‌کینه بخوابد. در پناه خدا بخوابید!»'
              : '«طوبى لمن بات ونفسه طاهرة، وقلبه سليم من الغل. نَمْ بحفظ الله، وجدّد العهد غداً!»'}
          </p>
        </div>

        {/* Sleeping Du'a Card */}
        <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-5 space-y-3 text-right">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 dir-auto">
              <Sparkles className="w-3.5 h-3.5" />
              {SLEEPING_DUAS[activeDuaIndex].title}
            </span>
            <div className="flex items-center gap-1">
              {SLEEPING_DUAS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDuaIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    idx === activeDuaIndex ? 'bg-amber-400 w-4' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="font-amiri text-base sm:text-lg text-amber-100 leading-relaxed dir-auto">
            {SLEEPING_DUAS[activeDuaIndex].text}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCopySummary}
            className="flex-1 py-3 px-4 rounded-xl border border-amber-500/30 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer dir-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>
              {copied
                ? (language === 'en' ? 'Report Copied' : language === 'fa' ? 'گزارش کپی شد' : 'تم نسخ التقرير')
                : (language === 'en' ? 'Copy Summary' : language === 'fa' ? 'کپی خلاصه روز' : 'نسخ ملخص اليوم')}
            </span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 dir-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {language === 'en' ? 'Peaceful Sleep' : language === 'fa' ? 'خواب آرام' : 'نوم هانئ بسلام الله'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
