import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  detection: isBrowser
    ? {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      }
    : undefined,
});

export default i18n;
