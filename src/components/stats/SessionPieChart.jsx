import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import StatsCard from "./StatsCard";

/* ---------------- Utils ---------------- */
const COLORS = ["#f59e0b", "#f97316", "#10b981", "#06b6d4"];

const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatShortVND = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}t`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}tr`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
};

// Render custom active shape
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill} className="text-sm font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#71717a" className="text-xs">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.8}
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

export function SessionPieChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (!item.session || !item.price) return;

      const value = Number(item.price.replace(/[^\d]/g, ""));
      map[item.session] = (map[item.session] || 0) + value;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <StatsCard title="Chi tiêu theo buổi">
      <div className="flex flex-col h-full justify-between">
        <div className="h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                onMouseEnter={onPieEnter}
              >
                {chartData.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={COLORS[i % COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend custom */}
        <div className="grid grid-cols-2 gap-3 pb-2 pt-2">
          {chartData.map((item, i) => (
            <div
              key={i}
              className={`
                flex items-center gap-2 p-2 rounded-xl transition-colors
                ${i === activeIndex ? "bg-zinc-100 dark:bg-zinc-800" : ""}
              `}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div
                className="w-2 h-8 rounded-full opacity-80"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {formatShortVND(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StatsCard>
  );
}
