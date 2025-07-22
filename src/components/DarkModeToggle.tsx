import { useEffect, useState } from "react";
import { SunMoon, Moon, Globe } from "lucide-react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ fix hydration

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  if (!mounted) return null; // ✅ avoid mismatch on SSR/initial render

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-1 py-1 rounded  dark:bg-slate-700 transition"
    >
      {darkMode ? (
        <SunMoon className="w-5 h-4 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-4 text-gray-900 dark:text-white" />
      )}
    </button>
  );
};

export default DarkModeToggle;
