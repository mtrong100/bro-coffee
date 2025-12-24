import { useEffect, useState, useMemo } from "react";
import {
  Coffee,
  Database,
  DollarSign,
  Zap,
  RefreshCw,
  Loader,
  AlertCircle,
} from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import DataTable from "./components/DataTable";
import StatCard from "./components/StatCard";
import Footer from "./components/Footer";

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

const parseVND = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;

/* ================= APP ================= */
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= STATS ================= */
  const totalRecords = data.length;
  const totalAmount = useMemo(
    () => data.reduce((sum, row) => sum + parseVND(row.price), 0),
    [data]
  );

  const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  return (
    <div
      className="
        min-h-screen
        bg-linear-to-br
        from-stone-50 via-zinc-50 to-stone-100
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        transition-colors duration-300
      "
    >
      {/* ================= HEADER ================= */}
      <header
        className="
          sticky top-0 z-50
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          border-b border-zinc-200 dark:border-zinc-800
        "
      >
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="
                  absolute -inset-3
                  bg-linear-to-r from-amber-400 to-amber-500
                  rounded-full blur opacity-25
                "
              />
              <Coffee className="relative text-amber-600 dark:text-amber-400" />
            </div>
            <h1
              className="
                font-bold text-xl
                bg-linear-to-r from-amber-700 via-amber-600 to-amber-700
                dark:from-amber-300 dark:via-amber-400 dark:to-amber-300
                bg-clip-text text-transparent
              "
            >
              Bro Coffee
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="
                p-2 rounded-lg
                bg-amber-100 dark:bg-zinc-800
                text-amber-700 dark:text-amber-300
                hover:bg-amber-200 dark:hover:bg-zinc-700
                transition
              "
              title="Refresh data"
            >
              <RefreshCw size={20} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-4 py-6">
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Database />}
              label="Tổng bản ghi"
              value={totalRecords}
              variant="blue"
            />
            <StatCard
              icon={<DollarSign />}
              label="Tổng tiền"
              value={formattedTotalAmount}
              variant="green"
            />
            <StatCard
              icon={<Zap />}
              label="Cập nhật lúc"
              value={lastUpdated}
              variant="violet"
            />
          </div>
        )}

        {error && (
          <div
            className="
              mb-6 p-6
              bg-white dark:bg-zinc-900
              border border-amber-200 dark:border-zinc-800
              rounded-2xl
              text-amber-700 dark:text-amber-300
              flex items-center gap-4
            "
          >
            <div className="p-3 bg-amber-100 dark:bg-zinc-800 rounded-full">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Lỗi tải dữ liệu</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <button
              onClick={fetchData}
              className="
                px-4 py-2
                bg-linear-to-r from-amber-500 to-amber-600
                text-white rounded-lg
                hover:opacity-90 transition
              "
            >
              Thử lại
            </button>
          </div>
        )}

        <DataTable data={data} loading={loading} error={error} />
      </main>

      <Footer />
    </div>
  );
}
