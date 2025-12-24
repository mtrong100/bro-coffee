import { useState, useMemo, useEffect } from "react";
import CoffeeCard, { SkeletonCoffeeCard } from "./CoffeeCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

export default function DataTable({ data = [], loading }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    month: "",
    place: "",
    drink: "",
    session: "",
  });
  const [page, setPage] = useState(1);

  const perPage = 12;

  /* reset page when data / filter changes */
  useEffect(() => {
    setPage(1);
  }, [search, filters, data]);

  const normalizeMonthFilter = (monthFilter) => {
    if (!monthFilter) return "";
    if (monthFilter.startsWith("Tháng ")) {
      return monthFilter.replace("Tháng ", "").padStart(2, "0");
    }
    return monthFilter;
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter((item) => {
      if (!item) return false;

      const drinkText = item.drink || "";
      const matchesSearch =
        !search ||
        [item.place, drinkText, item.session]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const itemMonth = item.date?.split("/")?.[1]?.padStart(2, "0");
      const filterMonthValue = normalizeMonthFilter(filters.month);

      const matchesDrink =
        !filters.drink ||
        drinkText
          .split(",")
          .map((d) => d.trim())
          .includes(filters.drink);

      return (
        matchesSearch &&
        (!filters.month || itemMonth === filterMonthValue) &&
        (!filters.place || item.place === filters.place) &&
        matchesDrink &&
        (!filters.session || item.session === filters.session)
      );
    });
  }, [data, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / perPage));

  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const clearFilters = () => {
    setSearch("");
    setFilters({ month: "", place: "", drink: "", session: "" });
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <Filters
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        onClear={clearFilters}
      />

      {/* ===== LOADING ===== */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: perPage }).map((_, i) => (
            <SkeletonCoffeeCard key={i} />
          ))}
        </div>
      )}

      {/* ===== DATA ===== */}
      {!loading && paginatedData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((item, i) => (
            <CoffeeCard key={i} item={item} />
          ))}
        </div>
      )}

      {/* ===== EMPTY ===== */}
      {!loading && paginatedData.length === 0 && (
        <p className="text-center py-12 text-slate-500 dark:text-slate-400">
          Không có dữ liệu phù hợp
        </p>
      )}

      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
