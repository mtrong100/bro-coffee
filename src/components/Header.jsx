import { Coffee, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header({ onRefresh }) {
  const { pathname } = useLocation();

  const navItem = (to, label) => (
    <Link
      to={to}
      className={`
        text-lg font-medium transition
        ${
          pathname === to
            ? "text-amber-600 dark:text-amber-400"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        }
      `}
    >
      {label}
    </Link>
  );

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-xl
        border-b border-zinc-200 dark:border-zinc-800
      "
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div
                className="
                  absolute -inset-3
                  bg-linear-to-r from-amber-400 to-amber-500
                  rounded-full blur opacity-25
                "
              />
              <Coffee className="relative text-amber-600 dark:text-amber-400" />
            </div>

            <span
              className="
              
                font-bold text-lg
                bg-linear-to-r from-amber-700 via-amber-600 to-amber-700
                dark:from-amber-300 dark:via-amber-400 dark:to-amber-300
                bg-clip-text text-transparent
              "
            >
              Bro Coffee
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-5 ml-4">
            {navItem("/", "Home")}
            {navItem("/stats", "Stats")}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh data"
              className="
                p-2 rounded-lg
                bg-amber-100 dark:bg-zinc-800
                text-amber-700 dark:text-amber-300
                hover:bg-amber-200 dark:hover:bg-zinc-700
                transition
              "
            >
              <RefreshCw size={18} />
            </button>
          )}

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-center gap-6 py-2">
          {navItem("/", "Home")}
          {navItem("/stats", "Stats")}
        </div>
      </div>
    </header>
  );
}
