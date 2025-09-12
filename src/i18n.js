// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      aboutTitle: "About YeLijoch Mahiber",
      YeLijochMahiber: "YeLijoch Mahiber",
      EmpoweringYouth: "Empowering Youth, Uplifting Farmers",
      connect:
        "BRIDGING URBAN YOUTH WITH RURAL FARMERS — A SUSTAINABLE SUPPORT AND LEARNING ECOSYSTEM",
      getInvolved: "Get Involved",

      // New Core Goals
      coreGoalsTitle: "OUR THREE CORE GOALS",
      supportFarmersTitle: "SUPPORT RURAL FARMERS",
      supportFarmersDesc:
        "Provide direct agricultural support, modern techniques, and market access to rural farming communities across Ethiopia.",
      empowerYouthTitle: "EMPOWER YOUTH",
      empowerYouthDesc:
        "Give urban youth purpose, practical skills, and meaningful work experience while contributing to rural development.",
      generateIncomeTitle: "GENERATE INCOME",
      generateIncomeDesc:
        "Create sustainable revenue through coordination services, value-added activities, and market facilitation.",
    },
  },
  am: {
    translation: {
      aboutTitle: "ስለ የልጆች ማህበር",
      YeLijochMahiber: "የልጆች ማህበር",
      EmpoweringYouth: "ወጣቶችን ማጎልበት፤ ገበሬውን ከፍ ማረግ",
      connect: "የከተማ ወጣቶችን ከገጠር ገበሬዎች ጋር በማያቋርጥ የድጋፍና የትምህርት ኢኮሲስተም ማገናኘት",
      getInvolved: "ይቀላቀሉ",

      // New Core Goals
      coreGoalsTitle: "አምስት ዋና ግቦቻችን",
      supportFarmersTitle: "ገጠር ገበሬዎችን መደገፍ",
      supportFarmersDesc:
        "ቀጥታ የግብርና ድጋፍ፣ ዘመናዊ ቴክኒኮች እና የገበያ ግንኙነት ለኢትዮጵያ አብዛኞቹ ገበሬዎች ማቅረብ።",
      empowerYouthTitle: "ወጣቶችን ማጎልበት",
      empowerYouthDesc:
        "የከተማ ወጣቶችን አላማ እንዲኖራቸው፣ ተግባራዊ ችሎታ እንዲያገኙ እና ለገጠር ልማት በተግባር እንዲያበረክቱ የሥራ ተሞክሮ ማቅረብ።",
      generateIncomeTitle: "ገቢ መፍጠር",
      generateIncomeDesc:
        "በመተባበር አገልግሎቶች፣ የተጨመረ እሴት ያላቸው ተግባራት እና የገበያ ማስተላለፊያ በኩል የሚያበረከት ጸንቶ የሚቆይ ገቢ መፍጠር።",
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
