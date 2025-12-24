import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const activeClass =
    "bg-linear-to-br from-amber-400 to-amber-500 text-white shadow-md";
  const inactiveClass =
    "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60";

  return (
    <div
      className="
        flex items-center gap-1 p-1 rounded-xl
        bg-zinc-100/80 dark:bg-zinc-900/80
        backdrop-blur border border-zinc-200 dark:border-zinc-800
      "
    >
      <button
        onClick={() => setTheme("light")}
        title="Sáng"
        className={`p-2.5 rounded-lg transition-all ${
          theme === "light" ? activeClass : inactiveClass
        }`}
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        title="Tối"
        className={`p-2.5 rounded-lg transition-all ${
          theme === "dark" ? activeClass : inactiveClass
        }`}
      >
        <Moon size={18} />
      </button>

      <button
        onClick={() => setTheme("system")}
        title="Hệ thống"
        className={`p-2.5 rounded-lg transition-all ${
          theme === "system" ? activeClass : inactiveClass
        }`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}
