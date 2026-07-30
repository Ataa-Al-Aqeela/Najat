import React, { useState, useEffect } from 'react';
import { Moon, Sparkles, Heart, AlertCircle, RefreshCw, Send, CheckCircle2, Bookmark, Star } from 'lucide-react';
import { ReflectionEntry, Language } from '../types';
import { getTodayDateString, saveReflectionEntry, loadReflectionEntries } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { t } from '../utils/translations';

interface EveningSessionProps {
  onComplete: (entry: ReflectionEntry) => void;
  pillarScores: { [key: number]: number };
  checkedItems: { [key: string]: boolean };
  language?: Language;
}

// Preset inspirational chips for fast input
const BLESSING_PRESETS_EN = [
  'Prayers on time',
  'Quran reading',
  'Honoring parents',
  'Kindness to others',
  'Inner peace',
  'Honest work'
];
const BLESSING_PRESETS_FA = [
  'نماز اول وقت',
  'تلاوت قرآن',
  'نیکی به والدین',
  'سخن نیکو',
  'آرامش باطنی',
  'رزق حلال'
];
const BLESSING_PRESETS_AR = [
  'أداء الصلوات في وقتها',
  'قراءة ورد القرآن الكريم',
  'بر الوالدين وسماع دعائهما',
  'كلمة طيبة تشرح قلب مهموم',
  'عدم ترك الماء مفتوحاً (تجنّب التبذير)',
  'إطفاء الإنارة الزائدة (تجنّب الهدر)',
  'إماطة الأذى عن الطريق',
  'تقديم شربة ماء',
  'قراءة قصة مفيدة للأطفال',
  'صدقة تدفع البلاء'
];

const SHORTCOMING_PRESETS_EN = [
  'Distraction in prayer',
  'Wasted time on phone',
  'Quick anger',
  'Gossip or idle talk',
  'Procrastination',
  'Neglect of Dhikr'
];
const SHORTCOMING_PRESETS_FA = [
  'عدم حضور قلب در نماز',
  'اتلاف وقت با گوشی',
  'خشم زودهنگام',
  'غیبت یا لغو',
  'تأخیر در طاعت',
  'غفلت از یاد خدا'
];
const SHORTCOMING_PRESETS_AR = [
  'تقصير في حضور القلب بالصلاة',
  'إضاعة وقت في الهاتف والتصفح',
  'غضب سريع أو انفعال زائد',
  'غيبة أو خوض في لغو',
  'تأجيل طاعة أو تسويف عمل',
  'غفلة عن ذكر الله'
];

const RESTORATION_PRESETS_EN = [
  'Wake up early for prayer',
  'Apologize if I wronged anyone',
  'Set time for Quran',
  'Control speech',
  'Give charity',
  'Avoid distractions'
];
const RESTORATION_PRESETS_FA = [
  'بیداری زودهنگام برای نماز',
  'عذرخواهی از کسی که آزرده شد',
  'تخصیص زمان برای قرآن',
  'کنترل زبان',
  'پرداخت صدقه',
  'مدیریت زمان'
];
const RESTORATION_PRESETS_AR = [
  'الاستيقاظ المبكر للصلوات',
  'الاعتذار لمن أسأت إليه',
  'تخصيص نصف ساعة للقرآن والتفكر',
  'تطبيق صمت اللسان عن الفضول',
  'إخراج صدقة بسيطة بنية التزكية',
  'ضبط الوقت وتجنب المشتتات'
];

