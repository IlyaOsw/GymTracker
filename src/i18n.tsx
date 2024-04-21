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
      Eng: {
        translation: require("./locales/Eng/translation.json"),
      },
      Rus: {
        translation: require("./locales/Rus/translation.json"),
      },
    },
    fallbackLng: "Eng",
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
