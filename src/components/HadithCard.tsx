import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Bookmark, Copy, Check } from 'lucide-react';
import { HADITHS_DATA } from '../data/spiritualData';
import { Language } from '../types';
import { t } from '../utils/translations';

interface HadithCardProps {
  language?: Language;
}

export const HadithCard: React.FC<HadithCardProps> = ({ language = 'ar' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuote = HADITHS_DATA[currentIndex];

  // If index is 0, use the exact translation from translations.ts for primary Hadith
  const quoteText = currentIndex === 0 ? (t.featuredHadithText[language] || currentQuote.text) : currentQuote.text;
  const quoteSource = currentIndex === 0 ? (t.featuredHadithSource[language] || currentQuote.source) : currentQuote.source;
  const quoteCategory = currentIndex === 0 ? (t.featuredHadithCategory[language] || currentQuote.category) : currentQuote.category;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HADITHS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HADITHS_DATA.length) % HADITHS_DATA.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quoteText}\n${quoteSource}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-blue-950/40 border-r-4 border-amber-400 border-y border-l border-amber-500/20 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-md">
      {/* Category Badge & Controls */}
      <div className="flex justify-between items-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5" />
          {quoteCategory || 'نور من الروايات'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 transition-colors text-xs flex items-center gap-1 border border-slate-700/50 cursor-pointer"
            title="نسخ النص"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? (language === 'en' ? 'Copied' : language === 'fa' ? 'کپی شد' : 'تم النسخ') : (language === 'en' ? 'Copy' : language === 'fa' ? 'کپی' : 'نسخ')}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 transition-colors border border-slate-700/50 cursor-pointer"
              title="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-mono px-1">
              {currentIndex + 1}/{HADITHS_DATA.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 transition-colors border border-slate-700/50 cursor-pointer"
              title="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hadith Text */}
      <div className="my-2">
        <p className="font-amiri text-lg sm:text-xl lg:text-2xl text-amber-100 leading-relaxed sm:leading-loose text-justify tracking-wide dir-auto">
          {quoteText}
        </p>
      </div>

      {/* Source Citation */}
      <div className="mt-4 pt-3 border-t border-amber-500/10 flex justify-between items-center text-xs sm:text-sm text-slate-400">
        <span className="font-cairo text-amber-300/80 font-medium dir-auto">{quoteSource}</span>
        <span className="text-slate-500 text-xs dir-auto">
          {language === 'en' ? 'Use arrows to navigate' : language === 'fa' ? 'از فلش‌ها برای پیمایش استفاده کنید' : 'اضغط الأسهُم للانتقال بين الحكم'}
        </span>
      </div>
    </div>
  );
};
