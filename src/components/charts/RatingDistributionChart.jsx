import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import StatsCard from "../stats/StatsCard";

const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"]; // Red -> Orange -> Yellow -> Light Green -> Green

const LABELS = {
  "0-1": "Rất tệ (0–1⭐)",
  "1-2": "Tệ (1–2⭐)",
  "2-3": "Trung bình (2–3⭐)",
  "3-4": "Tốt (3–4⭐)",
  "4-5": "Rất tốt (4–5⭐)",
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill} className="text-sm font-bold">
        {payload.value}
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#71717a" className="text-xs">
        quán
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  );
};

export function RatingDistributionChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = useMemo(() => {
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

    return Object.entries(buckets).map(([key, value]) => ({
      name: LABELS[key],
      value,
      percent: total ? ((value / total) * 100).toFixed(1) : 0,
    }));
  }, [data]);

  return (
    <StatsCard title="Phân bố đánh giá">
      <div className="flex flex-col h-full justify-between">
        <div className="h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800">
                        <p className="font-semibold mb-1">{data.name}</p>
                        <p className="font-mono text-amber-400">
                          {data.value} quán ({data.percent}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          {chartData.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors cursor-pointer ${activeIndex === index ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="truncate text-zinc-600 dark:text-zinc-400">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </StatsCard>
  );
}

//fix
