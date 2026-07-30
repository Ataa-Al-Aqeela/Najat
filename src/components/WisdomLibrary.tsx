import React, { useState } from 'react';
import { Sparkles, Copy, Check, Moon, ShieldCheck, Heart, BookOpen, Star, CheckCircle2, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';
import { soundManager } from '../utils/audio';

interface WisdomLibraryProps {
  language?: Language;
}

interface BedtimeItem {
  id: string;
  title: string;
  category: 'وصايا النبوة' | 'الأدعية والتعاويذ' | 'السور وآيات الحفظ' | 'الأذكار والتسابيح';
  rewardBadge: string;
  text: string;
  details?: string[];
  source: string;
  recommendedCount?: number;
}

const BEDTIME_DUAS: BedtimeItem[] = [
  {
    id: 'b1',
    title: 'وصية النبي لفاطمة الزهراء (عليهم السلام)',
    category: 'وصايا النبوة',
    rewardBadge: 'ختم القرآن - شفاعة الأنبياء - إرضاء المؤمنين - ثواب الحج والعمرة 🌟',
    text: 'وصى النبي (صلى الله عليه وآله) ابنته فاطمة الزهراء (عليها السلام) بأن لا تنام إلا بعد فعل أربعة أمور خفيفة وسريعة وعظيمة الأجر:',
    details: [
      '1. ختم القرآن: (قراءة سورة الإخلاص ثلاث مرات).',
      '2. جعل الأنبياء شفعاء لها: (الصلاة على النبي وآله وعلى جميع الأنبياء: اللهم صل على محمد وآل محمد وعلى جميع الأنبياء والمرسلين).',
      '3. إرضاء المؤمنين عن أنفسهم: (الاستغفار للمؤمنين والمؤمنات: اللهم اغفر للمؤمنين والمؤمنات).',
      '4. الحج والعمرة: (قول: سبحان الله والحمد لله ولا إله إلا الله والله أكبر).'
    ],
    source: '— الرسول الأكرم محمد (صلى الله عليه وآله) لسيدة نساء العالمين فاطمة الزهراء (عليها السلام)'
  },
  {
    id: 'b2',
    title: 'تعويذ أمير المؤمنين (عليه السلام)',
    category: 'الأدعية والتعاويذ',
    rewardBadge: 'حفظ النفس والدين والأهل والمال والرزق وخواتيم الأعمال 🛡️',
    text: '«إِذَا أَرَادَ أَحَدُكُمُ النَّوْمَ فَلَا يَضَعْ جَنْبَهُ حَتَّى يَقُولَ: أُعِيذُ نَفْسِي وَدِينِى وَأَهْلِي وَمَالِي وَخَوَاتِيمَ عَمَلِي وَمَا رَزَقَنِي رَبِّي وَخَوَّلَنِي بِعِزَّةِ اللَّهِ، وَعَظَمَةِ اللَّهِ، وَجَبَرُوتِ اللَّهِ، وَسُلْطَانِ اللَّهِ، وَرَحْمَةِ اللَّهِ، وَرَأْفَةِ اللَّهِ، وَغُفْرَانِ اللَّهِ، وَقُدْرَةِ اللَّهِ، وَجَلالِ اللَّهِ، وَبِأَشْهَدِ أَنْ لا إِلَهَ إِلا اللَّهُ، وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ (صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ) لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ».',
    source: '— أمير المؤمنين علي بن أبي طالب (عليه السلام)'
  },
  {
    id: 'b3',
    title: 'الوضوء عند النوم',
    category: 'وصايا النبوة',
    rewardBadge: 'تحويل الفراش إلى مسجد وطهارة الليل كله 🕌',
    text: '«مَنْ تَطَهَّرَ ثُمَّ آوَى إِلَى فِرَاشِهِ بَاتَ وَفِرَاشُهُ كَمَسْجِدِهِ».',
    source: '— الإمام جعفر بن محمد الصادق (عليه السلام)'
  },
  {
    id: 'b4',
    title: 'دعاء التوسد',
    category: 'الأدعية والتعاويذ',
    rewardBadge: 'التفويض الكامل لله والأمان عند الاضجاع 🤲',
    text: 'قال أبو جعفر (عليه السلام): إذا توسد الرجل يمينه فليقل:\n«بِسْمِ اللَّهِ (اللَّهُمَّ) إِنِّي أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، وَتَوَكَّلْتُ عَلَيْكَ، رَهْبَةً مِنْكَ وَرَغْبَةً إِلَيْكَ، لا مَلْجَأَ وَلا مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِرَسُولِكَ الَّذِي أَرْسَلْتَ».',
    source: '— الإمام محمد بن علي الباقر (عليه السلام)'
  },
  {
    id: 'b5',
    title: 'تسبيح الزهراء (عليها السلام)',
    category: 'الأذكار والتسابيح',
    rewardBadge: 'من الذاكرين الله كثيراً والذاكرات 📿',
    text: '«مَنْ بَاتَ عَلَى تَسْبِيحِ فَاطِمَةَ (عَلَيْهَا السَّلامُ) كَانَ مِنَ الذَّاكِرِينَ اللَّهَ كَثِيرًا وَالذَّاكِرَاتِ».',
    details: [
      '• الله أكبر (34 مرة)',
      '• الحمد لله (33 مرة)',
      '• سبحان الله (33 مرة)'
    ],
    source: '— الإمام جعفر بن محمد الصادق (عليه السلام)'
  },
  {
    id: 'b6',
    title: 'الذكر عند الفراش (100 مرة تهليل واستغفار)',
    category: 'الأذكار والتسابيح',
    rewardBadge: 'بناء بيت في الجنة وتناثر الذنوب كأوراق الشجر 🍃',
    text: '«مَنْ قَالَ حِينَ يَأْوِي إِلَى فِرَاشِهِ: (لا إِلَهَ إِلاَّ اللَّهُ) 100 مَرَّةٍ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ، وَمَنِ اسْتَغْفَرَ اللَّهَ حِينَ يَأْوِي إِلَى فِرَاشِهِ 100 مَرَّةٍ تَحَاتَّتْ ذُنُوبُهُ كَمَا يَسْقُطُ وَرَقُ الشَّجَرِ».',
    recommendedCount: 100,
    source: '— الإمام جعفر بن محمد الصادق (عليه السلام)'
  },
  {
    id: 'b7',
    title: 'سورة التوحيد (الإخلاص) 3 مرات',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'حراسة 50 ألف ملك طوال الليل 🛡️',
    text: '«مَنْ قَرَأَ (قُلْ هُوَ اللَّهُ أَحَدٌ) ثَلاثَ مَرَّاتٍ حِينَ يَأْخُذُ مَضْجَعَهُ، وَكَّلَ اللَّهُ بِهِ خَمْسِينَ أَلْفَ مَلَكٍ يَحْرُسُونَهُ لَيْلَتَهُ».',
    recommendedCount: 3,
    source: '— أمير المؤمنين علي بن أبي طالب (عليه السلام)'
  },
  {
    id: 'b8',
    title: 'سورة التكاثر',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'الوقاية من فتنة عذاب القبر 🕯️',
    text: '«مَنْ قَرَأَ (أَلْهَاكُمُ التَّكَاثُرُ) عِنْدَ النَّوْمِ وُقِيَ فِتْنَةَ الْقَبْرِ».',
    source: '— الرسول الأكرم محمد (صلى الله عليه وآله)'
  },
  {
    id: 'b9',
    title: 'آية الكرسي',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'فتح أبواب الرحمة ونيل أجر الشهادة عند الوفاة 🚪✨',
    text: '«مَنْ قَرَأَ آيَةَ الْكُرْسِيِّ عِنْدَ مَنَامِهِ فَتَحَ اللَّهُ عَلَيْهِ أَبْوَابَ الرَّحْمَةِ إِلَى الصَّبَاحِ، وَإِنْ مَاتَ مِنْ لَيْلَتِهِ مَاتَ شَهِيدًا».',
    source: '— الرسول الأكرم محمد (صلى الله عليه وآله)'
  },
  {
    id: 'b10',
    title: 'سورة الواقعة',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'لقاء الله ووجه القارئ كالقمر ليلة البدر 🌕',
    text: '«مَنْ قَرَأَ الْوَاقِعَةَ كُلَّ لَيْلَةٍ قَبْلَ أَنْ يَنَامَ، لَقِيَ اللَّهَ عَزَّ وَجَلَّ وَوَجْهُهُ كَالْقَمَرِ لَيْلَةَ الْبَدْرِ».',
    source: '— الإمام محمد بن علي الباقر (عليه السلام)'
  },
  {
    id: 'b11',
    title: 'سورة القدر (11 مرة)',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'نور ممتد إلى العرش واستغفار آلاف الملائكة وملاء اللوح المحفوظ ثواباً 🕊️',
    text: '«مَنْ قَرَأَ سُورَةَ الْقَدْرِ حِينَ يَنَامُ إِحْدَى عَشْرَةَ مَرَّةً، خَلَقَ اللَّهُ لَهُ نُورًا سَعَتُهُ سَعَةُ الْهَوَاءِ عَرْضًا وَطُولاً مُمْتَدًّا مِنْ قَرَارِ الْهَوَاءِ إِلَى حُجُبِ النُّورِ فَوْقَ الْعَرْشِ، فِي كُلِّ دَرَجَةٍ مِنْهُ أَلْفُ مَلَكٍ، لِكُلِّ مَلَكٍ أَلْفُ لِسَانٍ، لِكُلِّ لِسَانٍ أَلْفُ لُغَةٍ، يَسْتَغْفِرُونَ لِقَارِئِهَا إِلَى زَوَالِ اللَّيْلِ، ثُمَّ يَضَعُ اللَّهُ ذَلِكَ النُّورَ فِي جَسَدِ قَارِئِهَا إِلَى يَوْمِ الْقِيَامَةِ».\n\nوَعَنْهُ (عَلَيْهِ السَّلامُ): «مَنْ قَرَأَهَا حِينَ يَنَامُ وَيَسْتَيْقِظُ مَلأَ اللَّوْحَ الْمَحْفُوظَ ثَوَابُهُ».',
    recommendedCount: 11,
    source: '— الإمام محمد بن علي الباقر (عليه السلام)'
  },
  {
    id: 'b12',
    title: 'آخر آية من سورة الكهف (آية الاستيقاظ)',
    category: 'السور وآيات الحفظ',
    rewardBadge: 'سطوع نور إلى المسجد الحرام والاستيقاظ في الساعة المطلوبة ⏰',
    text: '﴿قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا﴾.\n\nعَنِ النَّبِيِّ (صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ): «مَنْ قَرَأَ هَذِهِ الآيَةَ عِنْدَ مَنَامِهِ سَطَعَ لَهُ نُورٌ إِلَى المَسْجِدِ الحَرَامِ حَشْوُ ذَلِكَ النُّورِ مَلائِكَةٌ يَسْتَغْفِرُونَ لَهُ».\n\nوَرُوِيَ عَنِ الإِمَامِ الصَّادِقِ (عَلَيْهِ السَّلامُ): «مَا مِنْ عَبْدٍ يَقْرَأُ آخِرَ الكَهْفِ حِينَ يَنَامُ إِلاَّ اسْتَيْقَظَ فِي السَّاعَةِ الَّتِي يُرِيدُ».',
    source: '— الرسول الأكرم (ص) والإمام جعفر الصادق (ع)'
  }
];

export const WisdomLibrary: React.FC<WisdomLibraryProps> = ({ language = 'ar' }) => {
  const [filter, setFilter] = useState<string>('الكل');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});

  const categories = ['الكل', 'وصايا النبوة', 'الأدعية والتعاويذ', 'السور وآيات الحفظ', 'الأذكار والتسابيح'];

  const filteredItems = BEDTIME_DUAS.filter((item) => filter === 'الكل' || item.category === filter);

  const handleCopy = (id: string, item: BedtimeItem) => {
    soundManager.playClickSound();
    let textToCopy = `${item.title}\n\n${item.text}`;
    if (item.details) {
      textToCopy += `\n\n${item.details.join('\n')}`;
    }
    textToCopy += `\n\n${item.source}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleComplete = (id: string) => {
    soundManager.playClickSound();
    setCompletedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        soundManager.playCompletionSound();
      }
      return next;
    });
  };

  const incrementCount = (id: string, targetCount: number) => {
    soundManager.playClickSound();
    setCounts((prev) => {
      const current = prev[id] || 0;
      const nextCount = current >= targetCount ? 0 : current + 1;
      if (nextCount === targetCount) {
        soundManager.playCompletionSound();
        setCompletedItems((p) => ({ ...p, [id]: true }));
      }
      return { ...prev, [id]: nextCount };
    });
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;

  return (
    <div className="space-y-6 dir-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
              <Moon className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-300 font-cairo dir-auto">
                {t.wisdomTitle[language] || 'أدعية وآداب ما قبل النوم'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 dir-auto pt-1">
                {t.wisdomSubtitle[language] || 'أعمال ومأثورات مباركة وأدعية نورانية مروية عن النبي وآله (عليهم السلام) للحفظ والسكينة قبل النوم'}
              </p>
            </div>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-900/60 border border-indigo-500/30 text-xs font-bold text-indigo-200 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'en' ? 'Completed:' : language === 'fa' ? 'تکمیل شده:' : 'أنجزت:'} {completedCount} / {BEDTIME_DUAS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClickSound();
              setFilter(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer dir-auto ${
              filter === cat
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="space-y-5">
        {filteredItems.map((item) => {
          const isCopied = copiedId === item.id;
          const isDone = !!completedItems[item.id];
          const currentRep = counts[item.id] || 0;

          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-5 sm:p-6 shadow-xl space-y-4 ${
                isDone
                  ? 'bg-slate-900/50 border-emerald-500/40 opacity-95'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {/* Header section of card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold dir-auto">
                    {item.category}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-medium dir-auto">
                    {item.rewardBadge}
                  </span>
                </div>

                {/* Actions: Copy & Check */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopy(item.id, item)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-slate-700"
                    title="نسخ النص"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                    <span>{isCopied ? (language === 'en' ? 'Copied' : language === 'fa' ? 'کپی شد' : 'تم النسخ') : (language === 'en' ? 'Copy' : language === 'fa' ? 'کپی' : 'نسخ النص')}</span>
                  </button>

                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{isDone ? (language === 'en' ? 'Done' : language === 'fa' ? 'انجام شد' : 'تمت القراءة') : (language === 'en' ? 'Mark Done' : language === 'fa' ? 'علامت انجام' : 'علامة إنجاز')}</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-amber-300 font-cairo dir-auto">
                {item.title}
              </h3>

              {/* Text Body */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <p className="font-amiri text-base sm:text-lg lg:text-xl text-amber-100 leading-relaxed text-justify dir-auto whitespace-pre-line">
                  {item.text}
                </p>

                {/* Optional Bullet Points (e.g. Fatima's advice or Tasbeeh) */}
                {item.details && item.details.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="font-amiri text-sm sm:text-base text-amber-200/90 leading-relaxed dir-auto font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Counter tool if item has recommendedCount */}
              {item.recommendedCount && (
                <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-amber-500/30">
                  <span className="text-xs font-bold text-slate-300 dir-auto">
                    {language === 'en' ? 'Recommended Repetitions:' : language === 'fa' ? 'تکرار توصیه شده:' : 'التكرار المستحب:'} {item.recommendedCount} {language === 'en' ? 'times' : language === 'fa' ? 'مرتبه' : 'مرات'}
                  </span>

                  <button
                    onClick={() => incrementCount(item.id, item.recommendedCount!)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Counter:' : language === 'fa' ? 'عداد:' : 'عداد القراءة:'}</span>
                    <span className="text-sm font-extrabold text-amber-200 bg-amber-500/30 px-2 py-0.5 rounded-lg">
                      {currentRep} / {item.recommendedCount}
                    </span>
                  </button>
                </div>
              )}

              {/* Source attribution */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-semibold dir-auto">
                <span>{item.source}</span>
                <Moon className="w-4 h-4 text-indigo-400/40" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
