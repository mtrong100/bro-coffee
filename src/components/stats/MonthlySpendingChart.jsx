import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "./StatsCard";

/* -------------------- Utils -------------------- */
const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

// Rút gọn số cho trục Y (vd: 1.2tr, 500k)
const formatShortVND = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}t`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}tr`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
};

export function MonthlySpendingChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.date || !item.price) return;

    const [_, m, y] = item.date.split("/");
    if (y !== "2025") return;

    const price = Number(item.price.replace(/[^\d]/g, ""));
    map[m] = (map[m] || 0) + price;
  });

  const chartData = Object.keys(map)
    .sort((a, b) => Number(a) - Number(b))
    .map((m) => ({
      month: `Tháng ${Number(m)}`,
      total: map[m],
    }));

  return (
    <StatsCard title="Chi tiêu theo tháng (2025)">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} />

          <YAxis
            tickFormatter={formatShortVND}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => formatVND(value)}
            labelStyle={{ fontWeight: 600 }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e4e4e7",
              background: "rgba(255,255,255,0.9)",
            }}
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
