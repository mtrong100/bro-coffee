import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
  const result = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };

  data.forEach((item) => {
    if (!item.date || !item.price) return;

    const [_, m, y] = item.date.split("/");
    if (y !== "2025") return;

    const price = Number(item.price.replace(/[^\d]/g, ""));
    const quarter = `Q${getQuarter(Number(m))}`;

    result[quarter] += price;
  });

  const chartData = Object.keys(result).map((q) => ({
    quarter: q,
    total: result[q],
  }));

  return (
    <StatsCard title="Tổng chi tiêu theo quý (2025)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis dataKey="quarter" tick={{ fill: "#71717a", fontSize: 12 }} />

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

          <Bar dataKey="total" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
