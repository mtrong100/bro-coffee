import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "./StatsCard";

const getQuarter = (month) => Math.ceil(month / 3);

export function QuarterSpendingChart({ data }) {
  const result = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };

  data.forEach((item) => {
    if (!item.date || !item.price) return;

    const [_, m, y] = item.date.split("/");
    if (y !== "2025") return;

    const quarter = `Q${getQuarter(Number(m))}`;
    result[quarter] += Number(item.price.replace(/[^\d]/g, ""));
  });

  const chartData = Object.keys(result).map((q) => ({
    quarter: q,
    total: result[q],
  }));

  return (
    <StatsCard title="Tổng chi tiêu theo quý (2025)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#EC4899" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
