import React from "react";
import {
  Database,
  DollarSign,
  Zap,
  TrendingUp,
  Clock,
  Calendar,
  Activity,
  BarChart,
} from "lucide-react";

const VARIANT_STYLES = {
  amber: {
    icon: <Zap className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    iconText: "text-white",
    glow: "hover:shadow-amber-500/20",
    border: "border-amber-200/50 dark:border-amber-800/30",
    gradient: "from-amber-500 to-orange-500",
    light: "bg-amber-500/5",
  },
  blue: {
    icon: <Database className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    iconText: "text-white",
    glow: "hover:shadow-blue-500/20",
    border: "border-blue-200/50 dark:border-blue-800/30",
    gradient: "from-blue-500 to-cyan-500",
    light: "bg-blue-500/5",
  },
  green: {
    icon: <DollarSign className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    iconText: "text-white",
    glow: "hover:shadow-emerald-500/20",
    border: "border-emerald-200/50 dark:border-emerald-800/30",
    gradient: "from-emerald-500 to-green-500",
    light: "bg-emerald-500/5",
  },
  violet: {
    icon: <BarChart className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    iconText: "text-white",
    glow: "hover:shadow-violet-500/20",
    border: "border-violet-200/50 dark:border-violet-800/30",
    gradient: "from-violet-500 to-purple-500",
    light: "bg-violet-500/5",
  },
  indigo: {
    icon: <TrendingUp className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
    iconText: "text-white",
    glow: "hover:shadow-indigo-500/20",
    border: "border-indigo-200/50 dark:border-indigo-800/30",
    gradient: "from-indigo-500 to-blue-500",
    light: "bg-indigo-500/5",
  },
  rose: {
    icon: <Activity className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
    iconText: "text-white",
    glow: "hover:shadow-rose-500/20",
    border: "border-rose-200/50 dark:border-rose-800/30",
    gradient: "from-rose-500 to-pink-500",
    light: "bg-rose-500/5",
  },
  teal: {
    icon: <Clock className="w-5 h-5" />,
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    iconText: "text-white",
    glow: "hover:shadow-teal-500/20",
    border: "border-teal-200/50 dark:border-teal-800/30",
    gradient: "from-teal-500 to-cyan-500",
    light: "bg-teal-500/5",
  },
};

export default function StatCard({
  icon,
  label,
  value,
  variant = "amber",
  trend,
  description,
}) {
  const style = VARIANT_STYLES[variant] ?? VARIANT_STYLES.amber;

  // Determine icon to use - either passed prop or variant default
  const IconComponent = icon || style.icon;

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-white/80 to-white/40 dark:from-zinc-900/80 dark:to-zinc-900/40
        backdrop-blur-xl
        border ${style.border}
        p-6 rounded-2xl
        transition-all duration-500
        hover:shadow-2xl hover:scale-[1.02] ${style.glow}
        group
        before:absolute before:inset-0 before:bg-gradient-to-br ${style.light} before:opacity-0 
        before:group-hover:opacity-100 before:transition-opacity before:duration-500
        after:absolute after:inset-0 after:border-2 after:border-transparent 
        after:group-hover:border-white/20 after:rounded-2xl after:transition-all after:duration-500
      `}
    >
      {/* Animated gradient overlay */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-10
          transition-opacity duration-700
          bg-gradient-to-br from-white to-transparent
        "
      />

      {/* Accent corner */}
      <div
        className={`
          absolute top-0 right-0 w-16 h-16
          bg-gradient-to-bl ${style.gradient}
          opacity-0 group-hover:opacity-5
          transition-opacity duration-500
          rounded-bl-2xl
        `}
      />

      <div className="relative z-10 flex items-start gap-5">
        {/* Icon container with gradient background */}
        <div
          className={`
            relative flex-shrink-0
            p-3.5 rounded-xl
            ${style.iconBg} ${style.iconText}
            shadow-lg
            transition-all duration-300
            group-hover:scale-110 group-hover:shadow-xl
            after:absolute after:inset-0 after:rounded-xl 
            after:bg-white/10 after:opacity-0 
            after:group-hover:opacity-100 after:transition-opacity after:duration-300
          `}
        >
          <div className="relative z-10 flex items-center justify-center w-6 h-6">
            {React.isValidElement(IconComponent) ? (
              React.cloneElement(IconComponent, {
                size: 24,
                strokeWidth: 2.2,
                className: "w-6 h-6 text-white",
              })
            ) : (
              <IconComponent
                size={24}
                strokeWidth={2.2}
                className="w-6 h-6 text-white"
              />
            )}
          </div>

          {/* Subtle shine effect on icon container */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide truncate">
            {label}
          </p>
          <p
            className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
            from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 mb-2"
          >
            {value || "—"}
          </p>

          {/* Trend/Description section */}
          {(trend || description) && (
            <div className={`mt-3 pt-3 border-t ${style.border}`}>
              {trend && (
                <div className="flex items-center text-sm">
                  <span
                    className={`font-medium mr-2 ${trend.value > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {trend.value > 0 ? "↗" : "↘"} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                    {trend.label}
                  </span>
                </div>
              )}
              {description && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 truncate">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full bg-gradient-to-r ${style.gradient} animate-pulse`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
