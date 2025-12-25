import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";

export function CategoryChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.category) return;
    map[item.category] = (map[item.category] || 0) + 1;
  });

  const chartData = Object.entries(map).map(([name, total]) => ({
    name,
    total,
  }));

  return (
    <ChartCard title="Phân bố loại quán">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
