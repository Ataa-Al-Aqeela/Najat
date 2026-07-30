import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroQuote } from './components/HeroQuote';
import { HadithCard } from './components/HadithCard';
import { PillarsAccordion } from './components/PillarsAccordion';
import { EveningSession } from './components/EveningSession';
import { HistoryLogs } from './components/HistoryLogs';
import { TasbeehCounter } from './components/TasbeehCounter';
import { WisdomLibrary } from './components/WisdomLibrary';
import { CompletionModal } from './components/CompletionModal';
import { Footer } from './components/Footer';
import { ReflectionEntry, Language } from './types';
import { loadReflectionEntries, getSavedStreak } from './utils/storage';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'evening' | 'pillars' | 'history' | 'tasbeeh' | 'wisdom'>('evening');
  const [isMuted, setIsMuted] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [language, setLanguage] = useState<Language>('ar');

  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [activeCompletionEntry, setActiveCompletionEntry] = useState<ReflectionEntry | null>(null);

  // Pillar scores & checklist state
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [pillarScores, setPillarScores] = useState<{ [key: number]: number }>({
    1: 4,
    2: 4,
    3: 4,
    4: 4,
  });

  const refreshData = () => {
    const loaded = loadReflectionEntries();
    setEntries(loaded);
    setStreakCount(getSavedStreak());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  const handleToggleCheck = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSetPillarScore = (pillarId: number, score: number) => {
    setPillarScores((prev) => ({
      ...prev,
      [pillarId]: score,
    }));
  };

  const handleEveningComplete = (entry: ReflectionEntry) => {
    refreshData();
    setActiveCompletionEntry(entry);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#172554] text-[#f8fafc] font-cairo py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header & Main Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          streakCount={streakCount}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Hero Quote Card (Imam al-Sadiq Hadith) */}
        <HeroQuote language={language} />

        {/* Core Featured Hadith Card (Key Program Hadith) */}
        <HadithCard language={language} />

        {/* Tab Views */}

        <main className="transition-all duration-300">
          {activeTab === 'evening' && (
            <EveningSession
              onComplete={handleEveningComplete}
              pillarScores={pillarScores}
              checkedItems={checkedItems}
              language={language}
            />
          )}

          {activeTab === 'pillars' && (
            <PillarsAccordion
              checkedItems={checkedItems}
              onToggleCheck={handleToggleCheck}
              pillarScores={pillarScores}
              onSetPillarScore={handleSetPillarScore}
              language={language}
            />
          )}

          {activeTab === 'history' && (
            <HistoryLogs entries={entries} onRefreshEntries={refreshData} language={language} />
          )}

          {activeTab === 'tasbeeh' && <TasbeehCounter language={language} />}

          {activeTab === 'wisdom' && <WisdomLibrary language={language} />}
        </main>

        {/* Night Reflection Completion Modal */}
        {activeCompletionEntry && (
          <CompletionModal
            entry={activeCompletionEntry}
            onClose={() => setActiveCompletionEntry(null)}
            language={language}
          />
        )}

        {/* Footer */}
        <Footer language={language} />
      </div>
    </div>
  );
}
