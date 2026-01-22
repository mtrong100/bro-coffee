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
  const chartData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (!item.address) return;

      const area = extractArea(item.address);
      map[area] = (map[area] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8); // Top 8
  }, [data]);

  return (
    <StatsCard title="Phân bố quán theo khu vực">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis type="number" hide />
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
                      <p className="font-mono text-amber-400">
                        {payload[0].value} quán
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#areaGradient-${index})`}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
            <defs>
              {chartData.map((_, index) => (
                <linearGradient key={index} id={`areaGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
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

//fix
