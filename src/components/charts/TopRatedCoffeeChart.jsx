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

export function TopRatedCoffeeChart({ data }) {
  const top = useMemo(() => {
    return [...data]
      .filter((i) => i.rate)
      .sort((a, b) => Number(b.rate) - Number(a.rate))
      .slice(0, 5)
      .map((i) => ({
        name: i.name,
        rate: Number(i.rate) / 100,
      }));
  }, [data]);

  return (
    <StatsCard title="Top quán được đánh giá cao">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis type="number" domain={[0, 5]} hide />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fontSize: 12, fill: "#52525b", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-zinc-800 z-50">
                      <p className="font-semibold mb-1">{label}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="font-mono text-white">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
              {top.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#rateGradient-${index})`}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
            <defs>
              {top.map((_, index) => (
                <linearGradient key={index} id={`rateGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StatsCard>
  );
}
