import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";

/**
 * Tách khu vực từ address
 * VD: "Quận 1, TP HCM" → "Quận 1"
 */
function extractArea(address = "") {
  if (!address) return "Khác";

  const parts = address.split(",").map((p) => p.trim());
  return parts[0] || "Khác";
}

export function AreaDistributionChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.address) return;

    const area = extractArea(item.address);
    map[area] = (map[area] || 0) + 1;
  });

  const chartData = Object.entries(map)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6); // chỉ lấy top 6 cho đẹp

  return (
    <ChartCard title="Phân bố quán theo khu vực">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
