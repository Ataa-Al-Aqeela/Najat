import { ReflectionEntry, Language } from '../types';

const STORAGE_KEY_ENTRIES = 'najah_reflection_entries_v1';
const STORAGE_KEY_STREAK = 'najah_user_streak_v1';
const STORAGE_KEY_TASBEEH = 'najah_tasbeeh_count_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatNajafCalendarDate(dateStr: string, lang: Language = 'ar'): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 = Sun

    // Anchor: 2026-07-28 is 13 Safar 1448 AH in Najaf Ashraf / Iraq calendar
    const anchorUtc = Date.UTC(2026, 6, 28);
    const targetUtc = Date.UTC(year, month - 1, day);
    const diffDays = Math.round((targetUtc - anchorUtc) / (1000 * 60 * 60 * 24));

    // Base: 13 Safar (month index 1, 0-indexed) 1448
    let hDay = 13 + diffDays;
    let hMonthIdx = 1; // 0 = Muharram, 1 = Safar
    let hYear = 1448;

    while (hDay > 30) {
      hDay -= 30;
      hMonthIdx++;
      if (hMonthIdx >= 12) {
        hMonthIdx = 0;
        hYear++;
      }
    }
    while (hDay < 1) {
      hDay += 30;
      hMonthIdx--;
      if (hMonthIdx < 0) {
        hMonthIdx = 11;
        hYear--;
      }
    }

    const hijriMonthsAr = [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
      'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    const hijriMonthsEn = [
      'Muharram', 'Safar', 'Rabi I', 'Rabi II',
      'Jumada I', 'Jumada II', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qa\'dah', 'Dhu al-Hijjah'
    ];
    const hijriMonthsFa = [
      'محرم', 'صفر', 'ربيع‌الأول', 'ربيع‌الثاني',
      'جمادىالأولى', 'جمادىالثانيه', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذوالقعده', 'ذوالحجه'
    ];

    if (lang === 'en') {
      const weekdaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const wName = weekdaysEn[dayOfWeek];
      const mName = monthsEn[month - 1];
      const hMName = hijriMonthsEn[hMonthIdx];
      return `${wName}, ${day} ${mName} ${year} AD / ${hDay} ${hMName} ${hYear} AH`;
    }

    if (lang === 'fa') {
      const weekdaysFa = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
      const monthsFa = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
      const wName = weekdaysFa[dayOfWeek];
      const mName = monthsFa[month - 1];
      const hMName = hijriMonthsFa[hMonthIdx];
      return `${wName}، ${day} ${mName} ${year} م / ${hDay} ${hMName} ${hYear} هـ`;
    }

    // Default Arabic (Najaf al-Ashraf / Iraq calendar standard)
    const weekdaysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const monthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const wName = weekdaysAr[dayOfWeek];
    const mName = monthsAr[month - 1];
    const hMName = hijriMonthsAr[hMonthIdx];

    return `${wName}، ${day} ${mName} ${year} م / ${hDay} ${hMName} ${hYear} هـ`;
  } catch {
    return dateStr;
  }
}

export function formatArabicDate(dateStr: string, lang: Language = 'ar'): string {
  return formatNajafCalendarDate(dateStr, lang);
}

export function formatGregorianArabicDate(dateStr: string, lang: Language = 'ar'): string {
  return formatNajafCalendarDate(dateStr, lang);
}

export function loadReflectionEntries(): ReflectionEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENTRIES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveReflectionEntry(entry: ReflectionEntry): ReflectionEntry[] {
  const existing = loadReflectionEntries();
  const index = existing.findIndex(e => e.date === entry.date);
  let updated: ReflectionEntry[];
  
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...existing[index], ...entry };
  } else {
    updated = [entry, ...existing];
  }

  // Sort descending by date
  updated.sort((a, b) => b.date.localeCompare(a.date));

  localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(updated));
  updateStreak(updated);
  return updated;
}

export function deleteReflectionEntry(id: string): ReflectionEntry[] {
  const existing = loadReflectionEntries();
  const updated = existing.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(updated));
  updateStreak(updated);
  return updated;
}

export function calculateStreak(entries: ReflectionEntry[]): number {
  if (!entries || entries.length === 0) return 0;

  const dates = entries.map(e => e.date).sort().reverse();
  const today = getTodayDateString();

  // Check if today or yesterday is present
  const todayIndex = dates.indexOf(today);
  
  let currentDate = new Date();
  if (todayIndex === -1) {
    // Check if user did yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    if (dates.indexOf(yesterdayStr) === -1) {
      return 0; // Streak broken
    }
    currentDate = yesterday;
  }

  let streak = 0;
  while (true) {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentDate.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;

    if (dates.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function updateStreak(entries: ReflectionEntry[]) {
  const streak = calculateStreak(entries);
  localStorage.setItem(STORAGE_KEY_STREAK, streak.toString());
}

export function getSavedStreak(): number {
  try {
    const entries = loadReflectionEntries();
    return calculateStreak(entries);
  } catch {
    return 0;
  }
}

export function loadTasbeehCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TASBEEH);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveTasbeehCount(count: number) {
  localStorage.setItem(STORAGE_KEY_TASBEEH, count.toString());
}

export function loadDailyDhikrCount(dayIndex: number): number {
  try {
    const raw = localStorage.getItem(`najah_daily_dhikr_count_day_${dayIndex}`);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveDailyDhikrCount(dayIndex: number, count: number) {
  localStorage.setItem(`najah_daily_dhikr_count_day_${dayIndex}`, count.toString());
}
