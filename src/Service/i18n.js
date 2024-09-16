// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files
const resources = {
  en: {
    translation: {
      home: "Home",
      movies: "Movies",
      about_us: "About Us",
      contact_us: "Contact Us",
      search_placeholder: "Search...",
      search_button: "Search",
      login: "Login",
    },
  },
  ar: {
    translation: {
      home: "الرئيسية",
      movies: "الأفلام",
      about_us: "من نحن",
      contact_us: "اتصل بنا",
      search_placeholder: "بحث...",
      search_button: "بحث",
      login: "تسجيل الدخول",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
