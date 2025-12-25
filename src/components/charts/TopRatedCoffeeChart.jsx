import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";

export function TopRatedCoffeeChart({ data }) {
  const top = [...data]
    .filter((i) => i.rate)
    .sort((a, b) => Number(b.rate) - Number(a.rate))
    .slice(0, 5)
    .map((i) => ({
      name: i.name,
      rate: Number(i.rate) / 100,
    }));

  return (
    <ChartCard title="Top quán được đánh giá cao">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={top}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Bar dataKey="rate" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
