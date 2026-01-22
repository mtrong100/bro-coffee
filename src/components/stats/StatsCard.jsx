export default function StatsCard({ title, children, className = "" }) {
  return (
    <div
      className={`
        group relative
        h-full
        rounded-3xl
        border border-zinc-200 dark:border-zinc-800
        bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
        p-6 sm:p-8
        shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        transition-all duration-500
        hover:-translate-y-1
        ${className}
      `}
    >
      {/* Decorative Glow */}
      <div
        className="
          pointer-events-none
          absolute -inset-px
          rounded-3xl
          bg-gradient-to-br from-amber-400/20 via-transparent to-amber-600/20
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
      />

      <div className="
        pointer-events-none
        absolute inset-0 
        bg-gradient-to-br from-white/40 to-transparent dark:from-white/5
        rounded-3xl
        opacity-50
      " />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <h3
          className="
            text-lg font-bold tracking-tight
            text-zinc-800 dark:text-zinc-100
            group-hover:text-amber-700 dark:group-hover:text-amber-400
            transition-colors duration-300
          "
        >
          {title}
        </h3>
        <div className="h-1 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-amber-500 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
