export default function StatsCard({ title, children }) {
  return (
    <div
      className="
        group relative
        h-full
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
        p-6
        shadow-sm
        transition-all duration-300
        hover:shadow-md
      "
    >
      {/* Glow nhẹ phía sau */}
      <div
        className="
          pointer-events-none
          absolute -inset-1
          rounded-2xl
          bg-linear-to-r from-amber-400/10 to-amber-500/10
          opacity-0 group-hover:opacity-100
          blur-xl transition
        "
      />

      {/* Header */}
      <h3
        className="
          relative z-10
          mb-4
          text-sm font-semibold tracking-wide
          text-zinc-700 dark:text-zinc-300
        "
      >
        {title}
      </h3>

      {/* Content */}
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}
