export default function StatsCard({ title, children }) {
  return (
    <div
      className="
        h-full
        p-6 rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-sm
        flex flex-col
      "
    >
      <h3 className="font-semibold mb-4 tracking-tight">{title}</h3>
      <div className="flex-1">{children}</div>
    </div>
  );
}
