import {
  Coffee,
  Heart,
  MapPin,
  Users,
  Github,
  Coffee as CoffeeIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-gradient-to-b from-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        border-t border-zinc-200/80 dark:border-zinc-800/80
        pt-12 pb-6
        overflow-hidden
      "
    >
      {/* Top gradient glow */}
      <div
        className="
        absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-amber-400/50 to-transparent
      "
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Coffee beans pattern */}
        <div
          className="
          absolute top-10 left-10 w-6 h-8
          bg-gradient-to-br from-amber-800/10 to-amber-900/5
          rounded-full rotate-45
          blur-sm
        "
        />
        <div
          className="
          absolute top-20 right-20 w-8 h-6
          bg-gradient-to-br from-amber-700/10 to-amber-800/5
          rounded-full rotate-12
          blur-sm
        "
        />
        <div
          className="
          absolute bottom-20 left-1/4 w-7 h-7
          bg-gradient-to-br from-amber-900/10 to-amber-800/5
          rounded-full -rotate-12
          blur-sm
        "
        />

        {/* Gradient orbs */}
        <div
          className="
          absolute -bottom-20 -left-20
          w-80 h-80
          bg-gradient-to-br from-amber-400/5 via-amber-300/3 to-transparent
          rounded-full
          blur-3xl
        "
        />
        <div
          className="
          absolute -top-20 -right-20
          w-80 h-80
          bg-gradient-to-bl from-amber-600/5 via-amber-400/3 to-transparent
          rounded-full
          blur-3xl
        "
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="
                relative
                p-3
                bg-gradient-to-br from-amber-100 to-amber-50
                dark:from-amber-900/30 dark:to-amber-800/20
                rounded-xl
                border border-amber-200/50 dark:border-amber-800/30
                shadow-sm
              "
              >
                <Coffee
                  size={24}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
              <div>
                <h3
                  className="
                  font-bold text-xl
                  bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800
                  dark:from-amber-300 dark:via-amber-200 dark:to-amber-400
                  bg-clip-text text-transparent
                "
                >
                  Bro Coffee
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Discover & Rate Coffee Spots
                </p>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
              Nền tảng chia sẻ và đánh giá các quán cà phê độc đáo. Cùng nhau
              khám phá những góc phố thơm mùi cà phê.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4
              className="
              font-semibold text-lg
              text-zinc-800 dark:text-zinc-200
              flex items-center gap-2
            "
            >
              <MapPin size={18} className="text-amber-500" />
              Khám Phá
            </h4>
            <ul className="space-y-2">
              {[
                {
                  name: "Quán Cafe Nổi Bật",
                  href: "/coffee-location?filter=featured",
                },
                {
                  name: "Đánh Giá Mới Nhất",
                  href: "/coffee-location?filter=recent",
                },
                { name: "Cafe View Đẹp", href: "/coffee-location?filter=view" },
                {
                  name: "Workspace Cafe",
                  href: "/coffee-location?filter=workspace",
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="
                      text-sm text-zinc-600 dark:text-zinc-400
                      hover:text-amber-600 dark:hover:text-amber-400
                      transition-colors duration-300
                      flex items-center gap-2
                      group
                    "
                  >
                    <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4
              className="
              font-semibold text-lg
              text-zinc-800 dark:text-zinc-200
              flex items-center gap-2
            "
            >
              <Users size={18} className="text-amber-500" />
              Cộng Đồng
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Góp Ý & Phản Hồi", href: "#" },
                { name: "Đóng Góp Địa Điểm", href: "#" },
                { name: "Nhóm Facebook", href: "#" },
                { name: "Chia Sẻ Trải Nghiệm", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="
                      text-sm text-zinc-600 dark:text-zinc-400
                      hover:text-amber-600 dark:hover:text-amber-400
                      transition-colors duration-300
                      flex items-center gap-2
                      group
                    "
                  >
                    <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="#"
                className="
                  p-2
                  rounded-lg
                  bg-gradient-to-br from-zinc-100 to-zinc-50
                  dark:from-zinc-800 dark:to-zinc-900
                  text-zinc-600 dark:text-zinc-400
                  hover:text-amber-600 dark:hover:text-amber-400
                  hover:shadow-md
                  transition-all duration-300
                "
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="
                  p-2
                  rounded-lg
                  bg-gradient-to-br from-zinc-100 to-zinc-50
                  dark:from-zinc-800 dark:to-zinc-900
                  text-zinc-600 dark:text-zinc-400
                  hover:text-amber-600 dark:hover:text-amber-400
                  hover:shadow-md
                  transition-all duration-300
                "
                title="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="
                  p-2
                  rounded-lg
                  bg-gradient-to-br from-zinc-100 to-zinc-50
                  dark:from-zinc-800 dark:to-zinc-900
                  text-zinc-600 dark:text-zinc-400
                  hover:text-amber-600 dark:hover:text-amber-400
                  hover:shadow-md
                  transition-all duration-300
                "
                title="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="
          h-px
          bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent
          dark:from-transparent dark:via-zinc-700/50 dark:to-transparent
          my-8
        "
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-amber-700 dark:text-amber-400">
                Bro Coffee
              </span>
              . All rights reserved.
            </p>
            <div className="hidden md:flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
              <span>•</span>
              <a
                href="#"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Stats & Made with love */}
          <div className="flex items-center gap-6">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-center">
                <div
                  className="
                  text-lg font-semibold
                  bg-gradient-to-r from-amber-600 to-amber-700
                  dark:from-amber-400 dark:to-amber-500
                  bg-clip-text text-transparent
                "
                >
                  100+
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Quán Cafe
                </div>
              </div>
              <div className="text-center">
                <div
                  className="
                  text-lg font-semibold
                  bg-gradient-to-r from-amber-600 to-amber-700
                  dark:from-amber-400 dark:to-amber-500
                  bg-clip-text text-transparent
                "
                >
                  1K+
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Đánh Giá
                </div>
              </div>
              <div className="text-center">
                <div
                  className="
                  text-lg font-semibold
                  bg-gradient-to-r from-amber-600 to-amber-700
                  dark:from-amber-400 dark:to-amber-500
                  bg-clip-text text-transparent
                "
                >
                  24/7
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Cập Nhật
                </div>
              </div>
            </div>

            {/* Made with love */}
            <div
              className="
              flex items-center gap-2
              text-sm text-zinc-600 dark:text-zinc-400
            "
            >
              <span>Made with</span>
              <Heart
                size={16}
                className="
                  text-red-500 animate-pulse
                  fill-red-500
                "
              />
              <span>and</span>
              <CoffeeIcon
                size={16}
                className="
                  text-amber-600 dark:text-amber-400
                "
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p
            className="
            text-sm text-zinc-500 dark:text-zinc-500 italic
            flex items-center justify-center gap-2
          "
          >
            <span className="animate-bounce">☕</span>
            Ghi lại từng ly cà phê đáng nhớ
            <span className="animate-bounce delay-100">☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