export const EveningSession: React.FC<EveningSessionProps> = ({
  onComplete,
  pillarScores,
  checkedItems,
  language = 'ar',
}) => {
  const todayStr = getTodayDateString();

  const [blessings, setBlessings] = useState('');
  const [shortcomings, setShortcomings] = useState('');
  const [restorationPlan, setRestorationPlan] = useState('');
  const [overallRating, setOverallRating] = useState(4);
  const [personalNotes, setPersonalNotes] = useState('');
  const [alreadyCompletedToday, setAlreadyCompletedToday] = useState(false);

  const blessingPresets = language === 'en' ? BLESSING_PRESETS_EN : language === 'fa' ? BLESSING_PRESETS_FA : BLESSING_PRESETS_AR;
  const shortcomingPresets = language === 'en' ? SHORTCOMING_PRESETS_EN : language === 'fa' ? SHORTCOMING_PRESETS_FA : SHORTCOMING_PRESETS_AR;
  const restorationPresets = language === 'en' ? RESTORATION_PRESETS_EN : language === 'fa' ? RESTORATION_PRESETS_FA : RESTORATION_PRESETS_AR;

  // Check if today is already logged
  useEffect(() => {
    const entries = loadReflectionEntries();
    const todayEntry = entries.find((e) => e.date === todayStr);
    if (todayEntry) {
      setBlessings(todayEntry.blessings || '');
      setShortcomings(todayEntry.shortcomings || '');
      setRestorationPlan(todayEntry.restorationPlan || '');
      setOverallRating(todayEntry.rating || 4);
      setPersonalNotes(todayEntry.notes || '');
      setAlreadyCompletedToday(true);
    }
  }, [todayStr]);

  const addPreset = (text: string, setter: React.Dispatch<React.SetStateAction<string>>, currentVal: string) => {
    soundManager.playClickSound();
    if (!currentVal) {
      setter(text);
    } else if (!currentVal.includes(text)) {
      setter(`${currentVal} ، ${text}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playCompletionSound();

    const entry: ReflectionEntry = {
      id: `entry_${todayStr}_${Date.now()}`,
      date: todayStr,
      timestamp: Date.now(),
      blessings: blessings.trim(),
      shortcomings: shortcomings.trim(),
      restorationPlan: restorationPlan.trim(),
      rating: overallRating,
      pillarScores,
      checkedItems,
      notes: personalNotes.trim(),
    };

    saveReflectionEntry(entry);
    setAlreadyCompletedToday(true);
    onComplete(entry);
  };

  return (
    <div className="space-y-6">
      {/* Session Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-blue-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Moon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2 dir-auto">
                <span>{t.sessionBannerTitle[language] || t.sessionBannerTitle.ar}</span>
                <span className="text-xs font-normal text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {t.sessionDuration[language] || t.sessionDuration.ar}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 dir-auto">
                {t.sessionBannerDesc[language] || t.sessionBannerDesc.ar}
              </p>
            </div>
          </div>

          {alreadyCompletedToday && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold dir-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.sessionCompletedBadge[language] || t.sessionCompletedBadge.ar}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Field 1: Blessings & Gains */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2 dir-auto">
            <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.field1Label[language] || t.field1Label.ar}</span>
          </label>
          <textarea
            value={blessings}
            onChange={(e) => setBlessings(e.target.value)}
            placeholder={t.field1Placeholder[language] || t.field1Placeholder.ar}
            rows={2}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-slate-500 dir-auto"
            required
          />

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 dir-auto">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t.suggestionsTag[language] || t.suggestionsTag.ar}
            </span>
            {blessingPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPreset(preset, setBlessings, blessings)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-emerald-950/40 border border-slate-700/50 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-300 transition-all cursor-pointer dir-auto"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Shortcomings & Mistakes */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2 dir-auto">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{t.field2Label[language] || t.field2Label.ar}</span>
          </label>
          <textarea
            value={shortcomings}
            onChange={(e) => setShortcomings(e.target.value)}
            placeholder={t.field2Placeholder[language] || t.field2Placeholder.ar}
            rows={2}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 transition-all placeholder:text-slate-500 dir-auto"
            required
          />

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 dir-auto">
              <Sparkles className="w-3 h-3 text-rose-400" /> {t.suggestionsTag[language] || t.suggestionsTag.ar}
            </span>
            {shortcomingPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPreset(preset, setShortcomings, shortcomings)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-rose-950/40 border border-slate-700/50 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 transition-all cursor-pointer dir-auto"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Field 3: Restoration Plan for Tomorrow */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2 dir-auto">
            <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.field3Label[language] || t.field3Label.ar}</span>
          </label>
          <textarea
            value={restorationPlan}
            onChange={(e) => setRestorationPlan(e.target.value)}
            placeholder={t.field3Placeholder[language] || t.field3Placeholder.ar}
            rows={2}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-slate-500 dir-auto"
            required
          />

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 dir-auto">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t.suggestionsTag[language] || t.suggestionsTag.ar}
            </span>
            {restorationPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPreset(preset, setRestorationPlan, restorationPlan)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-amber-950/40 border border-slate-700/50 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 transition-all cursor-pointer dir-auto"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Additional: Personal Notes & Overall Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 dir-auto">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.fieldNotesLabel[language] || t.fieldNotesLabel.ar}</span>
            </label>
            <input
              type="text"
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder={t.fieldNotesPlaceholder[language] || t.fieldNotesPlaceholder.ar}
              className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl p-2.5 text-slate-100 text-xs focus:outline-none focus:border-amber-400 dir-auto"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 dir-auto">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.fieldRatingLabel[language] || t.fieldRatingLabel.ar}</span>
            </label>
            <div className="flex items-center gap-1 bg-slate-950/80 p-2 rounded-xl border border-slate-700/60 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    soundManager.playClickSound();
                    setOverallRating(star);
                  }}
                  className={`p-1 transition-transform hover:scale-125 cursor-pointer ${
                    star <= overallRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 dir-auto"
        >
          <Send className="w-5 h-5 rotate-180" />
          <span>
            {alreadyCompletedToday
              ? (t.submitBtnUpdate[language] || t.submitBtnUpdate.ar)
              : (t.submitBtnSave[language] || t.submitBtnSave.ar)} 🤲
          </span>
        </button>
      </form>
    </div>
  );
};
