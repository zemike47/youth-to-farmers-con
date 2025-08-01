// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";
import { NavMenus } from "./navUtils";

import AppRoutes from "./routes/AppRoutes";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <div>
      <header className="h-16 text-[15px] flex fixed inset-0 z-50  dark:bg-gray-950">
        <nav className="flex items-center justify-between  text-white  gap-2 w-full max-w-7xl mx-auto p-3 mb-1 dark:text-white dark:bg-gray-900">
          <div className="lg:flex items-center gap-x-3 relative cursor-pointer">
            <h3 className="text-lg font-semibold">YeLijoch Mahiber</h3>
          </div>

          <ul className="gap-x-1 lg:flex items-center hidden">
            {NavMenus.map((menu) => (
              <DesktopNav NavMenus={menu} key={menu.name} />
            ))}
          </ul>

          <div className="flex items-center space-x-2">
            <div className="relative px-1 py-1 shadow rounded-xl flex items-center dark:bg-gray-800">
              <Globe className="mr-1" />
              Eng
            </div>

            <button
              onClick={handleJoinClick}
              className="relative px-3 py-3 shadow rounded-xl flex items-center dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
