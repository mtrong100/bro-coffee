import useCoffeeData from "../hooks/useCoffeeData";
import { MonthlySpendingChart } from "../components/stats/MonthlySpendingChart";
import { QuarterSpendingChart } from "../components/stats/QuarterSpendingChart";
import { SessionPieChart } from "../components/stats/SessionPieChart";
import {
  TopDrinkChart,
  TopPlaceChart,
} from "../components/stats/TopDrinkChart";

export default function Stats() {
  const { data, loading, error } = useCoffeeData();

  if (loading) {
    return (
      <div className="py-24 text-center text-zinc-500">
        Đang tải dashboard thống kê ☕
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-500">
        Không thể tải dữ liệu thống kê
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard thống kê
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Tổng quan chi tiêu & thói quen uống cà phê năm 2025
        </p>
      </div>

      {/* ================= GRID DASHBOARD ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ===== ROW 1 ===== */}
        <div className="xl:col-span-7">
          <QuarterSpendingChart data={data} />
        </div>
        <div className="xl:col-span-5">
          <SessionPieChart data={data} />
        </div>

        {/* ===== ROW 2 ===== */}
        <div className="xl:col-span-12">
          <MonthlySpendingChart data={data} />
        </div>

        {/* ===== ROW 3 ===== */}
        <div className="xl:col-span-6">
          <TopPlaceChart data={data} />
        </div>
        <div className="xl:col-span-6">
          <TopDrinkChart data={data} />
        </div>
      </div>
    </div>
  );
}
