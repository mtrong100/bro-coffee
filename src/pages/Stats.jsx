import { RefreshCw } from "lucide-react";
import useCoffeeData from "../hooks/useCoffeeData";
import useCoffeeLocationData from "../hooks/useCoffeeLocationData";

import { MonthlySpendingChart } from "../components/stats/MonthlySpendingChart";
import { QuarterSpendingChart } from "../components/stats/QuarterSpendingChart";
import { SessionPieChart } from "../components/stats/SessionPieChart";
import {
  TopDrinkChart,
  TopPlaceChart,
} from "../components/stats/TopDrinkChart";
import { CategoryChart } from "../components/charts/CategoryChart";
import { RatingDistributionChart } from "../components/charts/RatingDistributionChart";
import { AreaDistributionChart } from "../components/charts/AreaDistributionChart";
import { TopRatedCoffeeChart } from "../components/charts/TopRatedCoffeeChart";

function SectionHeader({ title, desc }) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
    </div>
  );
}

export default function Stats() {
  const { data, loading, error } = useCoffeeData();
  const { data: coffeeLocations, loading: locationLoading } =
    useCoffeeLocationData();

  if (loading || locationLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        {/* Animated coffee cup */}
        <div className="relative mb-8">
          {/* Coffee cup */}
          <div
            className="
          w-20 h-16
          border-4 border-amber-300/50
          rounded-b-2xl rounded-t-lg
          overflow-hidden
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-100/30 before:to-transparent
        "
          >
            {/* Coffee liquid with animation */}
            <div
              className="
            absolute bottom-0 left-0 right-0
            h-8
            bg-gradient-to-t from-amber-600 to-amber-500
            rounded-t-lg
            animate-[pulse_2s_ease-in-out_infinite]
          "
            >
              {/* Coffee surface with bubbles */}
              <div className="absolute -top-1 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-[bubble_1.5s_ease-in-out_infinite]" />
              <div className="absolute -top-1 left-1/2 w-3 h-3 bg-amber-300 rounded-full animate-[bubble_2s_ease-in-out_infinite]" />
              <div className="absolute -top-2 right-1/4 w-2 h-2 bg-amber-400/80 rounded-full animate-[bubble_2.5s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Steam animations */}
          <div
            className="
          absolute -top-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
        "
          >
            <div className="w-2 h-6 bg-gradient-to-b from-amber-300/30 to-transparent rounded-full animate-[steam_1.8s_ease-out_infinite]" />
            <div className="w-3 h-8 bg-gradient-to-b from-amber-200/40 to-transparent rounded-full animate-[steam_2s_ease-out_infinite]" />
            <div className="w-2 h-6 bg-gradient-to-b from-amber-300/30 to-transparent rounded-full animate-[steam_2.2s_ease-out_infinite]" />
          </div>
        </div>

        {/* Loading text with gradient */}
        <div className="text-center space-y-4">
          <h3
            className="
          text-xl font-semibold
          bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600
          dark:from-amber-400 dark:via-amber-300 dark:to-amber-400
          bg-clip-text text-transparent
          animate-gradient
        "
          >
            Đang pha cà phê thống kê...
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Đang tổng hợp dữ liệu từ các quán cafe để mang đến thông tin chi
            tiết nhất
          </p>

          {/* Animated dots */}
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-[bounce_1.2s_infinite]" />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-[bounce_1.2s_infinite_0.2s]" />
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-[bounce_1.2s_infinite_0.4s]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full max-w-xs">
          <div
            className="
          h-2
          bg-gradient-to-r from-amber-100 to-amber-50
          dark:from-zinc-800 dark:to-zinc-900
          rounded-full
          overflow-hidden
        "
          >
            <div
              className="
            h-full
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400
            animate-[progress_2s_ease-in-out_infinite]
            rounded-full
          "
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        {/* Broken coffee cup illustration */}
        <div className="relative mb-8">
          <div
            className="
          w-20 h-16
          border-4 border-red-300/50
          rounded-b-2xl rounded-t-lg
          overflow-hidden
          relative
          rotate-6
        "
          >
            {/* Crack effect */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-8 h-0.5 bg-red-300/50 rotate-45" />
              <div className="absolute top-1/3 right-1/4 w-6 h-0.5 bg-red-300/50 -rotate-45" />
            </div>

            {/* Spilled coffee */}
            <div
              className="
            absolute -bottom-4 -left-2
            w-24 h-8
            bg-gradient-to-r from-red-500/20 to-amber-500/20
            rounded-full
            blur-sm
          "
            />
          </div>

          {/* Warning icon */}
          <div
            className="
          absolute -top-2 -right-2
          w-8 h-8
          bg-gradient-to-br from-red-500 to-red-600
          rounded-full
          flex items-center justify-center
          shadow-lg
          animate-[pulse_2s_ease-in-out_infinite]
        "
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error content */}
        <div className="text-center space-y-4 max-w-md">
          <h3
            className="
          text-xl font-semibold
          bg-gradient-to-r from-red-600 via-rose-500 to-red-600
          dark:from-red-400 dark:via-rose-300 dark:to-red-400
          bg-clip-text text-transparent
        "
          >
            Không thể pha cà phê thống kê
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400">
            Đã xảy ra lỗi khi tải dữ liệu thống kê. Vui lòng thử lại sau.
          </p>

          {/* Error details (optional) */}
          {error.message && (
            <div
              className="
            mt-4 p-3
            bg-red-50/50 dark:bg-red-900/10
            rounded-lg
            border border-red-200 dark:border-red-800/30
          "
            >
              <p className="text-xs text-red-600 dark:text-red-400 font-mono">
                {error.message}
              </p>
            </div>
          )}

          {/* Retry button */}
          <button
            onClick={() => window.location.reload()}
            className="
            mt-6
            px-6 py-2
            bg-gradient-to-r from-amber-500 to-amber-600
            hover:from-amber-600 hover:to-amber-700
            text-white
            rounded-lg
            font-medium
            shadow-lg shadow-amber-500/20
            hover:shadow-xl hover:shadow-amber-500/30
            transform hover:scale-105
            active:scale-95
            transition-all duration-300
            flex items-center gap-2 mx-auto
          "
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>

          {/* Support text */}
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-6">
            Vấn đề vẫn tiếp diễn?{" "}
            <button
              className="
            text-amber-600 dark:text-amber-400
            hover:text-amber-700 dark:hover:text-amber-300
            underline underline-offset-2
            transition-colors
          "
            >
              Liên hệ hỗ trợ
            </button>
          </p>
        </div>

        {/* Background decorative elements */}
        <div
          className="
        absolute inset-0 -z-10
        opacity-10
        pointer-events-none
      "
        >
          <div
            className="
          absolute top-1/4 left-1/4
          w-64 h-64
          bg-gradient-to-r from-amber-400 to-transparent
          rounded-full
          blur-3xl
        "
          />
          <div
            className="
          absolute bottom-1/4 right-1/4
          w-96 h-96
          bg-gradient-to-l from-red-400 to-transparent
          rounded-full
          blur-3xl
        "
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-14">
      {/* ===================== SPENDING ===================== */}
      <section className="space-y-6">
        <SectionHeader
          title="Thống kê chi tiêu"
          desc="Tổng quan thói quen chi tiêu cà phê của bạn"
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7">
            <QuarterSpendingChart data={data} />
          </div>

          <div className="xl:col-span-5">
            <SessionPieChart data={data} />
          </div>

          <div className="xl:col-span-12">
            <MonthlySpendingChart data={data} />
          </div>

          <div className="xl:col-span-6">
            <TopPlaceChart data={data} />
          </div>

          <div className="xl:col-span-6">
            <TopDrinkChart data={data} />
          </div>
        </div>
      </section>

      {/* ===================== LOCATION ===================== */}
      <section className="space-y-6">
        <SectionHeader
          title="Thống kê quán cà phê"
          desc="Phân tích theo khu vực, đánh giá và phân loại quán"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 3 */}
          <div className="lg:col-span-12">
            <TopRatedCoffeeChart data={coffeeLocations} />
          </div>

          {/* Row 1 */}
          <div className="lg:col-span-7">
            <CategoryChart data={coffeeLocations} />
          </div>

          <div className="lg:col-span-5">
            <RatingDistributionChart data={coffeeLocations} />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-12">
            <AreaDistributionChart data={coffeeLocations} />
          </div>
        </div>
      </section>
    </div>
  );
}
