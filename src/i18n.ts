import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations (language files) here
// English
import enLoginRegister from './locales/en/loginRegister.json';
import enErrorSuccess from './locales/en/errorSuccess.json';
import enNavbar from './locales/en/navbar.json';
import enAbout from './locales/en/about.json'
// Croatian
import hrLoginRegister from './locales/hr/loginRegister.json';
import hrErrorSuccess from './locales/hr/errorSuccess.json';
import hrNavbar from './locales/hr/navbar.json';
import hrAbout from './locales/hr/about.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          ...enLoginRegister, // Merge loginRegister translations
          ...enErrorSuccess, // Merge errorSuccess translations
          ...enNavbar,
          ...enAbout,
          // Add other translations here
        },
      },
      hr: {
        translation: {
          ...hrLoginRegister, // Merge loginRegister translations
          ...hrErrorSuccess, // Merge errorSuccess translations
          ...hrNavbar,
          ...hrAbout,
          // Add other translations here
        },
      },
      // Add more languages and translations as needed
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });
  console.log("Loaded languages")

export default i18n;