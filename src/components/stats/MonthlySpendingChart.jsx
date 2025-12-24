import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "./StatsCard";

export function MonthlySpendingChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.date || !item.price) return;
    const [_, m, y] = item.date.split("/");
    if (y !== "2025") return;

    map[m] = (map[m] || 0) + Number(item.price.replace(/[^\d]/g, ""));
  });

  const chartData = Object.keys(map)
    .sort()
    .map((m) => ({
      month: `Tháng ${Number(m)}`,
      total: map[m],
    }));

  return (
    <StatsCard title="Chi tiêu theo tháng (2025)">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
