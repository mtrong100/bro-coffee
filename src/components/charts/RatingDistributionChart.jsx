import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";

const COLORS = ["#ef4444", "#f97316", "#7C00FE", "#00FFDE", "#22c55e"];

const LABELS = {
  "0-1": "Rất tệ (0–1⭐)",
  "1-2": "Tệ (1–2⭐)",
  "2-3": "Trung bình (2–3⭐)",
  "3-4": "Tốt (3–4⭐)",
  "4-5": "Rất tốt (4–5⭐)",
};

export function RatingDistributionChart({ data }) {
  const buckets = {
    "0-1": 0,
    "1-2": 0,
    "2-3": 0,
    "3-4": 0,
    "4-5": 0,
  };

  data.forEach((item) => {
    const rate = Number(item.rate) / 100 || 0;

    if (rate < 1) buckets["0-1"]++;
    else if (rate < 2) buckets["1-2"]++;
    else if (rate < 3) buckets["2-3"]++;
    else if (rate < 4) buckets["3-4"]++;
    else buckets["4-5"]++;
  });

  const total = Object.values(buckets).reduce((a, b) => a + b, 0);

  const chartData = Object.entries(buckets).map(([key, value]) => ({
    name: LABELS[key],
    value,
    percent: total ? ((value / total) * 100).toFixed(1) : 0,
  }));

  return (
    <ChartCard title="Phân bố đánh giá">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip đẹp hơn */}
          <Tooltip
            formatter={(value, _, props) => [
              `${value} quán (${props.payload.percent}%)`,
              "Số lượng",
            ]}
          />

          {/* Legend rõ ràng */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

//fix
