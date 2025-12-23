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
  // Tách các drink nếu có nhiều hơn 1
  const drinks = item.drink
    ? item.drink
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d)
    : [];

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm
        border border-emerald-200/50 dark:border-emerald-900/30
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-2
        flex flex-col h-full
      "
    >
      {/* ===== IMAGE ===== */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {isImageUrl(item.imageUrl) ? (
          <img
            src={item.imageUrl}
            alt={drinks[0] || "Coffee"}
            loading="lazy"
            className="
              w-full h-full object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 text-emerald-400/50 dark:text-emerald-500/50">
            <Coffee size={40} />
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t
            from-black/60 via-black/20 to-transparent
            opacity-0 group-hover:opacity-100
            transition-all duration-500
          "
        />

        {/* Date overlay */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
            <CalendarDays size={14} />
            {item.date}
          </div>
        </div>

        {/* Time overlay */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
            <Clock size={14} />
            {item.time}
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-5 flex flex-col flex-1">
        {/* Place và Session */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin
              size={16}
              className="text-rose-500 dark:text-rose-400 flex-shrink-0"
            />
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
              {item.place}
            </span>
          </div>

          {/* Session */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
              item.session === "Sáng"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                : item.session === "Trưa"
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
                : item.session === "Chiều"
                ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
                : "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
            }`}
          >
            {item.session}
          </div>
        </div>

        {/* Drinks */}
        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Coffee
              size={16}
              className="text-emerald-500 dark:text-emerald-400 flex-shrink-0"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Đồ uống{drinks.length > 1 ? ` (${drinks.length})` : ""}
            </span>
          </div>
          <div className="space-y-2">
            {drinks.map((drink, index) => (
              <div key={index} className="flex items-start gap-2">
                <Hash
                  size={14}
                  className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-tight wrap-break-word">
                  {drink}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider và Price - Đẩy xuống dưới cùng */}
        <div className="mt-auto pt-4 border-t border-emerald-200/50 dark:border-emerald-900/30">
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Wallet
                size={16}
                className="text-emerald-500 dark:text-emerald-400"
              />
              <span className="text-sm">Tổng tiền</span>
            </div>
            <div className="text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              {formatVND(item.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-linear-to-br
          from-emerald-500/10 via-transparent to-teal-500/10
        "
      />
    </div>
  );
}
