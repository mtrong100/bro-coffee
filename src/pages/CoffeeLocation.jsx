import { useMemo, useState } from "react";
import useCoffeeLocationData from "../hooks/useCoffeeLocationData";
import CoffeeLocationCard, {
  CoffeeCardSkeleton,
} from "../components/CoffeeLocationCard";
import { MapPin, AlertCircle, Search } from "lucide-react";

const CATEGORY_OPTIONS = ["All", "PEAK", "Mid", "Medium", "Trash"];

export default function CoffeeLocation() {
  const { data, loading, error, lastUpdated, refetch } =
    useCoffeeLocationData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  /* ===== FILTER LOGIC ===== */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.address?.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "All" || item.category === category;

      return matchSearch && matchCategory;
    });
  }, [data, search, category]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quán Cà Phê</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Danh sách quán & đánh giá từ Google Sheets
          </p>
        </div>

        <button
          onClick={refetch}
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-lg
            bg-amber-100 dark:bg-zinc-800
            text-amber-700 dark:text-amber-300
            hover:bg-amber-200 dark:hover:bg-zinc-700
            transition
          "
        >
          <MapPin size={18} />
          Làm mới
        </button>
      </div>

      {/* ===== Filter + Search ===== */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-3 py-2 rounded-lg
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-900
              focus:outline-none focus:ring-2 focus:ring-amber-400
            "
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`
                px-3 py-1.5 rounded-full text-sm border transition
                ${
                  category === c
                    ? "bg-amber-400 text-black border-amber-400"
                    : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Error ===== */}
      {error && (
        <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex gap-3">
          <AlertCircle />
          <span>{error}</span>
        </div>
      )}

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CoffeeCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ===== Content ===== */}
      {!loading && !error && (
        <>
          {filteredData.length === 0 ? (
            <p className="text-center text-zinc-500 mt-10">
              Không tìm thấy quán phù hợp 😢
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <CoffeeLocationCard key={index} data={item} />
              ))}
            </div>
          )}

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6 text-center">
            Cập nhật lúc: {lastUpdated}
          </p>
        </>
      )}
    </div>
  );
}
