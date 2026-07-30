import React, { useState } from 'react';
import { BookOpen, Search, Trash2, Calendar, Star, Download, Printer, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { ReflectionEntry, Language } from '../types';
import { formatNajafCalendarDate, formatGregorianArabicDate, deleteReflectionEntry } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { t } from '../utils/translations';

interface HistoryLogsProps {
  entries: ReflectionEntry[];
  onRefreshEntries: () => void;
  language?: Language;
}

export const HistoryLogs: React.FC<HistoryLogsProps> = ({ entries, onRefreshEntries, language = 'ar' }) => {
  const currentLang: Language = (language || 'ar') as Language;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.blessings.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.shortcomings.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.restorationPlan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.date.includes(searchQuery);

    const matchesRating = selectedRating === null || entry.rating === selectedRating;

    return matchesSearch && matchesRating;
  });

  const handleDelete = (id: string) => {
    const confirmMsg = language === 'en'
      ? 'Are you sure you want to delete this log?'
      : language === 'fa'
      ? 'آیا از حذف این مراقبه اطمینان دارید؟'
      : 'هل أنت تأكد من رغبتك في حذف هذه المحاسبة من سجلاتك؟';

    if (confirm(confirmMsg)) {
      soundManager.playClickSound();
      deleteReflectionEntry(id);
      onRefreshEntries();
    }
  };

  const handleExportJSON = () => {
    soundManager.playClickSound();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `najah_accounting_log_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    soundManager.playClickSound();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mb-1 dir-auto">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{t.logsTitle[language] || t.logsTitle.ar}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 dir-auto">
            {t.logsSubtitle[language] || t.logsSubtitle.ar}
          </p>
        </div>

        {/* Export & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer dir-auto"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{t.exportBtn[language] || t.exportBtn.ar}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer dir-auto"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>{t.printBtn[language] || t.printBtn.ar}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder[language] || t.searchPlaceholder.ar}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 dir-auto"
          />
        </div>

        {/* Rating filter */}
        <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1.5 w-full sm:w-auto justify-center">
          <button
            onClick={() => setSelectedRating(null)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer dir-auto ${
              selectedRating === null ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'en' ? 'All' : language === 'fa' ? 'همه' : 'الكل'} ({entries.length})
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-0.5 transition-colors cursor-pointer ${
                selectedRating === rating ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{rating}</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-500/40 mx-auto" />
          <p className="text-slate-300 font-medium dir-auto">{t.noLogsFound[language] || t.noLogsFound.ar}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => {
            const isExpanded = expandedId === entry.id;

            return (
              <div
                key={entry.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-md transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-100 flex items-center gap-2 dir-auto">
                        <span>{formatNajafCalendarDate(entry.date, currentLang)}</span>
                      </h4>
                      <span className="text-xs text-slate-400 dir-auto">{formatGregorianArabicDate(entry.date, currentLang)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Rating display */}
                    {entry.rating && (
                      <div className="flex items-center gap-0.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-xl">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-300 font-mono">{entry.rating}/5</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        soundManager.playClickSound();
                        setExpandedId(isExpanded ? null : entry.id);
                      }}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 text-rose-400 border border-rose-900/40 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Summary Sneak Peek */}
                {!isExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-emerald-400 font-bold block mb-0.5 dir-auto">
                        ✨ {language === 'en' ? 'Blessings:' : language === 'fa' ? 'نعمت‌ها:' : 'النعم والأرباح:'}
                      </span>
                      <p className="text-slate-300 truncate dir-auto">{entry.blessings}</p>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-rose-400 font-bold block mb-0.5 dir-auto">
                        ⚠️ {language === 'en' ? 'Shortcomings:' : language === 'fa' ? 'تقصیرها:' : 'التقصير:'}
                      </span>
                      <p className="text-slate-300 truncate dir-auto">{entry.shortcomings}</p>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-amber-400 font-bold block mb-0.5 dir-auto">
                        🌱 {language === 'en' ? 'Restoration Plan:' : language === 'fa' ? 'برنامه ترميم:' : 'قرار الترميم:'}
                      </span>
                      <p className="text-slate-300 truncate dir-auto">{entry.restorationPlan}</p>
                    </div>
                  </div>
                )}

                {/* Expanded Full Details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Blessings */}
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5 space-y-1">
                        <span className="text-xs font-bold text-emerald-400 block dir-auto">
                          ✨ {language === 'en' ? 'Blessings & Gains:' : language === 'fa' ? 'نعمت‌ها و دستاوردها:' : 'نِعَم وأرباح اليوم:'}
                        </span>
                        <p className="text-sm text-slate-200 whitespace-pre-wrap dir-auto">{entry.blessings}</p>
                      </div>

                      {/* Shortcomings */}
                      <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                        <span className="text-xs font-bold text-rose-400 block dir-auto">
                          ⚠️ {language === 'en' ? 'Observed Shortcomings:' : language === 'fa' ? 'تقصیرهای مشاهده شده:' : 'التقصير المرصود:'}
                        </span>
                        <p className="text-sm text-slate-200 whitespace-pre-wrap dir-auto">{entry.shortcomings}</p>
                      </div>

                      {/* Restoration Plan */}
                      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 space-y-1">
                        <span className="text-xs font-bold text-amber-400 block dir-auto">
                          🌱 {language === 'en' ? 'Restoration Plan:' : language === 'fa' ? 'تصمیم برای فردا:' : 'قرار الترميم لغدٍ:'}
                        </span>
                        <p className="text-sm text-slate-200 whitespace-pre-wrap dir-auto">{entry.restorationPlan}</p>
                      </div>
                    </div>

                    {/* Notes if existing */}
                    {entry.notes && (
                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
                        <span className="font-bold text-amber-400 block mb-1 dir-auto">
                          {language === 'en' ? 'Personal Notes:' : language === 'fa' ? 'یادداشت‌های شخصی:' : 'ملاحظات وخاطرة شخصية:'}
                        </span>
                        <p className="dir-auto">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
