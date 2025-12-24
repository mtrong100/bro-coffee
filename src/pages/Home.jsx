import { useMemo } from "react";
import { Database, DollarSign, Zap, AlertCircle } from "lucide-react";

import Header from "../components/Header";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import useCoffeeData from "../hooks/useCoffeeData";

/* ================= HELPERS ================= */
const parseVND = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;

export default function Home() {
  const { data, loading, error, lastUpdated, refetch } = useCoffeeData();

  const totalRecords = data.length;

  const totalAmount = useMemo(
    () => data.reduce((sum, row) => sum + parseVND(row.price), 0),
    [data]
  );

  const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-zinc-50 to-stone-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Database />}
              label="Tổng bản ghi"
              value={totalRecords}
              variant="blue"
            />
            <StatCard
              icon={<DollarSign />}
              label="Tổng tiền"
              value={formattedTotalAmount}
              variant="green"
            />
            <StatCard
              icon={<Zap />}
              label="Cập nhật lúc"
              value={lastUpdated}
              variant="violet"
            />
          </div>
        )}

        {error && (
          <div className="mb-6 p-6 bg-white dark:bg-zinc-900 border border-amber-200 dark:border-zinc-800 rounded-2xl flex items-center gap-4">
            <AlertCircle />
            <div className="flex-1">
              <p className="font-semibold">Lỗi tải dữ liệu</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg"
            >
              Thử lại
            </button>
          </div>
        )}

        <DataTable data={data} loading={loading} error={error} />
      </main>
    </div>
  );
}
