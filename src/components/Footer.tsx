import React from 'react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'ar' }) => {
  return (
    <footer className="mt-12 pt-8 pb-8 border-t border-amber-500/20 text-center space-y-5 bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl">
      {/* السطر الأول (خط عريض وبارز): مؤسسة عطاء العقيلة التنموية */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-300 tracking-wide font-cairo drop-shadow-md">
        {t.foundationName[language] || t.foundationName.ar}
      </h3>

      {/* السطر الثاني (خط أصغر): "من أجل دولة كريمة" */}
      <p className="text-sm sm:text-base text-slate-300 font-semibold italic opacity-95">
        {t.foundationSlogan[language] || t.foundationSlogan.ar}
      </p>

      {/* السطر الثالث: زر تفاعلي واضح وأنيق بحجم مريح يحمل أيقونة الواتساب ورابط مباشر */}
      <div className="pt-2 flex justify-center">
        <a
          href="https://wa.me/9647812600392"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-emerald-400/40 cursor-pointer"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white shrink-0 group-hover:rotate-6 transition-transform duration-200"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.174-1.236-6.158-3.48-8.402z" />
          </svg>

          <span className="tracking-wide dir-auto">
            {t.whatsappBtnText[language] || t.whatsappBtnText.ar}
          </span>
        </a>
      </div>

      {/* العبارة المعادة التي كانت في الأسفل */}
      <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
        <p>
          {language === 'en' ? 'Program ' : language === 'fa' ? 'برنامه ' : 'برنامج '}
          <span className="text-amber-400 font-bold">{t.appTitle[language] || t.appTitle.ar}</span> • {t.appSubTitle[language] || t.appSubTitle.ar}
        </p>
        <p className="text-slate-300 font-medium italic">
          {t.appQuote[language] || t.appQuote.ar}
        </p>
      </div>
    </footer>
  );
};
