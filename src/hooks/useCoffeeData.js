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
      const parsed = parseCSV(csv).filter((row) => row.drink || row.price);

      setData(parsed.length > 0 ? parsed.slice(0, -1) : []);
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
