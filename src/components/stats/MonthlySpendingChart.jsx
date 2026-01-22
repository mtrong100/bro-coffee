import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";
import StatsCard from "./StatsCard";

/* -------------------- Utils -------------------- */
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

export function MonthlySpendingChart({ data }) {
  const currentYear = new Date().getFullYear().toString();

  const chartData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (!item.date || !item.price) return;

      const [_, m, y] = item.date.split("/");
      // Filter by current year
      if (y !== currentYear) return;

      const price = Number(item.price.replace(/[^\d]/g, ""));
      map[m] = (map[m] || 0) + price;
    });

    return Object.keys(map)
      .sort((a, b) => Number(a) - Number(b))
      .map((m) => ({
        month: `T${Number(m)}`,
        fullMonth: `Tháng ${Number(m)}`,
        total: map[m],
      }));
  }, [data, currentYear]);

  return (
    <StatsCard title={`Chi tiêu theo tháng (${currentYear})`}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" opacity={0.5} />

            <XAxis
              dataKey="month"
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
              cursor={{ stroke: "#f59e0b", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload;
                  return (
                    <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800">
                      <p className="font-semibold mb-1">{dataPoint.fullMonth}</p>
                      <p className="font-mono text-amber-400">
                        {formatVND(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="none"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#f59e0b" }}
              activeDot={{ r: 7, strokeWidth: 0, fill: "#f59e0b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </StatsCard>
  );
}
