import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: require("./locales/En/translation.json"),
      },
      RU: {
        translation: require("./locales/Ru/translation.json"),
      },
      EE: {
        translation: require("./locales/Ee/translation.json"),
      },
    },
    fallbackLng: "EN",
    // debug: true,
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "locales/{{lng}}/translation.json",
    },
  });

export default i18n;
