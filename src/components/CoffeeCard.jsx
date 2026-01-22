import {
  MapPin,
  Clock,
  CalendarDays,
  Coffee,
  Wallet,
  Hash,
} from "lucide-react";
import { formatVND, isImageUrl } from "../utils/format";

export default function CoffeeCard({ item }) {
  const drinks = item.drink
    ? item.drink
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        bg-white/80 dark:bg-zinc-900/70 backdrop-blur
        border border-zinc-200 dark:border-zinc-800
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col h-full
      "
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {isImageUrl(item.imageUrl) ? (
          <img
            src={item.imageUrl}
            alt={drinks[0] || "Coffee"}
            loading="lazy"
            className="
              w-full h-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 dark:from-zinc-800 dark:to-zinc-900 text-amber-400/60">
            <Coffee size={40} />
          </div>
        )}

        {/* Subtle gradient overlay only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        {/* Date, Time, Session row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-medium">
            <CalendarDays size={13} />
            {item.date}
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
            <Clock size={13} />
            {item.time}
          </div>
          <div className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/30 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/30">
            {item.session}
          </div>
        </div>

        {/* Place */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin
            size={16}
            className="text-amber-500 dark:text-amber-400 shrink-0"
          />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {item.place}
          </span>
        </div>

        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Coffee size={16} className="text-amber-500 dark:text-amber-400" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Đồ uống{drinks.length > 1 ? ` (${drinks.length})` : ""}
            </span>
          </div>

          <div className="space-y-2">
            {drinks.map((drink, index) => (
              <div key={index} className="flex items-start gap-2">
                <Hash
                  size={14}
                  className="text-zinc-400 dark:text-zinc-500 mt-0.5"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                  {/* Display "x2" for Cafe sữa only when there's 1 drink */}
                  {drink === "Cafe sữa" && drinks.length === 1
                    ? `${drink} x2`
                    : drink}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Wallet
                size={16}
                className="text-amber-500 dark:text-amber-400"
              />
              <span className="text-sm">Tổng tiền</span>
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
              {formatVND(item.price)}
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/10
        "
      />
    </div>
  );
}

/* ================= SkeletonCoffeeCard.jsx ================= */
export const SkeletonCoffeeCard = () => {
  return (
    <div
      className="
        animate-pulse overflow-hidden rounded-2xl
        bg-zinc-100 dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        flex flex-col h-full
      "
    >
      {/* Image */}
      <div className="h-48 bg-zinc-200 dark:bg-zinc-800" />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Place + session */}
        <div className="flex justify-between gap-3">
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Drinks */}
        <div className="space-y-2">
          <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-4/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 ml-auto" />
        </div>
      </div>
    </div>
  );
};
