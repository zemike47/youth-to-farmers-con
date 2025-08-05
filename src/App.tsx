// App.tsx
import i18n from "./i18n";

import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";

import { NavMenus } from "./navUtils";

import AppRoutes from "./routes/AppRoutes";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleJoinClick = () => {
    navigate("/join");
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "am" : "en";
    console.log("Switching to:", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <header className="h-16 text-[15px] flex fixed inset-0 z-50  dark:bg-gray-950">
        <nav className="flex items-center justify-between  text-white  gap-2 w-full max-w-7xl mx-auto p-3 mb-1 dark:text-white dark:bg-gray-900">
          <div className="lg:flex items-center gap-x-3 relative cursor-pointer">
            <h3 className="text-lg font-semibold">{t("YeLijoch Mahiber")}</h3>
          </div>

          <ul className="gap-x-1 lg:flex items-center hidden">
            {NavMenus.map((menu) => (
              <DesktopNav NavMenus={menu} key={menu.name} />
            ))}
          </ul>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="relative px-3 py-3 shadow rounded-xl flex items-center hover:text-black dark:bg-gray-800 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="mr-1" />
              {i18n.language === "en" ? "አማርኛ" : "Eng"}
            </button>

            <button
              onClick={handleJoinClick}
              className="relative px-3 py-3 shadow rounded-xl flex items-center hover:text-black dark:bg-gray-50 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Join
            </button>
          </div>

          <div className="lg:hidden">
            <MobileNav NavMenus={NavMenus} />
          </div>
        </nav>
      </header>

      {/* Main Routes */}
      <main className="pt-20">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
