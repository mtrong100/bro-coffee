import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
function TopBarChart({ title, dataKey, data }) {
  const chartData = buildTop(data, dataKey);

  return (
    <StatsCard title={title}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
          <YAxis tickFormatter={formatShortVND} width={60} />
          <Tooltip
            formatter={(value) => formatVND(value)}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e4e4e7",
              background: "rgba(255,255,255,0.95)",
            }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar dataKey="total" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}

/* ================= Exports ================= */
export function TopPlaceChart({ data }) {
  return <TopBarChart title="Top quán cà phê" data={data} dataKey="place" />;
}

export function TopDrinkChart({ data }) {
  return <TopBarChart title="Top đồ uống" data={data} dataKey="drink" />;
}
