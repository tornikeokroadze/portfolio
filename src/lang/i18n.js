import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json'
import ka from './ka.json'

const resources = {
  en: en,
  ka: ka
};

// Initialize i18n with the device's locale or fallback to English
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en",
    fallbackLng: 'en', // Fallback to English if the device's language is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;