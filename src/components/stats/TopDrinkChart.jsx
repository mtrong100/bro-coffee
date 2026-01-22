import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import StatsCard from "./StatsCard";

/* ================= Utils ================= */
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

/* ================= Data builder ================= */
function buildTop(data, key) {
  const map = {};

  data.forEach((item) => {
    if (!item[key] || !item.price) return;

    const value = Number(item.price.replace(/[^\d]/g, ""));
    map[item[key]] = (map[item[key]] || 0) + value;
  });

  return Object.entries(map)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

/* ================= Shared Chart ================= */
function TopBarChart({ title, dataKey, data, colorStart, colorEnd }) {
  const chartData = useMemo(() => buildTop(data, dataKey), [data, dataKey]);

  return (
    <StatsCard title={title}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fontSize: 12, fill: "#52525b", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800 z-50">
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

            <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${dataKey})`}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>

            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colorStart || "#f59e0b"} />
                <stop offset="100%" stopColor={colorEnd || "#d97706"} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StatsCard>
  );
}

/* ================= Exports ================= */
export function TopPlaceChart({ data }) {
  return (
    <TopBarChart
      title="Top quán cà phê"
      data={data}
      dataKey="place"
      colorStart="#f59e0b"
      colorEnd="#b45309"
    />
  );
}

export function TopDrinkChart({ data }) {
  return (
    <TopBarChart
      title="Top đồ uống"
      data={data}
      dataKey="drink"
      colorStart="#10b981"
      colorEnd="#059669"
    />
  );
}
