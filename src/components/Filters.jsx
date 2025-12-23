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
    <div className="space-y-4">
      {/* ===== SEARCH ===== */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo quán, đồ uống, buổi..."
          className="
            w-full pl-12 pr-12 py-4 rounded-xl
            bg-white dark:bg-gray-800
            border border-slate-200 dark:border-slate-700
            text-slate-800 dark:text-slate-200
            placeholder-slate-400 dark:placeholder-slate-500
            focus:ring-2 focus:ring-blue-500
          "
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
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
          className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1"
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
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-3 py-4 rounded-xl
          bg-white dark:bg-gray-800
          border border-slate-200 dark:border-slate-700
          text-slate-800 dark:text-slate-200
          focus:ring-2 focus:ring-blue-500
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
