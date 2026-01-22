import { useMemo } from "react";
import { Database, DollarSign, Zap, AlertCircle } from "lucide-react";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import useCoffeeData from "../hooks/useCoffeeData";

/* ================= HELPERS ================= */
const parseVND = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;

export default function Home() {
  const { data, loading, error, lastUpdated, refetch } = useCoffeeData();

  const totalRecords = data.length;

  const totalAmount = useMemo(
    () => data.reduce((sum, row) => sum + parseVND(row.price), 0),
    [data],
  );

  const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        {/* NEW HERO SECTION */}
        <div className="relative mb-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl shadow-amber-500/10 mb-2">
            <img
              src="favicon.svg"
              alt="Bro Coffee"
              className="w-16 h-16 object-cover bg-amber-500 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 drop-shadow-sm">
              Hôm nay{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                Bro
              </span>{" "}
              uống gì?
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-medium">
              Theo dõi hành trình caffeine và khám phá những quán cafe tuyệt
              vời.
            </p>
          </div>
        </div>

        {/* STATS GRID */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <StatCard
              icon={<Database strokeWidth={2.5} />}
              label="Tổng số cốc"
              value={totalRecords}
              variant="blue"
            />
            <StatCard
              icon={<DollarSign strokeWidth={2.5} />}
              label="Tổng chi tiêu"
              value={formattedTotalAmount}
              variant="green"
            />
            <StatCard
              icon={<Zap strokeWidth={2.5} />}
              label="Cập nhật mới nhất"
              value={lastUpdated}
              variant="violet"
            />
          </div>
        )}

        {error && (
          <div className="mb-12 mx-auto max-w-2xl p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-red-200 dark:border-red-900/50 rounded-3xl flex items-center gap-5 shadow-xl shadow-red-500/5">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl shrink-0">
              <AlertCircle
                size={24}
                className="text-red-600 dark:text-red-400"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-100">
                Không thể tải dữ liệu
              </h3>
              <p className="text-red-600 dark:text-red-300/80 mt-1 leading-relaxed">
                {error}
              </p>
            </div>
            <button
              onClick={refetch}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Thử lại ngay
            </button>
          </div>
        )}

        {/* HISTORY SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <Database size={20} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
              Lịch sử uống cà phê
            </h2>
          </div>

          <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
            <DataTable data={data} loading={loading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
}
