import React, { useState } from 'react';
import { Sparkles, Copy, Check, Award } from 'lucide-react';
import { Language } from '../types';

interface HeroQuoteProps {
  language?: Language;
}

const HERO_HADITH = {
  ar: {
    badge: 'شعار ومقصد البرنامج 🌟',
    quote: '«مَنْ اسْتَوَى يَوْمَاهُ فَهُوَ مَغْبُونٌ، وَمَنْ كَانَ آخِرُ يَوْمَيْهِ خَيْرَهُمَا فَهُوَ مَغْبُوطٌ، وَمَنْ كَانَ آخِرُ يَوْمَيْهِ شَرَّهُمَا فَهُوَ مَلْعُونٌ، وَمَنْ لَمْ يَرَ الزِّيَادَةَ فِي نَفْسِهِ فَهُوَ إِلَى النَّقْصَانِ، وَمَنْ كَانَ إِلَى النَّقْصَانِ فَالْمَوْتُ خَيْرٌ لَهُ مِنَ الْحَيَاةِ».',
    source: '— الإمام جعفر بن محمد الصادق (عليه السلام)',
    copiedMsg: 'تم نسخ الحديث الشريف',
    copyBtn: 'نسخ الشعار'
  },
  en: {
    badge: 'Program Motto & Goal 🌟',
    quote: '«He whose two days are equal is cheated; he whose second day is better than his first is enviable; he whose second day is worse than his first is cursed; he who sees no increase in himself is headed towards loss; and for him who is headed towards loss, death is better than life.»',
    source: '— Imam Ja’far ibn Muhammad al-Sadiq (peace be upon him)',
    copiedMsg: 'Hadith copied',
    copyBtn: 'Copy Motto'
  },
  fa: {
    badge: 'شعار و مقصد اصلی برنامه 🌟',
    quote: '«هر کس دو روزش برابر باشد زیانکار است، و هر کس فردایش بهتر از امروزش باشد مورد غبطه است، و هر کس فردایش بدتر از امروزش باشد از رحمت خدا دور است، و هر کس در خود فزونی نبیند رو به کاستی است، و هر کس رو به کاستی باشد مرگ برای او بهتر از زندگی است.»',
    source: '— امام جعفر بن محمد الصادق (علیه السلام)',
    copiedMsg: 'حدیث کپی شد',
    copyBtn: 'کپی شعار'
  }
};

export const HeroQuote: React.FC<HeroQuoteProps> = ({ language = 'ar' }) => {
  const [copied, setCopied] = useState(false);
  const data = HERO_HADITH[language] || HERO_HADITH.ar;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${data.quote}\n${data.source}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900/95 to-amber-950/60 border-2 border-amber-400/60 shadow-2xl shadow-amber-500/15 p-6 sm:p-8 backdrop-blur text-center space-y-4 my-6">
      {/* Background golden glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-32 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold shadow-md">
        <Award className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="dir-auto">{data.badge}</span>
      </div>

      {/* Quote text */}
      <div className="relative max-w-3xl mx-auto space-y-3">
        <p className="font-amiri text-lg sm:text-xl lg:text-2xl font-bold text-amber-100 leading-relaxed text-justify sm:text-center dir-auto drop-shadow-sm px-2">
          {data.quote}
        </p>
        <p className="text-xs sm:text-sm text-amber-300/90 font-semibold dir-auto pt-1">
          {data.source}
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:text-amber-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          title={data.copyBtn}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
          <span>{copied ? data.copiedMsg : data.copyBtn}</span>
        </button>
      </div>
    </section>
  );
};
