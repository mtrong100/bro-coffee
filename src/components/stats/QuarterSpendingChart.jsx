import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import StatsCard from "./StatsCard";

/* ---------------- Utils ---------------- */
const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatShortVND = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}t`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}tr`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
};

const getQuarter = (month) => Math.ceil(month / 3);

export function QuarterSpendingChart({ data }) {
  const currentYear = new Date().getFullYear().toString();

  const chartData = useMemo(() => {
    const result = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };

    data.forEach((item) => {
      if (!item.date || !item.price) return;

      const [_, m, y] = item.date.split("/");
      // Filter by current year dynamically
      if (y !== currentYear) return;

      const price = Number(item.price.replace(/[^\d]/g, ""));
      const quarter = `Q${getQuarter(Number(m))}`;

      if (result[quarter] !== undefined) {
        result[quarter] += price;
      }
    });

    return Object.keys(result).map((q) => ({
      quarter: q,
      total: result[q],
    }));
  }, [data, currentYear]);

  const totalSpending = chartData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <StatsCard title={`Chi tiêu theo quý (${currentYear})`}>
      <div className="mb-4">
        <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          {formatShortVND(totalSpending)}
        </span>
        <span className="text-sm font-medium text-zinc-500 ml-2">trong năm nay</span>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 13, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatShortVND}
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800">
                      <p className="font-semibold mb-1">{label}</p>
                      <p className="font-mono text-amber-400">
                        {formatVND(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey="total" radius={[8, 8, 8, 8]} barSize={40} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  fill="url(#barGradient)"
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StatsCard>
  );
}
