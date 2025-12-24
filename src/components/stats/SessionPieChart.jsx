import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "./StatsCard";

const COLORS = ["#f96a11", "#fff700", "#fc0546", "#06B6D4"];

export function SessionPieChart({ data }) {
  const map = {};

  data.forEach((item) => {
    if (!item.session || !item.price) return;
    map[item.session] =
      (map[item.session] || 0) + Number(item.price.replace(/[^\d]/g, ""));
  });

  const chartData = Object.keys(map).map((k) => ({
    name: k,
    value: map[k],
  }));

  return (
    <StatsCard title="Chi tiêu theo buổi">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
