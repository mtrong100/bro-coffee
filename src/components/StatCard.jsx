import React from "react";

const VARIANT_STYLES = {
  blue: {
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconText: "text-blue-600 dark:text-blue-400",
    glow: "hover:shadow-blue-500/10",
    border: "border-blue-200/30 dark:border-blue-800/30",
  },
  green: {
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconText: "text-emerald-600 dark:text-emerald-400",
    glow: "hover:shadow-emerald-500/10",
    border: "border-emerald-200/30 dark:border-emerald-800/30",
  },
  violet: {
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconText: "text-violet-600 dark:text-violet-400",
    glow: "hover:shadow-violet-500/10",
    border: "border-violet-200/30 dark:border-violet-800/30",
  },
  indigo: {
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconText: "text-indigo-600 dark:text-indigo-400",
    glow: "hover:shadow-indigo-500/10",
    border: "border-indigo-200/30 dark:border-indigo-800/30",
  },
  rose: {
    iconBg: "bg-rose-100 dark:bg-rose-900/40",
    iconText: "text-rose-600 dark:text-rose-400",
    glow: "hover:shadow-rose-500/10",
    border: "border-rose-200/30 dark:border-rose-800/30",
  },
  teal: {
    iconBg: "bg-teal-100 dark:bg-teal-900/40",
    iconText: "text-teal-600 dark:text-teal-400",
    glow: "hover:shadow-teal-500/10",
    border: "border-teal-200/30 dark:border-teal-800/30",
  },
};

export default function StatCard({ icon, label, value, variant = "blue" }) {
  const style = VARIANT_STYLES[variant];

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm
        border ${style.border}
        p-6 rounded-2xl
        flex items-center gap-4
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02] ${style.glow}
        group
      `}
    >
      {/* Gradient background effect */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-10 
        transition-opacity duration-300
        ${
          variant === "blue"
            ? "bg-linear-to-br from-blue-500 to-cyan-400"
            : variant === "green"
            ? "bg-linear-to-br from-emerald-500 to-teal-400"
            : variant === "violet"
            ? "bg-linear-to-br from-violet-500 to-purple-400"
            : variant === "indigo"
            ? "bg-linear-to-br from-indigo-500 to-purple-400"
            : variant === "rose"
            ? "bg-linear-to-br from-rose-500 to-pink-400"
            : "bg-linear-to-br from-teal-500 to-emerald-400"
        }
      `}
      ></div>

      <div
        className={`
          relative z-10
          p-3 rounded-xl
          ${style.iconBg} ${style.iconText}
          shadow-lg
        `}
      >
        {icon}
      </div>

      <div className="relative z-10 flex-1">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
