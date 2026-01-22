import {
  Coffee,
  RefreshCw,
  Menu,
  X,
  MapPin,
  BarChart3,
  Home,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ onRefresh }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Trang chủ", icon: Home },
    { to: "/coffee-location", label: "Quán Cafe", icon: MapPin },
    { to: "/stats", label: "Thống kê", icon: BarChart3 },
  ];

  const navItem = (to, label, Icon) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`
        relative
        flex items-center gap-2
        px-4 py-2
        text-sm font-medium
        rounded-xl
        transition-all duration-300
        group
        ${
          pathname === to
            ? "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
        }
      `}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      <span>{label}</span>

      {/* Active indicator */}
      {pathname === to && (
        <div
          className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-1/2 h-0.5
          bg-gradient-to-r from-amber-400 to-amber-500
          rounded-full
        "
        />
      )}

      {/* Hover gradient effect */}
      <div
        className="
        absolute inset-0 rounded-xl
        bg-gradient-to-r from-transparent via-amber-50/0 to-transparent
        group-hover:via-amber-50/20 dark:group-hover:via-amber-900/10
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
      "
      />
    </Link>
  );

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white/90 dark:bg-zinc-900/90
        backdrop-blur-xl backdrop-saturate-150
        border-b border-zinc-200/80 dark:border-zinc-800/80
        shadow-sm shadow-zinc-200/20 dark:shadow-zinc-900/30
      "
    >
      {/* Gradient border bottom */}
      <div
        className="
        absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-amber-400/20 to-transparent
        pointer-events-none
      "
      />

      {/* ===== MAIN HEADER ===== */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group/logo"
          onClick={() => setOpen(false)}
        >
          {/* Logo glow effect */}
          <div className="relative">
            <div
              className="
              absolute -inset-3
              bg-gradient-to-r from-amber-400 to-amber-500
              rounded-full blur-lg
              opacity-0 group-hover/logo:opacity-30
              transition-opacity duration-500
            "
            />

            <img
              src="favicon.svg"
              alt="Bro Coffee Logo"
              className="
                relative z-10
                w-10 h-10
                rounded-xl
                shadow-md
                object-cover
                bg-amber-500
                group-hover/logo:scale-110
                transition-transform duration-300
              "
            />
          </div>

          {/* Logo text */}
          <div className="relative">
            <span
              className="
              font-bold text-xl tracking-tight
              bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800
              dark:from-amber-300 dark:via-amber-200 dark:to-amber-400
              bg-clip-text text-transparent
              group-hover/logo:scale-105
              transition-transform duration-300
            "
            >
              Bro Coffee
            </span>

            {/* Subtitle */}
            <div
              className="
              absolute -bottom-4 left-0
              text-[10px] font-medium
              text-zinc-400 dark:text-zinc-500
              opacity-0 group-hover/logo:opacity-100
              transition-all duration-300
              whitespace-nowrap
            "
            >
              Discover & Rate
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => navItem(item.to, item.label, item.icon))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh data"
              className="
                relative
                p-2 rounded-xl
                bg-gradient-to-br from-amber-50 to-amber-100
                dark:from-zinc-800 dark:to-zinc-900
                text-amber-700 dark:text-amber-300
                border border-amber-200/50 dark:border-zinc-700/50
                hover:from-amber-100 hover:to-amber-200
                dark:hover:from-zinc-700 dark:hover:to-zinc-800
                hover:shadow-md hover:shadow-amber-200/30 dark:hover:shadow-zinc-900/50
                hover:scale-105
                active:scale-95
                transition-all duration-300
                group/refresh
              "
            >
              <RefreshCw
                size={18}
                className="
                  group-hover/refresh:rotate-180
                  transition-transform duration-500
                "
              />

              {/* Pulse effect on hover */}
              <div
                className="
                absolute inset-0 rounded-xl
                bg-gradient-to-r from-amber-400/0 via-amber-300/0 to-amber-400/0
                opacity-0 group-hover/refresh:opacity-20
                transition-opacity duration-500
                pointer-events-none
              "
              />
            </button>
          )}

          {/* Theme Toggle - Desktop only */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="
              relative
              md:hidden
              p-2 rounded-xl
              bg-gradient-to-br from-zinc-50 to-zinc-100
              dark:from-zinc-800 dark:to-zinc-900
              text-zinc-700 dark:text-zinc-300
              border border-zinc-200/50 dark:border-zinc-700/50
              hover:from-zinc-100 hover:to-zinc-200
              dark:hover:from-zinc-700 dark:hover:to-zinc-800
              hover:shadow-md
              hover:scale-105
              active:scale-95
              transition-all duration-300
            "
          >
            {open ? <X size={20} /> : <Menu size={20} />}

            {/* Indicator for mobile menu */}
            {!open && (
              <span
                className="
                absolute -top-1 -right-1
                w-2 h-2
                bg-amber-500 rounded-full
                animate-pulse
              "
              />
            )}
          </button>
        </div>
      </div>

      {/* ===== MOBILE SIDEBAR ===== */}
      {/* Backdrop */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          md:hidden fixed top-0 right-0 z-[100] h-[100dvh]
          w-72 bg-white dark:bg-zinc-950
          border-l border-zinc-200 dark:border-zinc-800
          shadow-2xl
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src="favicon.svg"
                alt="Bro Coffee Logo"
                className="w-9 h-9 rounded-xl shadow-sm object-cover bg-amber-500"
              />
              <span className="font-bold text-lg bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
                Bro Coffee
              </span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3
                px-4 py-3.5
                text-sm font-medium
                rounded-xl
                transition-all duration-300
                ${
                  pathname === item.to
                    ? "text-amber-700 dark:text-amber-300 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/30 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                }
              `}
            >
              <item.icon
                size={20}
                className={`
                  ${
                    pathname === item.to
                      ? "text-amber-500 dark:text-amber-400"
                      : "text-zinc-400 dark:text-zinc-500"
                  }
                `}
              />
              <span className="flex-1">{item.label}</span>
              {pathname === item.to && (
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer with Theme Toggle */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0 space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider pl-2">
              Giao diện
            </span>
            <ThemeToggle />
          </div>

          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
            Made with ☕ & ❤️ by Bro Code
          </p>
        </div>
      </aside>
    </header>
  );
}
