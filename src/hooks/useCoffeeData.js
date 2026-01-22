import { useEffect, useState, useCallback } from "react";

/* ================= CONFIG ================= */
const SHEET_ID = "1HfBkmmybTAdJA4KaHPg9GjIVtm_HfQZwxBmPzrTly1A";
const SHEET_NAME = "Sheet1";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

const HEADERS = [
  "date",
  "time",
  "session",
  "place",
  "drink",
  "price",
  "imageUrl",
];

/* ================= HELPERS ================= */
const parseCSV = (csv) => {
  const rows = csv.split("\n").filter(Boolean);

  if (rows.length <= 1) return []; // Only header or empty

  return rows.slice(1).map((row) => {
    const values = row
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((v) => v.replace(/^"|"$/g, "").trim());

    return HEADERS.reduce((acc, key, i) => {
      acc[key] = values[i] || "";
      return acc;
    }, {});
  });
};

/* ================= HOOK ================= */
export default function useCoffeeData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(SHEET_URL);
      if (!res.ok) throw new Error("Không thể tải Google Sheets");

      const csv = await res.text();
      const parsed = parseCSV(csv);

      // Filter out completely empty rows
      const filtered = parsed.filter(
        (row) => row.date || row.time || row.place || row.drink || row.price,
      );

      // Sort by date (latest first)
      const sorted = filtered.sort((a, b) => {
        // Parse DD/MM/YYYY format
        const parseDate = (dateStr) => {
          if (!dateStr) return new Date(0);
          const [day, month, year] = dateStr.split("/").map(Number);
          return new Date(year, month - 1, day);
        };
        return parseDate(b.date) - parseDate(a.date);
      });

      // Remove the last item from the array
      const dataWithoutLastItem = sorted.length > 0 ? sorted.slice(0, -1) : [];

      setData(dataWithoutLastItem);
      setLastUpdated(new Date().toLocaleTimeString("vi-VN"));
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  };
}
