import { useEffect, useState, useCallback } from "react";

/* ================= CONFIG ================= */
const SHEET_ID = "1ZUDKhNkFdnoyWtkuaIxjwRwmzeTWWb7jjhXAgEtbyWc";
const SHEET_NAME = "Sheet2";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

const HEADERS = ["name", "address", "rate", "category", "imageUrl"];

/* ================= HELPERS ================= */
const parseCSV = (csv) => {
  const rows = csv.split("\n").filter(Boolean);

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

const toNumber = (val) => Number(String(val).replace(/[^\d.]/g, "")) || 0;

/* ================= HOOK ================= */
export default function useCoffeeLocationData() {
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
      const parsed = parseCSV(csv)
        .filter((row) => row.name)
        .map((row) => ({
          ...row,
          rate: toNumber(row.rate),
        }));

      setData(parsed);
      setLastUpdated(new Date().toLocaleTimeString("vi-VN"));
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
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
