import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationHI from "./locales/hi/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationMR from "./locales/mr/translation.json";
import translationZH from "./locales/zh/translation.json";
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
