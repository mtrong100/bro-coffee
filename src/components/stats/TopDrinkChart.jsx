import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "./StatsCard";

function buildTop(data, key) {
  const map = {};
  data.forEach((i) => {
    if (!i[key] || !i.price) return;
    map[i[key]] = (map[i[key]] || 0) + Number(i.price.replace(/[^\d]/g, ""));
  });

  return Object.entries(map)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

export function TopPlaceChart({ data }) {
  return (
    <StatsCard title="Top quán cà phê">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={buildTop(data, "place")}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#0EA5E9" />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}

export function TopDrinkChart({ data }) {
  return (
    <StatsCard title="Top đồ uống">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={buildTop(data, "drink")}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
}
