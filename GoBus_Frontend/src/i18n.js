import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import translationEN from "./Locales/en/translation.json";
import translationHI from "./Locales/hi/translation.json";
import translationFR from "./Locales/fr/translation.json";
import translationMR from "./Locales/mr/translation.json";
import translationZH from "./Locales/zh/translation.json";
// Define resources
const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  fr: { translation: translationFR },
  mr: { translation: translationMR },
  zh: { translation: translationZH },
};

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Initializes i18next
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // Prevents escaping HTML
    },
  });

export default i18n;
