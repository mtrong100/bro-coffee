import { MapPin, Star, StarHalf } from "lucide-react";

const CATEGORY_STYLE = {
  PEAK: `
    bg-gradient-to-r from-amber-400/20 to-amber-500/20
    text-amber-600
    border-amber-400
    shadow-[0_0_0_1px_rgba(251,191,36,0.4)]
  `,
  Mid: `
    bg-gradient-to-r from-emerald-400/20 to-emerald-500/20
    text-emerald-600
    border-emerald-400
    shadow-[0_0_0_1px_rgba(52,211,153,0.4)]
  `,
  Medium: `
    bg-gradient-to-r from-sky-400/20 to-sky-500/20
    text-sky-600
    border-sky-400
    shadow-[0_0_0_1px_rgba(56,189,248,0.4)]
  `,
  Trash: `
    bg-gradient-to-r from-rose-400/20 to-rose-500/20
    text-rose-600
    border-rose-400
    shadow-[0_0_0_1px_rgba(244,63,94,0.4)]
  `,
};

/* ===== Helper ===== */
function formatRate(rawRate) {
  if (!rawRate) return 0;

  const rate = Number(rawRate) / 100;
  return Math.min(Math.max(rate, 0), 5);
}

function renderStars(rate) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      stars.push(
        <Star
          key={i}
          size={18}
          className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300"
          fill="currentColor"
        />
      );
    } else if (rate >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          size={18}
          className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300"
          fill="currentColor"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={18}
          className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors duration-300"
        />
      );
    }
  }

  return stars;
}

export default function CoffeeLocationCard({ data }) {
  const { name, address, imageUrl, category, rate } = data;

  const formattedRate = formatRate(rate);

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
        transition-all duration-500 ease-out
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        hover:border-zinc-300 dark:hover:border-zinc-700
        before:absolute before:inset-0 before:z-0
        before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-amber-50/10 dark:before:to-amber-900/5
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
      "
    >
      {/* Glow effect */}
      <div
        className="
        absolute inset-0 -z-10
        bg-gradient-to-r from-amber-400/0 via-amber-300/0 to-amber-400/0
        opacity-0 group-hover:opacity-10
        blur-xl
        transition-opacity duration-700
      "
      />

      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl || "https://placehold.co/600x400?text=Coffee"}
          alt={name}
          className="
            w-full h-full object-cover
            transition-all duration-700 ease-out
            group-hover:scale-110
            group-hover:rotate-1
          "
        />

        {/* Image overlay */}
        <div
          className="
          absolute inset-0 
          bg-gradient-to-t from-black/50 via-black/20 to-transparent
          opacity-100 group-hover:opacity-70
          transition-opacity duration-500
        "
        />

        {/* Shine effect on image */}
        <div
          className="
          absolute inset-0 
          bg-gradient-to-tr from-transparent via-white/0 to-white/20
          opacity-0 group-hover:opacity-30
          transition-opacity duration-700
        "
        />
      </div>

      {/* CONTENT */}
      <div className="relative p-4 space-y-2 z-10">
        {/* NAME + CATEGORY */}
        <div className="flex items-center justify-between gap-3">
          <h3
            className="
            font-semibold text-lg line-clamp-1
            text-zinc-800 dark:text-zinc-100
            group-hover:text-amber-700 dark:group-hover:text-amber-300
            transition-colors duration-300
          "
          >
            {name}
          </h3>

          {category && (
            <span
              className={`
                px-2.5 py-1
                text-xs font-semibold uppercase tracking-wide
                rounded-lg border
                transition-all duration-300 ease-out
                group-hover:scale-105
                group-hover:translate-y-[-2px]
                group-hover:shadow-lg
                ${CATEGORY_STYLE[category] || "border-zinc-400 text-zinc-500"}
              `}
            >
              {category}
            </span>
          )}
        </div>

        {/* ADDRESS */}
        <div
          className="
          flex items-center gap-1 
          text-sm text-zinc-500 dark:text-zinc-400
          group-hover:text-zinc-600 dark:group-hover:text-zinc-300
          transition-colors duration-300
        "
        >
          <MapPin
            size={14}
            className="
              group-hover:text-amber-500 
              group-hover:scale-110
              transition-all duration-300
            "
          />
          <span className="line-clamp-1">{address}</span>
        </div>

        {/* RATING */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors duration-300">
          <div className="flex items-center gap-1">
            {renderStars(formattedRate)}
          </div>

          <span
            className="
            text-xs 
            text-zinc-500 dark:text-zinc-400
            group-hover:text-amber-600 dark:group-hover:text-amber-400
            transition-colors duration-300
            font-medium
          "
          >
            {formattedRate.toFixed(1)} / 5
          </span>
        </div>
      </div>
    </div>
  );
}

export const CoffeeCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse">
      <div className="h-40 bg-zinc-200 dark:bg-zinc-800" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />

        <div className="flex justify-between mt-3">
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
};
