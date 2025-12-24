import { Search, X, Calendar, Building, GlassWater, Clock } from "lucide-react";
import { SESSIONSET, SHOPSET, DRINKSET, MONTHSET } from "../utils/constants";

export default function Filters({
  search,
  setSearch,
  filters,
  setFilters,
  onClear,
}) {
  return (
    <div className="space-y-5">
      {/* ===== SEARCH ===== */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo quán, đồ uống, buổi..."
          className="
            w-full pl-12 pr-12 py-4 rounded-2xl
            bg-zinc-50 dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            text-zinc-900 dark:text-zinc-100
            placeholder-zinc-400 dark:placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:ring-amber-500/60
            transition-all
          "
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
          </button>
        )}
      </div>

      {/* ===== SELECT FILTERS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <FilterSelect
          icon={<Calendar size={16} />}
          value={filters.month}
          onChange={(v) => setFilters((f) => ({ ...f, month: v }))}
          options={MONTHSET}
          placeholder="Tháng"
        />
        <FilterSelect
          icon={<Building size={16} />}
          value={filters.place}
          onChange={(v) => setFilters((f) => ({ ...f, place: v }))}
          options={SHOPSET}
          placeholder="Quán"
        />
        <FilterSelect
          icon={<GlassWater size={16} />}
          value={filters.drink}
          onChange={(v) => setFilters((f) => ({ ...f, drink: v }))}
          options={DRINKSET}
          placeholder="Đồ uống"
        />
        <FilterSelect
          icon={<Clock size={16} />}
          value={filters.session}
          onChange={(v) => setFilters((f) => ({ ...f, session: v }))}
          options={SESSIONSET}
          placeholder="Buổi"
        />
      </div>

      {/* ===== CLEAR ===== */}
      {(search || Object.values(filters).some(Boolean)) && (
        <button
          onClick={onClear}
          className="
            text-sm font-medium
            text-amber-600 dark:text-amber-400
            flex items-center gap-1
            hover:underline
          "
        >
          <X size={14} />
          Xóa toàn bộ bộ lọc
        </button>
      )}
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function FilterSelect({ icon, value, onChange, options, placeholder }) {
  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-11 pr-4 py-4 rounded-2xl
          bg-zinc-50 dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          text-zinc-900 dark:text-zinc-100
          focus:outline-none focus:ring-2 focus:ring-amber-500/60
          transition-all
        "
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
