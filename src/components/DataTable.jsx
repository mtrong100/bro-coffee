import { useState, useMemo } from "react";
import CoffeeCard from "./CoffeeCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

export default function DataTable({ data }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    month: "",
    place: "",
    drink: "",
    session: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 12;

  // Helper function để chuyển đổi filter tháng "Tháng 3" -> "03"
  const normalizeMonthFilter = (monthFilter) => {
    if (!monthFilter) return "";
    if (monthFilter.startsWith("Tháng ")) {
      const monthNumber = monthFilter.replace("Tháng ", "");
      return monthNumber.padStart(2, "0");
    }
    return monthFilter;
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !search ||
        [item.place, item.drink, item.session]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      // Lấy và chuẩn hóa tháng từ item.date (định dạng DD/MM/YYYY)
      const itemDateParts = item.date?.split("/");
      let itemMonth = itemDateParts?.[1]; // Phần tử thứ 2 là tháng

      // Chuẩn hóa tháng từ dữ liệu: "3" -> "03"
      if (itemMonth && itemMonth.length === 1) {
        itemMonth = itemMonth.padStart(2, "0");
      }

      // Chuẩn hóa filter tháng
      const filterMonthValue = normalizeMonthFilter(filters.month);

      return (
        matchesSearch &&
        (!filters.month || itemMonth === filterMonthValue) &&
        (!filters.place || item.place === filters.place) &&
        (!filters.drink || item.drink === filters.drink) &&
        (!filters.session || item.session === filters.session)
      );
    });
  }, [data, search, filters]);

  const totalPages = Math.ceil(filteredData.length / perPage);

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

      {paginatedData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((item, i) => (
            <CoffeeCard key={i} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-slate-500 dark:text-slate-400">
          Không có dữ liệu phù hợp
        </p>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
