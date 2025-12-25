import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "./StatsCard";

/* ---------------- Utils ---------------- */
const COLORS = ["#f59e0b", "#f97316", "#10b981", "#06b6d4"];

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

export function SessionPieChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.session || !item.price) return;

    const value = Number(item.price.replace(/[^\d]/g, ""));
    map[item.session] = (map[item.session] || 0) + value;
  });

  const chartData = Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));

  return (
    <StatsCard title="Chi tiêu theo buổi">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={3}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => formatVND(value)}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e4e4e7",
              background: "rgba(255,255,255,0.95)",
            }}
            labelStyle={{ fontWeight: 600 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend custom */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {chartData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="flex-1 text-zinc-700 dark:text-zinc-300">
              {item.name}
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatShortVND(item.value)}
            </span>
          </div>
        ))}
      </div>
    </StatsCard>
  );
}
