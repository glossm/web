import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import kr_translation from './kr';
import en_translation from './en';

const resources = {
  kr: {
    translation: kr_translation
  },
  en: {
    translation: en_translation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: true,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
