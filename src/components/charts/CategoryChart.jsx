import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import StatsCard from "../stats/StatsCard";

export function CategoryChart({ data }) {
  const chartData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (!item.category) return;
      map[item.category] = (map[item.category] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, total]) => ({
        name,
        total,
      }))
      .sort((a, b) => b.total - a.total);
  }, [data]);

  return (
    <StatsCard title="Phân bố loại quán">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#71717a", fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#a1a1aa" }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800">
                      <p className="font-semibold mb-1">{label}</p>
                      <p className="font-mono text-amber-400">
                        {payload[0].value} quán
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={40} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#categoryGradient-${index})`}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
            <defs>
              {chartData.map((_, index) => (
                <linearGradient key={index} id={`categoryGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StatsCard>
  );
}
