// src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";

import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";
import { NavMenus } from "./navUtils";

import AppRoutes from "./routes/AppRoutes";
import { Globe } from "lucide-react";

function App() {
  return (
    <Router>
      {/* Header / Navbar */}
      <header className="h-16 text-[15px] flex fixed inset-0 z-50 rounded-s dark:bg-gray-950">
        <nav className="flex items-center justify-between bg-yellow-50 text-black gap-2 w-full max-w-7xl mx-auto p-3 mb-1 dark:text-white dark:bg-gray-900">
          <motion.div
            className="lg:flex items-center gap-x-3 relative cursor-pointer"
            whileHover={{ scale: 1.2 }}
          >
            <div className="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
              YM
            </div>
            <h3 className="text-lg font-semibold">YeLijoch Mahiber</h3>
          </motion.div>

          <ul className="gap-x-1 lg:flex items-center hidden">
            {NavMenus.map((menu) => (
              <DesktopNav NavMenus={menu} key={menu.name} />
            ))}
          </ul>

          <div className="flex items-center space-x-2">
            <motion.div
              className="relative px-1 py-1  shadow rounded-xl flex items-center dark:bg-gray-800"
              whileHover={{ boxShadow: "0px 0px 8px rgb(55,25,23)" }}
            >
              <DarkModeToggle />
            </motion.div>
            <motion.div
              className="relative px-1 py-1 shadow rounded-xl flex items-center dark:bg-gray-800"
              whileHover={{ boxShadow: "0px 0px 8px rgb(55,25,23)" }}
            >
              <Globe className="relative px-1 py-1 shadow rounded-xl flex items-center dark:bg-gray-800" />
              Eng
            </motion.div>
            <motion.div
              className="relative px-3 py-3 shadow rounded-xl flex items-center dark:bg-gray-800"
              whileHover={{ boxShadow: "0px 0px 8px rgb(55,25,23)" }}
            >
              Join
            </motion.div>
          </div>

          <div className="lg:hidden">
            <MobileNav NavMenus={NavMenus} />
          </div>
        </nav>
      </header>

      {/* Routes */}
      <main className="pt-20">
        <AppRoutes />
      </main>

      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
