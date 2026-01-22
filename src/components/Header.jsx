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
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ onRefresh }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { to: "/", label: "Trang chủ", icon: Home },
    { to: "/coffee-location", label: "Quán Cafe", icon: MapPin },
    { to: "/stats", label: "Thống kê", icon: BarChart3 },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
                Bro Coffee
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    font-medium text-sm transition-all
                    ${
                      pathname === item.to
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            border-b border-zinc-200 dark:border-zinc-800
            ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  font-medium transition-all
                  ${
                    pathname === item.to
                      ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen
                    ? "slideInFromTop 0.3s ease-out forwards"
                    : "none",
                }}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
          style={{ top: "64px" }}
        />
      )}

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
