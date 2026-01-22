import { useState, useMemo, useEffect, useCallback } from "react";
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
  const [stablePage, setStablePage] = useState(1);

  const perPage = 12;

  /* Debounced page reset to prevent jank */
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setStablePage(1);
    }, 100);
    return () => clearTimeout(timer);
  }, [search, filters, data]);

  /* Stabilize page changes during scroll */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== stablePage) {
        setStablePage(page);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [page, stablePage]);

  const normalizeMonthFilter = (monthFilter) => {
    if (!monthFilter) return "";
    if (monthFilter.startsWith("Tháng ")) {
      return monthFilter.replace("Tháng ", "").padStart(2, "0");
    }
    return monthFilter;
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

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

  const paginatedData = useMemo(() => {
    return filteredData.slice((stablePage - 1) * perPage, stablePage * perPage);
  }, [filteredData, stablePage, perPage]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setFilters({ month: "", place: "", drink: "", session: "" });
    setPage(1);
    setStablePage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

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
            <CoffeeCard key={`${item.date}-${item.time}-${i}`} item={item} />
          ))}
        </div>
      )}

      {/* ===== EMPTY ===== */}
      {!loading && paginatedData.length === 0 && (
        <p className="text-center py-12 text-slate-500 dark:text-slate-400">
          Không có dữ liệu phù hợp
        </p>
      )}

      {!loading && filteredData.length > perPage && (
        <Pagination
          page={stablePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
