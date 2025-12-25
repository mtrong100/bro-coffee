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

            <div
              className="
              relative
              p-2
              bg-gradient-to-br from-amber-100 to-amber-50
              dark:from-amber-900/40 dark:to-amber-800/30
              rounded-xl
              border border-amber-200/50 dark:border-amber-800/30
              shadow-sm
              group-hover/logo:scale-110
              transition-transform duration-300
            "
            >
              <Coffee
                size={20}
                className="
                  text-amber-600 dark:text-amber-400
                  group-hover/logo:rotate-12
                  transition-transform duration-300
                "
              />
            </div>
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

          <ThemeToggle />

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

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-500 ease-out
          ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {/* Mobile menu gradient border */}
        <div
          className="
          h-px
          bg-gradient-to-r from-transparent via-amber-400/30 to-transparent
        "
        />

        <div
          className="
          px-6 py-4
          flex flex-col gap-2
          bg-gradient-to-b from-white to-amber-50/30
          dark:from-zinc-900 dark:to-amber-900/5
        "
        >
          {navItems.map((item) => (
            <div key={item.to} className="relative">
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3
                  px-4 py-3
                  text-sm font-medium
                  rounded-xl
                  transition-all duration-300
                  group/mobile
                  ${
                    pathname === item.to
                      ? "text-amber-700 dark:text-amber-300 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/30"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                  }
                `}
              >
                <item.icon
                  size={18}
                  className={`
                    ${
                      pathname === item.to
                        ? "text-amber-500 dark:text-amber-400"
                        : "text-zinc-400 dark:text-zinc-500 group-hover/mobile:text-zinc-600 dark:group-hover/mobile:text-zinc-300"
                    }
                  `}
                />
                <span>{item.label}</span>

                {/* Hover arrow */}
                <div
                  className="
                  ml-auto
                  opacity-0 group-hover/mobile:opacity-100
                  translate-x-2 group-hover/mobile:translate-x-0
                  transition-all duration-300
                "
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>

              {/* Mobile active indicator */}
              {pathname === item.to && (
                <div
                  className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  w-1 h-8
                  bg-gradient-to-b from-amber-400 to-amber-500
                  rounded-r-full
                "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
