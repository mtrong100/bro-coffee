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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* ===== Header ===== */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
              Quán Cà Phê
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Khám phá và đánh giá các địa điểm cà phê thú vị
            </p>
          </div>

          <button
            onClick={refetch}
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl
              bg-white/80 dark:bg-zinc-800/80 backdrop-blur
              border border-zinc-200 dark:border-zinc-700
              text-zinc-600 dark:text-zinc-300
              hover:text-amber-600 dark:hover:text-amber-400
              hover:border-amber-200 dark:hover:border-amber-800/50
              hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-none
              transition-all duration-300
              group
            "
          >
            <MapPin size={18} className="group-hover:text-amber-500 transition-colors" />
            <span className="font-medium">Làm mới dữ liệu</span>
          </button>
        </div>

        {/* ===== Filter + Search ===== */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm quán theo tên hoặc địa chỉ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                block w-full pl-11 pr-4 py-3.5
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                rounded-2xl
                text-zinc-900 dark:text-zinc-100 placeholder-zinc-400
                focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                transition-all duration-300
                shadow-sm hover:shadow-md
              "
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap items-center">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border
                  ${category === c
                    ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 transform scale-105"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }
                `}
              >
                {c === "All" ? "Tất cả" : c}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Error ===== */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertCircle size={20} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* ===== Loading Skeleton ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CoffeeCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ===== Content ===== */}
        {!loading && !error && (
          <>
            {filteredData.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center p-6 bg-amber-50 dark:bg-amber-900/10 rounded-full mb-4">
                  <Search size={40} className="text-amber-300 dark:text-amber-700" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc xem sao
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((item, index) => (
                  <CoffeeLocationCard key={index} data={item} />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Cập nhật lần cuối: {lastUpdated}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
