// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Add your translations here
const resources = {
  en: {
    translation: {
      aboutTitle: "About YeLijoch Mahiber",
      enterTask: "Enter a new task...",
      addTask: "Add Task",
      update: "Update",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      logout: "Logout",
    },
  },
  am: {
    translation: {
      aboutTitle: "የልጆች ማህበር",
      enterTask: "አዲስ ተግባር አስገባ...",
      addTask: "ተግባር አክል",
      update: "አሻሽል",
      delete: "አጥፋ",
      save: "አስቀምጥ",
      cancel: "ሰርዝ",
      logout: "ውጣ",
    },
  },
};

i18n
  .use(LanguageDetector) // auto-detect language
  .use(initReactI18next) // bind to React
  .init({
    resources,
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
