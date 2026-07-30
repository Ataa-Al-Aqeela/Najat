import React, { useState } from 'react';
import { ChevronDown, ShieldAlert, CheckCircle2, Circle, HelpCircle, Star, Sparkles } from 'lucide-react';
import { PILLARS_DATA } from '../data/spiritualData';
import { soundManager } from '../utils/audio';
import { Language } from '../types';
import { t } from '../utils/translations';

interface PillarsAccordionProps {
  checkedItems: { [key: string]: boolean };
  onToggleCheck: (itemId: string) => void;
  pillarScores: { [key: number]: number };
  onSetPillarScore: (pillarId: number, score: number) => void;
  language?: Language;
}

export const PillarsAccordion: React.FC<PillarsAccordionProps> = ({
  checkedItems,
  onToggleCheck,
  pillarScores,
  onSetPillarScore,
  language = 'ar',
}) => {
  const [activePillarId, setActivePillarId] = useState<number | null>(1); // Default first pillar open

  const toggleAccordion = (id: number) => {
    soundManager.playClickSound();
    setActivePillarId(activePillarId === id ? null : id);
  };

  const handleCheck = (itemId: string) => {
    soundManager.playClickSound();
    onToggleCheck(itemId);
  };

  const handleRating = (pillarId: number, rating: number) => {
    soundManager.playClickSound();
    onSetPillarScore(pillarId, rating);
  };

  // Calculate overall rating average
  const totalScore = (Object.values(pillarScores) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  const avgScore = (totalScore / 4).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Title & Overview Banner */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-lg backdrop-blur flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mb-1 dir-auto">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{t.pillarsTitle[language] || t.pillarsTitle.ar}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 dir-auto">
            فحَصٌ دقيق لمنابع الخير والشر في يومك لحماية النفس من الغفلة والاستدراج
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-700/60 px-4 py-2 rounded-xl text-xs sm:text-sm dir-auto">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">
            {language === 'en' ? 'Pillars Average:' : language === 'fa' ? 'میانگین محورها:' : 'التقييم الإجمالي للمحاور:'}
          </span>
          <span className="font-bold text-amber-300 text-base">{avgScore} / 5</span>
        </div>
      </div>

      {/* Accordion Items List */}
      <div className="space-y-4">
        {PILLARS_DATA.map((pillar) => {
          const isOpen = activePillarId === pillar.id;
          const currentScore = pillarScores[pillar.id] || 3;

          // Count completed checks for this pillar
          const totalItems = pillar.suggestedChecklist.length;
          const completedItems = pillar.suggestedChecklist.filter((item) => checkedItems[item.id]).length;

          return (
            <div
              key={pillar.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/5'
                  : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Header */}
              <button
                onClick={() => toggleAccordion(pillar.id)}
                className="w-full text-right p-5 flex items-center justify-between gap-4 cursor-pointer select-none dir-auto"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
                    {pillar.title}
                    <span className="text-xs font-normal text-slate-400">{pillar.subtitle}</span>
                  </span>

                  <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium w-fit">
                    {pillar.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Progress indicator */}
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    {completedItems}/{totalItems} {language === 'en' ? 'done' : language === 'fa' ? 'انجام شد' : 'مكتمل'}
                  </span>

                  <div
                    className={`p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-5 pt-0 border-t border-slate-800/60 space-y-5">
                  {/* Focus Area */}
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-2">
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.salvationQuestionLabel[language] || t.salvationQuestionLabel.ar}</span>
                    </p>
                    <p className="text-sm font-bold text-amber-200 italic dir-auto">{pillar.salvationQuestion}</p>
                    <p className="text-xs text-slate-300 dir-auto">{pillar.focusArea}</p>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-300 dir-auto">
                      {language === 'en' ? 'Daily Accounting Checklist:' : language === 'fa' ? 'چک‌لیست مراقبه روزانه:' : 'جدول التفقد والمراقبة اليومية:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pillar.suggestedChecklist.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleCheck(item.id)}
                            className={`flex items-start gap-2.5 p-3 rounded-xl border text-right transition-all cursor-pointer dir-auto ${
                              isChecked
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-sm'
                                : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800 text-slate-300'
                            }`}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <span className="text-xs font-medium leading-relaxed">{item.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pillar Score Rating */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300 dir-auto">
                      {language === 'en' ? 'Pillar Score:' : language === 'fa' ? 'امتیاز این محور:' : 'درجة الالتزام بهذا المحور:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(pillar.id, star)}
                          className={`p-1 transition-transform hover:scale-125 cursor-pointer ${
                            star <= currentScore ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
