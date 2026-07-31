import { Language } from '../types';

export const t = {
  // Calendar and Dates
  calendarFormat: (lang: Language, weekday: string, day: number, month: string, year: number, hDay: number, hMonth: string, hYear: number) => {
    if (lang === 'en') {
      return `${weekday}, ${day} ${month} ${year} AD / ${hDay} ${hMonth} ${hYear} AH`;
    }
    if (lang === 'fa') {
      return `${weekday}، ${day} ${month} ${year} م / ${hDay} ${hMonth} ${hYear} هـ`;
    }
    return `${weekday}، ${day} ${month} ${year} م / ${hDay} ${hMonth} ${hYear} هـ`;
  },

  // App Title & Tagline
  appTitle: {
    ar: 'سَفِينَةُ نَجَاة',
    en: 'SAFINAT NAJAH',
    fa: 'سفینه نجات'
  },
  appSubTitle: {
    ar: 'دليل المحاسبة اليومية وجلسة السكينة قبل النوم',
    en: 'Daily Self-Accounting & Pre-Bedtime Tranquility Guide',
    fa: 'راهنمای حسابرسی روزانه و نشست آرامش قبل از خواب'
  },
  appQuote: {
    ar: '«اجعل سفينتك جاهزة دائماً لقاء الله • طُوبَى لِمَنْ بَاتَ وَنَفْسُهُ طَاهِرَةٌ»',
    en: '«Keep your vessel always prepared to meet God • Blessed is the one who sleeps with a pure soul»',
    fa: '«کشتی خود را همواره برای دیدار خدا آماده دار • خوشا به حال کسی که با روحی پاک بخوابد»'
  },

  // Header Navigation Tabs
  navEvening: {
    ar: 'جلسة السكينة',
    en: 'Tranquility Session',
    fa: 'نشست آرامش'
  },
  navPillars: {
    ar: 'محاور النجاة',
    en: '4 Salvation Pillars',
    fa: 'محورهای چهارگانه'
  },
  navHistory: {
    ar: 'سجل المحاسبة',
    en: 'Reflection History',
    fa: 'تاریخچه حسابرسی'
  },
  navTasbeeh: {
    ar: 'المسبحة الذكية',
    en: 'Smart Tasbeeh',
    fa: 'تسبیح هوشمند'
  },
  navWisdom: {
    ar: 'أدعية ما قبل النوم',
    en: 'Bedtime Supplications',
    fa: 'ادعیه قبل از خواب'
  },

  // Header Streak & Mute
  streakLabel: {
    ar: 'سلسلة المحاسبة:',
    en: 'Streak:',
    fa: 'زنجیره حسابرسی:'
  },
  daysUnit: {
    ar: 'أيام',
    en: 'Days',
    fa: 'روز'
  },
  soundOn: {
    ar: 'الصوت مفعل',
    en: 'Audio On',
    fa: 'صدا فعال'
  },
  soundMuted: {
    ar: 'مكتم الصوت',
    en: 'Muted',
    fa: 'بی‌صدا'
  },

  // Key Hadith
  featuredHadithCategory: {
    ar: 'الحديث المفتاحي لبرنامج سَفِينَةُ نَجَاة',
    en: 'Key Foundation Hadith of SAFINAT NAJAH',
    fa: 'حدیث کلیدی برنامه سفینه نجات'
  },
  featuredHadithText: {
    ar: '«حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا، وَزِنُوهَا قَبْلَ أَنْ تُوزَنُوا، وَتَجَهَّزُوا لِلْعَرْضِ الأَكْبَرِ.»',
    en: '«Call yourselves to account before you are called to account, weigh your deeds before they are weighed, and prepare yourselves for the Great Display.»',
    fa: '«حساب خویش را بكشید پیش از آنكه به حساب شما برسند، و اعمال خود را بسنجید پیش از آنكه سنجیده شوید، و برای عرضه بزرگ آماده شوید.»'
  },
  featuredHadithSource: {
    ar: '— الرسول الأكرم محمد (صلى الله عليه وآله)',
    en: '— Prophet Muhammad (Peace be upon him and his holy progeny)',
    fa: '— پیامبر اکرم محمد (صلی الله علیه و آله)'
  },

  // Evening Session
  sessionBannerTitle: {
    ar: 'جلسة السكينة قبل النوم',
    en: 'Pre-Bedtime Tranquility Session',
    fa: 'نشست آرامش قبل از خواب'
  },
  sessionDuration: {
    ar: '3 دقائق',
    en: '3 min',
    fa: '۳ دقیقه'
  },
  sessionBannerDesc: {
    ar: 'تفريغ المساء، شُكْرُ النعم، الاستغفار من الذنوب، ورَسْمُ خِطَّةِ الغَد',
    en: 'Evening debrief, gratitude for blessings, seeking forgiveness, and planning for tomorrow',
    fa: 'تخلیه ذهن، شکر نعمت‌ها، استغفار از گناهان و برنامه فردا'
  },
  sessionCompletedBadge: {
    ar: 'تم إغلاق حساب اليوم',
    en: 'Today\'s entry logged',
    fa: 'حساب امروز ثبت شد'
  },

  // Evening Session Fields
  field1Label: {
    ar: '1. نِعَم وأرباح (ما الخير الذي وفقك الله له اليوم لتشكره؟)',
    en: '1. Blessings & Gains (What good did God grant you today to thank Him for?)',
    fa: '1. نعمت‌ها و سودها (چه خیری امروز نصیب شما شد که شکرگزار باشید؟)'
  },
  field1Placeholder: {
    ar: 'مثال: أداء الصلاة بوقتها، كلمة طيبة، مساعدة أحد، توفيق في العمل...',
    en: 'e.g. Prayers on time, kind word to family, helping someone, success at work...',
    fa: 'مثال: نماز اول وقت، سخن نیکو، کمک به دیگران، موفقیت در کاری...'
  },
  field2Label: {
    ar: '2. تقصير تم رصده (ما الخطأ الذي بدر منك لتستغفر منه؟)',
    en: '2. Shortcomings Identified (What mistake did you make to seek forgiveness for?)',
    fa: '2. کوتاهی‌های شناسایی‌شده (چه خطایی سر زد که استغفار کنید؟)'
  },
  field2Placeholder: {
    ar: 'مثال: غضب سريع، إضاعة وقت، تقصير في عبادة، نظرة غير لائقة...',
    en: 'e.g. Quick anger, wasted time on phone, delayed prayer, hasty words...',
    fa: 'مثال: خشم سریع، اتلاف وقت با گوشی، کوتاهی در عبادت...'
  },
  field3Label: {
    ar: '3. خطة التدارك لليوم القادم (كيف ستصلح هذا التقصير غداً؟)',
    en: '3. Restoration Plan for Tomorrow (How will you make amends tomorrow?)',
    fa: '3. برنامه جبران برای فردا (چگونه فردا این کوتاهی را جبران می‌کنید؟)'
  },
  field3Placeholder: {
    ar: 'مثال: الاستيقاظ للصلوات مبكراً، الاعتذار لمن أسأت له، تخصيص وقت للقرآن...',
    en: 'e.g. Wake up early for prayer, apologize to whom I wronged, read Quran...',
    fa: 'مثال: بیداری زودهنگام برای نماز، عذرخواهی از دیگران، تلاوت قرآن...'
  },
  fieldRatingLabel: {
    ar: '4. التقييم الإيماني العام لليوم',
    en: '4. Overall Spiritual Rating for Today',
    fa: '4. ارزیابی عمومی معنوی امروز'
  },
  fieldNotesLabel: {
    ar: '5. خواطر وملاحظات شخصية (اختياري)',
    en: '5. Personal Reflections & Notes (Optional)',
    fa: '5. یادداشت‌ها و خواطر شخصی (اختیاری)'
  },
  fieldNotesPlaceholder: {
    ar: 'اكتب ما تجيش به نفسك أو دعاء خاصاً لليلة...',
    en: 'Write any personal thoughts or bedtime prayer...',
    fa: 'هرگونه دلنوشته یا دعای مخصوص امشب را بنویسید...'
  },
  suggestionsTag: {
    ar: 'اقتراحات:',
    en: 'Suggestions:',
    fa: 'پیشنهادها:'
  },
  submitBtnSave: {
    ar: 'إغلاق وتوثيق حساب اليوم',
    en: 'Save & Log Today\'s Reflection',
    fa: 'ثبت و بستن حساب امروز'
  },
  submitBtnUpdate: {
    ar: 'تحديث توثيق اليوم',
    en: 'Update Today\'s Entry',
    fa: 'به‌روزرسانی ثبت امروز'
  },

  // Rating descriptors
  ratingLevels: {
    ar: ['يوم حرج يستوجب التوبة', 'مقبول مع حاجة للحذر', 'جيد ويتطلب استمراراً', 'ممتاز ومُرضٍ بفضل الله', 'يوم مبارك مفعم بالسكينة'],
    en: ['Requires sincere repentance', 'Acceptable with caution', 'Good, keep progressing', 'Excellent by Allah’s grace', 'Blessed day full of tranquility'],
    fa: ['نیازمند توبه صادقانه', 'قابل قبول همراه با مراقبت', 'خوب و نیازمند تداوم', 'عالی به لطف خدا', 'روز مبارک و سرشار از آرامش']
  },

  // Pillars Accordion
  pillarsTitle: {
    ar: 'محاور النجاة الأربعة (جدول المراقبة اليومية)',
    en: 'The 4 Salvation Pillars (Daily Accounting Checks)',
    fa: 'محورهای چهارگانه نجات (جدول مراقبه روزانه)'
  },
  pillarsProgress: (lang: Language, checked: number, total: number) => {
    if (lang === 'en') return `Completed ${checked} of ${total} accounting checks today`;
    if (lang === 'fa') return `انجام ${checked} از ${total} مرحله مراقبه امروز`;
    return `تم إنجاز ${checked} من ${total} خطوات مراقبة اليوم`;
  },
  pillarsResetBtn: {
    ar: 'إعادة ضبط الخانات',
    en: 'Reset Checks',
    fa: 'بازنشانی گزینه‌ها'
  },
  salvationQuestionLabel: {
    ar: 'سؤال النجاة:',
    en: 'Salvation Check Question:',
    fa: 'سؤال نجات:'
  },

  // History Logs
  logsTitle: {
    ar: 'سجل المحاسبات والتقارير التاريخية',
    en: 'Accounting Logs & Historical Reports',
    fa: 'تاریخچه حسابرسی و گزارش‌ها'
  },
  logsSubtitle: {
    ar: 'أرشيف خاسرات وأرباح الأيام لتقييم مسيرة الاستقامة والتطور النفسي',
    en: 'Archive of daily reflection logs for spiritual growth',
    fa: 'آرشیو گزارش‌های روزانه برای ارزیابی تکامل معنوی'
  },
  printBtn: {
    ar: 'طباعة التقرير',
    en: 'Print Report',
    fa: 'چاپ گزارش'
  },
  searchPlaceholder: {
    ar: 'البحث في تفاصيل النعم والتقصير والقرارات...',
    en: 'Search blessings, shortcomings, decisions...',
    fa: 'جستجو در نعمت‌ها، کوتاهی‌ها و تصمیمات...'
  },
  noLogsFound: {
    ar: 'لا توجد محاسبات مسجلة تطابق بحثك حالياً.',
    en: 'No matching entries found.',
    fa: 'هیچ موردی مطابق با جستجوی شما یافت نشد.'
  },
  historyTitle: {
    ar: 'سجل المحاسبة والخيارات المسجلة',
    en: 'Reflection History & Logged Records',
    fa: 'تاریخچه حسابرسی و رکوردهای ثبت‌شده'
  },
  historySearchPlaceholder: {
    ar: 'بحث في النعم، التقصير، أو الخطة...',
    en: 'Search blessings, shortcomings, or plans...',
    fa: 'جستجو در نعمت‌ها، کوتاهی‌ها یا برنامه‌ها...'
  },
  historyEmptyText: {
    ar: 'لا توجد سجلات محفوظة حتى الآن. ابدأ بتوثيق جلسة السكينة اليوم!',
    en: 'No logged entries yet. Start by completing today\'s tranquility session!',
    fa: 'هنوز هیچ رکوردی ثبت نشده است. همین امروز نشست آرامش را ثبت کنید!'
  },
  deleteConfirm: {
    ar: 'هل أنت تأكد من حذف هذا السجل؟',
    en: 'Are you sure you want to delete this log entry?',
    fa: 'آیا از حذف این رکورد اطمینان دارید؟'
  },
  exportBtn: {
    ar: 'طباعة / تصدير PDF',
    en: 'Print / Export PDF',
    fa: 'چاپ / خروجی PDF'
  },

  // Tasbeeh
  tasbeehTitle: {
    ar: 'المسبحة الذكية وورد الأذكار',
    en: 'Smart Digital Tasbeeh & Daily Dhikr',
    fa: 'تسبیح هوشمند و ذکر روزانه'
  },
  tasbeehSubtitle: {
    ar: 'تطهير اللسان والقلب بذكر الله واستغفاره لتنزل السكينة والطمأنينة قبل النوم',
    en: 'Purifying the heart and tongue through remembrance of God before sleep',
    fa: 'تطهیر زبان و دل با یاد خدا و استغفار قبل از خواب'
  },
  targetTag: {
    ar: 'الهدف التكراري',
    en: 'Target Goal',
    fa: 'هدف تکرار'
  },
  clickToCount: {
    ar: 'اضغط للعد والتسبيح',
    en: 'Tap to Count',
    fa: 'برای شمارش لمس کنید'
  },
  roundProgress: {
    ar: 'تقدم الدورة الحالية',
    en: 'Round Progress',
    fa: 'پیشرفت این دور'
  },
  tasbeehCountLabel: {
    ar: 'عدد التكرارات',
    en: 'Repetitions',
    fa: 'تعداد تکرارها'
  },
  tasbeehTargetLabel: {
    ar: 'الهدف:',
    en: 'Target:',
    fa: 'هدف:'
  },
  tasbeehReset: {
    ar: 'تصفير المسبحة',
    en: 'Reset Counter',
    fa: 'صفر کردن تسبیح'
  },

  // Bedtime Supplications (أدعية ما قبل النوم)
  wisdomTitle: {
    ar: 'أدعية وآداب ما قبل النوم',
    en: 'Bedtime Supplications & Etiquettes',
    fa: 'ادعیه و آداب قبل از خواب'
  },
  wisdomSubtitle: {
    ar: 'أعمال ومأثورات مباركة وأدعية نورانية مروية عن النبي وآله (عليهم السلام) للحفظ والسكينة قبل النوم',
    en: 'Blessed bedtime routines, prayers and surahs for peace and divine protection',
    fa: 'اعمال و ادعیه مبارک قبل از خواب برای آرامش و حفظ الهی'
  },
  hadithsTab: {
    ar: 'أحاديث المحاسبة',
    en: 'Hadiths on Self-Accounting',
    fa: 'احادیث حسابرسی'
  },
  duasTab: {
    ar: 'أدعية وتفريغ النوم',
    en: 'Bedtime Prayers',
    fa: 'ادعیه قبل از خواب'
  },

  // Completion Modal
  modalCongratulation: {
    ar: 'تقبل الله طاعتك وأقر عينك بالسكينة',
    en: 'May Allah accept your reflection and grant you peace',
    fa: 'خداوند طاعت شما را بپذیرد و آرامش نصیبتان کند'
  },
  modalDesc: {
    ar: 'تم حفظ حساب اليوم بنجاح ورفع سلسلة مواظبتك اليومية.',
    en: 'Today\'s reflection saved successfully and your daily streak updated.',
    fa: 'حساب امروز با موفقیت ثبت شد و زنجیره مراقبه شما ارتقا یافت.'
  },
  closeModalBtn: {
    ar: 'إغلاق ومتابعة',
    en: 'Close & Continue',
    fa: 'بستن و ادامه'
  },

  // Footer
  foundationName: {
    ar: 'مؤسسة عطاء العقيلة التنموية',
    en: 'Ataa Al-Aqeela Development Foundation',
    fa: 'مؤسسه توسعه عطاء العقیله'
  },
  foundationSlogan: {
    ar: '"من أجل دولة كريمة"',
    en: '"For a Dignified State"',
    fa: '"برای یک دولت کریمه"'
  },
  whatsappBtnText: {
    ar: 'تواصل معنا واتس اب: 0392 260 781 964+',
    en: 'Contact us on WhatsApp: +964 781 260 0392',
    fa: 'ارتباط با ما در واتساپ: 0392 260 781 964+'
  }
};
